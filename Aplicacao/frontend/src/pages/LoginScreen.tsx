import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Avatar,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Link,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !senha) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      await login(email, senha);
      navigate('/pdv'); // Redirecionar para a página inicial após o login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      setError('Por favor, informe seu email');
      return;
    }
    
    // Simulação de envio de email de recuperação
    // Aqui você conectaria com o backend para solicitar a recuperação
    setTimeout(() => {
      setResetSent(true);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)',
        padding: 2
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 2, 
          justifyContent: 'center' 
        }}>
          {/* Coluna do Logo - Visível apenas em telas maiores */}
          {!isMobile && (
            <Box sx={{ 
              flex: '1 1 50%', 
              maxWidth: '50%' 
            }}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  padding: 4
                }}
              >
                {/* Logo da empresa - Substitua pelo caminho real do seu logo */}
                <Box
                  component="img"
                  src="/img/lojapam.png"
                  alt="Loja da Pam"
                  sx={{
                    width: '80%',
                    maxWidth: 250,
                    marginBottom: 4,
                    // Fallback caso a imagem não carregue
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    '&::before': {
                      content: '"LOGO"',
                      color: 'white',
                      fontSize: '2rem'
                    }
                  }}
                />
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Sistema PDV
                </Typography>
                <Typography variant="body1" textAlign="center">
                  Gerencie suas vendas e estoque de forma simples e eficiente.
                </Typography>
              </Box>
            </Box>
          )}

          {/* Formulário de Login */}
          <Box sx={{ 
            flex: '1 1 50%', 
            maxWidth: { xs: '100%', md: '50%' } 
          }}>
            <Paper
              elevation={6}
              sx={{
                padding: { xs: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Logo em dispositivos móveis */}
              {isMobile && (
                <Box
                  component="img"
                  src="/logo.png" // Substitua pelo caminho real do seu logo
                  alt="Logo da Empresa"
                  sx={{
                    width: '50%',
                    maxWidth: 150,
                    marginBottom: 2,
                    // Fallback caso a imagem não carregue
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 80,
                    bgcolor: '#F3E5F5',
                    borderRadius: 2,
                    '&::before': {
                      content: '"LOGO"',
                      color: '#4A148C',
                      fontSize: '1.5rem'
                    }
                  }}
                />
              )}

              <Avatar sx={{ bgcolor: '#4A148C', width: 56, height: 56, mb: 2 }}>
                <LockOutlined />
              </Avatar>
              
              <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#4A148C', fontWeight: 'bold' }}>
                {forgotPasswordMode ? 'Recuperar Senha' : 'Login'}
              </Typography>

              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                  {error}
                </Alert>
              )}

              {forgotPasswordMode ? (
                // Formulário de recuperação de senha
                resetSent ? (
                  <Box sx={{ textAlign: 'center', width: '100%' }}>
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Email de recuperação enviado! Verifique sua caixa de entrada.
                    </Alert>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setForgotPasswordMode(false);
                        setResetSent(false);
                      }}
                      sx={{ 
                        mt: 2,
                        borderColor: '#4A148C',
                        color: '#4A148C',
                        '&:hover': {
                          borderColor: '#7B1FA2',
                          backgroundColor: 'rgba(74, 20, 140, 0.04)'
                        }
                      }}
                    >
                      Voltar para o Login
                    </Button>
                  </Box>
                ) : (
                  <Box component="form" onSubmit={handleForgotPassword} sx={{ width: '100%' }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="reset-email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#4A148C',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#4A148C',
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ 
                        mt: 3, 
                        mb: 2, 
                        bgcolor: '#4A148C',
                        '&:hover': {
                          bgcolor: '#6A1B9A',
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar Link de Recuperação'}
                    </Button>
                    <Button
                      fullWidth
                      variant="text"
                      onClick={() => setForgotPasswordMode(false)}
                      sx={{ 
                        color: '#4A148C',
                        '&:hover': {
                          backgroundColor: 'rgba(74, 20, 140, 0.04)'
                        }
                      }}
                    >
                      Voltar para o Login
                    </Button>
                  </Box>
                )
              ) : (
                // Formulário de login
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#4A148C',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#4A148C',
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="senha"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    id="senha"
                    autoComplete="current-password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#4A148C',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#4A148C',
                      },
                    }}
                  />
                  <Box sx={{ textAlign: 'right', mt: 1 }}>
                    <Link
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={() => setForgotPasswordMode(true)}
                      sx={{ 
                        color: '#4A148C',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Esqueceu sua senha?
                    </Link>
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      bgcolor: '#4A148C',
                      '&:hover': {
                        bgcolor: '#6A1B9A',
                      },
                      py: 1.5,
                      fontSize: '1rem'
                    }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                  </Button>
                  
                  <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      ou
                    </Typography>
                  </Divider>
                  
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                    Credenciais para teste: <br />
                    Email: admin@exemplo.com <br />
                    Senha: senha123
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginScreen;