'use client'

import * as inicialServices from "@/shared/services/inicial.services";
import * as admissibilidadeServices from "@/shared/services/admissibilidade.services";
import { ICreateInterfaces, IInicial } from "@/shared/services/inicial.services";
import { Add, Cancel, Check, PlaylistAddCheckCircleRounded } from "@mui/icons-material"
import { Alert, Button, Card, Checkbox, Divider, FormControl, FormLabel, IconButton, Input, Select, Table, Option, Grid, ColorPaletteProp, ChipPropsColorOverrides, Box, Chip } from "@mui/joy"
import { OverridableStringUnion } from '@mui/types';
import { ReactNode, useContext, useEffect, useState } from "react";
import { IAlvaraTipo } from "@/shared/services/alvara-tipo.services";
import * as alvaraTiposService from "@/shared/services/alvara-tipo.services";
import { useRouter } from "next/navigation";
import * as comum from "@/shared/services/comum.services";
import { AlertsContext } from "@/providers/alertsProvider";
import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

export default function InicialTab({ inicial }: { inicial?: IInicial }) {
    const router = useRouter();
    const [alvaraTipos, setAlvaraTipos] = useState<IAlvaraTipo[]>([]);
    const [num_sql, setNum_sql] = useState<string>('');
    const [validoNum_sql, setValidoNum_sql] = useState<boolean>(false);
    const [nums_sql, setNums_sql] = useState<string[]>([]);
    const [addNumSQLStatus, setAddNumSQLStatus] = useState<number>(0);
    const [addNumSQLStatusAlert, setAddNumSQLStatusAlert] = useState<boolean>(false);

    const [sei, setSei] = useState<string>('');
    const [tipo_requerimento, setTipo_requerimento] = useState<string>('');
    const [requerimento, setRequerimento] = useState<string>('');
    const [aprova_digital, setAprova_digital] = useState<string>('');
    const [envio_admissibilidade, setEnvio_admissibilidade] = useState<Date>(new Date());
    const [alvara_tipo_id, setAlvara_tipo_id] = useState<string>('');
    const [status, setStatus] = useState<number>(1);
    const [processo_fisico, setProcesso_fisico] = useState<string>('');
    const [data_protocolo, setData_protocolo] = useState<Date>(new Date());
    const [inicial_id, setInicial_id] = useState<number>(inicial?.id || 0);
    const [obs, setObs] = useState<string>('');
    const decreto = true;
    const parecer = true;


    const { setAlert } = useContext(AlertsContext);

    const enviaDados = () => {
        if (!inicial)
            inicialServices.criar({ decreto, sei, tipo_requerimento, requerimento, aprova_digital, envio_admissibilidade, alvara_tipo_id, processo_fisico, data_protocolo, obs, nums_sql, status })
                .then((response: IInicial) => {
                    if (response.id) {
                        setAlert('Inicial salvo!', 'Dados salvos com sucesso!', 'success', 3000, Check);
                        router.push(`/inicial/detalhes/${response.id}`);
                        admissibilidadeServices.criar({ inicial_id: response.id, parecer, data_envio: response.envio_admissibilidade});
                    }
                });

        if (inicial)
            inicialServices.atualizar(inicial.id, { decreto, sei, tipo_requerimento, requerimento, aprova_digital, envio_admissibilidade, alvara_tipo_id, processo_fisico, data_protocolo, obs })
                .then((response: IInicial) => {
                    if (response.id) {
                        setAlert('Inicial salvo!', 'Dados salvos com sucesso!', 'success', 3000, Check);
                        router.push(`/inicial/detalhes/${response.id}`);
                    }
                });
    }

    const buscarDados = () => {
        if (inicial) {
            setTipo_requerimento(inicial.tipo_requerimento);
            setSei(comum.formatarSei(inicial.sei));
            setRequerimento(inicial.requerimento);
            inicial.aprova_digital && setAprova_digital(inicial.aprova_digital);
            setAlvara_tipo_id(inicial.alvara_tipo_id);
            setStatus(inicial.status);
            setData_protocolo(new Date(inicial.data_protocolo));
            setObs(inicial.obs || '');
            setProcesso_fisico(inicial.processo_fisico || '');
            inicial.envio_admissibilidade && setEnvio_admissibilidade(new Date(inicial.envio_admissibilidade));
            if (inicial.iniciais_sqls && inicial.iniciais_sqls.length > 0) {
                setNums_sql(inicial.iniciais_sqls.map((sql) => sql.sql));
            }
        }
    }

    const handleAddSQL = () => {
        setAddNumSQLStatusAlert(false);
        if (num_sql != '' && comum.validaDigitoSql(num_sql)) {
            if (nums_sql.includes(num_sql)) {
                setAddNumSQLStatus(1);
            } else {
                setAddNumSQLStatus(0);
                if (inicial) {
                    inicialServices.adicionaSql(inicial.id, num_sql).then((response: IInicial) => {
                        if (response.id) {
                            setNums_sql([...nums_sql, num_sql]);
                            setNum_sql('');
                        }
                    })
                }
                if (!inicial) {
                    setNums_sql([...nums_sql, num_sql]);
                    setNum_sql('');
                }
            }
        }
        setAddNumSQLStatusAlert(true);
    }

    const removeRegister = (index: number, sql: string) => {
        if (inicial) {
            inicialServices.removeSql(inicial.id + '', sql).then((response: boolean) => {
                if (response) {
                    setAddNumSQLStatusAlert(false);
                    setNums_sql(nums_sql.filter((_, i) => i !== index));
                    setAddNumSQLStatus(2);
                    setAddNumSQLStatusAlert(true);
                }
            })
        }
        if (!inicial) {
            setAddNumSQLStatusAlert(false);
            setNums_sql(nums_sql.filter((_, i) => i !== index));
            setAddNumSQLStatus(2);
            setAddNumSQLStatusAlert(true);
        }
    }

    const alertConfigs: { message: string, color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>, icon: ReactNode }[] = [{
        message: 'SQL adicionado com sucesso.',
        color: 'success',
        icon: <PlaylistAddCheckCircleRounded />
    }, {
        message: 'SQL já adicionado.',
        color: 'warning',
        icon: <Cancel />
    }, {
        message: 'SQL removido com sucesso.',
        color: 'success',
        icon: <PlaylistAddCheckCircleRounded />
    }]

    useEffect(() => {
        buscarDados();
        alvaraTiposService.listaCompleta().then((result: IAlvaraTipo[]) => {
            if (result) {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setAlvaraTipos(result);
                }
            }
        });
    }, [inicial]);

    return (
        <Box sx={{ p: 2 }}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    container
                    spacing={2}
                    xs={12} sm={12} md={12} lg={8} xl={8}
                    sx={{ mb: 2 }}
                >
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <FormControl>
                            <FormLabel>SEI</FormLabel>
                            <Input
                                id="sei"
                                name="sei"
                                placeholder="Número de SEI"
                                type="text"
                                value={sei}
                                onChange={(e) => {
                                    var numSei = e.target.value;
                                    if (numSei.length > 0) numSei = comum.formatarSei(e.target.value);
                                    if (numSei) {
                                        setSei(numSei);
                                    }
                                }}
                                error={!comum.validaDigitoSei(sei) && sei.length > 18}
                                disabled={inicial ? true : false}
                                required={inicial ? false : true}
                            />
                            {(!comum.validaDigitoSei(sei) && sei.length > 18) && <FormLabel sx={{ color: 'red' }}>SEI inválido</FormLabel>}
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <FormControl>
                            <FormLabel>Tipo de alvará</FormLabel>
                            <Select value={alvara_tipo_id} id='id_alvara' name='id_alvara' placeholder='Tipo de alvara' onChange={(_, v) => setAlvara_tipo_id(v ? v : '')}>
                                {(alvaraTipos && alvaraTipos.length > 0) && alvaraTipos.map((alvaraTipo) => (
                                    <Option key={alvaraTipo.id} value={alvaraTipo.id}>{alvaraTipo.nome}</Option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={4} sm={4} md={4} lg={2} xl={2}>
                        <FormControl>
                            <FormLabel title='Tipo de Requerimento' sx={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>Tipo Req.</FormLabel>
                            <Input
                                id="tipo_requerimento"
                                name="tipo_requerimento"
                                placeholder="Tipo Requerimento"
                                type="text"
                                value={tipo_requerimento}
                                onChange={e => setTipo_requerimento(e.target.value)}
                                required={inicial ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={8} sm={8} md={8} lg={5} xl={5}>
                        <FormControl>
                            <FormLabel>Requerimento</FormLabel>
                            <Input
                                id="requerimento"
                                name="requerimento"
                                placeholder="Requerimento"
                                type="text"
                                value={requerimento}
                                onChange={e => setRequerimento(e.target.value)}
                                required={inicial ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <FormControl>
                            <FormLabel>Num. Aprova Digital</FormLabel>
                            <Input
                                id="aprova_digital"
                                name="aprova_digital"
                                placeholder="Aprova digital"
                                value={aprova_digital}
                                onChange={e => {
                                    var aprova = e.target.value;
                                    if (aprova.length > 0) aprova = comum.formatarAprovaDigital(e.target.value);
                                    setAprova_digital(aprova && aprova);
                                }}
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <FormControl>
                            <FormLabel>Num. Processo Físico</FormLabel>
                            <Input
                                id="processo_fisico"
                                name="processo_fisico"
                                placeholder="Processo Físico"
                                type="text"
                                value={processo_fisico}
                                onChange={e => {
                                    var fisico = e.target.value;
                                    if (fisico.length > 0) fisico = comum.formatarFisico(e.target.value);
                                    setProcesso_fisico(fisico && fisico);
                                }}
                                required={inicial ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <FormControl>
                            <FormLabel>Data Protocolo</FormLabel>
                            <Input
                                id="data_protocolo"
                                name="data_protocolo"
                                placeholder=""
                                type="date"
                                value={data_protocolo.toISOString().split('T')[0]}
                                onChange={e => setData_protocolo(new Date(e.target.value))}
                                required={inicial ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                        <FormControl>
                            <FormLabel>Envio Admissibilidade</FormLabel>
                            <Input
                                id="envio_admissibilidade"
                                name="envio_admissibilidade"
                                placeholder=""
                                type="date"
                                value={envio_admissibilidade.toISOString().split('T')[0]}
                                onChange={e => setEnvio_admissibilidade(new Date(e.target.value))}
                                required={inicial ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormLabel>Observação</FormLabel>
                        <Textarea
                            placeholder="Digite aqui..."
                            value={obs}
                            onChange={e => setObs(e.target.value)}
                            minRows={2}
                            maxRows={4}
                            endDecorator={
                                <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                    {obs.length} caracteres
                                </Typography>
                            }
                        />
                    </Grid>
                    
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={4} xl={4}>
                    <Card component={Grid} container variant="soft" sx={{ p: 3 }}>
                        <Grid xs={12} direction='column'>
                            <FormControl>
                                <FormLabel>Adicionar SQL</FormLabel>
                                <Input
                                    id="num_sql_input"
                                    name="num_sql_input"
                                    placeholder="SQL"
                                    type="text"
                                    value={num_sql}
                                    onChange={(e) => {
                                        var numSql = e.target.value;
                                        if (numSql.length > 0) numSql = comum.formatarSql(numSql);
                                        setNum_sql(numSql && numSql);
                                    }}
                                    endDecorator={
                                        <IconButton
                                            variant='solid'
                                            color='primary'
                                            onClick={handleAddSQL}
                                            disabled={!comum.validaDigitoSql(num_sql)}
                                        >
                                            <Add />
                                        </IconButton>
                                    }
                                />
                                {(!comum.validaDigitoSql(num_sql) && num_sql.length > 13) && <FormLabel sx={{ color: 'red' }}>SQL inválido</FormLabel>}
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sx={{ display: addNumSQLStatusAlert ? 'block' : 'none' }}>
                            <Alert
                                variant="soft"
                                color={alertConfigs[addNumSQLStatus].color}
                                startDecorator={alertConfigs[addNumSQLStatus].icon}
                                endDecorator={
                                    <Button size="sm" color={alertConfigs[addNumSQLStatus].color} onClick={() => setAddNumSQLStatusAlert(false)}>
                                        Fechar
                                    </Button>
                                }
                            >
                                {alertConfigs[addNumSQLStatus].message}
                            </Alert>
                        </Grid>
                        {nums_sql.length > 0 &&
                            <Grid xs={12}>
                                <Table>
                                    <thead style={{ width: '100%' }}>
                                        <tr>
                                            <th colSpan={2} style={{ textAlign: 'center' }}>Nº SQL</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ width: '100%', backgroundColor: '' }}>
                                        {nums_sql?.map((num_sql, index) => (
                                            <tr key={index}>
                                                <td>{num_sql}</td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <IconButton
                                                        color='danger'
                                                        onClick={() => { removeRegister(index, num_sql) }}
                                                    >
                                                        <Cancel />
                                                    </IconButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Grid>}
                    </Card>

                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button size="sm" variant="outlined" color="neutral" onClick={() => { router.push(`/inicial`); }}>
                    Cancelar
                </Button>
                <Button size="sm" variant="solid" onClick={enviaDados} disabled={!comum.validaDigitoSei(sei)}>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}