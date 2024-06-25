'use client'

import Content from "@/components/Content";
import { useContext, useEffect, useState } from "react";
import * as alvaraTiposService from "@/shared/services/alvara-tipo.services";
import { IAlvaraTipo } from "@/shared/services/alvara-tipo.services";
import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormHelperText, FormLabel, Input, Option, Select, Skeleton, Stack } from "@mui/joy";
import { Check } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { AlertsContext } from "@/providers/alertsProvider";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
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
    prazo_admissibilidade_smul: number().min(0).max(1),
    reconsideracao_smul: number().min(0).max(1),
    reconsideracao_smul_tipo: number().min(1).max(2),
    analise_reconsideracao_smul: number().min(0).max(1),
    prazo_analise_smul1: number().min(0).max(1),
    prazo_analise_smul2: number().min(0).max(1),
    prazo_emissao_alvara_smul: number().min(0).max(1),
    prazo_admissibilidade_multi: number().min(0).max(1),
    reconsideracao_multi: number().min(0).max(1),
    reconsideracao_multi_tipo: number().min(1).max(2),
    analise_reconsideracao_multi: number().min(0).max(1),
    prazo_analise_multi1: number().min(0).max(1),
    prazo_analise_multi2: number().min(0).max(1),
    prazo_emissao_alvara_multi: number().min(0).max(1),
    prazo_comunique_se: number().min(1),
    prazo_encaminhar_coord: number().min(0).max(1),
    status: number().min(0).max(1)
});
type Schema = Infer<typeof schema>;

