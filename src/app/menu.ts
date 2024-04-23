import { AssignmentTurnedIn, Business, Checklist, Handyman, Home, Person, PlayArrow, UploadFile } from '@mui/icons-material';

export interface IMenuOption {
    title:  string;
    href:   string;
    name:   string;
    icon:   any; 
};

export interface IMenu {
    userOptions:    IMenuOption[];
    adminOptions:   IMenuOption[];
}


export const menu: IMenu = {
    userOptions: [
        {
            title: 'Página Inicial',
            href: '/',
            name: '/',
            icon: Home,
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
    ],
    adminOptions: [
        {
            title: 'Usuários',
            href: '/usuarios',
            name: 'usuarios',
            icon: Person,
        },
        {
            title: 'Importar',
            href: '/importar',
            name: 'importar',
            icon: UploadFile,
        },
        {
            title: 'Unidades',
            href: '/unidades',
            name: 'unidades',
            icon: Business,
        },
        {
            title: 'Tipos de Alvará',
            href: '/alvara-tipos',
            name: 'alvara-tipos',
            icon: Checklist,
        }    
    ]
}