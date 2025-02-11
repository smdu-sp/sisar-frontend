'use client'

import { IInicial } from "@/types/inicial/inicial.dto";
import { IAdmissibilidade } from "@/types/admissibilidade/admissibilidade.dto";
import React, { useEffect, useState } from "react";
import * as comum from "@/shared/services/common/comum.services";
import * as finalizacaoServices from "@/shared/services/finalizacao/finalizacao.service";
import { useRouter as useRouterNavigation } from "next/navigation";
import { Box, Button, Chip, Divider, FormControl, FormHelperText, FormLabel, Grid, Input, Option, Select, Skeleton, Textarea } from "@mui/joy";
import { AlertsContext } from '@/providers/alertsProvider';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    infer as Infer,
    z,
    object,
    string,
    boolean,
} from "zod";
import { Check } from "@mui/icons-material";

const schema = object({
    data_apostilamento: z.coerce.date(),
    data_conclusao: z.coerce.date(),
    data_emissao: z.coerce.date(),
    data_outorga: z.coerce.date(),
    data_resposta: z.coerce.date(),
    data_termo: z.coerce.date(),
    num_alvara: string().min(1, { message: "Tamanho mínimo é 1" }),
    obs: string(),
    outorga: boolean()
});
type Schema = Infer<typeof schema>;

