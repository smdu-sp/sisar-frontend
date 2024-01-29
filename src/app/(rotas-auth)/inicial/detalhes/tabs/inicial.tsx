import { IInicial, IniciaisService } from "@/shared/services/inicial.services";
import { Add, Cancel, PlaylistAddCheckCircleRounded } from "@mui/icons-material"
import { Alert, Button, Card, FormControl, FormLabel, IconButton, Input, Select, Table, Option, Grid } from "@mui/joy"
import { useEffect, useState } from "react";
import { IAlvaraTipo, IPaginadoAlvaraTipo } from "@/shared/services/alvara-tipo.services";
import * as alvaraTiposService from "@/shared/services/alvara-tipo.services";
import MaskedInput from "@/components/MaskedInput";

export default function DadosIniciaisTab (props: {
    id: string;
}) {
    const { id } = props;
    const [registerData, setRegisterData] = useState<IInicial>();
    const [alvaraTipos, setAlvaraTipos] = useState<IAlvaraTipo[]>([]);
    const [nums_sql, setNums_sql] = useState<string[]>([]);
    const [addNumSQLStatus, setAddNumSQLStatus] = useState<number>(0);
    const [addNumSQLStatusAlert, setAddNumSQLStatusAlert] = useState<boolean>(false);

    const handleAddSQL = () => {
        setAddNumSQLStatusAlert(false);
        const inputSql = document.getElementById('num_sql_input') as HTMLInputElement;
        const num_sql_input = inputSql.value;
        if (num_sql_input != '') {
            if (nums_sql.includes(num_sql_input)){
                setAddNumSQLStatus(1);
            } else {
                setAddNumSQLStatus(0);
                setNums_sql([...nums_sql, num_sql_input]);
            }
            inputSql.value = '';
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
                }
            }
        });

        alvaraTiposService.buscarTudo().then((result: IPaginadoAlvaraTipo) => {
            if (result) {
                if (result instanceof Error){
                    alert(result.message);
                } else {
                    setAlvaraTipos(result.data);
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
                                <MaskedInput
                                    mask="0000.0000/0000000-0"
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
                                <Select>
                                    <Option value={0}>Próprio de SMUL</Option>
                                    <Option value={1}>Múltiplas interfaces</Option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={6} xl={4}>
                            <FormControl>
                                <FormLabel>Tipo de alvará</FormLabel>
                                <Select>
                                    {alvaraTipos.map((alvaraTipo) => (
                                        <Option value={alvaraTipo.id}>{alvaraTipo.nome}</Option>
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
                                    required={id ? false : true}
                                />
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
                                    required={id ? false : true}
                                />
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
                                    required={id ? false : true}
                                />
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
                                <MaskedInput
                                    mask="000.000.0000-0"
                                    id="num_sql_input"
                                    name="num_sql_input"
                                    placeholder="SQL"
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