'use client'

import { IInicial } from "@/shared/services/inicial.services";
import { Box, Button, Chip, Divider, FormControl, FormLabel, Grid, Input } from "@mui/joy";
import { useRouter } from "next/navigation";

export default function AdmissibilidadeTab({ inicial }: { inicial?: IInicial }) {
    const router = useRouter();
    return (
        <Box sx={{ p: 2 }}>
            {inicial && inicial.distribuicao && (<>
                <Grid xs={12}>
                    <Divider>
                        <Chip color="primary">Distribuição</Chip>
                    </Divider>
                </Grid>
                <Grid container xs={12}>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Administrativo responsável</FormLabel>
                            <Input value={inicial.distribuicao.administrativo_responsavel?.nome} disabled />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Técnico responsável</FormLabel>
                            <Input value={inicial.distribuicao.administrativo_responsavel?.nome} disabled />
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
            <Grid xs={12} sx ={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button size="sm" variant="outlined" color="neutral" onClick={() => {router.push(`/inicial`);}}>
                    Cancelar
                </Button>
                <Button size="sm" variant="solid">
                    Salvar
                </Button>
            </Grid>
        </Box>
    )
}