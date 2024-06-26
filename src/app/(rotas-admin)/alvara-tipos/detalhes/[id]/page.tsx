'use client'

import Content from "@/components/Content";
import { useContext, useEffect, useState } from "react";
import * as alvaraTiposService from "@/shared/services/alvara-tipo.services";
import { IAlvaraTipo } from "@/shared/services/alvara-tipo.services";
import { Box, Button, Card, CardActions, CardOverflow, CircularProgress, Divider, FormControl, FormHelperText, FormLabel, Input, Option, Select, Skeleton, Stack } from "@mui/joy";
import { Check } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { AlertsContext } from "@/providers/alertsProvider";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import {
    infer as Infer,
    number,
    object,
    string,
    enum as zodEnum,
} from "zod";
import { MenuItem } from "@mui/material";

const schema = z.object({
    nome: string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
    prazo_admissibilidade_smul: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    reconsideracao_smul: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    reconsideracao_smul_tipo: z.coerce.number(),
    analise_reconsideracao_smul: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    prazo_analise_smul1: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    prazo_analise_smul2: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    prazo_emissao_alvara_smul: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    prazo_admissibilidade_multi: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    reconsideracao_multi: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    reconsideracao_multi_tipo: z.coerce.number(),
    analise_reconsideracao_multi: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    prazo_analise_multi1: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    prazo_analise_multi2: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    prazo_emissao_alvara_multi: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    prazo_comunique_se: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    prazo_encaminhar_coord: z.coerce.number().min(1, { message: "Valor minimo é 1" }),
    status: number()
});
type Schema = Infer<typeof schema>;

