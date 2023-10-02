'use client'

import Content from '@/components/Content';
import { zodResolver } from "@hookform/resolvers/zod";
import { IInicial, IniciaisService } from '@/shared/services/inicial';
import { set, useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import * as z from 'zod';
import { inicialSchema } from './schema';
import { Box, FormControl, FormLabel, Input, Sheet, Select, Option, Button } from '@mui/joy';
import { Cancel, Check } from '@mui/icons-material';
import { useRouter } from 'next/router';

type FormData = z.infer<typeof inicialSchema>;

export default function InicialDetalhes(props: any) {
    const { id } = props.params;
    const [registerData, setRegisterData] = useState<IInicial>();
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
            <form>
                <FormControl>
                    <Sheet
                        className="OrderTableContainer"
                        variant="outlined"
                        sx={{
                        display: { xs: 'none', sm: 'initial' },
                        width: '100%',
                        borderRadius: 'sm',
                        flexShrink: 1,
                        overflow: 'auto',
                        overflowX: 'hidden',
                        minHeight: 0,
                        padding: 3,
                        '&::-webkit-scrollbar': {
                            width: '0.5em',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'var(--joy-palette-background-level1)',
                            borderRadius: '10px',
                        }
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >   
                            <Box>
                                <FormLabel>SEI</FormLabel>
                                <Input
                                    {...register("sei", { required: 'Campo SEI é obrigatório.' })}
                                    id="sei"
                                    name="sei"
                                    placeholder="Número de SEI"
                                    type="text"
                                    required={id ? false : true}
                                />
                            </Box>   
                            <Box>
                                <FormLabel>Número SQL</FormLabel>
                                <Input
                                    {...register("num_sql", { required: 'Campo obrigatório.' })}
                                    id="num_sql"
                                    name="num_sql"
                                    placeholder="Número SQL"
                                    type="text"
                                    required={id ? false : true}
                                />
                            </Box>   
                            <Box>
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
                            </Box>
                            <Box>
                                <FormLabel>Tipo de requerimento</FormLabel>
                                <Input
                                    {...register("tipo_requerimento", { required: 'Campo obrigatório.' })}
                                    id="tipo_requerimento"
                                    name="tipo_requerimento"
                                    placeholder="Tipo Requerimento"
                                    type="text"
                                    required={id ? false : true}
                                />
                            </Box>
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
                                >Limpar</Button>
                                <Button
                                    variant="solid"
                                    color="success"
                                    startDecorator={<Check />}
                                >Salvar</Button>
                            </Box>
                        </Box>
                    </Sheet>
                </FormControl>
            </form>

        </Content>
    );
}
