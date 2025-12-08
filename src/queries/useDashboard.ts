import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services';

export const useDashboard = () => {
  // Queries
  const useGetDashboardStats = () => {
    return useQuery({
      queryKey: ['dashboard', 'stats'],
      queryFn: () => dashboardService.getStats(),
    });
  };

  const useGetRevenueAnalytics = () => {
    return useQuery({
      queryKey: ['dashboard', 'revenue'],
      queryFn: () => dashboardService.getRevenueAnalytics(),
    });
  };

  const useGetUserGrowth = () => {
    return useQuery({
      queryKey: ['dashboard', 'users-growth'],
      queryFn: () => dashboardService.getUsersGrowth(),
    });
  };

  const useGetListingsStats = () => {
    return useQuery({
      queryKey: ['dashboard', 'listings-stats'],
      queryFn: () => dashboardService.getListingsStats(),
    });
  };

  const useGetSubscriptionsStats = () => {
    return useQuery({
      queryKey: ['dashboard', 'subscriptions-stats'],
      queryFn: () => dashboardService.getSubscriptionsStats(),
    });
  };

  return {
    useGetDashboardStats,
    useGetRevenueAnalytics,
    useGetUserGrowth,
    useGetListingsStats,
    useGetSubscriptionsStats,
  };
};
