'use client'

import Content from '@/components/Content';
import * as React from 'react';
import Calendario from '@/components/calendario';


export default function Home() {
  return (
    <Content
      titulo='Página Inicial'
      pagina='/'
    >
      <Calendario/>
    </Content>
  );
}