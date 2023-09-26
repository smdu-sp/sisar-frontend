import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import Image from 'next/image';
import iconLogo from '@/assets/sis-icon.png';
import { toggleSidebar } from '../utils';
import { Button, Tooltip } from '@mui/joy';

export default function FirstSidebar() {
  return (
    <Sheet
      className="FirstSidebar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s',
        zIndex: 100,
        height: '100dvh',
        width: 'var(--FirstSidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={{
          ':root': {
            '--FirstSidebar-width': '68px',
          },
        }}
      />
      <List size="sm" sx={{ '--ListItem-radius': '6px', '--List-gap': '8px' }}>
        <ListItem onClick={() => toggleSidebar()}>
          <ListItemButton sx={{ p: 1, borderRadius: 6 }}>
            <Image src={iconLogo} height={24} alt="Sisar" />
          </ListItemButton>
        </ListItem>
      </List>  
      <Tooltip title="Sair" arrow placement="top" >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{ p: 0.5, borderRadius: 40 }}
          onClick={() => {
            window.location.href = '/login';
          }}
        >
          <Avatar variant="plain" size="sm" />
        </Button>
      </Tooltip>
    </Sheet>
  );
}
