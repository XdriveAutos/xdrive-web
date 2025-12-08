import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { commentService } from '@/services';

export const useComments = () => {
  const queryClient = useQueryClient();

  // Queries
  const useGetComments = (page = 1, perPage = 20) => {
    return useQuery({
      queryKey: ['comments', page, perPage],
      queryFn: () => commentService.getAll(page, perPage),
    });
  };

  const useGetFlaggedComments = (page = 1, perPage = 20) => {
    return useQuery({
      queryKey: ['comments', 'flagged', page, perPage],
      queryFn: () => commentService.getFlagged(page, perPage),
    });
  };

  // Mutations
  const deleteCommentMutation = useMutation({
    mutationFn: (id: string) => commentService.delete(id),
    onSuccess: () => {
      toast.success('Comment deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete comment');
    },
  });

  const flagCommentMutation = useMutation({
    mutationFn: (id: string) => commentService.flag(id),
    onSuccess: () => {
      toast.success('Comment flagged successfully');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to flag comment');
    },
  });

  const unflagCommentMutation = useMutation({
    mutationFn: (id: string) => commentService.unflag(id),
    onSuccess: () => {
      toast.success('Comment unflagged successfully');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to unflag comment');
    },
  });

  return {
    useGetComments,
    useGetFlaggedComments,

    deleteComment: deleteCommentMutation.mutateAsync,
    deleteCommentStatus: deleteCommentMutation.status,
    deleteCommentError: deleteCommentMutation.error,
    deleteCommentPending: deleteCommentMutation.isPending,

    flagComment: flagCommentMutation.mutateAsync,
    flagCommentStatus: flagCommentMutation.status,
    flagCommentError: flagCommentMutation.error,
    flagCommentPending: flagCommentMutation.isPending,

    unflagComment: unflagCommentMutation.mutateAsync,
    unflagCommentStatus: unflagCommentMutation.status,
    unflagCommentError: unflagCommentMutation.error,
    unflagCommentPending: unflagCommentMutation.isPending,
  };
};
