'use client'

import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import InicialTab from './tabs/inicial';
import AdmissibilidadeTab from './tabs/admissibilidade';
import DistribuicaoTab from './tabs/distribuicao';
import { IInicial } from '@/shared/services/inicial.services';
import { IUsuario } from '@/shared/services/usuario.services';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ContentTabs({ inicial, funcionarios }: { inicial?: IInicial, funcionarios?: { administrativos: IUsuario[], tecnicos: IUsuario[] } }) {
    const query = useSearchParams();
    const [tabInicial, setTabInicial] = useState(parseInt(query.get('tab') || '0'));
    return (
        <Tabs
            defaultValue={tabInicial}
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
    )
}