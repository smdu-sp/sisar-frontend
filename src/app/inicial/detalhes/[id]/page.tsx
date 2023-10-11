'use client'

import Content from '@/components/Content';
import { zodResolver } from "@hookform/resolvers/zod";
import { IInicial, IniciaisService } from '@/shared/services/inicial';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import * as z from 'zod';
import { inicialSchema } from './schema';
import { Box, FormControl, FormLabel, Input, Select, Option, Button, Table, IconButton, Card, Grid, Alert, TabList, Tabs, tabClasses, Tab, TabPanel } from '@mui/joy';
import { Add, Cancel, Check, PlaylistAddCheckCircleRounded } from '@mui/icons-material';
import { styled } from '@mui/joy/styles';
import React from 'react';

type FormData = z.infer<typeof inicialSchema>;

const StyledInput = styled('input')({
    border: 'none',
    minWidth: 0,
    outline: 0,
    padding: 0,
    paddingTop: '1em',
    flex: 1,
    color: 'inherit',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textOverflow: 'ellipsis',
    '&::placeholder': {
        opacity: 0,
        transition: '0.1s ease-out',
    },
    '&:focus::placeholder': {
        opacity: 1,
    },
    '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
        top: '0.5rem',
        fontSize: '0.75rem',
    },
    '&:focus ~ label': {
        color: 'var(--Input-focusedHighlight)',
    },
    '&:-webkit-autofill': {
        alignSelf: 'stretch', // to fill the height of the root slot
    },
    '&:-webkit-autofill:not(* + &)': {
        marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
        paddingInlineStart: 'var(--Input-paddingInline)',
        borderTopLeftRadius:
        'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
        borderBottomLeftRadius:
        'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
    },
});
  
const StyledLabel = styled('label')(({ theme }) => ({
    position: 'absolute',
    lineHeight: 1,
    top: 'calc((var(--Input-minHeight) - 1em) / 2)',
    color: theme.vars.palette.text.tertiary,
    fontWeight: theme.vars.fontWeight.md,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
}));
  
const InnerInput = React.forwardRef<
    HTMLInputElement,
    JSX.IntrinsicElements['input']
    >(function InnerInput(props, ref) {
    return (
        <React.Fragment>
        <StyledInput {...props} />
        <StyledLabel htmlFor={props.id}>{props.placeholder}</StyledLabel>
        </React.Fragment>
    );
});

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
                    <Tabs
                        defaultValue={0}
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
                            sx={{
                                [`& .${tabClasses.root}`]: {
                                fontSize: 'sm',
                                fontWeight: 'lg',
                                [`&[aria-selected="true"]`]: {
                                    color: 'primary.500',
                                    bgcolor: 'background.surface',
                                },
                                [`&.${tabClasses.focusVisible}`]: {
                                    outlineOffset: '-4px',
                                },
                                },
                            }}
                        >
                            <Tab variant="soft" >
                                Dados iniciais
                            </Tab>
                            <Tab variant="soft">
                                Distribuição
                            </Tab>
                            <Tab variant="soft">
                                Admissibilidade
                            </Tab>
                            <Tab variant="soft">
                                Coord. SMUL
                            </Tab>
                            <Tab variant="soft">
                                Secretarias
                            </Tab>
                            <Tab variant="soft" >
                                Conclusão
                            </Tab>
                        </TabList>
                        <TabPanel value={0} sx={{ 
                            flexGrow: 1,
                        }}>
                            <Card 
                                variant='plain'
                                sx={{
                                    width: '100%',
                                    borderRadius: 'sm',
                                    overflow: 'auto',
                                    overflowX: 'hidden',
                                    minHeight: 0,
                                    gap: 2,
                                    flexGrow: 1,
                                    display: 'flex',
                                }}
                            >
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
                                    <FormLabel>Tipo de requerimento</FormLabel>
                                    <Input
                                        {...register("tipo_requerimento", { required: 'Tipo Requerimento é obrigatório.' })}
                                        id="tipo_requerimento"
                                        name="tipo_requerimento"
                                        placeholder="Requerimento"
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
                            </Card>
                            <Card
                                variant='plain'
                                sx={{
                                    gap: 1,
                                    bottom: 0,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    position: 'absolute',
                                    right: 16,
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
                            </Card>
                        </TabPanel>
                        <TabPanel value={1}>
                            Distribuição
                        </TabPanel>
                        <TabPanel value={2}>
                            Admissibilidade
                        </TabPanel>
                        <TabPanel value={3}>
                            Coord. SMUL
                        </TabPanel>
                        <TabPanel value={4}>
                            Secretarias
                        </TabPanel>
                        <TabPanel value={5}>
                            Conclusão
                        </TabPanel>
                    </Tabs>
                    
        </Content>
    );
}
