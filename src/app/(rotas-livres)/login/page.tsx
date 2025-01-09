'use client'

import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Button, Sheet, FormControl, Input, SvgIcon, IconButton } from '@mui/joy';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import ThemeToggle from '@/components/ThemeToggle';
// @ts-ignore
import { Cancel, Key, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AlertsContext } from '@/providers/alertsProvider';

export default function Login() {
  const { setAlert } = useContext(AlertsContext);
  const [login, setLogin] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>();
  const [mostraSenha, setMostraSenha] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<{ innerWidth: number; innerHeight: number; }>();
  const router = useRouter();
      
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  
  function handleWindowResize() {
    setWindowSize(getWindowSize())
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setLoading(true);
    const result = await signIn('credentials', {
      login,
      senha,
      redirect: false
    });
    if (result?.error) {
      setLoginSuccess(false);
      setAlert('Credenciais incorretas!', 'Tente novamente!', 'danger', 5000, Cancel);
      return;
    }
    setAlert('Bem-vindo!', 'Login efetuado com sucesso', 'success', 5000);
    setTimeout(() => router.replace('/'), 3000);
    setLoading(false);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize(getWindowSize());
      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  return (
    <>
      <Sheet
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          top: 0,
          width: '100vw',
          height: 'var(--Header-height)',
          zIndex: 9995,
          p: 2,
          gap: 1,
          borderBottom: { xs: '1px solid', sm: 'none' },
          borderColor: { xs: 'background.level1', sm: 'none' },
          boxShadow: { xs: 'sm', sm: 'none' },
          bgcolor: { sm: 'transparent' },
          opacity: 1,
        }}
      >
        <ThemeToggle />
      </Sheet>
      <form onSubmit={handleSubmit} method='post'>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto',
            my: 4,
            py: 3,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 6,
            bgcolor: windowSize && windowSize.innerWidth < 600 ? 'transparent' : ''
          }}
          variant={windowSize && windowSize.innerWidth < 600 ? 'plain' : 'outlined'}
        >
          <Link
            href='/'
            style={{
              'marginLeft': 'auto',
              'marginRight': 'auto',
            }}
          >
            <Image 
              src={logo}
              width={220}
              alt="SISAR"
            />
          </Link>
            <FormControl sx={{mt: 1}}>
              <Input
                startDecorator={<Person />}
                name="login"
                type="text"
                placeholder="Usuário de rede"
                title="Usuário de rede"
                onChange={(e) => setLogin(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                startDecorator={<Key />}
                endDecorator={
                  <IconButton onClick={() => setMostraSenha(!mostraSenha)}>
                    <SvgIcon component={!mostraSenha ? Visibility : VisibilityOff} />
                  </IconButton>
                }
                name="senha"
                type={mostraSenha ? 'text' : 'password'}
                placeholder="Senha de rede"
                title="Senha de rede"
                onChange={(e) => setSenha(e.target.value)}
              />
            </FormControl>
            <Button 
              sx={{mt: 1, pr: loginSuccess ? 6.8 : 3}}
              size="lg"
              type='submit'
              loading={loading}
            >
              Entrar
            </Button>
        </Sheet>
      </form>
    </>
  );
}
