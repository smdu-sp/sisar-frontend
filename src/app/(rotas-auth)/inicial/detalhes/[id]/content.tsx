'use client'

import { Autocomplete, Box, Button, DialogContent, DialogTitle, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Stack, Tab, TabList, TabPanel, Tabs, Textarea } from '@mui/joy';
import InicialTab from './tabs/inicial';
import AdmissibilidadeTab from './tabs/admissibilidade';
import DistribuicaoTab from './tabs/distribuicao';
import { IInicial } from '@/shared/services/inicial/inicial.services';
import { IUsuario } from '@/types/usuario/usuario.dto';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import * as avisos from '@/shared/services/avisos/avisos.services';
import * as inicialServices from '@/shared/services/inicial/inicial.services';
import { Check } from '@mui/icons-material';
import { AlertsContext } from '@/providers/alertsProvider';
import FinalizaçãoTab from './tabs/finalizacao';
import AnaliseTab from './tabs/analise';

export default function ContentTabs({ inicial, funcionarios }: { inicial?: IInicial, funcionarios?: { administrativos: IUsuario[], tecnicos: IUsuario[] }}) {
    const query = useSearchParams();
    const [tabInicial, setTabInicial] = useState(parseInt(query.get('tab') || '0'));
    const [lembrete, setLembrete] = useState(false);
    const today = new Date();
    const [dataAviso, setDataAviso] = useState<Date>(() => {
        const dateString = new Date(today).toISOString().split("T")[0];
        return new Date(dateString);
    });
    const [tipo, setTipo] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const { setAlert } = React.useContext(AlertsContext);
    const [processosAvisos, setProcessosAvisos] = useState<inicialServices.IProcessosAvisos[]>([]);
    const router = useRouter();

    React.useEffect(() => {
        inicialServices.processosAvisos()
            .then((response: inicialServices.IProcessosAvisos[]) => {
                setProcessosAvisos(response);
            });
    }, []);

    const criarAvisos = () => {
        avisos.criar({ titulo, descricao, data: dataAviso, inicial_id: 1, tipo })
            .then((response: avisos.IAvisos) => {
                if (response) {
                    setAlert('Aviso criado', 'Aviso criado com sucesso!', 'success', 3000, Check);
                    setDataAviso(dataAviso);
                    setLembrete(false)
                    setTitulo('');
                    setDescricao('');
                }
            })
    }

    const options = processosAvisos && processosAvisos.length > 0 ? processosAvisos.map((processo) => ({
        label: processo.sei,
        value: parseInt(processo.id)
    })) : [];

    return (
        <>
            <Box>
                <IconButton size="sm" variant="soft" color={lembrete ? 'neutral' : 'success'} sx={{ position: "absolute", right: 47, top: 90 }} onClick={() => { setLembrete(!lembrete); }}>
                    <NotificationAddIcon />
                </IconButton>
                <Modal open={lembrete} onClose={() => setLembrete(false)}>
                    <ModalDialog>
                        <DialogTitle>Criar novo Lembrete</DialogTitle>
                        <DialogContent>O lembrete ajudara armazenar infomações sobre o processo</DialogContent>
                        <form
                            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                setLembrete(false);
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Titulo</FormLabel>
                                    <Input autoFocus required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Descrição</FormLabel>
                                    <Textarea required minRows={5} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Data</FormLabel>
                                    <Input type='date' required value={dataAviso.toISOString().split('T')[0]} onChange={(e) => { setDataAviso(new Date(e.target.value)) }} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select required value={tipo} onChange={(_, v) => { setTipo(v ? v : 0) }}>
                                        <Option value={0}>Geral</Option>
                                        <Option value={1}>Pessoal</Option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Processos</FormLabel>
                                    <Autocomplete
                                        required
                                        placeholder="Selecione"
                                        options={options}
                                    />
                                </FormControl>
                                <Box alignSelf={'end'} >
                                  <Button 
                                    size='sm'
                                    variant='plain'
                                    color='neutral' 
                                    type='button'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setLembrete(false);
                                    }}
                                    sx={{
                                      width: 'fit-content',
                                      borderRadius: 4,
                                      alignSelf: 'end',
                                      mr: 1
                                    }}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button 
                                    size='sm'
                                    type='submit' 
                                    onClick={() => criarAvisos()}
                                    sx={{
                                      width: 'fit-content',
                                      borderRadius: 4,
                                      alignSelf: 'end'
                                    }}
                                  >
                                    Salvar
                                  </Button>
                                </Box>                                
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </Box>
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
                    {(inicial) && <Tab variant="soft">
                        Distribuição
                    </Tab>}
                    {(inicial) && <Tab variant="soft">
                        Admissibilidade
                    </Tab>}
                    {(inicial) && <Tab variant="soft">
                        Análise
                    </Tab>}
                    {(inicial && inicial?.status === 2 || inicial?.status === 3 || inicial?.status === 4 ) && <Tab variant="soft">
                        Finalização
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
                {(inicial) && <TabPanel value={1}>
                    <DistribuicaoTab distribuicao={inicial.distribuicao} funcionarios={funcionarios} />
                </TabPanel>}
                {(inicial) && <TabPanel value={2}>
                    <AdmissibilidadeTab inicial={inicial} admissibilidade={inicial.admissibilidade} />
                </TabPanel>}
                {(inicial && inicial?.status === 2 || inicial?.status === 3 || inicial?.status === 4 ) && <TabPanel value={3}>
                    <AnaliseTab />
                </TabPanel>}
                {(inicial && inicial?.status === 2 || inicial?.status === 3 || inicial?.status === 4 ) && <TabPanel value={4}>
                    <FinalizaçãoTab inicial={inicial} admissibilidade={inicial.admissibilidade} />
                </TabPanel>}
            </Tabs>
        </>
    )
}