export default function AlvaraTipoDetalhes(props: any) {
    const { id } = props.params;
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [prazo_admissibilidade_smul, setPrazo_admissibilidade_smul] = useState<number>(0);
    const [reconsideracao_smul, setReconsideracao_smul] = useState<number>(0);
    const [reconsideracao_smul_tipo, setReconsideracao_smul_tipo] = useState<number>(0);
    const [analise_reconsideracao_smul, setAnalise_reconsideracao_smul] = useState<number>(0);
    const [prazo_analise_smul1, setPrazo_analise_smul1] = useState<number>(0);
    const [prazo_analise_smul2, setPrazo_analise_smul2] = useState<number>(0);
    const [prazo_emissao_alvara_smul, setPrazo_emissao_alvara_smul] = useState<number>(0);
    const [prazo_admissibilidade_multi, setPrazo_admissibilidade_multi] = useState<number>(0);
    const [reconsideracao_multi, setReconsideracao_multi] = useState<number>(0);
    const [reconsideracao_multi_tipo, setReconsideracao_multi_tipo] = useState<number>(0);
    const [analise_reconsideracao_multi, setAnalise_reconsideracao_multi] = useState<number>(0);
    const [prazo_analise_multi1, setPrazo_analise_multi1] = useState<number>(0);
    const [prazo_analise_multi2, setPrazo_analise_multi2] = useState<number>(0);
    const [prazo_emissao_alvara_multi, setPrazo_emissao_alvara_multi] = useState<number>(0);
    const [prazo_comunique_se, setPrazo_comunique_se] = useState<number>(0);
    const [prazo_encaminhar_coord, setPrazo_encaminhar_coord] = useState<number>(0);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [status, setStatus] = useState<number>(1);
    const { setAlert } = useContext(AlertsContext);


    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitted }
    } = useForm<Schema>({
        mode: "onChange",
        resolver: zodResolver(schema),
        values: {
            nome,
            prazo_admissibilidade_smul,
            reconsideracao_smul,
            reconsideracao_smul_tipo,
            analise_reconsideracao_smul,
            prazo_analise_smul1,
            prazo_analise_smul2,
            prazo_emissao_alvara_smul,
            prazo_admissibilidade_multi,
            reconsideracao_multi,
            reconsideracao_multi_tipo,
            analise_reconsideracao_multi,
            prazo_analise_multi1,
            prazo_analise_multi2,
            prazo_emissao_alvara_multi,
            prazo_comunique_se,
            prazo_encaminhar_coord,
            status
        }
    });

    const onSubmit = (data: Schema) => {
        if (!id) {
            alvaraTiposService.criar(data)
                .then(() => {
                    router.push('/alvara-tipos?notification=0');
                });
        } else {
            alvaraTiposService.atualizar(id, data)
                .then(() => {
                    router.push('/alvara-tipos?notification=1');
                });
        }

    }

    useEffect(() => {
        if (id) {
            alvaraTiposService.buscarPorId(id)
                .then((response: IAlvaraTipo) => {
                    setNome(response.nome);
                    setStatus(response.status);
                    setPrazo_comunique_se(response.prazo_comunique_se);
                    setPrazo_encaminhar_coord(response.prazo_encaminhar_coord);
                    setPrazo_admissibilidade_smul(response.prazo_admissibilidade_smul);
                    setReconsideracao_smul(response.reconsideracao_smul);
                    setReconsideracao_smul_tipo(response.reconsideracao_multi_tipo == 0 ? 0 : 1);
                    setAnalise_reconsideracao_smul(response.analise_reconsideracao_smul);
                    setPrazo_analise_smul1(response.prazo_analise_smul1);
                    setPrazo_analise_smul2(response.prazo_analise_smul2);
                    setPrazo_emissao_alvara_smul(response.prazo_emissao_alvara_smul);
                    setPrazo_admissibilidade_multi(response.prazo_admissibilidade_multi);
                    setReconsideracao_multi(response.reconsideracao_multi);
                    setReconsideracao_multi_tipo(response.reconsideracao_multi_tipo == 0 ? 0 : 1);
                    setAnalise_reconsideracao_multi(response.analise_reconsideracao_multi);
                    setPrazo_analise_multi1(response.prazo_analise_multi1);
                    setPrazo_analise_multi2(response.prazo_analise_multi2);
                    setPrazo_emissao_alvara_multi(response.prazo_emissao_alvara_multi);
                });
        }
        setCarregando(false);
    }, [id]);

    return (
        <Content
            breadcrumbs={[
                { label: 'Tipos de alvará', href: '/alvara-tipos' },
                { label: 'Detalhes', href: '/alvara-tipos/detalhes/' + id && id },
            ]}
            titulo={id ? nome ? nome : 'Detalhes' : 'Novo'}
            pagina="alvara-tipos"
        >

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        mx: 'auto',
                        width: '90%',
                        maxWidth: 800,
                        px: { xs: 2, md: 6 },
                        py: { xs: 2, md: 3 },
                    }}
                >
                    <Card sx={{ width: '100%' }}>
                        <Stack spacing={2} >
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '70%', md: '70%' }}>
                                    <FormControl error={Boolean(errors.nome)}>
                                        <FormLabel>Nome</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="nome"
                                            control={control}
                                            defaultValue={nome}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="text"
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
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '30%', md: '30%' }}>
                                    <FormControl error={Boolean(errors.status)}>
                                        <FormLabel>Status</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="status"
                                            control={control}
                                            defaultValue={status}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Select
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
                            </Stack>
                            <Divider />
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl error={Boolean(errors.prazo_comunique_se)}>
                                        <FormLabel>Prazo comunique-se</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_comunique_se"
                                            control={control}
                                            defaultValue={prazo_comunique_se}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="Prazo comunique-se"
                                                        error={Boolean(errors.prazo_comunique_se)}
                                                        {...field}
                                                    />
                                                    {errors.prazo_comunique_se && <FormHelperText color="danger">
                                                        {errors.prazo_comunique_se?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl error={Boolean(errors.prazo_encaminhar_coord)}>
                                        <FormLabel>Encaminhamento para coordenadoria</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_encaminhar_coord"
                                            control={control}
                                            defaultValue={prazo_encaminhar_coord}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="Encaminhamento para coordenadoria"
                                                        error={Boolean(errors.prazo_encaminhar_coord)}
                                                        {...field}
                                                    />
                                                    {errors.prazo_encaminhar_coord && <FormHelperText color="danger">
                                                        {errors.prazo_encaminhar_coord?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Card>
                    <Card sx={{ width: '100%' }}>
                        <Stack spacing={2} >
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl error={Boolean(errors.prazo_admissibilidade_smul)}>
                                        <FormLabel>Prazo admissibilidade SMUL</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_admissibilidade_smul"
                                            control={control}
                                            defaultValue={prazo_admissibilidade_smul}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="Prazo admissibilidade SMUL"
                                                        error={Boolean(errors.prazo_admissibilidade_smul)}
                                                        {...field}
                                                    />
                                                    {errors.prazo_admissibilidade_smul && <FormHelperText color="danger">
                                                        {errors.prazo_admissibilidade_smul?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl error={Boolean(errors.prazo_emissao_alvara_smul)}>
                                        <FormLabel>Emissão de alvará SMUL</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_emissao_alvara_smul"
                                            control={control}
                                            defaultValue={prazo_emissao_alvara_smul}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="Emissão de alvará SMUL"
                                                        error={Boolean(errors.prazo_emissao_alvara_smul)}
                                                        {...field}
                                                    />
                                                    {errors.prazo_emissao_alvara_smul && <FormHelperText color="danger">
                                                        {errors.prazo_emissao_alvara_smul?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '60%', md: '60%' }}>
                                    <FormControl error={Boolean(errors.reconsideracao_smul)}>
                                        <FormLabel>Reconsideração SMUL</FormLabel>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                                name="reconsideracao_smul"
                                                control={control}
                                                defaultValue={reconsideracao_smul}
                                                render={({ field: { ref, ...field } }) => {
                                                    return (<Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        sx={{ flexGrow: 0.6, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                                        placeholder="Reconsideração SMUL"
                                                        error={Boolean(errors.reconsideracao_smul)}
                                                        {...field}
                                                    />);
                                                }}
                                            />}
                                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                                name="reconsideracao_smul_tipo"
                                                control={control}
                                                defaultValue={reconsideracao_smul_tipo}
                                                render={({ field: { ref, ...field } }) => {
                                                    return (<Select
                                                        {...field}
                                                        onChange={(_, value) => field.onChange(value)}
                                                        sx={{ flexGrow: 0.4, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                    >
                                                        <Option value={1}>Dias Corridos</Option>
                                                        <Option value={0}>Dias Úteis</Option>
                                                    </Select>);
                                                }}
                                            />}
                                            </Box>
                                            {errors.reconsideracao_smul && <FormHelperText color="danger">
                                                {errors.reconsideracao_smul?.message}
                                            </FormHelperText>}
                                        </Box>
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '40%', md: '40%' }}>
                                    <FormControl error={Boolean(errors.analise_reconsideracao_smul)}>
                                        <FormLabel>Análise de reconsideração SMUL</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="analise_reconsideracao_smul"
                                            control={control}
                                            defaultValue={analise_reconsideracao_smul}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="Análise de reconsideração SMUL"
                                                        error={Boolean(errors.analise_reconsideracao_smul)}
                                                        {...field}
                                                    />
                                                    {errors.analise_reconsideracao_smul && <FormHelperText color="danger">
                                                        {errors.analise_reconsideracao_smul?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl error={Boolean(errors.prazo_analise_smul1)}>
                                        <FormLabel>1ª Análise SMUL</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_analise_smul1"
                                            control={control}
                                            defaultValue={prazo_analise_smul1}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="1ª Análise SMUL"
                                                        error={Boolean(errors.prazo_analise_smul1)}
                                                        {...field}
                                                    />
                                                    {errors.prazo_analise_smul1 && <FormHelperText color="danger">
                                                        {errors.prazo_analise_smul1?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl error={Boolean(errors.prazo_analise_smul2)}>
                                        <FormLabel>2ª Análise SMUL</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_analise_smul2"
                                            control={control}
                                            defaultValue={prazo_analise_smul2}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="2ª Análise SMUL"
                                                        error={Boolean(errors.prazo_analise_smul2)}
                                                        {...field}
                                                    />
                                                    {errors.prazo_analise_smul1 && <FormHelperText color="danger">
                                                        {errors.prazo_analise_smul2?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Card>
                    <Card sx={{ width: '100%' }}>
                        <Stack spacing={2} >
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl error={Boolean(errors.prazo_admissibilidade_multi)}>
                                        <FormLabel>Prazo admissibilidade Múlt. Interfaces</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_admissibilidade_multi"
                                            control={control}
                                            defaultValue={prazo_admissibilidade_multi}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="Prazo admissibilidade Múlt. Interfaces"
                                                        error={Boolean(errors.prazo_admissibilidade_multi)}
                                                        {...field}
                                                    />
                                                    {errors.prazo_admissibilidade_multi && <FormHelperText color="danger">
                                                        {errors.prazo_admissibilidade_multi?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl error={Boolean(errors.prazo_emissao_alvara_multi)}>
                                        <FormLabel>Emissão de alvará Múlt. Interfaces</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_emissao_alvara_multi"
                                            control={control}
                                            defaultValue={prazo_emissao_alvara_multi}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="Emissão de alvará Múlt. Interfaces"
                                                        error={Boolean(errors.prazo_emissao_alvara_multi)}
                                                        {...field}
                                                    />
                                                    {errors.prazo_emissao_alvara_multi && <FormHelperText color="danger">
                                                        {errors.prazo_emissao_alvara_multi?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '60%', md: '60%' }}>
                                    <FormControl error={Boolean(errors.reconsideracao_multi)}>
                                        <FormLabel>Reconsideração Múlt. Interfaces</FormLabel>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                                name="reconsideracao_multi"
                                                control={control}
                                                defaultValue={reconsideracao_multi}
                                                render={({ field: { ref, ...field } }) => {
                                                    return (<Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        sx={{ flexGrow: 0.6, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                                        placeholder="Reconsideração Múlt. Interfaces"
                                                        error={Boolean(errors.reconsideracao_multi)}
                                                        {...field}
                                                    />);
                                                }}
                                            />}
                                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                                name="reconsideracao_multi_tipo"
                                                control={control}
                                                defaultValue={reconsideracao_multi_tipo}
                                                render={({ field: { ref, ...field } }) => {
                                                    return (<Select
                                                        {...field}
                                                        onChange={(_, value) => field.onChange(value)}
                                                        sx={{ flexGrow: 0.4, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                    >
                                                        <Option value={1}>Dias Corridos</Option>
                                                        <Option value={0}>Dias Úteis</Option>
                                                    </Select>);
                                                }}
                                            />}
                                            </Box>
                                            {errors.reconsideracao_multi && <FormHelperText color="danger">
                                                {errors.reconsideracao_multi?.message}
                                            </FormHelperText>}
                                        </Box>
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '40%', md: '40%' }}>
                                    <FormControl error={Boolean(errors.analise_reconsideracao_multi)}>
                                        <FormLabel>Análise de reconsideração Múlt. Interfaces</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="analise_reconsideracao_multi"
                                            control={control}
                                            defaultValue={analise_reconsideracao_multi}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="Análise de reconsideração Múlt. Interfaces"
                                                        error={Boolean(errors.analise_reconsideracao_multi)}
                                                        {...field}
                                                    />
                                                    {errors.analise_reconsideracao_multi && <FormHelperText color="danger">
                                                        {errors.analise_reconsideracao_multi?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl error={Boolean(errors.prazo_analise_multi1)}>
                                        <FormLabel>1ª Análise Múlt. Interfaces</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_analise_multi1"
                                            control={control}
                                            defaultValue={prazo_analise_multi1}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="1ª Análise Múlt. Interfaces"
                                                        error={Boolean(errors.prazo_analise_multi1)}
                                                        {...field}
                                                    />
                                                    {errors.prazo_analise_multi1 && <FormHelperText color="danger">
                                                        {errors.prazo_analise_multi1?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl error={Boolean(errors.prazo_analise_multi2)}>
                                        <FormLabel>2ª Análise Múlt. Interfaces</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_analise_multi2"
                                            control={control}
                                            defaultValue={prazo_analise_multi2}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        slotProps={{
                                                            input: {
                                                                min: 0
                                                            },
                                                        }}
                                                        placeholder="2ª Análise Múlt. Interfaces"
                                                        error={Boolean(errors.prazo_analise_multi2)}
                                                        {...field}
                                                    />
                                                    {errors.prazo_analise_multi2 && <FormHelperText color="danger">
                                                        {errors.prazo_analise_multi2?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Stack>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm" variant="outlined" color="neutral" onClick={() => router.back()}>
                                    Cancelar
                                </Button>
                                <Button size="sm" variant="solid" color="primary" type="submit" disabled={!isValid}>
                                    {isSubmitted ?  <CircularProgress variant="solid" /> : "Salvar"}
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>
                </Box>
            </form>
        </Content>
    );
}
