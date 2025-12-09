import {
  ChartBarIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useDashboard } from '@/queries/useDashboard';
import { Loading } from '@/components';
import { formatCurrency } from '@/shared/formatters';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const {
    useGetDashboardStats,
    useGetRevenueAnalytics,
    useGetUserGrowth,
    useGetListingsStats,
    useGetSubscriptionsStats,
  } = useDashboard();

  const { data: stats, isLoading: isLoadingStats } = useGetDashboardStats();
  const { data: revenueData } = useGetRevenueAnalytics();
  const { data: userGrowthData } = useGetUserGrowth();
  const { data: listingsStats } = useGetListingsStats();
  const { data: subscriptionsStats } = useGetSubscriptionsStats();

  if (isLoadingStats) {
    return <Loading />;
  }

  const revenueChartData = revenueData?.data
    ? Object.entries(revenueData.data).map(([key, value]) => ({
        name: key,
        value,
      }))
    : [];

  const userGrowthChartData = userGrowthData?.data
    ? Object.entries(userGrowthData.data).map(([key, value]) => ({
        name: key,
        value,
      }))
    : [];

  const listingsChartData = listingsStats?.data?.new_listings
    ? Object.entries(listingsStats.data.new_listings).map(([key, value]) => ({
        name: key,
        value,
      }))
    : [];

  const subscriptionChartData = subscriptionsStats?.data?.by_plan
    ? Object.entries(subscriptionsStats.data.by_plan).map(([key, value]) => ({
        name: key,
        value,
      }))
    : [];

  const metrics = [
    {
      label: 'Total Users',
      value: stats?.data.total_users || 0,
      subtext: `+${stats?.data.new_users_today || 0} today`,
      icon: <UsersIcon className="h-6 w-6 text-blue-500" />,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Listings',
      value: stats?.data.total_listings || 0,
      subtext: `Active: ${stats?.data.active_listings || 0}`,
      icon: <ClipboardDocumentListIcon className="h-6 w-6 text-emerald-500" />,
      color: 'bg-emerald-500',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(Number(stats?.data.total_revenue || 0)),
      subtext: `Today: ${formatCurrency(Number(stats?.data.revenue_today || 0))}`,
      icon: <CurrencyDollarIcon className="h-6 w-6 text-amber-500" />,
      color: 'bg-amber-500',
    },
    {
      label: 'Active Subscriptions',
      value: stats?.data.active_subscriptions || 0,
      subtext: `+${stats?.data.new_subscriptions_today || 0} today`,
      icon: <TicketIcon className="h-6 w-6 text-purple-500" />,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-(--color-background)">
      <div className="mb-12 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-(--color-text) flex items-center gap-4 mb-3">
          <ChartBarIcon className="h-12 w-12 text-(--color-primary)" />
          Dashboard
        </h1>
        <p className="text-lg text-(--color-body)">
          Welcome back! Here's your platform overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-16">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="group bg-(--color-surface) border border-(--color-border)/60 rounded-2xl p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-(--color-primary)/40 hover:-translate-y-2"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-(--color-body) text-sm font-medium">
                {metric.label}
              </p>
              <div className="p-2 rounded-lg bg-(--color-surface) border border-(--color-border)">
                {metric.icon}
              </div>
            </div>
            <p className="text-4xl font-bold text-(--color-text) mb-3 text-ellipsis overflow-hidden whitespace-nowrap">
              {metric.value}
            </p>
            <p className="text-sm text-(--color-inactive)">{metric.subtext}</p>
            <div
              className={`mt-4 h-1 w-0 group-hover:w-full ${metric.color} rounded-full transition-all duration-500`}
            />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Revenue Chart */}
        <div className="bg-(--color-surface) border border-(--color-border) rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-(--color-text) mb-6">
            Revenue Analytics
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-inactive)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-inactive)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    formatCurrency(value, { showDecimal: false })
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: 'var(--color-surface)', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-(--color-surface) border border-(--color-border) rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-(--color-text) mb-6">
            User Growth
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-inactive)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-inactive)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'var(--color-background)' }}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '8px',
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="var(--color-secondary)"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Listings Distribution */}
        <div className="bg-(--color-surface) border border-(--color-border) rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-(--color-text) mb-6">
            Listings Distribution
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={listingsChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {listingsChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '8px',
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscriptions by Plan */}
        <div className="bg-(--color-surface) border border-(--color-border) rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-(--color-text) mb-6">
            Subscriptions by Plan
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subscriptionChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#82ca9d"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subscriptionChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '8px',
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
