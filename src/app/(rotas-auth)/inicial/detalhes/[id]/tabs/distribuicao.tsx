'use client';

import { IDistribuicao } from "@/shared/services/admissibilidade/admissibilidade.services";
import { IUsuario } from "@/shared/services/usuario/usuario.services";
import { Box, Chip, Divider, FormControl, FormLabel, Grid, Option, Select } from "@mui/joy";

import * as inicialServices from '@/shared/services/inicial.services';
import * as usuarioServices from '@/shared/services/usuario/usuario.services';
import { useEffect, useState } from "react";

export default function DistribuicaoTab({ distribuicao, funcionarios }: { distribuicao?: IDistribuicao, funcionarios?: { administrativos: IUsuario[], tecnicos: IUsuario[] }}) {
    const [administrativo_responsavel_id, setAdministrativoResponsavelId] = useState(distribuicao?.administrativo_responsavel_id);
    const [tecnico_responsavel_id, setTecnicoResponsavelId] = useState(distribuicao?.tecnico_responsavel_id);
    const [usuario, setUsuario] = useState<IUsuario>();
    useEffect(() => {
        usuarioServices.validaUsuario().then(setUsuario);
    }, [])
    function atualizaAdministrativo(administrativo_responsavel_id: string) {
        if (distribuicao) {
            inicialServices.mudarAdministrativoResponsável(distribuicao.inicial_id, { administrativo_responsavel_id })
            .then((response: IDistribuicao) => {
                if (response.inicial_id) {
                    setAdministrativoResponsavelId(response.administrativo_responsavel_id);
                }
            });
        }
    }
    function atualizaTecnico(tecnico_responsavel_id: string) {
        if (distribuicao) {
            inicialServices.mudarTecnicoResponsavel(distribuicao.inicial_id, { tecnico_responsavel_id })
            .then((response: IDistribuicao) => {
                if (response.inicial_id) {
                    setTecnicoResponsavelId(response.tecnico_responsavel_id);
                }
            });
        }
    }
    return (
        <Box sx={{ p: 2 }}>
            {distribuicao && (<>
                <Grid xs={12}>
                    <Divider>
                        <Chip color="primary">Distribuição</Chip>
                    </Divider>
                </Grid>
                <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Administrativo responsável</FormLabel>
                            <Select onChange={(_, value) => value && atualizaAdministrativo(value)} value={administrativo_responsavel_id}
                                disabled={['ADM', 'USR'].includes(usuario?.permissao || 'USR') ? true : false}
                            >
                                {funcionarios && funcionarios.administrativos && funcionarios.administrativos.map((adms) => (
                                    <Option key={adms.id} value={adms.id}>{adms.nome}</Option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Técnico responsável</FormLabel>
                            <Select onChange={(_, value) => value && atualizaTecnico(value)} value={tecnico_responsavel_id}
                                disabled={['ADM', 'USR'].includes(usuario?.permissao || 'USR') ? true : false}
                            >
                                {funcionarios && funcionarios.tecnicos && funcionarios.tecnicos.map((tecs) => (
                                    <Option key={tecs.id} value={tecs.id}>{tecs.nome}</Option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </>)}
        </Box>
    );
}