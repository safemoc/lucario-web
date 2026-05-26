import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import type { ProjectStatus } from "../types";

export const queryKeys = {
  user: ["user"] as const,
  todos: ["todos"] as const,
  requests: ["requests"] as const,
  projects: ["projects"] as const,
  social: ["social"] as const,
  assets: ["assets"] as const,
  knowledge: ["knowledge"] as const,
  members: ["members"] as const,
  notifications: ["notifications"] as const,
};

export function useUser() {
  return useQuery({ queryKey: queryKeys.user, queryFn: api.user.get });
}

export function useTodos() {
  return useQuery({ queryKey: queryKeys.todos, queryFn: api.todos.list });
}

export function useToggleTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.todos.toggle,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.todos });
      qc.invalidateQueries({ queryKey: queryKeys.user });
    },
  });
}

export function useRequests() {
  return useQuery({ queryKey: queryKeys.requests, queryFn: api.requests.list });
}

export function useHandleRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.requests.approve(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.requests });
      qc.invalidateQueries({ queryKey: queryKeys.user });
      qc.invalidateQueries({ queryKey: queryKeys.notifications });
    },
  });
}

export function useBatchApproveRequests() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids: number[]) => api.requests.batchApprove(ids),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.requests });
      qc.invalidateQueries({ queryKey: queryKeys.user });
    },
  });
}

export function useProjects() {
  return useQuery({ queryKey: queryKeys.projects, queryFn: api.projects.list });
}

export function useUpdateProjectStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ProjectStatus }) =>
      api.projects.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.projects }),
  });
}

export function useSocial() {
  return useQuery({ queryKey: queryKeys.social, queryFn: api.social.list });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.social.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.social }),
  });
}

export function useAssets() {
  return useQuery({ queryKey: queryKeys.assets, queryFn: api.assets.list });
}

export function useReturnAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.assets.return,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.assets });
      qc.invalidateQueries({ queryKey: queryKeys.user });
    },
  });
}

export function useApplyAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ item, reason }: { item: string; reason: string }) =>
      api.assets.apply(item, reason),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.assets }),
  });
}

export function useKnowledge() {
  return useQuery({
    queryKey: queryKeys.knowledge,
    queryFn: api.knowledge.list,
  });
}

export function useToggleStar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.knowledge.toggleStar,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.knowledge }),
  });
}

export function useMembers() {
  return useQuery({ queryKey: queryKeys.members, queryFn: api.members.list });
}

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: api.notifications.list,
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.notifications.markRead,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.notifications }),
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.notifications.markAllRead,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.notifications }),
  });
}

export function useSearch(q: string, enabled: boolean) {
  return useQuery({
    queryKey: ["search", q],
    queryFn: () => api.search.query(q),
    enabled: enabled && q.trim().length > 0,
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.user.update,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.user }),
  });
}
