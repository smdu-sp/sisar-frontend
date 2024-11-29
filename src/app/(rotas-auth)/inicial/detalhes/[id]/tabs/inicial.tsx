'use client'

import * as inicialServices from "@/shared/services/inicial.services";
import { IInicial } from "@/shared/services/inicial.services";
import { Add, Cancel, Check, PlaylistAddCheckCircleRounded } from "@mui/icons-material"
import { Alert, Button, Card, FormControl, FormLabel, IconButton, Input, Select, Table, Option, Grid, ColorPaletteProp, ChipPropsColorOverrides, Box, ModalDialog, DialogTitle, DialogContent, Stack, List, ListItem, Skeleton, FormHelperText, Checkbox } from "@mui/joy"
import { OverridableStringUnion } from '@mui/types';
import { ReactNode, useContext, useEffect, useState } from "react";
import { IAlvaraTipo } from "@/shared/services/alvara-tipo.services";
import * as alvaraTiposService from "@/shared/services/alvara-tipo.services";
import { useRouter } from "next/navigation";
import * as comum from "@/shared/services/comum.services";
import { AlertsContext } from "@/providers/alertsProvider";
import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import { Modal } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    infer as Infer,
    boolean,
    date,
    number,
    object,
    string,
    z,
} from "zod";
import { useSearchParams } from 'next/navigation';

export const dynamicParams = true;

const schema = object({
    sei: string().min(18, { message: "O SEI deve ter pelo menos 18 caracteres" }),
    alvara_tipo_id: string({ message: "Selecione um tipo de alvara" }).min(1, { message: "Selecione um tipo de alvara" }),
    tipo_requerimento: number().min(1, { message: "Selecione um tipo de requerimento" }),
    requerimento: string().min(1, { message: "Tamanho mínimo é 1" }).max(3, { message: "Tamanho máximo é 3" }),
    pagamento: number().min(1, { message: "Selecione o tipo de pagamento" }),
    data_limiteSmul: date(),
    aprova_digital: string().min(2, { message: "O requerimento deve ter pelo menos 2 letras" }).optional().or(z.literal('')),
    processo_fisico: string().min(2, { message: "O processo fisico deve ter pelo menos 2 letras" }).optional().or(z.literal('')),
    data_protocolo: date(),
    envio_admissibilidade: date(),
    obs: string(),
    decreto: boolean(),
    requalifica_rapido: boolean(),
    associado_reforma: boolean(),
});
type Schema = Infer<typeof schema>;

