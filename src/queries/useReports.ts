import { useQuery } from '@tanstack/react-query';
import { reportService } from '@/services';
import type { ReportParams } from '@/interfaces';

export const useReports = () => {
  // Queries
  const useGetUsersReport = (params?: ReportParams) => {
    return useQuery({
      queryKey: ['reports', 'users', params],
      queryFn: () => reportService.getUsers(params),
    });
  };

  const useGetListingsReport = (params?: ReportParams) => {
    return useQuery({
      queryKey: ['reports', 'listings', params],
      queryFn: () => reportService.getListings(params),
    });
  };

  const useGetRevenueReport = (params?: ReportParams) => {
    return useQuery({
      queryKey: ['reports', 'revenue', params],
      queryFn: () => reportService.getRevenue(params),
    });
  };

  const useGetSalesReport = (
    params?: ReportParams & { page?: number; per_page?: number },
  ) => {
    return useQuery({
      queryKey: ['reports', 'sales', params],
      queryFn: () => reportService.getSales(params),
    });
  };

  const useGetSubscriptionsReport = (params?: ReportParams) => {
    return useQuery({
      queryKey: ['reports', 'subscriptions', params],
      queryFn: () => reportService.getSubscriptions(params),
    });
  };

  const useGetPopularBrandsReport = (params?: ReportParams) => {
    return useQuery({
      queryKey: ['reports', 'popular-brands', params],
      queryFn: () => reportService.getPopularBrands(params),
    });
  };

  return {
    useGetUsersReport,
    useGetListingsReport,
    useGetRevenueReport,
    useGetSalesReport,
    useGetSubscriptionsReport,
    useGetPopularBrandsReport,
  };
};
