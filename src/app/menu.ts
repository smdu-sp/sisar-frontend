import { AssignmentTurnedIn, Checklist, Home, Person, PlayArrow, UploadFile } from '@mui/icons-material';

export const menu = [
    {
        title: 'Página Inicial',
        href: '/',
        name: '/',
        icon: Home,
    },
    {
        title: 'Usuários',
        href: '/usuarios',
        name: '/usuarios',
        icon: Person,
    },
    {
        title: 'Inicial',
        href: '/inicial',
        name: 'inicial',
        icon: PlayArrow,
    },
    {
        title: 'Admissibilidade',
        href: '/admissibilidade',
        name: 'admissibilidade',
        icon: AssignmentTurnedIn,
    },
    {
        title: 'Importar',
        href: '/importar',
        name: 'importar',
        icon: UploadFile,
    },
    {
        title: 'Tipos de Alvará',
        href: '/alvara-tipos',
        name: 'alvara-tipos',
        icon: Checklist,
    }
]