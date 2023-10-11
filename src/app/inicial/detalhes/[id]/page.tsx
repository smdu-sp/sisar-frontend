'use client'

import Content from '@/components/Content';
import { zodResolver } from "@hookform/resolvers/zod";
import { IInicial, IniciaisService } from '@/shared/services/inicial';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import * as z from 'zod';
import { inicialSchema } from './schema';
import { Box, FormControl, FormLabel, Input, Select, Option, Button, Table, IconButton, Card, Grid, Alert } from '@mui/joy';
import { Add, Cancel, Check, PlaylistAddCheckCircleRounded } from '@mui/icons-material';

type FormData = z.infer<typeof inicialSchema>;

export default function InicialDetalhes(props: any) {
    const { id } = props.params;
    const [registerData, setRegisterData] = useState<IInicial>();
    const [nums_sql, setNums_sql] = useState<string[]>([]);
    const [num_sql_input, setNum_sql_input] = useState<string>('');
    const [addNumSQLStatus, setAddNumSQLStatus] = useState<number>(0);
    const [addNumSQLStatusAlert, setAddNumSQLStatusAlert] = useState<boolean>(false);
    const {
      handleSubmit,
      register,
      setValue,
      formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
      resolver: zodResolver(inicialSchema),
      defaultValues: {
        sei: '',
      },
    });

    const setFormData = (data: IInicial) => {
        setValue('sei', data.sei);
        setValue('num_sql', data.num_sql);
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
    }, []);

    return (
        <Content 
            titulo={id ? 'Detalhes' : 'Novo'}
            pagina='inicial'
            breadcrumbs={[{
                label: 'Inicial',
                href: '/inicial'
            },{
                label: 'Detalhes',
                href: '/inicial/detalhes'
            }]}
        >
                <Card
                    size='lg'
                    sx={{
                        width: '100%',
                        borderRadius: 'sm',
                        flexShrink: 1,
                        overflow: 'auto',
                        overflowX: 'hidden',
                        minHeight: 0,
                        gap: 2
                    }}
                >
                    <Grid container></Grid>
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
                    <FormControl>
                        <FormLabel>Decreto novo?</FormLabel>
                        <Select
                            {...register("decreto", { required: 'Campo obrigatório.' })}
                            id="decreto"
                            name="decreto"
                            required={id ? false : true}
                            value={registerData?.decreto}
                        >
                            <Option value={false}>Não</Option>
                            <Option value={true}>Sim</Option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Tipo de requerimento</FormLabel>
                        <Input
                            {...register("tipo_requerimento", { required: 'Campo obrigatório.' })}
                            id="tipo_requerimento"
                            name="tipo_requerimento"
                            placeholder="Tipo Requerimento"
                            type="text"
                            required={id ? false : true}
                        />
                    </FormControl>
                    <Card size='lg'>
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
                        {nums_sql.length > 0 &&
                        <Table>
                            <thead style={{ width: '100%' }}>
                                <tr>
                                    <th>SQL</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody style={{ width: '100%' }}>
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
                        </Table>}
                    </Card>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Button
                            variant="solid"
                            color="danger"
                            startDecorator={<Cancel />}
                            onClick={clearFields}
                        >Limpar</Button>
                        <Button
                            variant="solid"
                            color="success"
                            startDecorator={<Check />}
                        >Salvar</Button>
                    </Box>
                </Card>
        </Content>
    );
}
