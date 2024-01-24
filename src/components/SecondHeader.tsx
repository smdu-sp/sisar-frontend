import ThemeToggle from './ThemeToggle';
import { Box, Breadcrumbs, Link } from '@mui/joy';
import { ChevronRightRounded, HomeRounded } from '@mui/icons-material';

export default function SecondHeader({
  breadcrumbs
} : {
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRounded color='primary' />}
            sx={{ pl: 0 }}
        >
            <Link
              underline="none"
              color="primary"
              href="/"
              aria-label="Home"
            >
              <HomeRounded />
            </Link>
            {breadcrumbs && breadcrumbs.map((item, index) => (
              <Link
                underline="none"
                color="primary"
                href={item.href}
                aria-label={item.label}
                key={index}
              >
                {item.label}
              </Link>
            ))}        
        </Breadcrumbs>
        <ThemeToggle sx={{ ml: 'auto', display: { xs: 'none', md: 'inline-flex' } }} />
    </Box>
  );
}
