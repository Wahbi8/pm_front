import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
  Link,
  Paper,
  Grid,
  Avatar,
  Fade,
  Slide,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rememberMe: event.target.checked,
    });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  const features = [
    {
      icon: <ReceiptIcon sx={{ fontSize: 40 }} />,
      title: 'Smart Invoicing',
      description: 'Create and manage invoices effortlessly',
      color: '#3b82f6',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Real-time Analytics',
      description: 'Track your business performance',
      color: '#8b5cf6',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Bank-level Security',
      description: 'Your data is always protected',
      color: '#10b981',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Lightning Fast',
      description: 'Optimized for speed and efficiency',
      color: '#f59e0b',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Outfit", "Segoe UI", system-ui, sans-serif',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          top: '-200px',
          right: '-200px',
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(-50px, 50px) scale(1.1)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
          animation: 'float 15s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <Grid container spacing={0} sx={{ minHeight: '100vh', alignItems: 'center' }}>
          {/* Left Side - Features */}
          <Grid size={{ xs:12, md:6}} sx={{ display: { xs: 'none', md: 'block' }, pr: 4 }}>
            <Fade in timeout={1000}>
              <Box>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
                    }}
                  >
                    <ReceiptIcon sx={{ color: '#fff', fontSize: 36 }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '2rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    InvoicePro
                  </Typography>
                </Box>

                {/* Heading */}
                <Typography
                  variant="h2"
                  sx={{
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '3.5rem',
                    lineHeight: 1.2,
                    mb: 3,
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Manage Your
                  <br />
                  Invoices Like
                  <br />A Pro
                </Typography>

                <Typography
                  sx={{
                    color: '#9ca3af',
                    fontSize: '1.2rem',
                    mb: 6,
                    lineHeight: 1.7,
                  }}
                >
                  Streamline your billing process with our powerful invoice management platform.
                  Get paid faster and grow your business.
                </Typography>

                {/* Features Grid */}
                <Grid container spacing={3}>
                  {features.map((feature, index) => (
                    <Grid size={{ xs:12, sm:6 }} key={index}>
                      <Slide
                        direction="right"
                        in
                        timeout={1000 + index * 200}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <Paper
                          sx={{
                            p: 3,
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.08)',
                              transform: 'translateY(-4px)',
                              borderColor: feature.color,
                              boxShadow: `0 12px 24px ${feature.color}40`,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: '12px',
                              background: `${feature.color}20`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 2,
                            }}
                          >
                            {React.cloneElement(feature.icon as React.ReactElement, {
                              sx: { color: feature.color, fontSize: 32 },
                            }as any)}
                          </Box>
                          <Typography
                            sx={{
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              mb: 1,
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography sx={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                            {feature.description}
                          </Typography>
                        </Paper>
                      </Slide>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Auth Form */}
          <Grid size={{ xs:12, md:6 }}>
            <Fade in timeout={1200}>
              <Paper
                sx={{
                  p: 5,
                  background: 'rgba(15, 20, 35, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                  maxWidth: 480,
                  margin: '0 auto',
                }}
              >
                {/* Mobile Logo */}
                <Box
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 4,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
                    }}
                  >
                    <ReceiptIcon sx={{ color: '#fff', fontSize: 28 }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '1.6rem',
                    }}
                  >
                    InvoicePro
                  </Typography>
                </Box>

                {/* Form Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '2rem',
                      mb: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </Typography>
                  <Typography sx={{ color: '#9ca3af', fontSize: '1rem' }}>
                    {isLogin
                      ? 'Enter your credentials to access your account'
                      : 'Sign up to get started with InvoicePro'}
                  </Typography>
                </Box>

                {/* Social Login Buttons */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs:4 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        py: 1.5,
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        borderRadius: '12px',
                        '&:hover': {
                          borderColor: '#fff',
                          background: 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    >
                      <GoogleIcon />
                    </Button>
                  </Grid>
                  <Grid size={{ xs:4 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        py: 1.5,
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        borderRadius: '12px',
                        '&:hover': {
                          borderColor: '#fff',
                          background: 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    >
                      <FacebookIcon />
                    </Button>
                  </Grid>
                  <Grid size={{ xs:4 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        py: 1.5,
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        borderRadius: '12px',
                        '&:hover': {
                          borderColor: '#fff',
                          background: 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    >
                      <AppleIcon />
                    </Button>
                  </Grid>
                </Grid>

                {/* Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Typography sx={{ px: 2, color: '#6b7280', fontSize: '0.875rem' }}>
                    OR
                  </Typography>
                  <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                </Box>

                {/* Auth Form */}
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {!isLogin && (
                      <TextField
                        fullWidth
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange('fullName')}
                        InputLabelProps={{
                          sx: { color: '#9ca3af' },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: '#6b7280' }} />
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
                    )}

                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      InputLabelProps={{
                        sx: { color: '#9ca3af' },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: '#6b7280' }} />
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

                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      InputLabelProps={{
                        sx: { color: '#9ca3af' },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: '#6b7280' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: '#6b7280' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
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

                    {!isLogin && (
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        InputLabelProps={{
                          sx: { color: '#9ca3af' },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon sx={{ color: '#6b7280' }} />
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
                    )}

                    {isLogin && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.rememberMe}
                              onChange={handleCheckboxChange}
                              sx={{
                                color: '#6b7280',
                                '&.Mui-checked': {
                                  color: '#3b82f6',
                                },
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                              Remember me
                            </Typography>
                          }
                        />
                        <Link
                          href="#"
                          sx={{
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          Forgot password?
                        </Link>
                      </Box>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 1,
                        py: 1.8,
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        color: '#fff',
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                          boxShadow: '0 12px 32px rgba(59, 130, 246, 0.5)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </Button>
                  </Box>
                </form>

                {/* Toggle Auth Mode */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography sx={{ color: '#9ca3af', fontSize: '0.95rem' }}>
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <Link
                      component="button"
                      type="button"
                      onClick={toggleAuthMode}
                      sx={{
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontWeight: 700,
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </Link>
                  </Typography>
                </Box>

                {/* Terms & Privacy */}
                {!isLogin && (
                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: '#6b7280',
                      fontSize: '0.8rem',
                      mt: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    By signing up, you agree to our{' '}
                    <Link href="#" sx={{ color: '#3b82f6', textDecoration: 'none' }}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" sx={{ color: '#3b82f6', textDecoration: 'none' }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                )}
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Add Google Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        `}
      </style>
    </Box>
  );
};

export default AuthPage;
