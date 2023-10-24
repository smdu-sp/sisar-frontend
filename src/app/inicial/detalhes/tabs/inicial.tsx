import { IInicial, IniciaisService } from "@/shared/services/inicial";
import { zodResolver } from "@hookform/resolvers/zod";
import { Add, Cancel, Check, PlaylistAddCheckCircleRounded } from "@mui/icons-material"
import { Alert, Button, Card, FormControl, FormLabel, IconButton, Input, Select, Table, Option, Box, Grid } from "@mui/joy"
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import { inicialSchema } from "../[id]/schema";
import InputMask from "react-input-mask";
import { AlvaraTipoService, IAlvaraTipo } from "@/shared/services/alvara-tipo";

export default function DadosIniciaisTab (props: {
    id: string;
}) {
    const { id } = props;
    const [registerData, setRegisterData] = useState<IInicial>();
    const [alvaraTipos, setAlvaraTipos] = useState<IAlvaraTipo[]>([]);
    const [nums_sql, setNums_sql] = useState<string[]>([]);
    const [num_sql_input, setNum_sql_input] = useState<string>('');
    const [addNumSQLStatus, setAddNumSQLStatus] = useState<number>(0);
    const [addNumSQLStatusAlert, setAddNumSQLStatusAlert] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
      resolver: zodResolver(inicialSchema),
      defaultValues: {
        sei: '',
        tipo_processo: '',
      },
    });

    const setFormData = (data: IInicial) => {
        setValue('sei', data.sei);
        setValue('decreto', data.decreto);
        console.log(data.decreto);
    }

    const handleAddSQL = () => {
        setAddNumSQLStatusAlert(false);
        if (num_sql_input != '') {
            if (nums_sql.includes(num_sql_input)){
                setAddNumSQLStatus(1);
            } else {
                setAddNumSQLStatus(0);
                setNums_sql([...nums_sql, num_sql_input]);
            }
            setNum_sql_input('');
        }
        setAddNumSQLStatusAlert(true);
    }

    const removeRegister = (index: number) => {
        setAddNumSQLStatusAlert(false);
        setNums_sql(nums_sql.filter((_, i) => i !== index));
        setAddNumSQLStatus(2);
        setAddNumSQLStatusAlert(true);
    }

    const clearFields = () => {
        setNum_sql_input('');
        setNums_sql([]);
        setAddNumSQLStatusAlert(false);
    }

    const alertConfigs = [{
        message: 'SQL adicionado com sucesso.',
        color: 'success',
        icon: <PlaylistAddCheckCircleRounded />
    },{
        message: 'SQL já adicionado.',
        color: 'warning',
        icon: <Cancel />
    },{
        message: 'SQL removido com sucesso.',
        color: 'success',
        icon: <PlaylistAddCheckCircleRounded />
    }]

    useEffect(() => {
        id && IniciaisService.findOne(id as string).then((result: IInicial | Error) => {
            if (result) {
                if (result instanceof Error){
                    alert(result.message);
                    window.location.href = '/inicial/detalhes';
                } else {
                    setRegisterData(result);
                    setFormData(result);
                }
            }
        });

        AlvaraTipoService.findAll().then((result: IAlvaraTipo[] | Error) => {
            if (result) {
                if (result instanceof Error){
                    alert(result.message);
                } else {
                    setAlvaraTipos(result);
                }
            }
        });
    }, []);
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
                                    {...register("sei", { required: 'Campo SEI é obrigatório.' })}
                                    id="sei"
                                    name="sei"
                                    placeholder="Número de SEI"
                                    type="text"
                                    required={id ? false : true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                            <FormControl>
                                <FormLabel>Tipo de requerimento</FormLabel>
                                <Input
                                    {...register("tipo_requerimento", { required: 'Tipo Requerimento é obrigatório.' })}
                                    id="tipo_requerimento"
                                    name="tipo_requerimento"
                                    placeholder="Tipo Requerimento"
                                    type="text"
                                    required={id ? false : true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                            <FormControl>
                                <FormLabel>Requerimento</FormLabel>
                                <Input
                                    {...register("requerimento", { required: 'Requerimento é obrigatório.' })}
                                    id="requerimento"
                                    name="requerimento"
                                    placeholder="Requerimento"
                                    type="text"
                                    required={id ? false : true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                            <FormControl>
                                <FormLabel>Num. Aprova Digital</FormLabel>
                                <Input
                                    {...register("aprova_digital")}
                                    id="aprova_digital"
                                    name="aprova_digital"
                                    placeholder="Aprova digital"
                                    type="text"
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                            <FormControl>
                                <FormLabel>Tipo de processo</FormLabel>
                                <Controller
                                    name='tipo_processo'
                                    control={control}
                                    render={({ field }) => (
                                        <Select>
                                            <Option value={0}>Próprio de SMUL</Option>
                                            <Option value={1}>Múltiplas interfaces</Option>
                                        </Select>
                                    )}
                                >
                                </Controller>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                            <FormControl>
                                <FormLabel>Tipo de alvará</FormLabel>
                                <Controller
                                    name='alvara_tipo_id'
                                    control={control}
                                    render={({ field }) => (
                                        <Select>
                                            {alvaraTipos.map((alvaraTipo) => (
                                                <Option value={alvaraTipo.id}>{alvaraTipo.nome}</Option>
                                            ))}
                                        </Select>
                                    )}
                                >
                                </Controller>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                            <FormControl>
                                <FormLabel>Num. Processo Físico</FormLabel>
                                <Input
                                    {...register("processo_fisico")}
                                    id="processo_fisico"
                                    name="processo_fisico"
                                    placeholder="Processo Físico"
                                    type="text"
                                    required={id ? false : true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                            <FormControl>
                                <FormLabel>Num. Processo Físico</FormLabel>
                                <Input
                                    {...register("processo_fisico")}
                                    id="processo_fisico"
                                    name="processo_fisico"
                                    placeholder="Processo Físico"
                                    type="text"
                                    required={id ? false : true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                            <FormControl>
                                <FormLabel>Num. Processo Físico</FormLabel>
                                <Input
                                    {...register("processo_fisico")}
                                    id="processo_fisico"
                                    name="processo_fisico"
                                    placeholder="Processo Físico"
                                    type="text"
                                    required={id ? false : true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                            <FormControl>
                                <FormLabel>Num. Processo Físico</FormLabel>
                                <Input
                                    {...register("processo_fisico")}
                                    id="processo_fisico"
                                    name="processo_fisico"
                                    placeholder="Processo Físico"
                                    type="text"
                                    required={id ? false : true}
                                />
                            </FormControl>
                        </Grid>
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
                                    id="nums_sql"
                                    name="nums_sql"
                                    placeholder="SQL"
                                    onChange={(event) => setNum_sql_input(event.target.value)}
                                    value={num_sql_input}
                                    type="text"
                                    endDecorator={
                                        <IconButton 
                                            variant='solid'
                                            color='primary'
                                            onClick={handleAddSQL}
                                        >
                                            <Add />
                                        </IconButton>
                                    }
                                />
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
                                        <th colSpan={2} style={{ textAlign: 'center'}}>Nº SQL</th>
                                    </tr>
                                </thead>
                                <tbody style={{ width: '100%', backgroundColor: '' }}>
                                    {nums_sql?.map((num_sql, index) => (
                                        <tr key={index}>
                                            <td>{num_sql}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                <IconButton
                                                    color='danger'
                                                    onClick={() => {removeRegister(index)}}
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