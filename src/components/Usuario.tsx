import { UsuarioToken } from "@/shared/interfaces/usuario-token";
import { Avatar, Box, Card, CardContent, Chip, IconButton, SvgIcon, Typography } from "@mui/joy";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Usuario() {
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
      getSession().catch((error) => console.log(error)).then((session) => {
        if (session) setUsuario(session.usuario);
      });    
    }, []);
    const [usuario, setUsuario] = useState<UsuarioToken>();
    
    function verificaNome (nome: string) {
        const nomes = nome.split(' ');
        if (nomes.length > 2) {
            return nomes[0] + ' ' + nomes[nomes.length - 1];
        }
        return nome;
    }
    return (usuario ?
    <Card sx={{ maxWidth: 250 }}>
        <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Typography
                level="title-lg"
                title={usuario.nome}
                sx={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >{verificaNome(usuario.nome)}</Typography>
            <Typography level="body-xs">{usuario.email}</Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
                {usuario.permissao === 'DEV' ? null : <Chip color={cargos[usuario.cargo].color} size='sm'>{cargos[usuario.cargo].label}</Chip>}         
                <Chip color={permissoes[usuario.permissao].color} size='sm'>{permissoes[usuario.permissao].label}</Chip>
            </Box>
        </CardContent>
      </Card>
    : null);
}