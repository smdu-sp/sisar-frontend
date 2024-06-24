'use client'

import { IInicial } from "@/shared/services/inicial.services";
import { IAdmissibilidade } from "@/shared/services/admissibilidade.services";
import React, { useEffect, useState } from "react";
import * as admissibilidadeServices from "@/shared/services/admissibilidade.services";
import * as unidadeServices from "@/shared/services/unidade.services";
import * as inicialServices from "@/shared/services/inicial.services";
import * as subprefeituraServices from "@/shared/services/subprefeitura.services";
import * as avisos from '@/shared/services/avisos.services';
import { IUnidade } from "@/shared/services/unidade.services";
import { ISubprefeitura } from "@/shared/services/subprefeitura.services";
import * as comum from "@/shared/services/comum.services";
import { useRouter as useRouterNavigation } from "next/navigation";
import { Autocomplete, AutocompleteOption, Box, Button, Checkbox, Chip, Divider, FormControl, FormLabel, Grid, IconButton, Input, Option, Select } from "@mui/joy";
import { Business, Check, Today } from "@mui/icons-material";
import { IUsuario } from "@/shared/services/usuario.services";
import { AlertsContext } from '@/providers/alertsProvider';


export default function AdmissibilidadeTab({ inicial, admissibilidade }: { inicial?: IInicial, admissibilidade?: IAdmissibilidade }) {
    const router = useRouterNavigation();

    const [tipo_processo, setTipo_processo] = useState<number>(inicial?.tipo_processo || 0);
    const [interface_sehab, setInterface_sehab] = useState<boolean>(false);
    const [num_sehab, setNum_sehab] = useState<string>('');
    const [interface_siurb, setInterface_siurb] = useState<boolean>(false);
    const [num_siurb, setNum_siurb] = useState<string>('');
    const [interface_smc, setInterface_smc] = useState<boolean>(false);
    const [num_smc, setNum_smc] = useState<string>('');
    const [interface_smt, setInterface_smt] = useState<boolean>(false);
    const [num_smt, setNum_smt] = useState<string>('');
    const [interface_svma, setInterface_svma] = useState<boolean>(false);
    const [num_svma, setNum_svma] = useState<string>('');
    const [processoSei, setProcessoSei] = useState<string>('');
    const [data_decisao_interlocutoria, setDataDecisao] = useState<Date>(new Date());
    const [reuniao, setReuniao] = useState<Date>(new Date());
    const [unidades, setUnidades] = useState<IUnidade[]>([]);
    const [unidade_id, setUnidade_id] = useState('');
    const [subprefeitura, setSubprefeitura] = useState<ISubprefeitura[]>([]);
    const [subprefeitura_id, setSubprefeitura_id] = useState('');
    const [lembrete, setLembrete] = useState<boolean>(false);
    const [titulo, setTitulo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [dataLembrete, setDataLembrete] = useState<Date>(new Date());
    const status = 0;
    const [tipo, setTipo] = useState(0);
    const { setAlert } = React.useContext(AlertsContext);

    const atualizar = () => {
        if (admissibilidade) {
            admissibilidadeServices.atualizarId(admissibilidade.inicial_id, { status, unidade_id, data_decisao_interlocutoria, subprefeitura_id })
                .then(() => {
                    console.log('teste');
                    router.push('/admissibilidade');
                })
            inicialServices.atualizar(admissibilidade.inicial_id, { tipo_processo })
                .then(() => {
                    setAlert('Adimissão Realizada', `${inicial?.sei} admitido com sucesso`, 'success', 3000, Check);
                    if (lembrete) {

                    }
                })
        }
    }

    useEffect(() => {
        unidadeServices.listaCompleta()
            .then((response: IUnidade[]) => {
                setUnidades(response);
            })
        subprefeituraServices.listaCompleta()
            .then((response: ISubprefeitura[]) => {
                setSubprefeitura(response);
            })
    }, [])
    return (
        <Box sx={{ p: 2 }}>
            {admissibilidade && (<>
                <Grid container xs={12} spacing={2} sx={{ p: 2, mb: 2 }}>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Processo</FormLabel>
                            <Input value={inicial?.sei} readOnly />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Processo Sei</FormLabel>
                            <Input value={processoSei} onChange={(e) => {
                                var sehab = e.target.value;
                                if (sehab.length > 0) sehab = comum.formatarSei(e.target.value);
                                setProcessoSei(sehab && sehab);
                            }}
                                required={interface_sehab}
                                error={interface_sehab && !comum.validaDigitoSei(num_sehab) && num_sehab.length > 18}
                                title={interface_sehab && !comum.validaDigitoSei(num_sehab) && num_sehab.length > 18 ? 'SEI inválido' : ''}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </>)}
            {inicial && inicial.envio_admissibilidade && (<>
                <Grid xs={12}>
                    <Divider>
                        <Chip color="primary">Admissibilidade</Chip>
                    </Divider>
                </Grid>
                <Grid container xs={12}>

                </Grid>
            </>)}
            <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Tipo de processo</FormLabel>
                        <Select value={tipo_processo} id='tipo_processo' name='tipo_processo' placeholder='Tipo de processo' onChange={(_, v) => setTipo_processo(v ? v : 1)}>
                            <Option value={1}>Próprio de SMUL</Option>
                            <Option value={2}>Múltiplas interfaces</Option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} lg={6}>
                    <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel>Status</FormLabel>
                        <Input value="Adimissivel" readOnly />
                    </FormControl>
                </Grid>

            </Grid>
            <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Subprefeitura</FormLabel>
                        <Autocomplete
                            startDecorator={<Business />}
                            options={subprefeitura && subprefeitura.length > 0 ? subprefeitura : []}
                            getOptionLabel={(option) => option && option.nome}
                            renderOption={(props, option) => (
                                <AutocompleteOption {...props} key={option.id} value={option.id}>
                                    {option.nome}
                                </AutocompleteOption>
                            )}
                            placeholder="Unidade"
                            value={subprefeitura_id && subprefeitura_id !== '' ? subprefeitura.find((subprefeitura: ISubprefeitura) => subprefeitura.id === subprefeitura_id) : null}
                            onChange={(_, value) => value && setSubprefeitura_id(value?.id)}
                            filterOptions={(options, { inputValue }) => {
                                if (unidades) return (options as IUnidade[]).filter((option) => (
                                    (option).nome.toLowerCase().includes(inputValue.toLowerCase()) ||
                                    (option).sigla.toLowerCase().includes(inputValue.toLowerCase())
                                ));
                                return [];
                            }}
                            noOptionsText="Nenhuma unidade encontrada"
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Unidade</FormLabel>
                        <Autocomplete
                            startDecorator={<Business />}
                            options={unidades && unidades.length > 0 ? unidades : []}
                            getOptionLabel={(option) => option && option.sigla}
                            renderOption={(props, option) => (
                                <AutocompleteOption {...props} key={option.id} value={option.id}>
                                    {option.sigla}
                                </AutocompleteOption>
                            )}
                            placeholder="Unidade"
                            value={unidade_id && unidade_id !== '' ? unidades.find((unidade: IUnidade) => unidade.id === unidade_id) : null}
                            onChange={(_, value) => value && setUnidade_id(value?.id)}
                            filterOptions={(options, { inputValue }) => {
                                if (unidades) return (options as IUnidade[]).filter((option) => (
                                    (option).nome.toLowerCase().includes(inputValue.toLowerCase()) ||
                                    (option).sigla.toLowerCase().includes(inputValue.toLowerCase())
                                ));
                                return [];
                            }}
                            noOptionsText="Nenhuma unidade encontrada"
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Data decisão</FormLabel>
                        <Input type="date" value={data_decisao_interlocutoria.toISOString().split('T')[0]} onChange={e => setDataDecisao(new Date(e.target.value))} />
                    </FormControl>
                </Grid>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Reunião GRAPOEM</FormLabel>
                        <Input type="date" value={reuniao.toISOString().split('T')[0]} onChange={(e) => setReuniao(new Date(e.target.value))} />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid xs={12} container sx={{ display: tipo_processo === 1 ? 'none' : 'block' }}>
                <Grid xs={12}><Divider><Chip color="primary">Interfaces</Chip></Divider></Grid>
                {inicial && inicial.data_protocolo <= new Date('2019-09-20') && <Grid xs={12} container sx={{ py: 2 }}>
                    <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            label="SEHAB"
                            checked={interface_sehab}
                            onChange={(e) => setInterface_sehab(e.target.checked)}
                        />
                    </Grid>
                    <Grid xs={12} lg={8} xl={10}>
                        <Input
                            id="num_sehab"
                            name="num_sehab"
                            placeholder="Processo SEHAB"
                            type="text"
                            value={num_sehab}
                            onChange={(e) => {
                                var sehab = e.target.value;
                                if (sehab.length > 0) sehab = comum.formatarSei(e.target.value);
                                setNum_sehab(sehab && sehab);
                            }}
                            required={tipo_processo === 2}
                            error={tipo_processo === 2 && !comum.validaDigitoSei(num_sehab) && num_sehab.length > 18}
                            title={tipo_processo === 2 && !comum.validaDigitoSei(num_sehab) && num_sehab.length > 18 ? 'SEI inválido' : ''}
                        />
                        {(!comum.validaDigitoSei(num_sehab) && num_sehab.length > 18) && <FormLabel sx={{ color: 'red' }}>SEI inválido</FormLabel>}
                    </Grid>
                </Grid>}
                <Grid xs={12} container sx={{ py: 2 }}>
                    <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            label="SIURB"
                            checked={interface_siurb}
                            onChange={(e) => setInterface_siurb(e.target.checked)}
                        />
                    </Grid>
                    <Grid xs={12} lg={8} xl={10}>
                        <Input
                            placeholder="Processo SIURB"
                            type="text"
                            value={num_siurb}
                            onChange={(e) => {
                                var siurb = e.target.value;
                                if (siurb.length > 0) siurb = comum.formatarSei(e.target.value);
                                setNum_siurb(siurb && siurb);
                            }}
                            required={tipo_processo === 2}
                            error={tipo_processo === 2 && !comum.validaDigitoSei(num_siurb) && num_siurb.length > 18}
                            title={tipo_processo === 2 && !comum.validaDigitoSei(num_siurb) && num_siurb.length > 18 ? 'SEI inválido' : ''}
                        />
                    </Grid>
                </Grid>
                <Grid xs={12} container sx={{ py: 2 }}>
                    <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            label="SMC"
                            checked={interface_smc}
                            onChange={(e) => setInterface_smc(e.target.checked)}
                        />
                    </Grid>
                    <Grid xs={12} lg={8} xl={10}>
                        <Input
                            placeholder="Processo SMC"
                            type="text"
                            value={num_smc}
                            onChange={(e) => {
                                var smc = e.target.value;
                                if (smc.length > 0) smc = comum.formatarSei(e.target.value);
                                setNum_smc(smc && smc);
                            }}
                            required={tipo_processo === 2}
                            error={tipo_processo === 2 && !comum.validaDigitoSei(num_smc) && num_smc.length > 18}
                            title={tipo_processo === 2 && !comum.validaDigitoSei(num_smc) && num_smc.length > 18 ? 'SEI inválido' : ''}
                        />
                    </Grid>
                </Grid>
                <Grid xs={12} container sx={{ py: 2 }}>
                    <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            label="SMT"
                            checked={interface_smt}
                            onChange={(e) => setInterface_smt(e.target.checked)}
                        />
                    </Grid>
                    <Grid xs={12} lg={8} xl={10}>
                        <Input
                            placeholder="Processo SMT"
                            type="text"
                            value={num_smt}
                            onChange={(e) => {
                                var smt = e.target.value;
                                if (smt.length > 0) smt = comum.formatarSei(e.target.value);
                                setNum_smt(smt && smt);
                            }}
                            required={tipo_processo === 2}
                            error={tipo_processo === 2 && !comum.validaDigitoSei(num_smt) && num_smt.length > 18}
                            title={tipo_processo === 2 && !comum.validaDigitoSei(num_smt) && num_smt.length > 18 ? 'SEI inválido' : ''}
                        />
                    </Grid>
                </Grid>
                <Grid xs={12} container sx={{ py: 2 }}>
                    <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            label="SVMA"
                            checked={interface_svma}
                            onChange={(e) => setInterface_svma(e.target.checked)}
                        />
                    </Grid>
                    <Grid xs={12} lg={8} xl={10}>
                        <Input
                            placeholder="Processo SVMA"
                            type="text"
                            value={num_svma}
                            onChange={(e) => {
                                var svma = e.target.value;
                                if (svma.length > 0) svma = comum.formatarSei(e.target.value);
                                setNum_svma(svma && svma);
                            }}
                            required={tipo_processo === 2}
                            error={tipo_processo === 2 && !comum.validaDigitoSei(num_svma) && num_svma.length > 18}
                            title={tipo_processo === 2 && !comum.validaDigitoSei(num_svma) && num_svma.length > 18 ? 'SEI inválido' : ''}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>

                <Button size="sm" variant="outlined" color="neutral" onClick={() => { router.push(`/admissibilidade`); }}>
                    Cancelar
                </Button>
                <Button size="sm" variant="solid" onClick={() => {
                    atualizar();

                }}>
                    Salvar
                </Button>
            </Grid>
        </Box>
    )
}