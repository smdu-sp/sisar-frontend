'use client'

import * as inicialServices from "@/shared/services/inicial.services";
import { IInicial } from "@/shared/services/inicial.services";
import { Add, Cancel, PlaylistAddCheckCircleRounded } from "@mui/icons-material"
import { Alert, Button, Card, FormControl, FormLabel, IconButton, Input, Select, Table, Option, Grid, ColorPaletteProp, ChipPropsColorOverrides, CardOverflow, CardActions } from "@mui/joy"
import { OverridableStringUnion } from '@mui/types';
import { ReactNode, useEffect, useState } from "react";
import { IAlvaraTipo, IPaginadoAlvaraTipo } from "@/shared/services/alvara-tipo.services";
import * as alvaraTiposService from "@/shared/services/alvara-tipo.services";
import { useRouter } from "next/navigation";


export default function DadosIniciaisTab(props: {
    id: string;
}) {

    const router = useRouter();

    const { id } = props;
    const [registerData, setRegisterData] = useState<IInicial>();
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
    const [tipo_processo, setTipo_processo] = useState<number>(1);
    const [envio_admissibilidade, setEnvio_admissibilidade] = useState<Date>(new Date());
    const [alvara_tipo_id, setAlvara_tipo_id] = useState<string>('');
    const [status, setStatus] = useState<number>(1);
    const [processo_fisico, setProcesso_fisico] = useState<string>('');
    const [data_protocolo, setData_protocolo] = useState<Date>(new Date());
    const [obs, setObs] = useState<string>('');
    const decreto = true;

    const enviaDados = () => {
        inicialServices.criar({ decreto, sei, tipo_requerimento, requerimento, aprova_digital, tipo_processo, envio_admissibilidade, alvara_tipo_id, status, processo_fisico, data_protocolo, obs })
            .then(() => {
                // router.push('/inicial');
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

    const handleAddSQL = () => {
        setAddNumSQLStatusAlert(false);
        if (num_sql != '' && validoNum_sql) {
            if (nums_sql.includes(num_sql)) {
                setAddNumSQLStatus(1);
            } else {
                setAddNumSQLStatus(0);
                setNums_sql([...nums_sql, num_sql]);
                setNum_sql('');
            }
        }
        setAddNumSQLStatusAlert(true);
    }

    const removeRegister = (index: number) => {
        setAddNumSQLStatusAlert(false);
        setNums_sql(nums_sql.filter((_, i) => i !== index));
        setAddNumSQLStatus(2);
        setAddNumSQLStatusAlert(true);
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
        alvaraTiposService.buscarTudo().then((result: IPaginadoAlvaraTipo) => {
            if (result) {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setAlvaraTipos(result.data);
                }
            }
        });
    }, [id]);
    return (
        <Card
            variant='plain'
        >
            <Grid
                container
                direction='row'
                alignItems='flex-start'
                justifyContent='flex-start'
                spacing={4}
                display='flex'
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '0.5em',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--joy-palette-background-level1)',
                        borderRadius: '10px',
                    }
                }}
            >
                <Grid
                    container
                    direction='row'
                    alignItems='flex-start'
                    justifyContent='flex-start'
                    spacing={2}
                    xs={12} sm={12} md={12} lg={8} xl={8}
                >
                    <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                        <FormControl>
                            <FormLabel>SEI</FormLabel>
                            <Input
                                id="sei"
                                name="sei"
                                placeholder="Número de SEI"
                                type="text"
                                value={sei}
                                onChange={(event) => {
                                    var numSei = event.target.value;
                                    if (numSei.length > 0) numSei = formatarSei(event.target.value);
                                    setSei(numSei && numSei);
                                }}
                                required={id ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                        <FormControl>
                            <FormLabel>Tipo de requerimento</FormLabel>
                            <Input
                                id="tipo_requerimento"
                                name="tipo_requerimento"
                                placeholder="Tipo Requerimento"
                                type="text"
                                value={tipo_requerimento}
                                onChange={e => setTipo_requerimento(e.target.value)}
                                required={id ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                        <FormControl>
                            <FormLabel>Requerimento</FormLabel>
                            <Input
                                id="requerimento"
                                name="requerimento"
                                placeholder="Requerimento"
                                type="text"
                                value={requerimento}
                                onChange={e => setRequerimento(e.target.value)}
                                required={id ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                        <FormControl>
                            <FormLabel>Num. Aprova Digital</FormLabel>
                            <Input
                                id="aprova_digital"
                                name="aprova_digital"
                                placeholder="Aprova digital"
                                value={aprova_digital}
                                onChange={e => setAprova_digital(e.target.value)}
                                type="text"
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                        <FormControl>
                            <FormLabel>Tipo de processo</FormLabel>
                            <Select value={tipo_processo} id='tipo_processo' name='tipo_processo' placeholder='Tipo de processo' onChange={(_, v) => setTipo_processo(v ? v : 1)}>
                                <Option value={1}>Próprio de SMUL</Option>
                                <Option value={2}>Múltiplas interfaces</Option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                        <FormControl>
                            <FormLabel>Tipo de alvará</FormLabel>
                            <Select value={alvara_tipo_id} id='id_alvara' name='id_alvara' placeholder='Tipo de alvara' onChange={(_, v) => setAlvara_tipo_id(v ? v : '')}>
                                {alvaraTipos.map((alvaraTipo) => (
                                    <Option key={alvaraTipo.id} value={alvaraTipo.id}>{alvaraTipo.nome}</Option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                        <FormControl>
                            <FormLabel>Num. Processo Físico</FormLabel>
                            <Input
                                id="processo_fisico"
                                name="processo_fisico"
                                placeholder="Processo Físico"
                                type="text"
                                value={processo_fisico}
                                onChange={e => setProcesso_fisico(e.target.value)}
                                required={id ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                        <FormControl>
                            <FormLabel>Data Protocolo</FormLabel>
                            <Input
                                id="data_protocolo"
                                name="data_protocolo"
                                placeholder=""
                                type="date"
                                value={data_protocolo.toISOString().split('T')[0]}
                                onChange={e => setData_protocolo(new Date(e.target.value))}
                                required={id ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                        <FormControl>
                            <FormLabel>Envio Admissibilidade</FormLabel>
                            <Input
                                id="envio_admissibilidade"
                                name="envio_admissibilidade"
                                placeholder=""
                                type="date"
                                value={envio_admissibilidade.toISOString().split('T')[0]}
                                onChange={e => setEnvio_admissibilidade(new Date(e.target.value))}
                                required={id ? false : true}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            <Select value={status} id='status' name='status' placeholder='Status' onChange={(_, v) => setStatus(v ? v : 1)}>
                                <Option value={1}>Aberto</Option>
                                <Option value={2}>Fechado</Option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={6} xl={8}>
                        <FormControl>
                            <FormLabel>Observação</FormLabel>
                            <Input
                                id="obs"
                                name="obs"
                                placeholder=""
                                value={obs}
                                onChange={e => setObs(e.target.value)}
                                type="text"
                                required={true}
                            />
                            <FormLabel sx={{ color: 'red', display: 'none' }}>Campo obrigatório</FormLabel>
                        </FormControl>

                    </Grid>
                    <CardOverflow sx={{ marginLeft: 'auto' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button size="sm" variant="outlined" color="neutral" onClick={() => { }}>
                                Cancelar
                            </Button>
                            <Button size="sm" variant="solid" onClick={enviaDados}>
                                Salvar
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Grid>
                <Grid
                    container
                    direction='row'
                    alignItems='flex-start'
                    justifyContent='center'
                    sx={{
                        backgroundColor: 'neutral.softBg',
                        borderRadius: 'md',
                    }}
                    padding={2}
                    spacing={1}
                    xs={12} sm={12} md={12} lg={4} xl={4}
                >
                    <Grid xs={12}>
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
                    <Grid xs={12}>
                        <Alert
                            variant="soft"
                            color={alertConfigs[addNumSQLStatus].color}
                            sx={{ display: addNumSQLStatusAlert ? 'flex' : 'none' }}
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
                                                    onClick={() => { removeRegister(index) }}
                                                >
                                                    <Cancel />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Grid>}
                </Grid>
            </Grid>
        </Card>
    )
}