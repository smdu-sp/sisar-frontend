import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/joy";
import { iconButtonClasses } from '@mui/joy/IconButton';

export function Pagination(){
    return (
        <Box
            className="Pagination-laptopUp"
            sx={{
            pt: 2,
            gap: 1,
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
                startDecorator={<KeyboardArrowLeft />}
            ></Button>
            <Box sx={{ flex: 1 }} />
            <Button
                size="sm"
                variant="outlined"
                color="neutral"
                endDecorator={<KeyboardArrowRight />}
            ></Button>
        </Box>
    )
}