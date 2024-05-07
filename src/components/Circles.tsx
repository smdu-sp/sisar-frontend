import CircleIcon from '@mui/icons-material/Circle';
import { Sheet } from '@mui/joy';

export default function Circles() {
    return (
        <Sheet sx={{ display: 'flex', backgroundColor: 'transparent', gap: 0.5, mr: 3.5, mb: 0.5}}>
            <CircleIcon  sx={{ width: '12px', color: 'var(--joy-palette-warning-plainColor)'}}/>
            <CircleIcon  sx={{ width: '12px', color: 'var(--joy-palette-primary-plainColor)'}}/>
        </Sheet>
    );
}