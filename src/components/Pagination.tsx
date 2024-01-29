import { KeyboardArrowLeft, KeyboardArrowLeftTwoTone, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/joy";
import { iconButtonClasses } from '@mui/joy/IconButton';
import { ReactElement } from "react";

export interface IPaginationProps extends ReactElement {
    
}

export function Pagination({}): IPaginationProps{
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
            <Button
                size="sm"
                variant="outlined"
                color="neutral"
                startDecorator={<KeyboardDoubleArrowLeft />}
            ></Button>
            <Button
                size="sm"
                variant="outlined"
                color="neutral"
                startDecorator={<KeyboardArrowLeft />}
            ></Button>
            <Typography>1</Typography>
            <Button
                size="sm"
                variant="outlined"
                color="neutral"
                endDecorator={<KeyboardArrowRight />}
            ></Button>
            <Button
                size="sm"
                variant="outlined"
                color="neutral"
                endDecorator={<KeyboardDoubleArrowRight />}
            ></Button>
        </Box>
    )
}