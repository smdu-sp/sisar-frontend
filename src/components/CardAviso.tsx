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
import { Input, Snackbar, Stack, Textarea } from '@mui/joy';
import { BorderAll, Style } from '@mui/icons-material';
import * as avisos from "@/shared/services/avisos.services"
import { IAvisos } from "@/shared/services/avisos.services"
import { Interface } from 'readline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import * as comum from "@/shared/services/common/comum.services";

interface ICardAviso {
    id: string,
    titulo: string,
    descricao: string,
    func: any,
    processo?: string
}

export default function BioCard(props: ICardAviso) {
    const [edit, setEdit] = React.useState(true)
    const [titulo, setTitulo] = React.useState(props.titulo ? props.titulo : "")
    const [descricao, setDescricao] = React.useState(props.descricao ? props.descricao : "")
    const [message, setMessage] = React.useState("")
    const [open, setOpen] = React.useState(false)

    const atualizar = () => {
        avisos.atualizar(props.id, titulo, descricao)
            .then(() => {
                setEdit(true);
            });
    }
    const deletar = () => {
        avisos.excluir(props.id)
    }

    return (
        <Card
            sx={{
                minWidth: 320,
                maxWidth: '100%',
                boxShadow: 'lg',
                mt: 3,
                mb: 3,
                mx: 1,
                position: 'relative'
            }}
            key={props.id}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton 
                    size='sm'
                    variant='plain' 
                    color={edit ? 'primary' : 'danger'} 
                    onClick={() => { setEdit(!edit); }}>{edit ? <DriveFileRenameOutlineIcon /> : <CancelIcon />}
                  </IconButton>
                  <IconButton 
                    size='sm'
                    variant='plain' 
                    color={edit ? 'danger' : 'success'} 
                    onClick={() => { edit ? setOpen(true) : atualizar(); setMessage("Tem certeza que deseja deletar?") }}>{edit ? <DeleteForeverIcon /> : <DoneIcon />}
                  </IconButton>
                </Box>
                <Box>
                    <Chip color='success'>{comum.formatarSei(props.processo ? comum.formatarSei(props.processo) : "")}</Chip>
                </Box>
            </Box>
            <Box sx={{ alignItems: 'center' }}>
                {edit === true ?
                    <Typography
                        level='h2'
                        sx={{
                            border: edit ? "none" : null,
                            boxShadow: edit ? "none" : null,
                            fontWeight: "bold",
                            fontSize: 20,
                            width: "100%",
                            mb: 1,
                            ml: 1.3,
                            textAlign: 'start'
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
                            mb: 1,
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
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                    readOnly={edit ? true : false}
                />
            </Box>
            <Snackbar
                variant="solid"
                color='danger'
                size="lg"
                invertedColors
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ maxWidth: 360 }}
            >
                <div>
                    <Typography level="title-lg">{titulo}</Typography>
                    <Typography sx={{ mt: 1, mb: 2 }} level="title-md">{message}</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button variant="solid" color="primary" onClick={() => (setOpen(false), deletar(), props.func())}>
                            Sim
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setOpen(false)}
                        >
                            Não
                        </Button>
                    </Stack>
                </div>
            </Snackbar>
        </Card>
    );
}