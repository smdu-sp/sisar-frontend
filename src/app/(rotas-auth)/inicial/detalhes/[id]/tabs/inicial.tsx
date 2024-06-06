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

    const [sei, setSei] = useState<string>('');
    const [tipo_requerimento, setTipo_requerimento] = useState<string>('');
    const [requerimento, setRequerimento] = useState<string>('');
    const [aprova_digital, setAprova_digital] = useState<string>('');
    const [tipo_processo, setTipo_processo] = useState<number>(1);
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
        const interfaces: ICreateInterfaces = {
            inicial_id: inicial?.id,
            interface_sehab,
            num_sehab,
            interface_siurb,
            num_siurb,
            interface_smc,
            num_smc,
            interface_smt,
            num_smt,
            interface_svma,
            num_svma
        };

        if (!inicial)
            inicialServices.criar({ decreto, sei, tipo_requerimento, requerimento, aprova_digital, tipo_processo, envio_admissibilidade, alvara_tipo_id, processo_fisico, data_protocolo, obs, nums_sql, status, interfaces })
                .then((response: IInicial) => {
                    if (response.id) {
                        setAlert('Inicial salvo!', 'Dados salvos com sucesso!', 'success', 3000, Check);
                        router.push(`/inicial/detalhes/${response.id}`);
                        admissibilidadeServices.criar({ inicial_id: response.id, parecer, data_envio: response.envio_admissibilidade});
                    }
                });

        if (inicial)
            inicialServices.atualizar(inicial.id, { decreto, sei, tipo_requerimento, requerimento, aprova_digital, tipo_processo, envio_admissibilidade, alvara_tipo_id, processo_fisico, data_protocolo, obs, interfaces })
                .then((response: IInicial) => {
                    if (response.id) {
                        setAlert('Inicial salvo!', 'Dados salvos com sucesso!', 'success', 3000, Check);
                        router.push(`/inicial/detalhes/${response.id}`);
                    }
                });
    }

    function formatarSei(value: string): string {
        //1111.1111/1111111-1
        if (!value) return value;
        const onlyNumbers = value.replace(/\D/g, '').substring(0, 16);
        if (onlyNumbers.length <= 4)
            return onlyNumbers.replace(/(\d{0,4})/, '$1');
        if (onlyNumbers.length <= 8)
            return onlyNumbers.replace(/(\d{0,4})(\d{0,4})/, '$1.$2');
        if (onlyNumbers.length <= 15)
            return onlyNumbers.replace(/(\d{0,4})(\d{0,4})(\d{0,7})/, '$1.$2/$3');
        return onlyNumbers.replace(/(\d{0,4})(\d{0,4})(\d{0,7})(\d{0,1})/, '$1.$2/$3-$4');
    }

    function formatarSql(value: string): string {
        //111.111.1111-1
        if (!value) return value;
        const onlyNumbers = value.replace(/\D/g, '').substring(0, 11);
        validaDigitoSql(onlyNumbers);
        if (onlyNumbers.length <= 3)
            return onlyNumbers.replace(/(\d{0,3})/, '$1');
        if (onlyNumbers.length <= 6)
            return onlyNumbers.replace(/(\d{0,3})(\d{0,3})/, '$1.$2');
        if (onlyNumbers.length <= 10)
            return onlyNumbers.replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, '$1.$2.$3');
        return onlyNumbers.replace(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,1})/, '$1.$2.$3-$4');
    }

    function formatarAprovaDigital(value: string): string {
        if (!value) return value;
        value = value.replaceAll('-', '').replaceAll('SP', '').substring(0, 13);
        let numeros = value.substring(0, 10).replace(/\D/g, '');
        let digitos = value.substring(10).replace(/(?![A-Z])./g, '');
        value = `${numeros}${digitos}`;
        if (value.length <= 8)
            return value.replace(/(\d{0,8})/, '$1');
        if (value.length <= 10)
            return value.replace(/(\d{0,8})(\d{0,2})/, '$1-$2');
        return value.replace(/(\d{0,8})(\d{0,2})(\d{0,3})/, '$1-$2-SP-$3');
    }

    function formatarFisico(value: string): string {
        // 1111-1-111-111-1
        if (!value) return value;
        const onlyNumbers = value.replace(/\D/g, '').substring(0, 12);
        if (onlyNumbers.length <= 4)
            return onlyNumbers.replace(/(\d{0,4})/, '$1');
        if (onlyNumbers.length <= 5)
            return onlyNumbers.replace(/(\d{0,4})(\d{0,1})/, '$1-$2');
        if (onlyNumbers.length <= 8)
            return onlyNumbers.replace(/(\d{0,4})(\d{0,1})(\d{0,3})/, '$1-$2.$3');
        if (onlyNumbers.length <= 11)
            return onlyNumbers.replace(/(\d{0,4})(\d{0,1})(\d{0,3})(\d{0,3})/, '$1-$2.$3.$4');
        return onlyNumbers.replace(/(\d{0,4})(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,1})/, '$1-$2.$3.$4-$5');
    }


    function validaDigitoSei(sei: string): boolean {
        var valido = false;
        sei = sei.replace(/\D/g, '').substring(0, 16);
        if (sei.length > 16) sei = sei.slice(-16);
        if (sei.length === 16) {
            sei = sei.toString().trim();
            var soma = 0;
            const verificador = [2, 3, 4, 5, 6, 7, 8, 9];
            const digito = parseInt(sei[15]);
            let j = 0;
            for (let i = 14; i >= 0; i--) {
                if (j === 8) j = 0;
                soma += parseInt(sei[i]) * verificador[j];
                j++;
            }
            soma = soma % 11;
            soma = soma === 1 || soma === 0 ? 0 : 11 - soma;
            valido = soma === digito;
        }
        return valido;
    }

    function validaDigitoSql(sql: string): void {
        if (sql.length > 11) sql = sql.slice(-11);
        if (sql.length === 11) {
            sql = sql.toString().trim();
            var soma = 0;
            const verificador = [1, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            const digito = parseInt(sql[10]);
            for (let i = 0; i < 10; i++)
                soma += parseInt(sql[i]) * verificador[i];
            soma = soma % 11;
            if (soma === 10) soma = 1;
            if (soma > 1 && soma < 10) soma = 11 - soma;
            setValidoNum_sql(soma === digito);
            return
        }
        setValidoNum_sql(false);
    }

    const buscarDados = () => {
        if (inicial) {
            setTipo_requerimento(inicial.tipo_requerimento);
            setSei(formatarSei(inicial.sei));
            setRequerimento(inicial.requerimento);
            inicial.aprova_digital && setAprova_digital(inicial.aprova_digital);
            setAlvara_tipo_id(inicial.alvara_tipo_id);
            setStatus(inicial.status);
            setData_protocolo(new Date(inicial.data_protocolo));
            setObs(inicial.obs || '');
            setProcesso_fisico(inicial.processo_fisico || '');
            inicial.envio_admissibilidade && setEnvio_admissibilidade(new Date(inicial.envio_admissibilidade));
            setTipo_processo(inicial.tipo_processo || 1);
            if (inicial.iniciais_sqls && inicial.iniciais_sqls.length > 0) {
                setNums_sql(inicial.iniciais_sqls.map((sql) => sql.sql));
            }
            if (inicial.interfaces) {
                setInterface_sehab(inicial.interfaces.interface_sehab);
                setInterface_siurb(inicial.interfaces.interface_siurb);
                setInterface_smc(inicial.interfaces.interface_smc);
                setInterface_smt(inicial.interfaces.interface_smt);
                setInterface_svma(inicial.interfaces.interface_svma);
                setNum_sehab(inicial.interfaces.num_sehab || '');
                setNum_siurb(inicial.interfaces.num_siurb || '');
                setNum_smc(inicial.interfaces.num_smc || '');
                setNum_smt(inicial.interfaces.num_smt || '');
                setNum_svma(inicial.interfaces.num_svma || '');
            }
        }
    }

    const handleAddSQL = () => {
        setAddNumSQLStatusAlert(false);
        if (num_sql != '' && validoNum_sql) {
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
                                    if (numSei.length > 0) numSei = formatarSei(e.target.value);
                                    if (numSei) {
                                        setSei(numSei);
                                    }
                                }}
                                error={!validaDigitoSei(sei) && sei.length > 18}
                                disabled={inicial ? true : false}
                                required={inicial ? false : true}
                            />
                            {(!validaDigitoSei(sei) && sei.length > 18) && <FormLabel sx={{ color: 'red' }}>SEI inválido</FormLabel>}
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
                    <Grid xs={12} sm={12} md={12} lg={5} xl={5}>
                        <FormControl>
                            <FormLabel>Tipo de processo</FormLabel>
                            <Select value={tipo_processo} id='tipo_processo' name='tipo_processo' placeholder='Tipo de processo' onChange={(_, v) => setTipo_processo(v ? v : 1)}>
                                <Option value={1}>Próprio de SMUL</Option>
                                <Option value={2}>Múltiplas interfaces</Option>
                            </Select>
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
                                    if (aprova.length > 0) aprova = formatarAprovaDigital(e.target.value);
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
                                    if (fisico.length > 0) fisico = formatarFisico(e.target.value);
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
                    <Grid xs={12} container sx={{ display: tipo_processo === 1 ? 'none' : 'block' }}>
                        <Grid xs={12}><Divider><Chip color="primary">Interfaces</Chip></Divider></Grid>
                        <Grid xs={12} container>
                            <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    label="SEHAB"
                                    checked={interface_sehab}
                                    onChange={(e) => setInterface_sehab(e.target.checked)}
                                />
                            </Grid>
                            <Grid xs={12} lg={8} xl={10} sx={!interface_sehab ? { display: 'none' } : {}}>
                                <Input
                                    id="num_sehab"
                                    name="num_sehab"
                                    placeholder="Processo SEHAB"
                                    type="text"
                                    value={num_sehab}
                                    onChange={(e) => {
                                        var sehab = e.target.value;
                                        if (sehab.length > 0) sehab = formatarSei(e.target.value);
                                        setNum_sehab(sehab && sehab);
                                    }}
                                    required={interface_sehab}
                                    error={interface_sehab && !validaDigitoSei(num_sehab) && num_sehab.length > 18}
                                    title={interface_sehab && !validaDigitoSei(num_sehab) && num_sehab.length > 18 ? 'SEI inválido' : ''}
                                />
                                {(!validaDigitoSei(sei) && sei.length > 18) && <FormLabel sx={{ color: 'red' }}>SEI inválido</FormLabel>}
                            </Grid>
                        </Grid>
                        <Grid xs={12} container>
                            <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    label="SIURB"
                                    checked={interface_siurb}
                                    onChange={(e) => setInterface_siurb(e.target.checked)}
                                />
                            </Grid>
                            <Grid xs={12} lg={8} xl={10} sx={!interface_siurb ? { display: 'none' } : {}}>
                                <Input
                                    placeholder="Processo SIURB"
                                    type="text"
                                    value={num_siurb}
                                    onChange={(e) => {
                                        var siurb = e.target.value;
                                        if (siurb.length > 0) siurb = formatarSei(e.target.value);
                                        setNum_siurb(siurb && siurb);
                                    }}
                                    required={interface_siurb}
                                    error={interface_siurb && !validaDigitoSei(num_siurb) && num_siurb.length > 18}
                                    title={interface_siurb && !validaDigitoSei(num_siurb) && num_siurb.length > 18 ? 'SEI inválido' : ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12} container>
                            <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    label="SMC"
                                    checked={interface_smc}
                                    onChange={(e) => setInterface_smc(e.target.checked)}
                                />
                            </Grid>
                            <Grid xs={12} lg={8} xl={10} sx={!interface_smc ? { display: 'none' } : {}}>
                                <Input
                                    placeholder="Processo SMC"
                                    type="text"
                                    value={num_smc}
                                    onChange={(e) => {
                                        var smc = e.target.value;
                                        if (smc.length > 0) smc = formatarSei(e.target.value);
                                        setNum_smc(smc && smc);
                                    }}
                                    required={interface_smc}
                                    error={interface_smc && !validaDigitoSei(num_smc) && num_smc.length > 18}
                                    title={interface_smc && !validaDigitoSei(num_smc) && num_smc.length > 18 ? 'SEI inválido' : ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12} container>
                            <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    label="SMT"
                                    checked={interface_smt}
                                    onChange={(e) => setInterface_smt(e.target.checked)}
                                />
                            </Grid>
                            <Grid xs={12} lg={8} xl={10} sx={!interface_smt ? { display: 'none' } : {}}>
                                <Input
                                    placeholder="Processo SMT"
                                    type="text"
                                    value={num_smt}
                                    onChange={(e) => {
                                        var smt = e.target.value;
                                        if (smt.length > 0) smt = formatarSei(e.target.value);
                                        setNum_smt(smt && smt);
                                    }}
                                    required={interface_smt}
                                    error={interface_smt && !validaDigitoSei(num_smt) && num_smt.length > 18}
                                    title={interface_smt && !validaDigitoSei(num_smt) && num_smt.length > 18 ? 'SEI inválido' : ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12} container>
                            <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    label="SVMA"
                                    checked={interface_svma}
                                    onChange={(e) => setInterface_svma(e.target.checked)}
                                />
                            </Grid>
                            <Grid xs={12} lg={8} xl={10} sx={!interface_svma ? { display: 'none' } : {}}>
                                <Input
                                    placeholder="Processo SVMA"
                                    type="text"
                                    value={num_svma}
                                    onChange={(e) => {
                                        var svma = e.target.value;
                                        if (svma.length > 0) svma = formatarSei(e.target.value);
                                        setNum_svma(svma && svma);
                                    }}
                                    required={interface_svma}
                                    error={interface_svma && !validaDigitoSei(num_svma) && num_svma.length > 18}
                                    title={interface_svma && !validaDigitoSei(num_svma) && num_svma.length > 18 ? 'SEI inválido' : ''}
                                />
                            </Grid>
                        </Grid>
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
                                        if (numSql.length > 0) numSql = formatarSql(numSql);
                                        setNum_sql(numSql && numSql);
                                    }}
                                    endDecorator={
                                        <IconButton
                                            variant='solid'
                                            color='primary'
                                            onClick={handleAddSQL}
                                            disabled={!validoNum_sql}
                                        >
                                            <Add />
                                        </IconButton>
                                    }
                                />
                                {(!validoNum_sql && num_sql.length > 13) && <FormLabel sx={{ color: 'red' }}>SQL inválido</FormLabel>}
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
                <Button size="sm" variant="solid" onClick={enviaDados} disabled={!validaDigitoSei(sei)}>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}