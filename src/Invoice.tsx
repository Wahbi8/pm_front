import React, { useState, type JSX } from 'react';
import {
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
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
  CreditCard as CreditCardIcon,
  AccountBalance as AccountBalanceIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useEffect } from 'react';
import { fetchInvoices, type Invoice } from './apis/InvoiceApis';
// Define the shape of an Invoice object
// interface Invoice {
//   id: string;
//   client: string;
//   amount: number;
//   date: string;
//   dueDate: string;
//   status: 'paid' | 'pending' | 'overdue' | 'draft';
// }

const getStatusLabel = (status: number) => {
  switch (status) {
    case 0: return 'DRAFT';
    case 1: return 'SENT';
    case 2: return 'PAID';
    case 3: return 'OVERDUE';
    case 4: return 'CANCELLED';
    default: return 'UNKNOWN';
  }
};
export default function InvoiceManagement() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  // We explicitly state that selectedInvoice can be an Invoice object or null
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [openAddInvoice, setOpenAddInvoice] = useState<boolean>(false);
  const [openAddPayment, setOpenAddPayment] = useState<boolean>(false);
  const [openAddPaymentMethod, setOpenAddPaymentMethod] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]); 



  const [formData, setFormData] = useState({
    clientName: '',
    invoiceNumber: '',
    amount: '',
    issueDate: '',
    dueDate: '',
    status: 0, // Assuming 0 is Draft based on your getStatusLabel
    description: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        setLoading(true);
        const data = await fetchInvoices();
        setInvoices(data || []); 
      } catch (error) {
        console.error("Failed to fetch invoices", error);
      } finally {
        setLoading(false);
      }
    };
    loadInvoices();
  }, []);

   const getStatusColor = (status: number): string => {
    switch (status) {
      case 2: return '#10b981'; // Paid
      case 1: return '#f59e0b'; // Sent/Pending
      case 3: return '#ef4444'; // Overdue
      default: return '#6b7280'; // Draft/Cancelled
    }
  };

  const getStatusIcon = (status: number): JSX.Element => {
    switch (status) {
      case 2: return <CheckIcon sx={{ fontSize: 18 }} />;
      case 1: return <ScheduleIcon sx={{ fontSize: 18 }} />;
      case 3: return <CancelIcon sx={{ fontSize: 18 }} />;
      default: return <MoreIcon sx={{ fontSize: 18 }} />;
    }
  };

  const sendToApi = async () => {
    // Basic Validation
    if (!formData.clientName || !formData.amount) {
      alert("Please fill in Client Name and Amount");
      return;
    }

    setLoading(true);

    // Prepare payload matching your Invoice type structure (inferred)
    const payload = {
      // Id: formData.invoiceNumber || `INV-${Math.floor(Math.random() * 1000)}`, // Generate ID if empty
      // client: formData.clientName,
      TotalAmount: parseFloat(formData.amount),
      IssueDate: formData.issueDate || new Date().toISOString(),
      DueDate: formData.dueDate || new Date().toISOString(),
      Status: Number(formData.status)
      // ,description: formData.description
    };

    try {
      // REPLACE with your actual API URL
      const response = await fetch('https://localhost:7269/AddInvoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Check if request was successful
      if (response.ok) {
        const result = await response.json();
        console.log('Sent successfully:', result);
        
        // Update the local list so the user sees the new invoice immediately
        // (Assuming result returns the created invoice, otherwise use 'payload')
        const newInvoice = result.data || payload; 
        setInvoices(prev => [newInvoice as Invoice, ...prev]);
        
        // Close Dialog and Reset Form
        setOpenAddInvoice(false);
        setFormData({
          clientName: '',
          invoiceNumber: '',
          amount: '',
          issueDate: '',
          dueDate: '',
          status: 0,
          description: ''
        });
      } else {
        console.error('Server returned error');
      }
    } catch (error) {
      console.error('Failed to send:', error);
      // For testing without a real API, uncomment the line below to simulate success:
      // setInvoices(prev => [payload as any, ...prev]); setOpenAddInvoice(false);
    } finally {
      setLoading(false);
    }
  };

  // Sample invoice data typed as an array of Invoice objects
  // const invoices: Invoice[] = [
  //   {
  //     id: 'INV-001',
  //     client: 'Acme Corporation',
  //     amount: 2500.00,
  //     date: '2026-01-15',
  //     dueDate: '2026-02-15',
  //     status: 'paid',
  //   },
  //   {
  //     id: 'INV-002',
  //     client: 'TechStart Inc',
  //     amount: 1800.00,
  //     date: '2026-01-20',
  //     dueDate: '2026-02-20',
  //     status: 'pending',
  //   },
  //   {
  //     id: 'INV-003',
  //     client: 'Global Services Ltd',
  //     amount: 3200.00,
  //     date: '2026-01-25',
  //     dueDate: '2026-02-25',
  //     status: 'overdue',
  //   },
  //   {
  //     id: 'INV-004',
  //     client: 'Creative Agency',
  //     amount: 1500.00,
  //     date: '2026-01-28',
  //     dueDate: '2026-02-28',
  //     status: 'draft',
  //   },
  // ];

  // const getStatusColor = (status: Invoice['status']): string => {
  //   switch (status) {
  //     case 'paid':
  //       return '#10b981';
  //     case 'pending':
  //       return '#f59e0b';
  //     case 'overdue':
  //       return '#ef4444';
  //     case 'draft':
  //       return '#6b7280';
  //     default:
  //       return '#6b7280';
  //   }
  // };

  // const getStatusIcon = (status: Invoice['status']): JSX.Element => {
  //   switch (status) {
  //     case 'paid':
  //       return <CheckIcon sx={{ fontSize: 18 }} />;
  //     case 'pending':
  //       return <ScheduleIcon sx={{ fontSize: 18 }} />;
  //     case 'overdue':
  //       return <CancelIcon sx={{ fontSize: 18 }} />;
  //     default:
  //       return <ScheduleIcon sx={{ fontSize: 18 }} />;
  //   }
  // };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleInvoiceClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <Box
      sx={{
        width: '100vw',
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
              onClick={() => setOpenAddInvoice(true)}
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
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              sx={{
                background: 'rgba(15, 20, 35, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <CardContent sx={{ 
                p: 3, 
                maxWidth: '92%',
                mx: 'auto',  }}>
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
                      key={invoice.Id}
                      onClick={() => handleInvoiceClick(invoice)}
                      sx={{
                        p: 2.5,
                        mb: 2,
                        background:
                          selectedInvoice?.Id === invoice.Id
                            ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)'
                            : 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        border:
                          selectedInvoice?.Id === invoice.Id
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
                            {invoice.Id}
                          </Typography>
                          <Typography sx={{ color: '#9ca3af', fontSize: '0.95rem' }}>
                            {invoice.client}
                          </Typography>
                        </Box>
                        <Chip
                          icon={getStatusIcon(invoice.Status)}
                          label={getStatusLabel(invoice.Status)}
                          size="small"
                          sx={{
                            background: `${getStatusColor(invoice.Status)}20`,
                            color: getStatusColor(invoice.Status),
                            border: `1px solid ${getStatusColor(invoice.Status)}40`,
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
                          ${invoice.AmountPaid.toFixed(2)}
                        </Typography>
                        <Typography sx={{ color: '#6b7280', fontSize: '0.9rem' }}>
                          Due: {new Date(invoice.DueDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Selected Invoice Details */}
          <Grid size={{ xs: 12, md: 5 }}>
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
                        {selectedInvoice.Id}
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
                        ${selectedInvoice.AmountPaid.toFixed(2)}
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid size={{ xs:6 }}>
                          <Typography sx={{ color: '#6b7280', fontSize: '0.85rem', mb: 0.5 }}>
                            Issue Date
                          </Typography>
                          <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                            {new Date(selectedInvoice.IssueDate).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs:6 }}>
                          <Typography sx={{ color: '#6b7280', fontSize: '0.85rem', mb: 0.5 }}>
                            Due Date
                          </Typography>
                          <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                            {new Date(selectedInvoice.DueDate).toLocaleDateString()}
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
                        onClick={() => setOpenAddPayment(true)}
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
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper
                    onClick={() => setOpenAddPaymentMethod(true)}
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
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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

      {/* Add Invoice Dialog */}
      <Dialog
        open={openAddInvoice}
        onClose={() => setOpenAddInvoice(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(15, 20, 35, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.8rem',
            pb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Create New Invoice
          <IconButton
            onClick={() => setOpenAddInvoice(false)}
            sx={{
              color: '#9ca3af',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                name="clientName"
                value={formData.clientName}
                onChange={handleFormChange}
                label="Client Name"
                placeholder="Enter client name"
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid  size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleFormChange}
                label="Invoice Number"
                placeholder="INV-001"
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid  size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="amount"
                value={formData.amount}
                onChange={handleFormChange}
                label="Amount"
                type="number"
                placeholder="0.00"
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" sx={{ color: '#9ca3af' }}>$</InputAdornment>,
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid  size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="issueDate"
                value={formData.issueDate}
                onChange={handleFormChange}
                label="Issue Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid  size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="dueDate"
                value={formData.dueDate}
                onChange={handleFormChange}
                label="Due Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs:12 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#9ca3af' }}>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  label="Status"
                  sx={{
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '& .MuiSelect-icon': {
                      color: '#9ca3af',
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: 'rgba(15, 20, 35, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        '& .MuiMenuItem-root': {
                          color: '#fff',
                          '&:hover': {
                            background: 'rgba(59, 130, 246, 0.2)',
                          },
                          '&.Mui-selected': {
                            background: 'rgba(59, 130, 246, 0.3)',
                            '&:hover': {
                              background: 'rgba(59, 130, 246, 0.4)',
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value={0}>Draft</MenuItem>
                  <MenuItem value={1}>Sent</MenuItem>
                  <MenuItem value={2}>Paid</MenuItem>
                  <MenuItem value={3}>Overdue</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                label="Description"
                placeholder="Invoice description or notes"
                multiline
                rows={3}
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={() => setOpenAddInvoice(false)}
            sx={{
              color: '#9ca3af',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={sendToApi}
            sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: '#fff',
              px: 4,
              py: 1.2,
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              },
            }}
          >
            Create Invoice
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog
        open={openAddPayment}
        onClose={() => setOpenAddPayment(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(15, 20, 35, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.8rem',
            pb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Process Payment
          <IconButton
            onClick={() => setOpenAddPayment(false)}
            sx={{
              color: '#9ca3af',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <DialogContent sx={{ pt: 3 }}>
          {selectedInvoice && (
            <Box sx={{ mb: 3, p: 2, background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem', mb: 0.5 }}>
                Invoice
              </Typography>
              <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', mb: 1 }}>
                {selectedInvoice.Id}
              </Typography>
              <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem', mb: 0.5 }}>
                Amount Due
              </Typography>
              <Typography
                sx={{
                  color: '#3b82f6',
                  fontWeight: 700,
                  fontSize: '1.8rem',
                }}
              >
                ${selectedInvoice.AmountPaid.toFixed(2)}
              </Typography>
            </Box>
          )}
          <Grid container spacing={3}>
            <Grid size={{ xs:12 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#9ca3af' }}>Payment Method</InputLabel>
                <Select
                  defaultValue="card"
                  label="Payment Method"
                  sx={{
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '& .MuiSelect-icon': {
                      color: '#9ca3af',
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: 'rgba(15, 20, 35, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        '& .MuiMenuItem-root': {
                          color: '#fff',
                          '&:hover': {
                            background: 'rgba(59, 130, 246, 0.2)',
                          },
                          '&.Mui-selected': {
                            background: 'rgba(59, 130, 246, 0.3)',
                            '&:hover': {
                              background: 'rgba(59, 130, 246, 0.4)',
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="card">Credit/Debit Card</MenuItem>
                  <MenuItem value="bank">Bank Transfer</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                  <MenuItem value="crypto">Cryptocurrency</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                label="Payment Amount"
                type="number"
                defaultValue={selectedInvoice?.AmountPaid || 0}
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start" sx={{ color: '#9ca3af' }}>$</InputAdornment>,
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                label="Payment Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                label="Reference Number"
                placeholder="Enter reference or transaction ID"
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                label="Notes"
                placeholder="Payment notes (optional)"
                multiline
                rows={2}
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={() => setOpenAddPayment(false)}
            sx={{
              color: '#9ca3af',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              px: 4,
              py: 1.2,
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              },
            }}
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Payment Method Dialog */}
      <Dialog
        open={openAddPaymentMethod}
        onClose={() => setOpenAddPaymentMethod(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(15, 20, 35, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.8rem',
            pb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Add Payment Method
          <IconButton
            onClick={() => setOpenAddPaymentMethod(false)}
            sx={{
              color: '#9ca3af',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs:12 }}>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ color: '#9ca3af', mb: 2, fontSize: '0.95rem' }}>
                  Select Payment Type
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs:6 }}>
                    <Paper
                      sx={{
                        p: 2.5,
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '2px solid #3b82f6',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(59, 130, 246, 0.2)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <CreditCardIcon sx={{ color: '#3b82f6', fontSize: 36 }} />
                      <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                        Credit Card
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs:6 }}>
                    <Paper
                      sx={{
                        p: 2.5,
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '2px solid rgba(59, 130, 246, 0.5)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <AccountBalanceIcon sx={{ color: '#9ca3af', fontSize: 36 }} />
                      <Typography sx={{ color: '#9ca3af', fontWeight: 600 }}>
                        Bank Account
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                label="Card Holder Name"
                placeholder="John Doe"
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon sx={{ color: '#9ca3af' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs:6 }}>
              <TextField
                fullWidth
                label="Expiry Date"
                placeholder="MM/YY"
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs:6 }}>
              <TextField
                fullWidth
                label="CVV"
                placeholder="123"
                type="password"
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                label="Billing Address"
                placeholder="Enter billing address"
                multiline
                rows={2}
                InputLabelProps={{
                  sx: { color: '#9ca3af' },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs:12 }}>
              <Box
                sx={{
                  p: 2,
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#f59e0b',
                    mt: 0.7,
                    flexShrink: 0,
                  }}
                />
                <Typography sx={{ color: '#fbbf24', fontSize: '0.85rem' }}>
                  Your payment information is encrypted and stored securely. We never share your details with third parties.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={() => setOpenAddPaymentMethod(false)}
            sx={{
              color: '#9ca3af',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: '#fff',
              px: 4,
              py: 1.2,
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              },
            }}
          >
            Save Payment Method
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Google Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        `}
      </style>
    </Box>
  );
}