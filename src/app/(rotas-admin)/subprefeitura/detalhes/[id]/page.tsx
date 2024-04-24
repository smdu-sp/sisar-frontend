'use client'

import Content from "@/components/Content";
import { useContext, useEffect, useState } from "react";
import * as subprefeituraServices from "@/shared/services/subprefeitura.services";
import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Input, Option, Select, Stack } from "@mui/joy";
import { Abc, Business, Check, Tag } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import { ISubprefeitura } from "@/shared/services/subprefeitura.services";
import { AlertsContext } from "@/providers/alertsProvider";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function subprefeituraDetalhes(props: { params: { id: string } }) {
    const [idSubprefeitura, setIdSubprefeitura] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const { id } = props.params;
    const { setAlert } = useContext(AlertsContext);
    const router = useRouter();

    const submitForm = async () => {
        if (!id) {
            subprefeituraServices.criar({ nome })
            .then(() => {
                router.push('/subprefeitura?notification=0');
            })
        }else{
            subprefeituraServices.atualizar({id, nome})
            .then(() => {
                router.push('/subprefeitura?notification=1');
            })
        }
    }

    useEffect(() => {
        console.log(id);
        
        if (id) {
            subprefeituraServices.buscarPorId(id)
                .then((response: ISubprefeitura) => {
                    setIdSubprefeitura(response.id);
                    setNome(response.nome);
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
                <Card sx={{ width: '100%' }}>
                    <Stack spacing={2} >
                        <Stack direction="row" spacing={2}>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    value={nome || ''}
                                    onChange={(event) => setNome(event.target.value)}
                                    size="sm"
                                    type="text"
                                    startDecorator={<AccountBalanceIcon />}
                                    placeholder="Nome"
                                    required
                                />
                            </FormControl>
                        </Stack>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button size="sm" variant="outlined" color="neutral" onClick={() => router.back()}>
                                Cancelar
                            </Button>
                            <Button size="sm" variant="solid" color="primary" onClick={submitForm}>
                                Salvar
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Box>
        </Content>
    );
}