export default function FinalizaçãoTab({ inicial, admissibilidade }: { inicial?: IInicial, admissibilidade?: IAdmissibilidade }) {
    const router = useRouterNavigation();

    const [data_apostilamento, setData_apostilamento] = useState<Date>(new Date())
    const [data_conclusao, setData_conclusao] = useState<Date>(new Date())
    const [data_emissao, setData_emissao] = useState<Date>(new Date())
    const [data_outorga, setData_outorga] = useState<Date>(new Date())
    const [data_resposta, setData_resposta] = useState<Date>(new Date())
    const [data_termo, setData_termo] = useState<Date>(new Date())
    const [num_alvara, setNum_alvara] = useState('')
    const [obs, setObs] = useState('')
    const [outorga, setOutorga] = useState<boolean>(true)
    const [conclusao, setConclusao] = useState<boolean>(true)
    const [finalizado, setFinalizado] = useState<boolean>(false)
    const { setAlert } = React.useContext(AlertsContext);
    const [carregando, setCarregando] = useState<boolean>(true);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<Schema>({
        mode: "onChange",
        resolver: zodResolver(schema),
        values: {
            data_apostilamento,
            data_conclusao,
            data_emissao,
            data_outorga,
            data_resposta,
            data_termo,
            num_alvara,
            obs,
            outorga
        }
    });

    const criar = async (data: Schema) => {
        const newData = { ...data, inicial_id: inicial?.id ? inicial?.id : 0 }
        await finalizacaoServices.criar(newData, conclusao)
            .then((response) => {
                if (response) {
                    setData_apostilamento(new Date());
                    setData_conclusao(new Date());
                    setData_emissao(new Date());
                    setData_outorga(new Date());
                    setData_resposta(new Date());
                    setData_termo(new Date());
                    setNum_alvara('');
                    setObs('');
                    setOutorga(true);
                    if (conclusao) setAlert('Processo Deferido!', 'Processo finalizado com sucesso!', 'success', 3000, Check)
                    if (!conclusao) setAlert('Processo Indeferido!', 'Processo finalizado com sucesso!', 'warning', 3000, Check)
                    buscaProId(response.inicial_id)
                }
            })
    }

    const buscaProId = async (id: number) => {
        await finalizacaoServices.BuscaId(id)
            .then((response) => {
                if (response.data_conclusao) {
                    setFinalizado(true)
                    setData_apostilamento(response.data_apostilamento)
                    setData_conclusao(response.data_conclusao)
                    setData_emissao(response.data_emissao)
                    setData_outorga(response.data_outorga)
                    setData_resposta(response.data_resposta)
                    setData_termo(response.data_termo)
                    setNum_alvara(response.num_alvara)
                    setObs(response.obs)
                    setOutorga(response.outorga)
                }
            })
    }

    useEffect(() => {
        buscaProId(inicial?.id ? inicial?.id : 0);
        setCarregando(false);
    }, [conclusao])

    const onSubmit = (data: Schema) => {
        criar(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ p: 2 }}>
                {admissibilidade && (<>
                    <Grid container xs={12} spacing={2} sx={{ p: 2, mb: 2 }}>
                        <Grid xs={12} lg={12}>
                            <FormControl>
                                <FormLabel>Processo</FormLabel>
                                <Input value={inicial?.sei ? comum.formatarSei(inicial?.sei) : ''} readOnly />
                            </FormControl>
                        </Grid>
                    </Grid>
                </>)}
                {inicial && inicial.envio_admissibilidade && (<>
                    <Grid xs={12}>
                        <Divider>
                            <Chip color="warning">Finalização</Chip>
                        </Divider>
                    </Grid>
                    <Grid container xs={12}>

                    </Grid>
                </>)}
                <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                    <Grid xs={12} lg={3}>
                        <FormControl sx={{ width: '100%' }} error={Boolean(errors.data_apostilamento)}>
                            <FormLabel>Data Apostilamento</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="data_apostilamento"
                                control={control}
                                defaultValue={data_apostilamento && new Date(data_apostilamento.toString().split('T')[0])}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Input
                                            type="date"
                                            placeholder="Prazo"
                                            error={Boolean(errors.data_apostilamento)}
                                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                            onChange={(event) => {
                                                const newValue = new Date(event.target.value);
                                                field.onChange(newValue);
                                            }}
                                            onBlur={field.onBlur}
                                            disabled={field.disabled}
                                            name="data_apostilamento"
                                        />
                                        {errors.data_apostilamento && <FormHelperText color="danger">
                                            {errors.data_apostilamento?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={3}>
                        <FormControl sx={{ width: '100%' }} error={Boolean(errors.data_conclusao)}>
                            <FormLabel>Data Conclusão</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="data_conclusao"
                                control={control}
                                defaultValue={data_conclusao && new Date(data_conclusao.toString().split('T')[0])}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Input
                                            type="date"
                                            placeholder="Prazo"
                                            error={Boolean(errors.data_conclusao)}
                                            value={field.value ? new Date(field.value)?.toISOString()?.split('T')[0] : ''}
                                            onChange={(event) => {
                                                const newValue = new Date(event.target.value);
                                                field.onChange(newValue);
                                            }}
                                            onBlur={field.onBlur}
                                            disabled={field.disabled}
                                            name="data_conclusao"
                                        />
                                        {errors.data_conclusao && <FormHelperText color="danger">
                                            {errors.data_conclusao?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={3}>
                        <FormControl sx={{ width: '100%' }} error={Boolean(errors.data_emissao)}>
                            <FormLabel>Data Emissão</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="data_emissao"
                                control={control}
                                defaultValue={data_emissao && new Date(data_emissao.toString().split('T')[0])}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Input
                                            type="date"
                                            placeholder="Prazo"
                                            error={Boolean(errors.data_emissao)}
                                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                            onChange={(event) => {
                                                const newValue = new Date(event.target.value);
                                                field.onChange(newValue);
                                            }}
                                            onBlur={field.onBlur}
                                            disabled={field.disabled}
                                            name="data_emissao"
                                        />
                                        {errors.data_emissao && <FormHelperText color="danger">
                                            {errors.data_emissao?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={3}>
                        <FormControl sx={{ width: '100%' }} error={Boolean(errors.data_outorga)}>
                            <FormLabel>Data Outorga</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="data_outorga"
                                control={control}
                                defaultValue={data_outorga && new Date(data_outorga.toString().split('T')[0])}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Input
                                            type="date"
                                            placeholder="Prazo"
                                            error={Boolean(errors.data_outorga)}
                                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                            onChange={(event) => {
                                                const newValue = new Date(event.target.value);
                                                field.onChange(newValue);
                                            }}
                                            onBlur={field.onBlur}
                                            disabled={field.disabled}
                                            name="data_outorga"
                                        />
                                        {errors.data_outorga && <FormHelperText color="danger">
                                            {errors.data_outorga?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                    <Grid xs={12} lg={3}>
                        <FormControl sx={{ width: '100%' }} error={Boolean(errors.data_resposta)}>
                            <FormLabel>Data Resposta</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="data_resposta"
                                control={control}
                                defaultValue={data_resposta && new Date(data_resposta.toString().split('T')[0])}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Input
                                            type="date"
                                            placeholder="Prazo"
                                            error={Boolean(errors.data_resposta)}
                                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                            onChange={(event) => {
                                                const newValue = new Date(event.target.value);
                                                field.onChange(newValue);
                                            }}
                                            onBlur={field.onBlur}
                                            disabled={field.disabled}
                                            name="data_resposta"
                                        />
                                        {errors.data_resposta && <FormHelperText color="danger">
                                            {errors.data_resposta?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={3}>
                        <FormControl sx={{ width: '100%' }} error={Boolean(errors.data_termo)}>
                            <FormLabel>Data Termo</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="data_termo"
                                control={control}
                                defaultValue={data_termo && new Date(data_termo.toString().split('T')[0])}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Input
                                            type="date"
                                            placeholder="Prazo"
                                            error={Boolean(errors.data_termo)}
                                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                            onChange={(event) => {
                                                const newValue = new Date(event.target.value);
                                                field.onChange(newValue);
                                            }}
                                            onBlur={field.onBlur}
                                            disabled={field.disabled}
                                            name="data_termo"
                                        />
                                        {errors.data_termo && <FormHelperText color="danger">
                                            {errors.data_termo?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={4}>
                        <FormControl sx={{ width: '100%' }} error={Boolean(errors.num_alvara)}>
                            <FormLabel>Número Alvara</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="num_alvara"
                                control={control}
                                defaultValue={num_alvara}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Input
                                            error={Boolean(errors.num_alvara)}
                                            {...field}
                                        />
                                        {errors.num_alvara && <FormHelperText color="danger">
                                            {errors.num_alvara?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={2}>
                        <FormControl sx={{ width: '100%' }} error={Boolean(errors.outorga)}>
                            <FormLabel>Outorga</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="outorga"
                                control={control}
                                defaultValue={outorga}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Select
                                            {...field}
                                            onChange={(_, value) => field.onChange(value)}
                                        >
                                            <Option value={true}>Sim</Option>
                                            <Option value={false}>Não</Option>
                                        </Select>
                                        {errors.outorga && <FormHelperText>
                                            {errors.outorga?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <FormControl sx={{ width: '100%' }} error={Boolean(errors.obs)}>
                            <FormLabel>Observação</FormLabel>
                            {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                name="obs"
                                control={control}
                                defaultValue={obs}
                                render={({ field: { ref, ...field } }) => {
                                    return (<>
                                        <Textarea
                                            error={Boolean(errors.obs)}
                                            minRows={3}
                                            {...field}
                                        />
                                        {errors.obs && <FormHelperText color="danger">
                                            {errors.obs?.message}
                                        </FormHelperText>}
                                    </>);
                                }}
                            />}
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', gap: 1 }}>
                            <Button size="sm" variant="plain" color="neutral" onClick={() => { router.push(`/analise`); }}>
                                Cancelar
                            </Button>
                            <Button 
                                onClick={() => setConclusao(false)} 
                                color="danger" 
                                size="sm" 
                                variant="solid" 
                                type="submit" 
                                loading={carregando}
                                disabled={finalizado}
                                sx={{ borderRadius: 4 }}
                            >
                                Indeferir
                            </Button>
                            <Button 
                                onClick={() => setConclusao(true)} 
                                size="sm" 
                                variant="solid" 
                                type="submit"
                                loading={carregando} 
                                disabled={finalizado}
                                sx={{ borderRadius: 4 }}
                            >
                                Deferir
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
    )
}
