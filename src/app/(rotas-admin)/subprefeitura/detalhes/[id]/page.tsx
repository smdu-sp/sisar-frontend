'use client'

import Content from "@/components/Content";
import { useContext, useEffect, useState } from "react";
import * as subprefeituraServices from "@/shared/services/subprefeitura.services";
import { Box, Button, Card, CardActions, CardOverflow, FormControl, FormHelperText, FormLabel, Input, Option, Select, Skeleton, Stack } from "@mui/joy";
import { InfoOutlined } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import { ISubprefeitura } from "@/shared/services/subprefeitura.services";
import { AlertsContext } from "@/providers/alertsProvider";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    boolean,
  infer as Infer,
  number,
  object,
  string,
  z
} from "zod";


const schema = object({
    nome: string().min(2, { message: "O nome deve ter pelo menos 2 letras" }),
    sigla: string().min(2, { message: "A sigla deve ter pelo menos 2 letras" }),
    status: number().min(0).max(1)
});
type Schema = Infer<typeof schema>;

export default function SubprefeituraDetalhes(props: { params: { id: string } }) {
    const [idSubprefeitura, setIdSubprefeitura] = useState<string>('aawd');
    const [nome, setNome] = useState<string>('');
    const [sigla, setSigla] = useState<string>('');
    const [status, setStatus] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { id } = props.params;
    const { setAlert } = useContext(AlertsContext);
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<Schema>({
        mode: "onChange",
        resolver: zodResolver(schema),
        values: { nome, sigla, status }
    });
    
    const onSubmit = (data: Schema) => {
        console.log(data);
        if (!id) {
            subprefeituraServices.criar(data)
                .then(() => {
                    router.push('/subprefeitura?notification=0');
                })
        } else {
            subprefeituraServices.atualizar({ id, ...data })
                .then(() => {
                    router.push('/subprefeitura?notification=1');
                })
        }
    }

    useEffect(() => {
        setIsLoading(true);
        if (id) {
            subprefeituraServices.buscarPorId(id)
                .then((response: ISubprefeitura) => {
                    setIdSubprefeitura(response.id);
                    setNome(response.nome);
                    setSigla(response.sigla);
                    setStatus(response.status);
                    setIsLoading(false);
                });
        }
    }, [id]);

    return (
        <Content
            breadcrumbs={[
                { label: 'Subprefeitura', href: '/subprefeitura' },
                { label: nome ? nome : 'Nova Subprefeitura', href: '/subprefeitura/detalhes/' + idSubprefeitura || '' },
            ]}
            titulo={nome ? nome : 'Nova Subprefeitura'}
            pagina="Subprefeitura"
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
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={2}>
                                <FormControl sx={{ flexGrow: 0.9 }} error={Boolean(errors.nome)}>
                                    <FormLabel>Nome</FormLabel>
                                    {isLoading ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="nome"
                                        control={control}
                                        defaultValue={nome}
                                        render={({ field: { ref, ...field }}) => {
                                            return (<>
                                                <Input
                                                    type="text"
                                                    startDecorator={<AccountBalanceIcon />}
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
                                <FormControl sx={{ flexGrow: 0.1 }} error={Boolean(errors.sigla)}>
                                    <FormLabel>Sigla</FormLabel>
                                    {isLoading ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="sigla"
                                        control={control}
                                        defaultValue={sigla}
                                        render={({ field: { ref, ...field }}) => {
                                            return (<>
                                                <Input
                                                    type="text"
                                                    startDecorator={<AccountBalanceIcon />}
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
                            <Stack direction="row" spacing={2}>
                                <FormControl sx={{ flexGrow: 1 }} error={Boolean(errors.status)}>
                                    <FormLabel>Status</FormLabel>
                                    {isLoading ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="status"
                                        control={control}
                                        defaultValue={status}
                                        render={({ field: { ref, ...field }}) => {
                                            return (<>
                                                <Select
                                                    startDecorator={<AccountBalanceIcon />}
                                                    placeholder="Status"
                                                    {...field}
                                                    onChange={(_, value) => setStatus(Number(value))}
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
                        </Stack>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm" variant="outlined" color="neutral" onClick={() => router.back()}>
                                    Cancelar
                                </Button>
                                <Button size="sm" variant="solid" color="primary" type="submit" disabled={!isValid}>
                                    Salvar
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>
                </form>
            </Box>
        </Content>
    );
}
