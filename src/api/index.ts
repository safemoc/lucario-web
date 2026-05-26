import { apiClient } from "./client";
import type {
  KnowledgeArticle,
  Member,
  MyAsset,
  Notification,
  Project,
  Request,
  SocialPost,
  Todo,
  User,
} from "../types";

export const api = {
  user: {
    get: () => apiClient<User>("/user"),
    update: (data: Partial<User>) =>
      apiClient<User>("/user", { method: "PATCH", body: JSON.stringify(data) }),
  },
  todos: {
    list: () => apiClient<Todo[]>("/todos"),
    toggle: (id: number) =>
      apiClient<Todo>(`/todos/${id}/toggle`, { method: "PATCH" }),
  },
  requests: {
    list: () => apiClient<Request[]>("/requests"),
    approve: (id: number) =>
      apiClient<void>(`/requests/${id}`, { method: "DELETE" }),
    reject: (id: number) =>
      apiClient<void>(`/requests/${id}`, { method: "DELETE" }),
    batchApprove: (ids: number[]) =>
      apiClient<void>("/requests/batch", {
        method: "POST",
        body: JSON.stringify({ ids, action: "approve" }),
      }),
  },
  projects: {
    list: () => apiClient<Project[]>("/projects"),
    updateStatus: (id: string, status: Project["status"]) =>
      apiClient<Project>(`/projects/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
  },
  social: {
    list: () => apiClient<SocialPost[]>("/social"),
    create: (content: string) =>
      apiClient<SocialPost>("/social", {
        method: "POST",
        body: JSON.stringify({ content }),
      }),
  },
  assets: {
    list: () => apiClient<MyAsset[]>("/assets"),
    return: (id: string) =>
      apiClient<MyAsset>(`/assets/${id}/return`, { method: "POST" }),
    apply: (item: string, reason: string) =>
      apiClient<void>("/assets/apply", {
        method: "POST",
        body: JSON.stringify({ item, reason }),
      }),
  },
  knowledge: {
    list: () => apiClient<KnowledgeArticle[]>("/knowledge"),
    toggleStar: (id: string) =>
      apiClient<KnowledgeArticle>(`/knowledge/${id}/star`, { method: "PATCH" }),
  },
  members: {
    list: () => apiClient<Member[]>("/members"),
  },
  notifications: {
    list: () => apiClient<Notification[]>("/notifications"),
    markRead: (id: number) =>
      apiClient<void>(`/notifications/${id}/read`, { method: "PATCH" }),
    markAllRead: () =>
      apiClient<void>("/notifications/read-all", { method: "POST" }),
  },
  search: {
    query: (q: string) =>
      apiClient<
        { id: string; type: string; title: string; subtitle?: string; tab: string; query?: string }[]
      >(`/search?q=${encodeURIComponent(q)}`),
  },
};
