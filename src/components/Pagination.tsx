import { KeyboardArrowLeft, KeyboardArrowLeftTwoTone, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/joy";
import { iconButtonClasses } from '@mui/joy/IconButton';
import { ReactElement } from "react";

export interface IPaginationProps extends ReactElement {
    pagina: number;
    limite: number;
    total: number;
    paginaAnterior: () => void;
    proximaPagina: () => void;
    primeiraPagina: () => void;
    ultimaPagina: () => void;
}

export function Pagination({ pagina = 1, limite = 1, total = 1, paginaAnterior, proximaPagina, primeiraPagina, ultimaPagina, ...props }: IPaginationProps) {
    const paginaUltimo = pagina * limite < total ? pagina * limite : total;
    return (
        <Box
            className="Pagination-laptopUp"
            sx={{
            pt: 2,
            gap: 2,
            [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
            display: {
                xs: 'none',
                md: 'flex',
            },
            }}
        >
            <IconButton
                size="sm"
                variant="outlined"
                color="neutral"
                disabled={pagina === 1}
                onClick={primeiraPagina}
            ><KeyboardDoubleArrowLeft /></IconButton>
            <IconButton
                size="sm"
                variant="outlined"
                color="neutral"
                disabled={pagina === 1}
                onClick={paginaAnterior}
            ><KeyboardArrowLeft /></IconButton>
            <Typography>{1*pagina} - {limite*pagina} de {total}</Typography>
            <IconButton
                size="sm"
                variant="outlined"
                color="neutral"
                disabled={paginaUltimo === total}
                onClick={proximaPagina}
            ><KeyboardArrowRight /></IconButton>
            <IconButton
                size="sm"
                variant="outlined"
                color="neutral"
                disabled={paginaUltimo === total}
                onClick={ultimaPagina}
            ><KeyboardDoubleArrowRight /></IconButton>
        </Box>
    )
}