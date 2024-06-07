'use client'

import { IInicial } from "@/shared/services/inicial.services";
import { IAdmissibilidade } from "@/shared/services/admissibilidade.services";
import { useEffect } from "react";
import * as admissibilidadeServices from "@/shared/services/admissibilidade.services";
import { useRouter as useRouterNavigation } from "next/navigation";
import { Box, Button, Chip, Divider, FormControl, FormLabel, Grid, Input } from "@mui/joy";


export default function AdmissibilidadeTab({ inicial, admissibilidade }: { inicial?: IInicial, admissibilidade?: IAdmissibilidade }) {
    const router = useRouterNavigation();

    return (
        <Box sx={{ p: 2 }}>
            {admissibilidade &&(<>
                <Grid xs={12}>
                    <Divider>
                        <Chip color="primary">Distribuição</Chip>
                    </Divider>
                </Grid>
                <Grid container xs={12} spacing={2} sx={{ p: 2, mb: 2 }}>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Administrativo responsável</FormLabel>
                            <Input value={admissibilidade.inicial_id} disabled />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Técnico responsável</FormLabel>
                            <Input value={admissibilidade.inicial?.alvara_tipo_id} disabled />
                        </FormControl>
                    </Grid>
                </Grid>
            </>)}
            {inicial && inicial.envio_admissibilidade && (<>
                <Grid xs={12}>
                    <Divider>
                        <Chip color="primary">Admissibilidade</Chip>
                    </Divider>
                </Grid>
                <Grid container xs={12}>

                </Grid>
            </>)}
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button size="sm" variant="outlined" color="neutral" onClick={() => { router.push(`/inicial`); }}>
                    Cancelar
                </Button>
                <Button size="sm" variant="solid">
                    Salvar
                </Button>
            </Grid>
        </Box>
    )
}