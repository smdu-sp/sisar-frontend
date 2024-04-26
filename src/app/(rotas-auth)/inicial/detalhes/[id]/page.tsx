import * as React from 'react';
import Content from "@/components/Content";
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import InicialTab from './tabs/inicial';
import * as inicialServices from '@/shared/services/inicial.services';
import AdmissibilidadeTab from './tabs/admissibilidade';

export default async function InicialDetalhes(props: any) {
    const { id } = props.params;
    const inicial = id ? await inicialServices.buscarPorId(parseInt(id)) : undefined;
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
                }}
            >
                <TabList
                    disableUnderline
                    tabFlex={1}
                    sticky='top'
                >
                    <Tab variant="soft" >
                        Dados iniciais
                    </Tab>
                    {(inicial && inicial.status > 1) && <Tab variant="soft">
                        Admissibilidade
                    </Tab>}
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
                    <InicialTab inicial={inicial} />
                </TabPanel>
                {(inicial && inicial.status > 1) && <TabPanel value={1}>
                    <AdmissibilidadeTab inicial={inicial} />
                </TabPanel>}
            </Tabs>
        </Content>
    )
}