'use client'

import Content from "@/components/Content";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Input, Option, Select, Stack } from "@mui/joy";
import { Abc, Business, Check, Tag } from "@mui/icons-material";
import { useRouter, useSearchParams } from 'next/navigation';
import { IUnidade } from "@/shared/services/unidade.services";
import { AlertsContext } from "@/providers/alertsProvider";
import * as inicialService from "@/shared/services/inicial.services";
import * as admissibilidadeService from "@/shared/services/admissibilidade.services";


export default function UnidadeDetalhes(props: { params: { id: string } }) {
    const [idUnidade, setIdUnidade] = useState<string>('');
    const [status, setStatus] = useState('0');
    const [processo, setProcesso] = useState('');
    const [sigla, setSigla] = useState<string>('');
    const searchParams = useSearchParams();
    const [codigo, setCodigo] = useState<string>('');
    const { id } = props.params;
    const { setAlert } = useContext(AlertsContext);
    const router = useRouter();

    function formatarSei(value: string): string {
        //1111.1111/1111111-1
        if (!value) return value;
        const onlyNumbers = value.replace(/\D/g, '').substring(0, 16);
        if (onlyNumbers.length <= 4)
            return onlyNumbers.replace(/(\d{0,4})/, '$1');
        if (onlyNumbers.length <= 8)
            return onlyNumbers.replace(/(\d{0,4})(\d{0,4})/, '$1.$2');
        if (onlyNumbers.length <= 15)
            return onlyNumbers.replace(/(\d{0,4})(\d{0,4})(\d{0,7})/, '$1.$2/$3');
        return onlyNumbers.replace(/(\d{0,4})(\d{0,4})(\d{0,7})(\d{0,1})/, '$1.$2/$3-$4');
    }

    const buscarDados = () => {
        admissibilidadeService.buscarId(id).then((res) => {
            setProcesso(res.inicial_id.toString());
        })
    }


    const atualizar = () => {
        admissibilidadeService.atualizarId(parseInt(processo), +status)
        .then((res) => {
            console.log(res);
            router.push('/inicial/detalhes/1?admissibilidade=true');
        })

    }

    useEffect(() => {
        if (id) {
            buscarDados();
        }
        console.log(processo);
    }, [id]);


    return (
        <Content
            breadcrumbs={[
                { label: 'Admissibilidade', href: '/admissibilidade' },
                { label: 'Admissibilidade', href: '/admissibilidade/detalhes/' + idUnidade || '' },
            ]}
            titulo={'Admissibilidade'}
            pagina="admissibilidade"
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
                <Card sx={{ width: '100%' }}>
                    <Stack direction={"column"} >
                        <Stack direction="row" spacing={2}>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Processo</FormLabel>
                                <Input
                                    value={processo}
                                    size="sm"
                                    type="text"
                                    startDecorator={<Business />}
                                    readOnly
                                />
                            </FormControl>
                        </Stack>
                        <Divider sx={{ mt: 1 }}/>
                        <Stack direction="row" spacing={2}>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    value={status}
                                    onChange={(_, value) => value && setStatus(value)}
                                    size="sm"
                                    placeholder="Status"
                                    startDecorator={<Business />}
                                >
                                    <Option value='0'>Adimitir</Option>
                                    <Option value='2'>Inadimitir</Option>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button size="sm" variant="outlined" color="neutral" onClick={() => router.back()}>
                                Cancelar
                            </Button>
                            <Button size="sm" variant="solid" color="primary" onClick={atualizar}>
                                Salvar
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Box>
        </Content>
    );
}
