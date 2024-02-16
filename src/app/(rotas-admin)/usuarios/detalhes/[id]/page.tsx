'use client'

import Content from "@/components/Content";
import { IUsuario } from "@/shared/services/usuario.services";
import { useEffect, useState } from "react";
import * as usuarioServices from "@/shared/services/usuario.services";
import Form from "./form";
import { AspectRatio, Box, Button, Card, CardActions, CardOverflow, Chip, Divider, FormControl, FormLabel, IconButton, Input, Option, Select, Stack, Typography } from "@mui/joy";
import { EditRounded, EmailRounded } from "@mui/icons-material";
import { useRouter } from 'next/navigation';

export default function UsuarioDetalhes(props: any) {
    const [usuario, setUsuario] = useState<IUsuario>();
    const { id } = props.params;
    const router = useRouter();
    const [cargo, setCargo] = useState('');
    const [permissao, setPermissao] = useState('');

    const permissoes = {
      'DEV': { label: 'Desenvolvedor', value: 'DEV', color: 'primary' },
      'SUP': { label: 'Superusuario', value: 'SUP', color: 'info' },
      'ADM': { label: 'Administrador', value: 'ADM', color: 'success' },
      'USR': { label: 'Usuário', value: 'USR', color: 'warning' },
    }
    const cargos = {
      'ADM': { label: 'Administrativo', value: 'ADM', color: 'success' },
      'TEC': { label: 'Técnico', value: 'TEC', color: 'warning' },
    }

    useEffect(() => {
        if (id) {
            usuarioServices.buscarPorId(id)
                .then((response: IUsuario) => {
                    setUsuario(response);
                    setCargo(response.cargo);
                    setPermissao(response.permissao);
                });
        }
    }, []);
    return (
        <Content
            breadcrumbs={[
                { label: 'Usuários', href: '/usuarios' },
                { label: 'Detalhes', href: '/usuarios/detalhes/' + id },
            ]}
            titulo={id ? usuario?.nome : 'Novo'}
            tags={
                usuario ? <div style={{ display: 'flex', gap: '0.2rem' }}>
                  <Chip color={cargos[usuario?.cargo].color} size='lg'>{cargos[usuario?.cargo].label}</Chip>            
                  <Chip color={permissoes[usuario?.permissao].color} size='lg'>{permissoes[usuario?.permissao].label}</Chip>
                </div> : null
            }
            pagina="usuarios"
        >
            <Box
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        <Stack direction="row" spacing={2}>
                            <FormControl>
                                <FormLabel>Cargo</FormLabel>
                                <Select value={cargo ? cargo : 'ADM'} onChange={(event, value) => value && setCargo(value)}>
                                    <Option value="ADM">Administrativo</Option>
                                    <Option value="TEC">Técnico</Option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Permissao</FormLabel>
                                <Select value={permissao ? permissao : 'USR'} onChange={(event, value) => value && setPermissao(value)}>
                                    <Option value="DEV">Desenvolvedor</Option>
                                    <Option value="SUP">Superusuário</Option>
                                    <Option value="ADM">Administrador</Option>
                                    <Option value="USR">Usuário</Option>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={2}>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    value={usuario ? usuario?.email : 'USR'}
                                    size="sm"
                                    type="email"
                                    startDecorator={<EmailRounded />}
                                    placeholder="Email"
                                    sx={{ flexGrow: 1 }}
                                    readOnly
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack spacing={2}>
                            <Box sx={{ alignSelf: 'center' }}>
                                <Button size="sm" variant="solid">
                                    Programar férias
                                </Button>
                            </Box>
                        </Stack>
                        <Divider />
                        <Stack spacing={2}>
                            <Box sx={{ alignSelf: 'center' }}>
                                <Button size="sm" variant="solid">
                                    Programar férias
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button size="sm" variant="outlined" color="neutral" onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button size="sm" variant="solid">
                            Salvar
                        </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Box>            
        </Content>
    );
}
