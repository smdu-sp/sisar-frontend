import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import { Input, Textarea } from '@mui/joy';
import { BorderAll, Style } from '@mui/icons-material';
import * as avisos from "@/shared/services/avisos.services"
import { IAvisos } from "@/shared/services/avisos.services"

export default function BioCard(props: any) {
    const [edit, setEdit] = React.useState(true)
    const [titulo, setTitulo] = React.useState(props.titulo ? props.titulo : "")
    const [descricao, setDescricao] = React.useState(props.descricao ? props.descricao : "")

    const atualizar = () => {
        avisos.atualizar(props.id, titulo, descricao)
            .then((response: IAvisos) => {
                setEdit(true);
            });
    }

    const deletar = () => {
        console.log("Não feito");
    }

    return (
        <Card
            sx={{
                width: 320,
                maxWidth: '100%',
                boxShadow: 'lg',
                mt: 3,
                mb: 3,
                mx: 1
            }}
            key={props.id}
        >
            <CardContent sx={{ alignItems: 'center' }}>
                {edit === true ?
                    <Typography
                        sx={{
                            border: edit ? "none" : null,
                            boxShadow: edit ? "none" : null,
                            fontWeight: "bold",
                            fontSize: 20,
                            width: "100%",
                            mb: 1,
                            textAlign: 'center'
                        }}
                    >
                        {titulo}
                    </Typography>
                    :
                    <Input
                        type='text'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        sx={{
                            border: edit ? "none" : null,
                            boxShadow: edit ? "none" : null,
                            fontWeight: "bold",
                            fontSize: 20,
                            width: "100%",
                            mb: 1
                        }}
                        readOnly={edit ? true : false}
                    />

                }
                <Textarea
                    variant="outlined"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    minRows={4}
                    maxRows={4}
                    sx={{
                        border: edit ? "none" : null,
                        boxShadow: edit ? "none" : null,
                        fontSize: 15,
                        mb: 1,
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                    readOnly={edit ? true : false}
                />
            </CardContent>
            <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                <CardActions buttonFlex="1">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant='solid' color={edit ? 'primary' : 'danger'} onClick={() => { setEdit(!edit); }}>{edit ? "Editar" : "Cancelar"}</Button>
                        <Button variant='solid' color={edit ? 'danger' : 'success'} onClick={() => { edit ? deletar() : atualizar() }}>{edit ? "Deletar" : "Salvar"}</Button>
                    </Box>
                </CardActions>
            </CardOverflow>
        </Card>
    );
}