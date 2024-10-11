import { AssignmentTurnedIn, Business, Checklist, Handyman, Home, Person, PlayArrow, UploadFile } from '@mui/icons-material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
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
            title: 'Processos',
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
            title: 'Em Analise',
            href: '/analise',
            name: 'analise',
            icon: TroubleshootIcon,
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
            title: 'Subprefeitura',
            href: '/subprefeitura',
            name: 'subprefeitura',
            icon: AccountBalanceIcon,
        },
        {
            title: 'Tipos de Alvará',
            href: '/alvara-tipos',
            name: 'alvara-tipos',
            icon: Checklist,
        } 
    ]
}