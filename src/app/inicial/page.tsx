'use client'

import Content from '@/components/Content';
import { Button, Tab, TabList, TabPanel, Tabs, Typography, tabClasses } from '@mui/joy';

export default function Inicial() {
  return (
    <Content 
      titulo='Inicial'
      pagina='inicial'
      breadcrumbs={[{
        label: 'Inicial',
        href: ''
      }]}
    >
      <Tabs
        variant="outlined"
        defaultValue={0}
        sx={{
          borderRadius: 'lg',
          boxShadow: 'sm',
          overflow: 'auto',
        }}
      >
        <TabList
          disableUnderline
          tabFlex={1}
          sx={{
            [`& .${tabClasses.root}`]: {
              fontSize: 'sm',
              fontWeight: 'lg',
              [`&[aria-selected="true"]`]: {
                color: 'primary.500',
                bgcolor: 'background.surface',
              },
              [`&.${tabClasses.focusVisible}`]: {
                outlineOffset: '-4px',
              },
            },
          }}
        >
          <Tab variant="soft" >
            Dados iniciais
          </Tab>
          <Tab variant="soft">
            Distribuição
          </Tab>
          <Tab variant="soft">
            Admissibilidade
          </Tab>
          <Tab variant="soft">
            Coord. SMUL
          </Tab>
          <Tab variant="soft">
            Secretarias
          </Tab>
          <Tab variant="soft" >
            Conclusão
          </Tab>
        </TabList>
        <TabPanel value={0}>
          Dados iniciais
        </TabPanel>
        <TabPanel value={1}>
          Distribuição
        </TabPanel>
        <TabPanel value={2}>
          Admissibilidade
        </TabPanel>
        <TabPanel value={3}>
          Coord. SMUL
        </TabPanel>
        <TabPanel value={4}>
          Secretarias
        </TabPanel>
        <TabPanel value={5}>
          Conclusão
        </TabPanel>
      </Tabs>
      <a href="/inicial/detalhes">
        <Button
          variant="solid"
          size='lg'
          sx={{
            position: 'absolute',
            bottom: 50,
            right: 50,
          }}
        >
          Novo
        </Button>
      </a>
    </Content>
  );
}
