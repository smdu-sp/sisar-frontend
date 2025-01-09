'use client'

import Content from "@/components/Content";
import { useEffect, useState } from "react";
import * as unidadeServices from "@/shared/services/unidade/unidade.services";
import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormHelperText, FormLabel, Input, Option, Select, Skeleton, Stack } from "@mui/joy";
// @ts-ignore
import { Business } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import { IUnidade } from "@/shared/services/unidade/unidade.services";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    infer as Infer,
    number,
    object,
    string,
} from "zod";

const schema = object({
    nome: string().min(2, { message: "O nome deve ter pelo menos 2 letras" }),
    sigla: string().min(2, { message: "A sigla deve ter pelo menos 2 letras" }),
    codigo: string().min(2, { message: "O nome deve ter pelo menos 2 letras" }),
    status: number().min(0).max(1),
});
type Schema = Infer<typeof schema>;

export default function UnidadeDetalhes(props: { params: { id: string } }) {
    const [idUnidade, setIdUnidade] = useState<string>('');
    const [status, setStatus] = useState<number>(1);
    const [nome, setNome] = useState<string>('');
    const [sigla, setSigla] = useState<string>('');
    const [codigo, setCodigo] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(true);
    const { id } = props.params;
    const router = useRouter();

    const onSubmit = (data: Schema) => {
        setCarregando(true);
        if (!id) unidadeServices.criar(data).then(() => {
            router.push('/unidades?notification=0');
            setCarregando(false);
        });
        else unidadeServices.atualizar({ id, ...data }).then(() => {
            router.push('/unidades?notification=1');
            setCarregando(false);
        });
    }

    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitSuccessful }
    } = useForm<Schema>({
        mode: "onChange",
        resolver: zodResolver(schema),
        values: { nome, codigo, sigla, status }
    });

    useEffect(() => {
        setCarregando(true);
        if (id) unidadeServices.buscarPorId(id)
            .then((response: IUnidade) => {
                setIdUnidade(response.id);
                setNome(response.nome);
                setSigla(response.sigla);
                setCodigo(response.codigo);
                setStatus(response.status ? 1 : 0);
            });
        setCarregando(false);
    }, [id]);

    return (
        <Content
            breadcrumbs={[
                { label: 'Unidades', href: '/unidades' },
                { label: nome ? nome : 'Nova Unidade', href: '/unidades/detalhes/' + idUnidade || '' },
            ]}
            titulo={nome ? nome : 'Nova Unidade'}
        >
            <Box
                sx={{
                    display: 'flex',
                    mx: 'auto',
                    width: '90%',
                    maxWidth: 800,
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <Card sx={{ width: '100%' }}>
                        <Stack spacing={2} >
                            <Stack direction="row" spacing={2}>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Nome</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="nome"
                                        control={control}
                                        defaultValue={nome}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="text"
                                                    startDecorator={<Business />}
                                                    placeholder="Nome"
                                                    error={Boolean(errors.nome)}
                                                    {...field}
                                                />
                                                {errors.nome && <FormHelperText color="danger">
                                                    {errors.nome?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Status</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="status"
                                        control={control}
                                        defaultValue={status}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    placeholder="Status"
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={1}>Ativo</Option>
                                                    <Option value={0}>Inativo</Option>
                                                </Select>
                                                {errors.status && <FormHelperText>
                                                    {errors.status?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Stack>
                            <Divider />
                            <Stack direction="row" spacing={2}>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Código</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="codigo"
                                        control={control}
                                        defaultValue={codigo}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="text"
                                                    placeholder="Código"
                                                    error={Boolean(errors.codigo)}
                                                    {...field}
                                                />
                                                {errors.codigo && <FormHelperText>
                                                    {errors.codigo?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Sigla</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="sigla"
                                        control={control}
                                        defaultValue={sigla}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="text"
                                                    placeholder="Sigla"
                                                    error={Boolean(errors.sigla)}
                                                    {...field}
                                                />
                                                {errors.sigla && <FormHelperText>
                                                    {errors.sigla?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Stack>
                        </Stack>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button 
                                    size="sm" 
                                    variant="plain" 
                                    color="neutral"
                                    onClick={() => router.back()}
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    size="sm" 
                                    variant="solid" 
                                    color="primary" 
                                    type="submit" 
                                    loading={carregando}
                                    loadingPosition='start'
                                    disabled={!isValid}
                                    sx={{ borderRadius: 4 }}
                                >
                                    Salvar
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>
                </form>
            </Box>
        </Content >
    );
}
