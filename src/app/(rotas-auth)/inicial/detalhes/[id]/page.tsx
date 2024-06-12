import * as React from 'react';
import Content from "@/components/Content";
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import InicialTab from './tabs/inicial';
import * as inicialServices from '@/shared/services/inicial.services';
import * as admissibilidadeServices from '@/shared/services/admissibilidade.services';
import * as usuarioServices from '@/shared/services/usuario.services';
import AdmissibilidadeTab from './tabs/admissibilidade';
import DistribuicaoTab from './tabs/distribuicao';

export default async function InicialDetalhes(props: any) {
    const { id } = props.params;
    const inicial = id ? await inicialServices.buscarPorId(parseInt(id)) : undefined;
    const funcionarios = id ? await usuarioServices.buscarFuncionarios() : undefined;

    return (
        <Content
            titulo={id ? `Processo #${id}` : 'Novo processo'}
            pagina='inicial'
            breadcrumbs={[{
                label: 'Processos',
                href: '/inicial'
            }, {
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
                        Distribuição
                    </Tab>}
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
                    <DistribuicaoTab distribuicao={inicial.distribuicao} funcionarios={funcionarios} />
                </TabPanel>}
                {(inicial && inicial.status > 1) && <TabPanel value={2}>
                    <AdmissibilidadeTab inicial={inicial} admissibilidade={inicial.admissibilidade} />
                </TabPanel>}
            </Tabs>
        </Content>
    )
}