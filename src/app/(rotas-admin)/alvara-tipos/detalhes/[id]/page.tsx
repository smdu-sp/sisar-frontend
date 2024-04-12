'use client'

import Content from "@/components/Content";
import { useEffect, useState } from "react";
import * as alvaraTiposService from "@/shared/services/alvara-tipo.services";
import { IAlvaraTipo } from "@/shared/services/alvara-tipo.services";
import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import { useRouter } from "next/navigation";

export default function AlvaraTipoDetalhes(props: any) {
    const { id } = props.params;
    const router = useRouter();

    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id) {
            alvaraTiposService.buscarPorId(id)
                .then((response: IAlvaraTipo) => {
                    setNome(response.nome);
                });
        }
    }, [ id ]);

    const enviaDados = () => {
        if (id) {
            alvaraTiposService.atualizar(id, { nome })
                .then(() => {
                    router.push('/alvara-tipos');
                });
        } else {
            alvaraTiposService.criar({ nome })
                .then(() => {
                    router.push('/alvara-tipos');
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
                    mx: 'auto',
                    width: '90%',
                    maxWidth: 800,
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card sx={{ width: '100%' }}>
                    <Stack spacing={2} >
                        <Stack>
                            <FormControl>
                                <FormLabel>Nome</FormLabel>
                                <Input 
                                    placeholder="Nome" 
                                    value={nome} 
                                    onChange={e => setNome(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button size="sm" variant="outlined" color="neutral" onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button size="sm" variant="solid" onClick={()=>{}}>
                            Salvar
                        </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Box>
        </Content>
    );
}
