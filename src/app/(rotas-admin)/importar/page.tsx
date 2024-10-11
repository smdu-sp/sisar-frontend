'use client'

import Content from '@/components/Content';
import { Button, Card, FormControl, FormLabel, Input, Option, Select, Tab, TabList, TabPanel, Tabs, Typography, tabClasses } from '@mui/joy';

export default function Importar() {
  return (
    <Content 
      titulo='Importar'
      breadcrumbs={[{
        label: 'Importar',
        href: ''
      }]}
    >
        <Card
            size='lg'
            variant='plain'
        >
            <FormControl>
                <FormLabel>Tipo de Arquivo</FormLabel>
                <Select>
                    <Option value=''>Distribuição</Option>
                </Select>
            </FormControl>
            <FormControl>
                <FormLabel>Arquivo</FormLabel>
                <Input type='file' />
            </FormControl>
        </Card>
    </Content>
  );
}
