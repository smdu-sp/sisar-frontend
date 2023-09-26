'use client';
import { Box, Typography } from '@mui/joy';
import Header from '@/components/Header';
import FirstSidebar from '@/components/FirstSidebar';
import SecondSidebar from '@/components/SecondSidebar';
import SecondHeader from '@/components/SecondHeader';

export default function Content({
    children,
    titulo,
    pagina,
    breadcrumbs
} : {
    children: React.ReactNode;
    titulo?: string;
    pagina?: string;
    breadcrumbs: {
      label: string;
      href: string;
    }[];
}) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <FirstSidebar />
        <SecondSidebar
            pagina={pagina}
        />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: {
              xs: 2,
              md: 6,
            },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: {
              xs: 2,
              sm: 2,
              md: 3,
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <SecondHeader
            breadcrumbs={breadcrumbs}
          />
          <Box
              sx={{
                  display: 'flex',
                  my: 1,
                  gap: 1,
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'start', sm: 'center' },
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
              }}
          >
              <Typography level="h2">{titulo ? titulo : 'Dashboard'}</Typography>
          </Box>
          {children}
        </Box>
      </Box>
  );
}
