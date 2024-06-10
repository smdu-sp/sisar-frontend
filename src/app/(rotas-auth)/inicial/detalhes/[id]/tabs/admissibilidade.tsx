'use client'

import { IInicial } from "@/shared/services/inicial.services";
import { IAdmissibilidade } from "@/shared/services/admissibilidade.services";
import { useEffect, useState } from "react";
import * as admissibilidadeServices from "@/shared/services/admissibilidade.services";
import * as comum from "@/shared/services/comum.services";
import { useRouter as useRouterNavigation } from "next/navigation";
import { Box, Button, Checkbox, Chip, Divider, FormControl, FormLabel, Grid, Input, Option, Select } from "@mui/joy";
import { Business } from "@mui/icons-material";


export default function AdmissibilidadeTab({ inicial, admissibilidade }: { inicial?: IInicial, admissibilidade?: IAdmissibilidade }) {
    const router = useRouterNavigation();

    const [tipo_processo, setTipo_processo] = useState<number>(inicial?.tipo_processo || 0);
    const [interface_sehab, setInterface_sehab] = useState<boolean>(false);
    const [num_sehab, setNum_sehab] = useState<string>('');
    const [interface_siurb, setInterface_siurb] = useState<boolean>(false);
    const [num_siurb, setNum_siurb] = useState<string>('');
    const [interface_smc, setInterface_smc] = useState<boolean>(false);
    const [num_smc, setNum_smc] = useState<string>('');
    const [interface_smt, setInterface_smt] = useState<boolean>(false);
    const [num_smt, setNum_smt] = useState<string>('');
    const [interface_svma, setInterface_svma] = useState<boolean>(false);
    const [num_svma, setNum_svma] = useState<string>('');
    const [status, setStatus] = useState<number>(inicial?.status || 1);
    const [processoSei, setProcessoSei] = useState<string>('');
    const [dataProtocolo, setDataProtocolo] = useState<Date>(new Date());
    const [recebimento, setRecebimento] = useState<Date>(new Date());
    const [tipoProcesso, setTipoProcesso] = useState<string>("0");
    const [pagamento, setPagamento] = useState<string>('');
    const [dataDecisao, setDataDecisao] = useState<Date>(new Date());
    const [analise, setAnalise] = useState<string>('');
    const [diasAnalise, setDiasAnalise] = useState<number>(0);
    const [reuniao, setReuniao] = useState<Date>(new Date());

    const atualizar = () => {
        if (admissibilidade) { // Check if admissibilidade is not undefined
            admissibilidadeServices.atualizarId(admissibilidade.inicial_id, +status)
                .then((res) => {
                    console.log(res);
                    router.push('/admissibilidade');
                })
        }
    }


    return (
        <Box sx={{ p: 2 }}>
            {admissibilidade && (<>
                <Grid xs={12}>
                    <Divider>
                        <Chip color="primary">Distribuição</Chip>
                    </Divider>
                </Grid>
                <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Administrativo responsável</FormLabel>
                            <Input value={admissibilidade.inicial_id} readOnly />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Técnico responsável</FormLabel>
                            <Input value={admissibilidade.inicial?.alvara_tipo_id} readOnly />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container xs={12} spacing={2} sx={{ p: 2, mb: 2 }}>
                    <Grid xs={12} lg={6}>
                        <FormControl>
                            <FormLabel>Processo</FormLabel>
                            <Input value={admissibilidade.inicial?.sei} readOnly />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Processo Sei</FormLabel>
                            <Input value={processoSei} onChange={(e) => {
                                var sehab = e.target.value;
                                if (sehab.length > 0) sehab = comum.formatarSei(e.target.value);
                                setProcessoSei(sehab && sehab);
                            }}
                                required={interface_sehab}
                                error={interface_sehab && !comum.validaDigitoSei(num_sehab) && num_sehab.length > 18}
                                title={interface_sehab && !comum.validaDigitoSei(num_sehab) && num_sehab.length > 18 ? 'SEI inválido' : ''}
                            />
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

            <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Multiplas interfaces</FormLabel>
                        <Select value={tipo_processo} id='tipo_processo' name='tipo_processo' placeholder='Tipo de processo' onChange={(_, v) => setTipo_processo(v ? v : 1)}>
                            <Option value={1}>Próprio de SMUL</Option>
                            <Option value={2}>Múltiplas interfaces</Option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} lg={6}>
                    <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel>Status</FormLabel>
                        <Select
                            value={status}
                            onChange={(_, value) => value && setStatus(value)}
                            size="sm"
                            placeholder="Status"
                        >
                            <Option value='0'>Adimitir</Option>
                            <Option value='2'>Inadimitir</Option>
                            <Option value='3'>Em Reconseideração</Option>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                <Grid xs={12} lg={6}>
                </Grid>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Recebimento Processo</FormLabel>
                        <Input type="date" value={recebimento?.toISOString()} onChange={(e) => setRecebimento(new Date(e.target.value))} />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                <Grid xs={12} lg={6}>
                </Grid>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Pagamento</FormLabel>
                        <Select
                            value={pagamento}
                            onChange={(_, value) => value && setPagamento(value)}
                            size="sm"
                            placeholder="Status"
                        >
                            <Option value='0'>SIM</Option>
                            <Option value='1'>NÂO</Option>
                            <Option value='1'>SIM-VINCULADO</Option>
                            <Option value='1'>ISENTO-VINCULADO</Option>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Data decisão</FormLabel>
                        <Input type="date" value={dataDecisao?.toISOString()} onChange={(e) => setDataDecisao(new Date(e.target.value))} />
                    </FormControl>
                </Grid>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Análise Adminssibilidade</FormLabel>
                        <Select
                            value={analise}
                            onChange={(_, value) => value && setAnalise(value)}
                            size="sm"
                            placeholder="Status"
                        >
                            <Option value='0'>Sem interação</Option>
                            <Option value='1'>Com interação</Option>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container xs={12} spacing={2} sx={{ p: 2 }}>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Dias de Análise</FormLabel>
                        <Input type="number" value={diasAnalise} onChange={(e) => setDiasAnalise(parseInt(e.target.value))} />
                    </FormControl>
                </Grid>
                <Grid xs={12} lg={6}>
                    <FormControl>
                        <FormLabel>Reunião GRAPOEM</FormLabel>
                        <Input type="date" value={reuniao?.toISOString()} onChange={(e) => setReuniao(new Date(e.target.value))} />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid xs={12} container sx={{ display: tipo_processo === 1 ? 'none' : 'block' }}>
                <Grid xs={12}><Divider><Chip color="primary">Interfaces</Chip></Divider></Grid>
                <Grid xs={12} container sx={{ py: 2 }}>
                    <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            label="SEHAB"
                            checked={interface_sehab}
                            onChange={(e) => setInterface_sehab(e.target.checked)}
                        />
                    </Grid>
                    <Grid xs={12} lg={8} xl={10} sx={!interface_sehab ? { display: 'none'  } : {}}>
                        <Input
                            id="num_sehab"
                            name="num_sehab"
                            placeholder="Processo SEHAB"
                            type="text"
                            value={num_sehab}
                            onChange={(e) => {
                                var sehab = e.target.value;
                                if (sehab.length > 0) sehab = comum.formatarSei(e.target.value);
                                setNum_sehab(sehab && sehab);
                            }}
                            required={interface_sehab}
                            error={interface_sehab && !comum.validaDigitoSei(num_sehab) && num_sehab.length > 18}
                            title={interface_sehab && !comum.validaDigitoSei(num_sehab) && num_sehab.length > 18 ? 'SEI inválido' : ''}
                        />
                        {(!comum.validaDigitoSei(num_sehab) && num_sehab.length > 18) && <FormLabel sx={{ color: 'red' }}>SEI inválido</FormLabel>}
                    </Grid>
                </Grid>
                <Grid xs={12} container sx={{ py: 2 }}>
                    <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            label="SIURB"
                            checked={interface_siurb}
                            onChange={(e) => setInterface_siurb(e.target.checked)}
                        />
                    </Grid>
                    <Grid xs={12} lg={8} xl={10} sx={!interface_siurb ? { display: 'none' } : {}}>
                        <Input
                            placeholder="Processo SIURB"
                            type="text"
                            value={num_siurb}
                            onChange={(e) => {
                                var siurb = e.target.value;
                                if (siurb.length > 0) siurb = comum.formatarSei(e.target.value);
                                setNum_siurb(siurb && siurb);
                            }}
                            required={interface_siurb}
                            error={interface_siurb && !comum.validaDigitoSei(num_siurb) && num_siurb.length > 18}
                            title={interface_siurb && !comum.validaDigitoSei(num_siurb) && num_siurb.length > 18 ? 'SEI inválido' : ''}
                        />
                    </Grid>
                </Grid>
                <Grid xs={12} container sx={{ py: 2 }}>
                    <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            label="SMC"
                            checked={interface_smc}
                            onChange={(e) => setInterface_smc(e.target.checked)}
                        />
                    </Grid>
                    <Grid xs={12} lg={8} xl={10} sx={!interface_smc ? { display: 'none' } : {}}>
                        <Input
                            placeholder="Processo SMC"
                            type="text"
                            value={num_smc}
                            onChange={(e) => {
                                var smc = e.target.value;
                                if (smc.length > 0) smc = comum.formatarSei(e.target.value);
                                setNum_smc(smc && smc);
                            }}
                            required={interface_smc}
                            error={interface_smc && !comum.validaDigitoSei(num_smc) && num_smc.length > 18}
                            title={interface_smc && !comum.validaDigitoSei(num_smc) && num_smc.length > 18 ? 'SEI inválido' : ''}
                        />
                    </Grid>
                </Grid>
                <Grid xs={12} container sx={{ py: 2 }}>
                    <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            label="SMT"
                            checked={interface_smt}
                            onChange={(e) => setInterface_smt(e.target.checked)}
                        />
                    </Grid>
                    <Grid xs={12} lg={8} xl={10} sx={!interface_smt ? { display: 'none' } : {}}>
                        <Input
                            placeholder="Processo SMT"
                            type="text"
                            value={num_smt}
                            onChange={(e) => {
                                var smt = e.target.value;
                                if (smt.length > 0) smt = comum.formatarSei(e.target.value);
                                setNum_smt(smt && smt);
                            }}
                            required={interface_smt}
                            error={interface_smt && !comum.validaDigitoSei(num_smt) && num_smt.length > 18}
                            title={interface_smt && !comum.validaDigitoSei(num_smt) && num_smt.length > 18 ? 'SEI inválido' : ''}
                        />
                    </Grid>
                </Grid>
                <Grid xs={12} container sx={{ py: 2 }}>
                    <Grid xs={12} lg={4} xl={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            label="SVMA"
                            checked={interface_svma}
                            onChange={(e) => setInterface_svma(e.target.checked)}
                        />
                    </Grid>
                    <Grid xs={12} lg={8} xl={10} sx={!interface_svma ? { display: 'none' } : {}}>
                        <Input
                            placeholder="Processo SVMA"
                            type="text"
                            value={num_svma}
                            onChange={(e) => {
                                var svma = e.target.value;
                                if (svma.length > 0) svma = comum.formatarSei(e.target.value);
                                setNum_svma(svma && svma);
                            }}
                            required={interface_svma}
                            error={interface_svma && !comum.validaDigitoSei(num_svma) && num_svma.length > 18}
                            title={interface_svma && !comum.validaDigitoSei(num_svma) && num_svma.length > 18 ? 'SEI inválido' : ''}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button size="sm" variant="outlined" color="neutral" onClick={() => { router.push(`/admissibilidade`); }}>
                    Cancelar
                </Button>
                <Button size="sm" variant="solid" onClick={() => { atualizar(); }}>
                    Salvar
                </Button>
            </Grid>
        </Box>
    )
}