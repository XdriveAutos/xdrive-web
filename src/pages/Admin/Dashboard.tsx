import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#fff',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <DashboardIcon sx={{ fontSize: '2rem', color: '#3b82f6' }} />
          Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
          Welcome back! Here's your platform overview.
        </Typography>
      </Box>

      {/* Dashboard Content Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr 1fr',
          },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Placeholder Cards */}
        {[1, 2, 3, 4].map((item) => (
          <Card
            key={item}
            sx={{
              backgroundColor: '#1a1a1a',
              backgroundImage:
                'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.75rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.15)',
                borderColor: 'rgba(59, 130, 246, 0.3)',
              },
            }}
          >
            <CardContent>
              <Typography
                color="textSecondary"
                gutterBottom
                sx={{ color: '#9ca3af' }}
              >
                Metric {item}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#fff',
                  mb: 1,
                }}
              >
                0
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                No data available
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Empty State Section */}
      <Box
        sx={{
          mt: 6,
          p: 4,
          backgroundColor: '#1a1a1a',
          backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          border: '1px dashed rgba(59, 130, 246, 0.3)',
          borderRadius: '0.75rem',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#9ca3af',
            mb: 1,
          }}
        >
          Dashboard ready for content
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          More statistics, charts, and insights will be added here.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
