import { http, HttpResponse } from "msw";
import Fuse from "fuse.js";
import { db } from "./db";
import { user } from "../data/mock";

const delay = () => new Promise((r) => setTimeout(r, 80));

export const handlers = [
  http.get("/api/user", async () => {
    await delay();
    return HttpResponse.json(db.user);
  }),

  http.patch("/api/user", async ({ request }) => {
    await delay();
    const body = (await request.json()) as Partial<typeof db.user>;
    Object.assign(db.user, body);
    return HttpResponse.json(db.user);
  }),

  http.get("/api/todos", async () => {
    await delay();
    return HttpResponse.json(db.todos);
  }),

  http.patch("/api/todos/:id/toggle", async ({ params }) => {
    await delay();
    const id = Number(params.id);
    const t = db.todos.find((x) => x.id === id);
    if (t) t.done = !t.done;
    db.user.metrics.todos = db.todos.filter((x) => !x.done).length;
    return HttpResponse.json(t);
  }),

  http.get("/api/requests", async () => {
    await delay();
    return HttpResponse.json(db.requests);
  }),

  http.delete("/api/requests/:id", async ({ params }) => {
    await delay();
    const id = Number(params.id);
    db.requests = db.requests.filter((r) => r.id !== id);
    db.user.metrics.requests = db.requests.length;
    return new HttpResponse(null, { status: 204 });
  }),

  http.post("/api/requests/batch", async ({ request }) => {
    await delay();
    const { ids } = (await request.json()) as { ids: number[] };
    db.requests = db.requests.filter((r) => !ids.includes(r.id));
    db.user.metrics.requests = db.requests.length;
    return new HttpResponse(null, { status: 204 });
  }),

  http.get("/api/projects", async () => {
    await delay();
    return HttpResponse.json(db.projects);
  }),

  http.patch("/api/projects/:id", async ({ params, request }) => {
    await delay();
    const body = (await request.json()) as { status?: string };
    const p = db.projects.find((x) => x.id === params.id);
    if (p && body.status) {
      (p as { status: string }).status = body.status;
    }
    return HttpResponse.json(p);
  }),

  http.get("/api/social", async () => {
    await delay();
    return HttpResponse.json(db.social);
  }),

  http.post("/api/social", async ({ request }) => {
    await delay();
    const { content } = (await request.json()) as { content: string };
    const post = {
      id: Date.now(),
      author: user.name,
      avatar: user.avatarInitials,
      time: "刚刚",
      topic: "随想",
      content,
      reactions: 0,
      comments: 0,
      accent: "bg-ocean-500",
    };
    db.social.unshift(post);
    return HttpResponse.json(post);
  }),

  http.get("/api/assets", async () => {
    await delay();
    return HttpResponse.json(db.assets);
  }),

  http.post("/api/assets/:id/return", async ({ params }) => {
    await delay();
    const a = db.assets.find((x) => x.id === params.id);
    if (a) a.status = "已归还";
    return HttpResponse.json(a);
  }),

  http.post("/api/assets/apply", async () => {
    await delay();
    return new HttpResponse(null, { status: 204 });
  }),

  http.get("/api/knowledge", async () => {
    await delay();
    return HttpResponse.json(db.knowledge);
  }),

  http.patch("/api/knowledge/:id/star", async ({ params }) => {
    await delay();
    const a = db.knowledge.find((x) => x.id === params.id);
    if (a) a.starred = !a.starred;
    return HttpResponse.json(a);
  }),

  http.get("/api/members", async () => {
    await delay();
    return HttpResponse.json(db.members);
  }),

  http.get("/api/notifications", async () => {
    await delay();
    return HttpResponse.json(db.notifications);
  }),

  http.patch("/api/notifications/:id/read", async ({ params }) => {
    await delay();
    const n = db.notifications.find((x) => x.id === Number(params.id));
    if (n) n.read = true;
    return new HttpResponse(null, { status: 204 });
  }),

  http.post("/api/notifications/read-all", async () => {
    await delay();
    db.notifications.forEach((n) => {
      n.read = true;
    });
    return new HttpResponse(null, { status: 204 });
  }),

  http.get("/api/search", async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const q = url.searchParams.get("q") ?? "";
    if (!q.trim()) return HttpResponse.json([]);

    const items = [
      ...db.projects.map((p) => ({
        id: p.id,
        type: "project",
        title: p.name,
        subtitle: p.id,
        tab: "projects",
        query: p.id,
      })),
      ...db.assets.map((a) => ({
        id: a.id,
        type: "asset",
        title: a.name,
        subtitle: a.category,
        tab: "assets",
        query: a.id,
      })),
      ...db.knowledge.map((k) => ({
        id: k.id,
        type: "knowledge",
        title: k.title,
        subtitle: k.category,
        tab: "knowledge",
        query: k.id,
      })),
      ...db.members.map((m) => ({
        id: String(m.id),
        type: "member",
        title: m.name,
        subtitle: m.role,
        tab: "departments",
      })),
      ...db.social.map((s) => ({
        id: String(s.id),
        type: "social",
        title: `${s.author}：${s.topic}`,
        subtitle: s.content.slice(0, 40),
        tab: "social",
        query: String(s.id),
      })),
    ];

    const fuse = new Fuse(items, {
      keys: ["title", "subtitle"],
      threshold: 0.4,
    });
    return HttpResponse.json(fuse.search(q).map((r) => r.item).slice(0, 12));
  }),
];
