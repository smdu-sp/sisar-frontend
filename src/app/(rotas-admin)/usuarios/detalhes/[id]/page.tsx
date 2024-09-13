'use client'

import { useContext, useEffect, useState } from "react";
import { Autocomplete, AutocompleteOption, Box, Button, Card, CardActions, CardOverflow, Chip, ChipPropsColorOverrides, ColorPaletteProp, DialogTitle, Divider, FormControl, FormLabel, IconButton, Input, Modal, ModalDialog, Option, Select, Stack, Table } from "@mui/joy";
import { Badge, Business, Check, Clear, EmailRounded, Warning } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import { OverridableStringUnion } from '@mui/types';

import Content from "@/components/Content";
import { ISubstituto, IUsuario } from "@/shared/services/usuario.services";
import * as usuarioServices from "@/shared/services/usuario.services";
import { AlertsContext } from "@/providers/alertsProvider";
import * as unidadeServices from "@/shared/services/unidade.services";
import { IUnidade } from "@/shared/services/unidade.services";


export default function UsuarioDetalhes(props: any) {
    const [usuario, setUsuario] = useState<IUsuario>();
    const [administrativos, setAdministrativos] = useState<IUsuario[]>();
    const [adicionarFeriasModal, setAdicionarFeriasModal] = useState(false);
    const [adicionarSubstitutoModal, setAdicionarSubstitutoModal] = useState(false);
    const [substituto_id, setSubstituto_id] = useState('');
    const [inicio, setInicio] = useState<Date>(new Date());
    const [final, setFinal] = useState<Date>(new Date());
    const [permissao, setPermissao] = useState('USR');
    const [cargo, setCargo] = useState('ADM');
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [novoUsuario, setNovoUsuario] = useState(false);
    const { id } = props.params;
    const router = useRouter();
    const { setAlert } = useContext(AlertsContext);
    const [unidades, setUnidades] = useState<IUnidade[]>([]);
    const [unidade_id, setUnidade_id] = useState('');


    const permissoes: Record<string, { label: string, value: string, color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides> | undefined }> = {
        'DEV': { label: 'Desenvolvedor', value: 'DEV', color: 'neutral' },
        'SUP': { label: 'Superadmin', value: 'SUP', color: 'primary' },
        'ADM': { label: 'Administrador', value: 'ADM', color: 'success' },
        'USR': { label: 'Usuário', value: 'USR', color: 'warning' },
    }

    useEffect(() => {
        if (id) carregaDados();
        unidadeServices.listaCompleta()
            .then((response: IUnidade[]) => {
                setUnidades(response);
            })
    }, [ id ]);

    const carregaDados = () => {
        usuarioServices.buscarPorId(id)
            .then((response: IUsuario) => {
                setUsuario(response);
                setPermissao(response.permissao);
                setEmail(response.email);
                response.unidade_id && setUnidade_id(response.unidade_id);
            });
        buscaAdministrativos();
    }

    const buscaAdministrativos = () => {
        usuarioServices.buscarAdministrativos()
            .then((response: IUsuario[]) => {
                setAdministrativos(response);
            });
    }

    const submitData = () => {
        if (usuario){
            usuarioServices.atualizar(usuario.id, {
                permissao, unidade_id, cargo
            }).then((response) => {
                if (response.id) {
                    setAlert('Usuário alterado!', 'Dados atualizados com sucesso!', 'success', 3000, Check);              
                }
            })
        } else {
            if (novoUsuario){
                usuarioServices.criar({
                    nome, login, email, permissao, cargo, unidade_id
                }).then((response) => {
                    if (response.id) {
                        setAlert('Usuário criado!', 'Dados inseridos com sucesso!', 'success', 3000, Check);
                        router.push('/usuarios/detalhes/' + response.id);
                    }
                })
            }
        }
    }

    const buscarNovo = () => {
        if (login)
            usuarioServices.buscarNovo(login).then((response) => {
                if (response.message) setAlert('Erro', response.message, 'warning', 3000, Warning);
                if (response.id)
                    router.push('/usuarios/detalhes/' + response.id);
                else if (response.email) {
                    setNome(response.nome ? response.nome : '');
                    setLogin(response.login ? response.login : '');
                    setEmail(response.email ? response.email : '');
                    setUnidade_id(response.unidade_id ? response.unidade_id : '');
                    setNovoUsuario(true);
                }
            })
    }

    const limpaUsuario = () => {
        setNovoUsuario(false);
        setNome('');
        setLogin('');
        setEmail('');
        setPermissao('USR');
    }    

    function handleAdicionarFerias(): void {
        usuarioServices.adicionaFerias(id, { inicio, final }).then((response) => {
            if (response && response.id) {
                setAdicionarFeriasModal(false);
                setAlert('Férias adicionada!', 'Férias adicionada com sucesso!', 'success', 3000, Check);
                carregaDados();
            }
        })
    }

    function removerSubstituto(id: string): void {
        usuarioServices.removerSubstituto(id).then((response) => {
            if (response) {
                setAlert('Substituto removido!', 'Substituto removido com sucesso!', 'success', 3000, Check);
                carregaDados();
            } else {
                setAlert('Erro', 'Erro ao remover substituto!', 'warning', 3000, Warning);
            }
        })
    }

    function adicionarSubstituto(): void {
        if (usuario?.id)
            usuarioServices.adicionarSubstituto(usuario?.id, substituto_id).then((response) => {
                if (response.id) {
                    setAlert('Substituto adicionado!', 'Substituto adicionado com sucesso!', 'success', 3000, Check);
                    carregaDados();
                } else {
                    setAlert('Erro', 'Erro ao adicionar substituto!', 'warning', 3000, Warning);
                }
            })
    }

    const addHours = (date: Date, h: number) => {
        date.setHours(date.getHours() + h);
        return date;
    }

    return (
        <Content
            breadcrumbs={[
                { label: 'Usuários', href: '/usuarios' },
                { label: usuario ? usuario.nome : 'Novo', href: `/usuarios/detalhes/${id ? id : ''}` },
            ]}
            titulo={id ? usuario?.nome : 'Novo'}
            tags={
                usuario ? <div style={{ display: 'flex', gap: '0.2rem' }}>     
                  <Chip color={permissoes[usuario?.permissao].color} size='lg'>{permissoes[usuario?.permissao].label}</Chip>
                </div> : null
            }
            pagina="usuarios"
        >
            <Modal open={adicionarFeriasModal} sx={{ zIndex: 99 }} onClose={() => setAdicionarFeriasModal(false)}>
                <ModalDialog>
                    <DialogTitle>Adicionar férias</DialogTitle>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Início de férias</FormLabel>
                            <Input
                                type="date"
                                value={inicio.toISOString().split('T')[0]}
                                onChange={e => setInicio(new Date(e.target.value))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Final de férias</FormLabel>
                            <Input
                                type="date"
                                value={final.toISOString().split('T')[0]}
                                onChange={e => setFinal(new Date(e.target.value))}
                            />
                        </FormControl>
                        <FormControl sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Button color="neutral" variant="outlined" onClick={() => setAdicionarFeriasModal(false)}>Cancelar</Button>
                            <Button color="success" onClick={() => handleAdicionarFerias()}>Adicionar</Button>
                        </FormControl>
                    </Stack>
                </ModalDialog>
            </Modal>
            <Modal open={adicionarSubstitutoModal} sx={{ zIndex: 99 }} onClose={() => setAdicionarSubstitutoModal(false)}>
                <ModalDialog>
                    <DialogTitle>Adicionar substituto</DialogTitle>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Substituto</FormLabel>
                            <Select
                                value={substituto_id}
                                onChange={(_, value) => value && setSubstituto_id(value)}
                            >
                                {(administrativos && administrativos.length > 0) && administrativos.map((adm) => (
                                    <Option
                                        key={adm.id}
                                        value={adm.id}
                                    >
                                        {adm.nome}
                                    </Option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Button color="neutral" variant="outlined" onClick={() => setAdicionarSubstitutoModal(false)}>Cancelar</Button>
                            <Button color="success" onClick={() => adicionarSubstituto()}>Adicionar</Button>
                        </FormControl>
                    </Stack>
                </ModalDialog>
            </Modal>
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
                        {!id ? 
                        <><Stack>
                            <FormControl>
                                <FormLabel>Login de rede</FormLabel>
                                <Input 
                                    placeholder="Buscar por login de rede" 
                                    value={login} 
                                    onChange={e => setLogin(e.target.value)} 
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') buscarNovo()
                                    }}
                                    endDecorator={
                                    novoUsuario ? <IconButton onClick={limpaUsuario}><Clear /></IconButton> : <Button onClick={buscarNovo} variant="soft">Buscar</Button>}
                                    readOnly={novoUsuario}
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack>
                            <FormControl>
                                <FormLabel>Nome</FormLabel>
                                <Input 
                                    placeholder="Nome" 
                                    value={nome} 
                                    onChange={e => setNome(e.target.value)} 
                                    readOnly={novoUsuario}
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        </> : null}
                        <Stack>
                            <FormControl>
                                <FormLabel>Permissao</FormLabel>
                                <Select value={permissao ? permissao : 'USR'} onChange={(_, value) => value && setPermissao(value)}
                                    startDecorator={<Badge />}>
                                    <Option value="DEV">Desenvolvedor</Option>
                                    <Option value="SUP">Superadmin</Option>
                                    <Option value="ADM">Administrador</Option>
                                    <Option value="USR">Usuário</Option>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack>
                            <FormControl>
                                <FormLabel>Cargo</FormLabel>
                                <Select value={cargo ? cargo : 'ADM'} onChange={(_, value) => value && setCargo(value)}
                                    startDecorator={<Badge />}>
                                    <Option value="ADM">Administrativo</Option>
                                    <Option value="TEC">Técnico</Option>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack>
                            <FormControl>
                                <FormLabel>Unidade</FormLabel>
                                <Autocomplete
                                    startDecorator={<Business />}
                                    options={unidades && unidades.length > 0 ? unidades : []}
                                    getOptionLabel={(option) => option && option.sigla}
                                    renderOption={(props, option) => (
                                      <AutocompleteOption {...props} key={option.id} value={option.id}>
                                        {option.sigla}
                                      </AutocompleteOption>
                                    )}
                                    placeholder="Unidade"
                                    value={unidade_id && unidade_id !== '' ? unidades.find((unidade: IUnidade) => unidade.id === unidade_id) : null}
                                    onChange={(_, value) => value  && setUnidade_id(value?.id)}
                                    filterOptions={(options, { inputValue }) => {
                                        if (unidades) return (options as IUnidade[]).filter((option) => (
                                            (option).nome.toLowerCase().includes(inputValue.toLowerCase()) || 
                                            (option).sigla.toLowerCase().includes(inputValue.toLowerCase())
                                        ));
                                        return [];
                                    }}
                                    noOptionsText="Nenhuma unidade encontrada"
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={2}>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    size="sm"
                                    type="email"
                                    startDecorator={<EmailRounded />}
                                    placeholder="Email"
                                    sx={{ flexGrow: 1 }}
                                    readOnly={id ? true : (novoUsuario)}
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
                            <Card>
                                {(usuario?.ferias && usuario.ferias.length > 0) && (
                                    <Table hoverRow sx={{ tableLayout: 'auto' }}>
                                        <thead>
                                            <tr>
                                                <th>Inicio</th>
                                                <th>Fim</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usuario.ferias.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{addHours(new Date(item.inicio), 4).toLocaleDateString()}</td>
                                                    <td>{addHours(new Date(item.final), 4).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                                <Button onClick={() => setAdicionarFeriasModal(true)}>Adicionar férias</Button>
                            </Card>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
                            <Card>
                                {(usuario?.usuarios && usuario.usuarios.length > 0) && (
                                    <Table hoverRow sx={{ tableLayout: 'auto' }}>
                                        <thead>
                                            <tr>
                                                <th>Substituto</th>
                                                <th style={{ textAlign: 'right' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usuario && usuario.usuarios && usuario.usuarios.map((item, index) => item.substituto && (
                                                <tr key={index}>
                                                    <td>{item.substituto.nome}</td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        <IconButton onClick={() => removerSubstituto(item.id)}>
                                                            <Clear />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                                <Button onClick={() => setAdicionarSubstitutoModal(true)}>Adicionar substituto</Button>
                            </Card>
                        </Stack>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button size="sm" variant="outlined" color="neutral" onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button size="sm" variant="solid" onClick={submitData}>
                            Salvar
                        </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Box>            
        </Content>
    );
}