export default function InicialTab({ inicial }: { inicial?: IInicial } ) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const novoProcesso = searchParams.get('novo-processo');

    const [alvaraTipos, setAlvaraTipos] = useState<IAlvaraTipo[]>([]);
    const [num_sql, setNum_sql] = useState<string>('');
    const [nums_sql, setNums_sql] = useState<string[]>([]);
    const [addNumSQLStatus, setAddNumSQLStatus] = useState<number>(0);
    const [addNumSQLStatusAlert, setAddNumSQLStatusAlert] = useState<boolean>(false);

    const [modalSqlSequencial, setModalSqlSequencial] = useState(false);
    const [sqlInicial, setSqlInicial] = useState<string>('');
    const [sqlFinal, setSqlFinal] = useState<string>('');
    const [sqlSequencial, setSqlSequencial] = useState<string[]>([]);

    const [carregando, setCarregando] = useState<boolean>(true);

    const [sei, setSei] = useState<string>('');
    const [tipo_requerimento, setTipo_requerimento] = useState<number>(1);
    const [requerimento, setRequerimento] = useState<string>('');
    const [aprova_digital, setAprova_digital] = useState<string>('');
    const [envio_admissibilidade, setEnvio_admissibilidade] = useState<Date>(new Date());
    const [alvara_tipo_id, setAlvara_tipo_id] = useState<string>('');
    const [status, setStatus] = useState<number>(1);
    const [processo_fisico, setProcesso_fisico] = useState<string>('');
    const [data_protocolo, setData_protocolo] = useState<Date>(new Date());
    const [obs, setObs] = useState<string>('');
    const [data_limiteSmul, setData_limiteSmul] = useState<Date>(new Date())
    const [pagamento, setPagamento] = useState(1);
    const [requalifica_rapido, setRequalifica_rapido] = useState(false);
    const [associado_reforma, setAssociado_reforma] = useState(false);
    const [test, setTeste] = useState(false);
    const decreto = true;
    const { setAlert } = useContext(AlertsContext);

    const {
        control,
        handleSubmit,
        reset,
        getValues,
        formState: { errors, isValid, isSubmitSuccessful }
    } = useForm<Schema>({
        mode: "onChange",
        resolver: zodResolver(schema),
        values: {
            sei,
            alvara_tipo_id,
            tipo_requerimento,
            requerimento,
            pagamento,
            data_limiteSmul,
            aprova_digital,
            processo_fisico,
            data_protocolo,
            envio_admissibilidade,
            obs,
            decreto,
            requalifica_rapido,
            associado_reforma
        }
    });

    const onSubmit = (data: Schema) => {
        data.decreto = true;
        if (!inicial) {
            inicialServices.criar(data)
                .then((response: IInicial) => {
                    if (response) {
                        setAlert('Inicial salvo!', 'Dados salvos com sucesso!', 'success', 3000, Check);
                        router.push(`/inicial`);
                    }
                });
        } else if (inicial) {
            inicialServices.atualizar(inicial.id, { ...data })
                .then((response: IInicial) => {
                    if (response) {
                        setAlert('Inicial salvo!', 'Dados salvos com sucesso!', 'success', 3000, Check);
                        router.push(`/inicial`);
                    }
                });
        }
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
            setPagamento(inicial.pagamento);
            setAssociado_reforma(inicial.associado_reforma);
            setRequalifica_rapido(inicial.requalifica_rapido);
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
        if (novoProcesso) setSei(comum.formatarSei(novoProcesso));
        alvaraTiposService.listaCompleta().then((result: IAlvaraTipo[]) => {
            if (result) {
                if (result instanceof Error) {
                    alert(result.message);
                    return
                } 
                setAlvaraTipos(result);
            }
        });
        setCarregando(false);
    }, [inicial]);

    function adicionaDigitoSql(sqlNumero: number): string {
        var soma = 0;
        const verificador = [1, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < 10; i++) soma += parseInt(sqlNumero.toString()[i]) * verificador[i];
        soma = soma % 11;
        if (soma === 10) soma = 1;
        if (soma > 1 && soma < 10) soma = 11 - soma;
        return comum.formatarSql(sqlNumero.toString() + soma.toString());
    }

    function adicionarListaSql() {
        for (const sql_seq of sqlSequencial) {
            if (sql_seq != '' && comum.validaDigitoSql(sql_seq)) {
                if (!nums_sql.includes(sql_seq)) {
                    if (inicial) {
                        inicialServices.adicionaSql(inicial.id, sql_seq).then((response: IInicial) => {
                            if (response.id) setNums_sql((estado) => [...estado, sql_seq]);
                        })
                    }
                    if (!inicial) setNums_sql((estado) => [...estado, sql_seq]);
                }
            }
        }
        limparSequencial();
    }

    function limparSequencial() {
        setSqlSequencial([]);
        setSqlInicial('');
        setSqlFinal('');
    }

    function gerarListaSql() {
        const sqlInicialLimpo = parseInt(sqlInicial.replace(/\D/g, '').slice(0, -1));
        const sqlFinalLimpo = parseInt(sqlFinal.replace(/\D/g, '').slice(0, -1));
        setSqlSequencial([]);
        setTeste(true);
        for (let i = sqlInicialLimpo; i <= sqlFinalLimpo; i++) 
            setSqlSequencial((estado) => [...estado, adicionaDigitoSql(i)]);
    }

    function comparaSqls(): boolean {
        const sqlInicialLimpo = parseInt(sqlInicial.replace(/\D/g, '').slice(0, -1));
        const sqlFinalLimpo = parseInt(sqlFinal.replace(/\D/g, '').slice(0, -1));
        return sqlInicialLimpo < sqlFinalLimpo;
    }

    return (
        <>
            <Modal open={modalSqlSequencial} onClose={() => setModalSqlSequencial(false)}>
                <ModalDialog>
                    <DialogTitle>SQL</DialogTitle>
                    <DialogContent>Adicionar lista de SQL sequenciais</DialogContent>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>SQL inicial</FormLabel>
                            <Input autoFocus required value={sqlInicial}
                                onChange={(e) => {
                                    var numSql = e.target.value;
                                    if (numSql.length > 0) numSql = comum.formatarSql(numSql);
                                    setSqlInicial(numSql && numSql);
                                }}
                                error={(!comum.validaDigitoSql(sqlInicial) && sqlInicial.length > 13)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>SQL Final</FormLabel>
                            <Input required value={sqlFinal}
                                onChange={(e) => {
                                    var numSql = e.target.value;
                                    if (numSql.length > 0) numSql = comum.formatarSql(numSql);
                                    setSqlFinal(numSql && numSql);
                                }}
                                error={(!comum.validaDigitoSql(sqlFinal) && sqlFinal.length > 13)}
                            />
                        </FormControl>
                        <Button onClick={() => gerarListaSql()}
                            disabled={!comum.validaDigitoSql(sqlInicial) || !comum.validaDigitoSql(sqlFinal) || !comparaSqls()}
                        >Gerar Lista</Button>
                    </Stack>
                    {sqlSequencial.length > 0 && <><Stack spacing={2} sx={{ maxHeight: 300, overflow: 'hidden', overflowY: 'auto' }}>
                        <Table sx={{ tableLayout: 'fixed', maxWidth: 300 }}>
                            <thead>
                                <tr>
                                    <th colSpan={2}>SQL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sqlSequencial && sqlSequencial.length > 0 && sqlSequencial.map((sql, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{sql}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                <IconButton
                                                    color='danger'
                                                    onClick={() => { sqlSequencial.splice(index, 1); }}
                                                >
                                                    <Cancel />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                            </tfoot>
                        </Table>
                    </Stack>
                    <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: 1 }}>
                        <Button onClick={() => { limparSequencial() }} sx={{ flexGrow: 1 }} color="danger">Limpar Lista</Button>
                        <Button onClick={() => { adicionarListaSql() }} sx={{ flexGrow: 1 }} color="success">Adicionar Lista</Button>
                    </Stack></>}
                </ModalDialog>
            </Modal>
            <Box sx={{ p: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                <FormControl error={Boolean(errors.sei) || !(comum.validaDigitoSei(getValues().sei))}>
                                    <FormLabel>SEI</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="sei"
                                        control={control}
                                        defaultValue={sei}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="text"
                                                    startDecorator={<AccountBalanceIcon />}
                                                    placeholder="SEI"
                                                    {...field}
                                                    onChange={(e) => {
                                                        var numSei = e.target.value;
                                                        if (numSei.length > 0) numSei = comum.formatarSei(e.target.value);
                                                        if (numSei) {
                                                            field.onChange(numSei);
                                                        }

                                                    }}
                                                    readOnly={(novoProcesso && comum.validaDigitoSei(novoProcesso)) || false}
                                                />
                                                {Boolean(errors.sei) && <FormHelperText>
                                                    {errors.sei?.message}
                                                </FormHelperText>}
                                                {!comum.validaDigitoSei(getValues().sei) && <FormHelperText>
                                                    SEI Inválido
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                                <FormControl>
                                    <FormLabel>Tipo de alvará</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="alvara_tipo_id"
                                        control={control}
                                        defaultValue={alvara_tipo_id}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    startDecorator={<AccountBalanceIcon />}
                                                    placeholder="Tipo de Alvará"
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    {(alvaraTipos && alvaraTipos.length > 0) && alvaraTipos.map((alvaraTipo) => (
                                                        <Option key={alvaraTipo.id} value={alvaraTipo.id}>{alvaraTipo.nome}</Option>
                                                    ))}
                                                </Select>
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={4} sm={4} md={4} lg={2} xl={2}>
                                <FormControl>
                                    <FormLabel title='Tipo de Requerimento' sx={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>Tipo Req.</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="tipo_requerimento"
                                        control={control}
                                        defaultValue={tipo_requerimento}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    placeholder="Tipo de Requerimento"
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={1}>IPTU</Option>
                                                    <Option value={2}>INCRA</Option>
                                                    <Option value={3}>Área Pública</Option>
                                                </Select>
                                                {errors.tipo_requerimento && <FormHelperText>
                                                    {errors.tipo_requerimento?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={8} sm={8} md={8} lg={4} xl={4}>
                                <FormControl>
                                    <FormLabel>Requerimento</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="requerimento"
                                        control={control}
                                        defaultValue={requerimento}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="text"
                                                    placeholder="Requerimento"
                                                    error={Boolean(errors.requerimento)}
                                                    {...field}
                                                />
                                                {errors.requerimento && <FormHelperText color="danger">
                                                    {errors.requerimento?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6} md={6} lg={2} xl={2}>
                                <FormControl>
                                    <FormLabel>Pagamento</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="pagamento"
                                        control={control}
                                        defaultValue={pagamento}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    placeholder="Tipo de Requerimento"
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={1}>SIM</Option>
                                                    <Option value={2}>NÃO</Option>
                                                    <Option value={3}>SIM-VINCULADO</Option>
                                                    <Option value={4}>ISENTO-VINCULADO</Option>
                                                </Select>
                                                {errors.pagamento && <FormHelperText>
                                                    {errors.pagamento?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6} md={6} lg={4} xl={4}>
                                <FormControl>
                                    <FormLabel>Prazo</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="data_limiteSmul"
                                        control={control}
                                        defaultValue={new Date(data_limiteSmul.toLocaleString().split('T')[0])}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="date"
                                                    placeholder="Prazo"
                                                    error={Boolean(errors.data_limiteSmul)}
                                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                    onChange={(event) => {
                                                        const newValue = new Date(event.target.value + 'T00:00:00Z');
                                                        field.onChange(newValue);
                                                    }}
                                                    onBlur={field.onBlur}
                                                    disabled={field.disabled}
                                                    name={field.name}
                                                />
                                                {errors.data_limiteSmul && <FormHelperText color="danger">
                                                    {errors.data_limiteSmul?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                                <FormControl>
                                    <FormLabel>Num. Aprova Digital</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="aprova_digital"
                                        control={control}
                                        defaultValue={aprova_digital}
                                        rules={{ required: false }}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="text"
                                                    startDecorator={<AccountBalanceIcon />}
                                                    placeholder="Aprova Digital"
                                                    error={Boolean(errors.aprova_digital)}
                                                    {...field}
                                                    onChange={e => {
                                                        var aprova = e.target.value;
                                                        if (aprova.length > 0) aprova = comum.formatarAprovaDigital(e.target.value);
                                                        field.onChange(aprova && aprova);
                                                    }}
                                                />
                                                {errors.aprova_digital && <FormHelperText color="danger">
                                                    {errors.aprova_digital?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                                <FormControl>
                                    <FormLabel>Num. Processo Físico</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="processo_fisico"
                                        control={control}
                                        defaultValue={processo_fisico}
                                        rules={{ required: false }}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="text"
                                                    startDecorator={<AccountBalanceIcon />}
                                                    placeholder="Processo físico"
                                                    error={Boolean(errors.processo_fisico)}
                                                    {...field}
                                                    required={false}
                                                    onChange={e => {
                                                        var fisico = e.target.value;
                                                        if (fisico.length > 0) fisico = comum.formatarFisico(e.target.value);
                                                        field.onChange(fisico && fisico);
                                                    }}
                                                />
                                                {errors.processo_fisico && <FormHelperText color="danger">
                                                    {errors.processo_fisico?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                                <FormControl>
                                    <FormLabel>Data Protocolo</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="data_protocolo"
                                        control={control}
                                        defaultValue={new Date(data_protocolo.toLocaleString().split('T')[0])}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="date"
                                                    placeholder="Prazo"
                                                    error={Boolean(errors.data_protocolo)}
                                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                    onChange={(event) => {
                                                        const newValue = new Date(event.target.value + 'T00:00:00Z');
                                                        field.onChange(newValue);
                                                    }}
                                                    onBlur={field.onBlur}
                                                    disabled={field.disabled}
                                                    name={field.name}
                                                />
                                                {errors.data_protocolo && <FormHelperText color="danger">
                                                    {errors.data_protocolo?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                                <FormControl>
                                    <FormLabel>Envio Admissibilidade</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="envio_admissibilidade"
                                        control={control}
                                        defaultValue={new Date(envio_admissibilidade.toLocaleString().split('T')[0])}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="date"
                                                    placeholder="Prazo"
                                                    error={Boolean(errors.envio_admissibilidade)}
                                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                    onChange={(event) => {
                                                        const newValue = new Date(event.target.value + 'T00:00:00Z');
                                                        field.onChange(newValue);
                                                    }}
                                                    onBlur={field.onBlur}
                                                    disabled={field.disabled}
                                                    name={field.name}
                                                />
                                                {errors.envio_admissibilidade && <FormHelperText color="danger">
                                                    {errors.envio_admissibilidade?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                                <FormControl>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="requalifica_rapido"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Checkbox
                                                    label="Requalifica rápido"
                                                    checked={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.checked);
                                                    }}    
                                                    onBlur={field.onBlur}
                                                    disabled={field.disabled}
                                                    name={field.name}                                           
                                                />
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                                <FormControl>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="associado_reforma"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Checkbox
                                                    label="Associado a reforma"
                                                    checked={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.checked);
                                                    }}    
                                                    onBlur={field.onBlur}
                                                    disabled={field.disabled}
                                                    name={field.name}                                           
                                                />
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormLabel>Observação</FormLabel>
                                {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                    name="obs"
                                    control={control}
                                    defaultValue={obs}
                                    render={({ field: { ref, ...field } }) => {
                                        return (<>
                                            <Textarea
                                                placeholder="Digite aqui..."
                                                minRows={2}
                                                maxRows={4}
                                                error={Boolean(errors.obs)}
                                                {...field}
                                            />
                                            {errors.obs && <FormHelperText color="danger">
                                                {errors.obs?.message}
                                            </FormHelperText>}
                                        </>);
                                    }}
                                />}
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
                                        <Button sx={{ mt: 1 }} onClick={() => setModalSqlSequencial(true)}>Adicionar SQL Sequencial</Button>
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
                                    <Grid xs={12} sx={{ maxHeight: '400px', width: '103%', overflowY: 'auto' }}>
                                        <Table>
                                            <thead style={{ width: '100%' }}>
                                                <tr>
                                                    <th colSpan={2} style={{ textAlign: 'center' }}>Nº SQL</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ width: '100%', backgroundColor: '' }}>
                                                {nums_sql && nums_sql.length > 0 && nums_sql?.map((num_sql, index) => (
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
                        <Button 
                            size="sm" 
                            variant="plain" 
                            color="neutral" 
                            onClick={() => router.push(`/inicial`)}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            size="sm" 
                            variant="solid" 
                            disabled={!isValid} 
                            type="submit"
                            sx={{ borderRadius: 4 }}
                        >
                            Salvar
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}
