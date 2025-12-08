import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { reviewService } from '@/services';

export const useReviews = () => {
  const queryClient = useQueryClient();

  // Queries
  const useGetReviews = (page = 1, perPage = 20) => {
    return useQuery({
      queryKey: ['reviews', page, perPage],
      queryFn: () => reviewService.getAll(page, perPage),
    });
  };

  const useGetFlaggedReviews = (page = 1, perPage = 20) => {
    return useQuery({
      queryKey: ['reviews', 'flagged', page, perPage],
      queryFn: () => reviewService.getFlagged(page, perPage),
    });
  };

  // Mutations
  const deleteReviewMutation = useMutation({
    mutationFn: (id: string) => reviewService.delete(id),
    onSuccess: () => {
      toast.success('Review deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete review');
    },
  });

  const flagReviewMutation = useMutation({
    mutationFn: (id: string) => reviewService.flag(id),
    onSuccess: () => {
      toast.success('Review flagged successfully');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to flag review');
    },
  });

  const unflagReviewMutation = useMutation({
    mutationFn: (id: string) => reviewService.unflag(id),
    onSuccess: () => {
      toast.success('Review unflagged successfully');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to unflag review');
    },
  });

  return {
    useGetReviews,
    useGetFlaggedReviews,

    deleteReview: deleteReviewMutation.mutateAsync,
    deleteReviewStatus: deleteReviewMutation.status,
    deleteReviewError: deleteReviewMutation.error,
    deleteReviewPending: deleteReviewMutation.isPending,

    flagReview: flagReviewMutation.mutateAsync,
    flagReviewStatus: flagReviewMutation.status,
    flagReviewError: flagReviewMutation.error,
    flagReviewPending: flagReviewMutation.isPending,

    unflagReview: unflagReviewMutation.mutateAsync,
    unflagReviewStatus: unflagReviewMutation.status,
    unflagReviewError: unflagReviewMutation.error,
    unflagReviewPending: unflagReviewMutation.isPending,
  };
};
