import {
  initialRequests as requestsSeed,
  initialTodos,
  knowledgeArticles,
  members,
  myAssets,
  notifications,
  projects,
  socialPosts,
  user,
} from "../data/mock";

/** In-memory DB for MSW handlers */
export const db = {
  user: { ...user },
  todos: [...initialTodos],
  requests: [...requestsSeed],
  projects: [...projects],
  social: [...socialPosts],
  assets: [...myAssets],
  knowledge: knowledgeArticles.map((a) => ({ ...a })),
  members: [...members],
  notifications: notifications.map((n) => ({ ...n })),
};
