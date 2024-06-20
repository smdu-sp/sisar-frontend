'use client';

import { IDistribuicao } from "@/shared/services/admissibilidade.services";
import { IUsuario } from "@/shared/services/usuario.services";
import { Box, Chip, Divider, FormControl, FormLabel, Grid, Option, Select } from "@mui/joy";

import * as inicialServices from '@/shared/services/inicial.services';

export default function DistribuicaoTab({ distribuicao, funcionarios }: { distribuicao?: IDistribuicao, funcionarios?: { administrativos: IUsuario[], tecnicos: IUsuario[] }}) {
    function atualizaAdministrativo(administrativo_responsavel_id: string) {
        if (distribuicao) {
            console.log({ inicial_id: distribuicao.inicial_id, administrativo_responsavel_id})
            inicialServices.atualizarDistribuicao(distribuicao.inicial_id, { administrativo_responsavel_id })
                .then((response: IDistribuicao) => {
                    if (response.inicial_id) {
                    }
                });
        }
    }
    function atualizaTecnico(tecnico_responsavel_id: string) {
        if (distribuicao) {
            console.log({ inicial_id: distribuicao.inicial_id, tecnico_responsavel_id})
            inicialServices.atualizarDistribuicao(distribuicao.inicial_id, { tecnico_responsavel_id })
                .then((response: IDistribuicao) => {
                    if (response.inicial_id) {
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
                            <Select onChange={(_, value) => value && atualizaAdministrativo(value)} value={distribuicao.administrativo_responsavel_id}>
                                {funcionarios && funcionarios.administrativos && funcionarios.administrativos.map((adms) => (
                                    <Option key={adms.id} value={adms.id}>{adms.nome}</Option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Técnico responsável</FormLabel>
                            <Select onChange={(_, value) => value && atualizaTecnico(value)} value={distribuicao.tecnico_responsavel_id}>
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