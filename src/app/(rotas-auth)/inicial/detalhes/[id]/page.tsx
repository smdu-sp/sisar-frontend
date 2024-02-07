'use client'

import Content from '@/components/Content';
import { TabList, Tabs, tabClasses, Tab, TabPanel } from '@mui/joy';
import React from 'react';
import DadosIniciaisTab from '../tabs/inicial';

export default function InicialDetalhes(props: any) {
    const { id } = props.params;
    return (
        <Content 
            titulo={id ? 'Detalhes' : 'Novo'}
            pagina='inicial'
            breadcrumbs={[{
                label: 'Inicial',
                href: '/inicial'
            },{
                label: 'Detalhes',
                href: '/inicial/detalhes'
            }]}
        >
                    <Tabs
                        defaultValue={0}
                        sx={{
                            borderRadius: 'lg',
                            boxShadow: 'sm',
                            overflow: 'auto',
                            flexGrow: 1,
                            '&::-webkit-scrollbar': {
                                width: '0.5em',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'var(--joy-palette-background-level1)',
                                borderRadius: '10px',
                            }
                        }}
                    >
                        <TabList
                            disableUnderline
                            tabFlex={1}
                            sticky='top'
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
                        <TabPanel value={0} sx={{ 
                            flexGrow: 1,
                            '&::-webkit-scrollbar': {
                              width: '0.5em',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: 'var(--joy-palette-background-level1)',
                              borderRadius: '10px',
                            }
                        }}>
                            <DadosIniciaisTab id={id} />
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
                    
        </Content>
    );
}
