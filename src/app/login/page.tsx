'use client'

import { FormEvent, useEffect, useState } from 'react';
import { Button, Sheet, FormControl, Input } from '@mui/joy';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import ThemeToggle from '@/components/ThemeToggle';
import { Key, Person } from '@mui/icons-material';
import React from 'react';
import Link from 'next/link';

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

async function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  console.log(formData);
  // const response = await fetch('/api/submit', {
  //   method: 'POST',
  //   body: formData,
  // })

  // const data = await response.json()
}

export default function Login() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {setWindowSize(getWindowSize())}
    window.addEventListener('resize', handleWindowResize);
    return () => {window.removeEventListener('resize', handleWindowResize)};
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
      <form onSubmit={onSubmit} method='post'>
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
            bgcolor: windowSize.innerWidth < 600 ? 'transparent' : ''
          }}
          variant={windowSize.innerWidth < 600 ? 'plain' : 'outlined'}
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
              />
            </FormControl>
            <FormControl>
              <Input
                startDecorator={<Key />}
                name="senha"
                type="password"
                placeholder="Senha de rede"
                title="Senha de rede"
              />
            </FormControl>
            <Button 
              sx={{mt: 1}}
              size="lg"
              type='submit'
            >Entrar</Button>
        </Sheet>
      </form>
    </>
  );
}
