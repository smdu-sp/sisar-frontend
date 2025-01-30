'use client';

import { IDistribuicao } from "@/types/admissibilidade/admissibilidade.dto";
import { IUsuario } from "@/types/usuario/usuario.dto";
import { Box, Chip, Divider, FormControl, FormLabel, Grid, Option, Select } from "@mui/joy";

import * as inicialServices from '@/shared/services/inicial.services';
import * as usuarioServices from '@/shared/services/usuario.services';
import { useContext, useEffect, useState } from "react";
import { AlertsContext } from "@/providers/alertsProvider";
import { Check } from "@mui/icons-material";

export default function DistribuicaoTab({ distribuicao, funcionarios }: { distribuicao?: IDistribuicao, funcionarios?: { administrativos: IUsuario[], tecnicos: IUsuario[] }}) {
    const [administrativo_responsavel_id, setAdministrativoResponsavelId] = useState(distribuicao?.administrativo_responsavel_id);
    const [tecnico_responsavel_id, setTecnicoResponsavelId] = useState(distribuicao?.tecnico_responsavel_id);
    const [usuario, setUsuario] = useState<IUsuario>();
    const { setAlert } = useContext(AlertsContext);
    
    useEffect(() => {
        usuarioServices.validaUsuario().then(setUsuario);
        distribuicao && inicialServices.buscarPorId(distribuicao?.inicial_id).then((resp) => {
            if (resp){
                setAdministrativoResponsavelId(resp.distribuicao?.administrativo_responsavel_id);
                setTecnicoResponsavelId(resp.distribuicao?.tecnico_responsavel_id);
            }
        })
    }, [])
    function atualizaAdministrativo(administrativo_responsavel_id: string) {
        if (distribuicao) {
            inicialServices.mudarAdministrativoResponsável(distribuicao.inicial_id, { administrativo_responsavel_id })
            .then((response: IDistribuicao) => {
                if (response.inicial_id) {
                    setAdministrativoResponsavelId(response.administrativo_responsavel_id);
                    setAlert("Sucesso", "Administrativo responsável atualizado!", "success", 3000, Check);
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
                    setAlert("Sucesso", "Técnico responsável atualizado!", "success", 3000, Check);
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