export default function AlvaraTipoDetalhes(props: any) {
    const { id } = props.params;
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [prazo_admissibilidade_smul, setPrazo_admissibilidade_smul] = useState(0);
    const [reconsideracao_smul, setReconsideracao_smul] = useState(0);
    const [reconsideracao_smul_tipo, setReconsideracao_smul_tipo] = useState(1);
    const [analise_reconsideracao_smul, setAnalise_reconsideracao_smul] = useState(0);
    const [prazo_analise_smul1, setPrazo_analise_smul1] = useState(0);
    const [prazo_analise_smul2, setPrazo_analise_smul2] = useState(0);
    const [prazo_emissao_alvara_smul, setPrazo_emissao_alvara_smul] = useState(0);
    const [prazo_admissibilidade_multi, setPrazo_admissibilidade_multi] = useState(0);
    const [reconsideracao_multi, setReconsideracao_multi] = useState(0);
    const [reconsideracao_multi_tipo, setReconsideracao_multi_tipo] = useState(1);
    const [analise_reconsideracao_multi, setAnalise_reconsideracao_multi] = useState(0);
    const [prazo_analise_multi1, setPrazo_analise_multi1] = useState(0);
    const [prazo_analise_multi2, setPrazo_analise_multi2] = useState(0);
    const [prazo_emissao_alvara_multi, setPrazo_emissao_alvara_multi] = useState(0);
    const [prazo_comunique_se, setPrazo_comunique_se] = useState<number>(0);
    const [prazo_encaminhar_coord, setPrazo_encaminhar_coord] = useState(0);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [status, setStatus] = useState(0);
    const { setAlert } = useContext(AlertsContext);


    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitSuccessful }
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
        console.log(data);
    }

    useEffect(() => {
        if (id) {
            alvaraTiposService.buscarPorId(id)
                .then((response: IAlvaraTipo) => {
                    setNome(response.nome);
                    setStatus(response.status ? 1 : 0);
                    setPrazo_comunique_se(response.prazo_comunique_se);
                    setPrazo_encaminhar_coord(response.prazo_encaminhar_coord);
                    setPrazo_admissibilidade_smul(response.prazo_admissibilidade_smul);
                    setReconsideracao_smul(response.reconsideracao_smul);
                    setReconsideracao_smul_tipo(response.reconsideracao_smul_tipo);
                    setAnalise_reconsideracao_smul(response.analise_reconsideracao_smul);
                    setPrazo_analise_smul1(response.prazo_analise_smul1);
                    setPrazo_analise_smul2(response.prazo_analise_smul2);
                    setPrazo_emissao_alvara_smul(response.prazo_emissao_alvara_smul);
                    setPrazo_admissibilidade_multi(response.prazo_admissibilidade_multi);
                    setReconsideracao_multi(response.reconsideracao_multi);
                    setReconsideracao_multi_tipo(response.reconsideracao_multi_tipo);
                    setAnalise_reconsideracao_multi(response.analise_reconsideracao_multi);
                    setPrazo_analise_multi1(response.prazo_analise_multi1);
                    setPrazo_analise_multi2(response.prazo_analise_multi2);
                    setPrazo_emissao_alvara_multi(response.prazo_emissao_alvara_multi);
                });
        }
        setCarregando(false);
    }, [id]);

    const enviaDados = () => {
        if (id) {
            alvaraTiposService.atualizar(id, {
                nome,
                prazo_admissibilidade_smul,
                reconsideracao_smul,
                reconsideracao_smul_tipo,
                analise_reconsideracao_smul,
                prazo_analise_smul1,
                prazo_analise_smul2,
                prazo_emissao_alvara_smul,
                prazo_admissibilidade_multi,
                analise_reconsideracao_multi,
                reconsideracao_multi,
                reconsideracao_multi_tipo,
                prazo_analise_multi1,
                prazo_analise_multi2,
                prazo_emissao_alvara_multi,
                prazo_comunique_se,
                prazo_encaminhar_coord,
                status
            })
                .then(() => {
                    router.push('/alvara-tipos?notification=1');
                });
        } else {
            alvaraTiposService.criar({
                nome,
                prazo_admissibilidade_smul,
                reconsideracao_smul,
                reconsideracao_smul_tipo,
                analise_reconsideracao_smul,
                prazo_analise_smul1,
                prazo_analise_smul2,
                prazo_emissao_alvara_smul,
                prazo_admissibilidade_multi,
                analise_reconsideracao_multi,
                reconsideracao_multi,
                reconsideracao_multi_tipo,
                prazo_analise_multi1,
                prazo_analise_multi2,
                prazo_emissao_alvara_multi,
                prazo_comunique_se,
                prazo_encaminhar_coord,
                status
            })
                .then(() => {
                    router.push('/alvara-tipos?notification=0');
                });
        }
    }
    return (
        <Content
            breadcrumbs={[
                { label: 'Tipos de alvará', href: '/alvara-tipos' },
                { label: 'Detalhes', href: '/alvara-tipos/detalhes/' + id && id },
            ]}
            titulo={id ? nome ? nome : 'Detalhes' : 'Novo'}
            pagina="alvara-tipos"
        >
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card sx={{ width: '100%' }}>
                        <Stack spacing={2} >
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '70%', md: '70%' }}>
                                    <FormControl>
                                        <FormLabel>Nome</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="nome"
                                            control={control}
                                            defaultValue={nome}
                                            render={({ field: { ref, ...field } }) => {
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
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '30%', md: '30%' }}>
                                    <FormControl>
                                        <FormLabel>Status</FormLabel>
                                        <Select value={status} onChange={(_, v) => setStatus(v ? v : 0)} required>
                                            <Option value={1}>Ativo</Option>
                                            <Option value={0}>Inativo</Option>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl>
                                        <FormLabel>Prazo comunique-se</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prazo_comunique_se"
                                            control={control}
                                            defaultValue={prazo_comunique_se}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        startDecorator={<AccountBalanceIcon />}
                                                        placeholder="prazo_comunique_se"
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
                                    <FormControl>
                                        <FormLabel>Encaminhamento para coordenadoria</FormLabel>
                                        <Input
                                            placeholder="Encaminhamento para coordenadoria"
                                            value={prazo_encaminhar_coord}
                                            type="number"
                                            onChange={e => setPrazo_encaminhar_coord(parseInt(e.target.value))}
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            required
                                        />
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
                                    <FormControl>
                                        <FormLabel>Prazo admissibilidade SMUL</FormLabel>
                                        <Input
                                            placeholder="Admissibilidade SMUL"
                                            value={prazo_admissibilidade_smul}
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            onChange={e => setPrazo_admissibilidade_smul(parseInt(e.target.value))}
                                            required
                                        />
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl>
                                        <FormLabel>Emissão de alvará SMUL</FormLabel>
                                        <Input
                                            placeholder="Emissão de alvará SMUL"
                                            value={prazo_emissao_alvara_smul}
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            onChange={e => setPrazo_emissao_alvara_smul(parseInt(e.target.value))}
                                            required
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '60%', md: '60%' }}>
                                    <FormControl>
                                        <FormLabel>Reconsideração SMUL</FormLabel>
                                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                                            <Input
                                                placeholder="Reconsideração SMUL"
                                                value={reconsideracao_smul}
                                                type="number"
                                                slotProps={{
                                                    input: {
                                                        min: 0
                                                    },
                                                }}
                                                sx={{
                                                    flexGrow: 0.3,
                                                    borderTopRightRadius: 0,
                                                    borderBottomRightRadius: 0,
                                                }}
                                                onChange={e => setReconsideracao_smul(parseInt(e.target.value))}
                                                required
                                            />
                                            <Select
                                                sx={{
                                                    flexGrow: 0.7,
                                                    borderTopLeftRadius: 0,
                                                    borderBottomLeftRadius: 0,
                                                }}
                                                required
                                                value={reconsideracao_smul_tipo}
                                                onChange={(_, v) => v && setReconsideracao_smul_tipo(v)}
                                            >
                                                <Option value={1}>dias úteis</Option>
                                                <Option value={2}>dias corridos</Option>
                                            </Select>
                                        </Box>
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '40%', md: '40%' }}>
                                    <FormControl>
                                        <FormLabel>Análise de reconsideração SMUL</FormLabel>
                                        <Input
                                            placeholder="Análise de reconsideração SMUL"
                                            value={analise_reconsideracao_smul}
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            onChange={e => setAnalise_reconsideracao_smul(parseInt(e.target.value))}
                                            required
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>

                                    <FormControl>
                                        <FormLabel>1ª Análise SMUL</FormLabel>
                                        <Input
                                            placeholder="1ª Análise SMUL"
                                            value={prazo_analise_smul1}
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            onChange={e => setPrazo_analise_smul1(parseInt(e.target.value))}
                                            required
                                        />
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl>
                                        <FormLabel>2ª Análise SMUL</FormLabel>
                                        <Input
                                            placeholder="2ª Análise SMUL"
                                            value={prazo_analise_smul2}
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            onChange={e => setPrazo_analise_smul2(parseInt(e.target.value))}
                                            required
                                        />
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

                                    <FormControl>
                                        <FormLabel>Prazo admissibilidade Múlt. Interfaces</FormLabel>
                                        <Input
                                            placeholder="Admissibilidade Múlt. Interfaces"
                                            value={prazo_admissibilidade_multi}
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            onChange={e => setPrazo_admissibilidade_multi(parseInt(e.target.value))}
                                            required
                                        />
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl>
                                        <FormLabel>Emissão de alvará Múlt. Interfaces</FormLabel>
                                        <Input
                                            placeholder="Emissão de alvará Múlt. Interfaces"
                                            value={prazo_emissao_alvara_multi}
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            onChange={e => setPrazo_emissao_alvara_multi(parseInt(e.target.value))}
                                            required
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '60%', md: '60%' }}>
                                    <FormControl>
                                        <FormLabel>Reconsideração Múlt. Interfaces</FormLabel>
                                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                                            <Input
                                                placeholder="Reconsideração Múlt. Interfaces"
                                                value={reconsideracao_multi}
                                                type="number"
                                                slotProps={{
                                                    input: {
                                                        min: 0
                                                    },
                                                }}
                                                sx={{
                                                    flexGrow: 0.3,
                                                    borderTopRightRadius: 0,
                                                    borderBottomRightRadius: 0,
                                                }}
                                                onChange={e => setReconsideracao_multi(parseInt(e.target.value))}
                                                required
                                            />
                                            <Select
                                                sx={{
                                                    flexGrow: 0.7,
                                                    borderTopLeftRadius: 0,
                                                    borderBottomLeftRadius: 0,
                                                }}
                                                required
                                                value={reconsideracao_multi_tipo}
                                                onChange={(_, v) => v && setReconsideracao_multi_tipo(v)}
                                            >
                                                <Option value={1}>dias úteis</Option>
                                                <Option value={2}>dias corridos</Option>
                                            </Select>
                                        </Box>
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '40%', md: '40%' }}>
                                    <FormControl>
                                        <FormLabel>Análise de reconsideração Múlt. Interfaces</FormLabel>
                                        <Input
                                            placeholder="Análise de reconsideração Múlt. Interfaces"
                                            value={analise_reconsideracao_multi}
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            onChange={e => setAnalise_reconsideracao_multi(parseInt(e.target.value))}
                                            required
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>

                                    <FormControl>
                                        <FormLabel>1ª Análise Múlt. Interfaces</FormLabel>
                                        <Input
                                            placeholder="1ª Análise Múlt. Interfaces"
                                            value={prazo_analise_multi1}
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            onChange={e => setPrazo_analise_multi1(parseInt(e.target.value))}
                                            required
                                        />
                                    </FormControl>
                                </Stack>
                                <Divider />
                                <Stack width={{ xs: '100%', sm: '50%', md: '50%' }}>
                                    <FormControl>
                                        <FormLabel>2ª Análise Múlt. Interfaces</FormLabel>
                                        <Input
                                            placeholder="2ª Análise Múlt. Interfaces"
                                            value={prazo_analise_multi2}
                                            type="number"
                                            slotProps={{
                                                input: {
                                                    min: 0
                                                },
                                            }}
                                            onChange={e => setPrazo_analise_multi2(parseInt(e.target.value))}
                                            required
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Stack>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm" variant="outlined" color="neutral" onClick={() => router.back()}>
                                    Cancelar
                                </Button>
                                <Button size="sm" variant="solid" onClick={enviaDados}>
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
