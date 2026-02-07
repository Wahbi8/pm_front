import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Chip,
  TextField,
  Button,
  Paper,
  Drawer,
  Avatar,
  Divider,
  Badge,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Home as HomeIcon,
  Receipt as ReceiptIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)',
        fontFamily: '"Outfit", "Segoe UI", system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
      >
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              background: 'rgba(15, 20, 35, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '0 24px 24px 0',
              overflow: 'hidden',
            },
          }}
        >
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)',
              }}
            >
              <ReceiptIcon sx={{ color: '#fff', fontSize: 28 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              InvoicePro
            </Typography>
          </Box>
          <List sx={{ px: 2, mt: 2 }}>
            {[
              { icon: <HomeIcon />, text: 'Dashboard', active: false },
              { icon: <ReceiptIcon />, text: 'Invoices', active: true },
              { icon: <AssessmentIcon />, text: 'Analytics', active: false },
              { icon: <SettingsIcon />, text: 'Settings', active: false },
            ].map((item, index) => (
              <ListItem
                key={index}
                disablePadding 
                sx={{
                  borderRadius: '12px',
                  mb: 1,
                  background: item.active
                    ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)'
                    : 'transparent',
                  border: item.active
                    ? '1px solid rgba(59, 130, 246, 0.3)'
                    : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: item.active
                      ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: item.active ? '#3b82f6' : '#9ca3af', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: item.active ? '#fff' : '#9ca3af',
                      fontWeight: item.active ? 600 : 500,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
  
          <Box sx={{ flexGrow: 1 }} />
  
          <Box sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                  width: 44,
                  height: 44,
                }}
              >
                JD
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
                  John Doe
                </Typography>
                <Typography sx={{ color: '#6b7280', fontSize: '0.85rem' }}>
                  john@example.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ ml: '280px', p: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '2.5rem',
                  letterSpacing: '-0.03em',
                  mb: 1,
                  background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Invoice Management
              </Typography>
              <Typography sx={{ color: '#9ca3af', fontSize: '1.1rem' }}>
                Manage and track all your invoices
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon sx={{ color: '#fff' }} />
                </Badge>
              </IconButton>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  color: '#fff',
                  px: 3,
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    boxShadow: '0 12px 32px rgba(59, 130, 246, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                New Invoice
              </Button>
            </Box>
          </Box>
  
          <Grid container spacing={3}>
            {/* Left Column - Invoice List */}
            <Grid item xs={12} md={7}>
              <Card
                sx={{
                  background: 'rgba(15, 20, 35, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Search and Filter */}
                  <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                    <TextField
                      fullWidth
                      placeholder="Search invoices..."
                      InputProps={{
                        startAdornment: <SearchIcon sx={{ color: '#6b7280', mr: 1 }} />,
                        sx: {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px',
                          color: '#fff',
                          '& fieldset': { border: 'none' },
                        },
                      }}
                    />
                    <IconButton
                      sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      <FilterIcon sx={{ color: '#fff' }} />
                    </IconButton>
                  </Box>
  
                  {/* Tabs */}
                  <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    sx={{
                      mb: 3,
                      '& .MuiTab-root': {
                        color: '#9ca3af',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        minHeight: 48,
                        '&.Mui-selected': {
                          color: '#3b82f6',
                        },
                      },
                      '& .MuiTabs-indicator': {
                        background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                        height: 3,
                        borderRadius: '3px 3px 0 0',
                      },
                    }}
                  >
                    <Tab label="All Invoices" />
                    <Tab label="Pending" />
                    <Tab label="Paid" />
                  </Tabs>
  
                  {/* Invoice List */}
                  <Box sx={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {invoices.map((invoice) => (
                      <Paper
                        key={invoice.id}
                        onClick={() => handleInvoiceClick(invoice)}
                        sx={{
                          p: 2.5,
                          mb: 2,
                          background:
                            selectedInvoice?.id === invoice.id
                              ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)'
                              : 'rgba(255, 255, 255, 0.03)',
                          backdropFilter: 'blur(10px)',
                          border:
                            selectedInvoice?.id === invoice.id
                              ? '1px solid rgba(59, 130, 246, 0.3)'
                              : '1px solid rgba(255, 255, 255, 0.05)',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.08)',
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box>
                            <Typography
                              sx={{
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                mb: 0.5,
                              }}
                            >
                              {invoice.id}
                            </Typography>
                            <Typography sx={{ color: '#9ca3af', fontSize: '0.95rem' }}>
                              {invoice.client}
                            </Typography>
                          </Box>
                          <Chip
                            icon={getStatusIcon(invoice.status)}
                            label={invoice.status.toUpperCase()}
                            size="small"
                            sx={{
                              background: `${getStatusColor(invoice.status)}20`,
                              color: getStatusColor(invoice.status),
                              border: `1px solid ${getStatusColor(invoice.status)}40`,
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              height: 28,
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography
                            sx={{
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: '1.5rem',
                            }}
                          >
                            ${invoice.amount.toFixed(2)}
                          </Typography>
                          <Typography sx={{ color: '#6b7280', fontSize: '0.9rem' }}>
                            Due: {new Date(invoice.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
  
            {/* Right Column - Selected Invoice Details */}
            <Grid item xs={12} md={5}>
              <Card
                sx={{
                  background: 'rgba(15, 20, 35, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  position: 'sticky',
                  top: 20,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {selectedInvoice ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1.4rem',
                          }}
                        >
                          Invoice Details
                        </Typography>
                        <IconButton
                          sx={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.1)',
                            },
                          }}
                        >
                          <MoreIcon sx={{ color: '#fff' }} />
                        </IconButton>
                      </Box>
  
                      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />
  
                      <Box sx={{ mb: 3 }}>
                        <Typography sx={{ color: '#6b7280', fontSize: '0.85rem', mb: 0.5 }}>
                          Invoice Number
                        </Typography>
                        <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', mb: 2 }}>
                          {selectedInvoice.id}
                        </Typography>
  
                        <Typography sx={{ color: '#6b7280', fontSize: '0.85rem', mb: 0.5 }}>
                          Client
                        </Typography>
                        <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', mb: 2 }}>
                          {selectedInvoice.client}
                        </Typography>
  
                        <Typography sx={{ color: '#6b7280', fontSize: '0.85rem', mb: 0.5 }}>
                          Amount
                        </Typography>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '2rem',
                            mb: 2,
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          ${selectedInvoice.amount.toFixed(2)}
                        </Typography>
  
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography sx={{ color: '#6b7280', fontSize: '0.85rem', mb: 0.5 }}>
                              Issue Date
                            </Typography>
                            <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                              {new Date(selectedInvoice.date).toLocaleDateString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography sx={{ color: '#6b7280', fontSize: '0.85rem', mb: 0.5 }}>
                              Due Date
                            </Typography>
                            <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                              {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
  
                      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 3 }} />
  
                      <Box>
                        <Typography sx={{ color: '#fff', fontWeight: 600, mb: 2, fontSize: '1.1rem' }}>
                          Payment Methods
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                          <Button
                            variant="outlined"
                            sx={{
                              flex: 1,
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                              color: '#fff',
                              borderRadius: '12px',
                              py: 1.5,
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: '#3b82f6',
                                background: 'rgba(59, 130, 246, 0.1)',
                              },
                            }}
                          >
                            Bank Transfer
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{
                              flex: 1,
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                              color: '#fff',
                              borderRadius: '12px',
                              py: 1.5,
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: '#3b82f6',
                                background: 'rgba(59, 130, 246, 0.1)',
                              },
                            }}
                          >
                            Card
                          </Button>
                        </Box>
  
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            color: '#fff',
                            py: 1.8,
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                              boxShadow: '0 12px 32px rgba(59, 130, 246, 0.5)',
                            },
                          }}
                        >
                          Process Payment
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 400,
                      }}
                    >
                      <ReceiptIcon sx={{ fontSize: 64, color: '#374151', mb: 2 }} />
                      <Typography sx={{ color: '#6b7280', fontSize: '1.1rem' }}>
                        Select an invoice to view details
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
  
          {/* Bottom Section - Additional Pages Placeholder */}
          <Box sx={{ mt: 4 }}>
            <Card
              sx={{
                background: 'rgba(15, 20, 35, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    mb: 3,
                  }}
                >
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 3,
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(59, 130, 246, 0.2)',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Typography sx={{ color: '#3b82f6', fontWeight: 600, mb: 1 }}>
                        Same Analytics
                      </Typography>
                      <Typography sx={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                        View detailed reports
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 3,
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(139, 92, 246, 0.2)',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Typography sx={{ color: '#8b5cf6', fontWeight: 600, mb: 1 }}>
                        Admin Page
                      </Typography>
                      <Typography sx={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                        Manage settings
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 3,
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(16, 185, 129, 0.2)',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Typography sx={{ color: '#10b981', fontWeight: 600, mb: 1 }}>
                        Payment Method
                      </Typography>
                      <Typography sx={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                        Configure payment options
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 3,
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(245, 158, 11, 0.2)',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Typography sx={{ color: '#f59e0b', fontWeight: 600, mb: 1 }}>
                        Username Page
                      </Typography>
                      <Typography sx={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                        Manage your profile
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Box>
  
        {/* Add Google Font */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          `}
        </style>
    </Box>
  )
}

export default App
