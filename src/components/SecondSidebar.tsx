import * as React from 'react';
import { Link, ListItemButton, ListItemDecorator, ListItemContent, ListItem, ListSubheader, List, Sheet, Box } from '@mui/joy';
import Image from 'next/image';
import { AssignmentTurnedIn, PlayArrow, UploadFile } from '@mui/icons-material';
import logo from '@/assets/logo.png';

import { closeSidebar } from '../utils';

const pages = [
  {
    title: 'Inicial',
    href: '/inicial',
    name: 'inicial',
    icon: <PlayArrow />,
  },
  {
    title: 'Admissibilidade',
    href: '/admissibilidade',
    name: 'admissibilidade',
    icon: <AssignmentTurnedIn />,
  },
  {
    title: 'Importar',
    href: '/importar',
    name: 'importar',
    icon: <UploadFile />,
  }
];

export default function SecondSidebar({
  pagina
} : {
  pagina?: string;
}) {
  return (
    <React.Fragment>
      <Box
        className="SecondSidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 99,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Sheet
        className="SecondSidebar"
        color="neutral"
        sx={{
          position: {
            xs: 'fixed',
            lg: 'sticky',
          },
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
            lg: 'none',
          },
          transition: 'transform 0.4s',
          zIndex: 99,
          height: '100dvh',
          top: 0,
          p: 2,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <List
          size="sm"
          sx={{
            '--ListItem-radius': '6px',
            '--List-gap': '6px',
          }}
        >
          {pages.map((page) => (
            <Link 
              href={page.href}
              underline='none'
            >
              <ListItem sx={{ width: '100%'}}>
                  <ListItemButton selected={pagina===page.name}>
                    <ListItemDecorator>
                      {page.icon}
                    </ListItemDecorator>
                    <ListItemContent>{page.title}</ListItemContent>
                  </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Sheet>
    </React.Fragment>
  );
}
