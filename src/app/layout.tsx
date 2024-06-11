'use client'

import AlertsProvider from '@/providers/alertsProvider';
import AuthSessionProvider from '@/providers/sessionProvider';
import MenuProvider from '@/shared/contexts/MenuContext';
import { CssBaseline } from '@mui/joy';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider, extendTheme } from '@mui/joy/styles';
import ThemeProvider from '@/shared/contexts/ThemeContext';

const materialTheme = materialExtendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: '#FFEBD6',
          100: '#FFD39C',
          200: '#F7B970',
          300: '#F7A752',
          400: '#EB874D',
          500: '#DA7D48',
          600: '#AD6439',
          700: '#8A4F2D',
          800: '#4F2E1A',
          900: '#1A0F08'
        }
      }
    },
    light: {
      palette: {
        primary: {
          50: '#E4F3F5',
          100: '#C4E9F5',
          200: '#A6E1ED',
          300: '#8ED7E7',
          400: '#6CC7D8',
          500: '#4ABACF',
          600: '#2E9BB7',
          700: '#2E9BB7',
          800: '#2E9BB7',
          900: '#2E9BB7'
        }
      }
    },
  }
});

const theme = extendTheme({
  fontFamily: {
    display: 'Lato', // applies to `h1`–`h4`
    body: 'Lato', // applies to `title-*` and `body-*`
  },
  "colorSchemes": {
    "dark": {
      "palette": {
        "primary": {
          "50": "#FFEBD6",
          "100": "#FFD39C",
          "200": "#F7B970",
          "300": "#F7A752",
          "400": "#EB874D",
          "500": "#DA7D48",
          "600": "#AD6439",
          "700": "#8A4F2D",
          "800": "#4F2E1A",
          "900": "#1A0F08"
        }
      }
    },
    "light": {
      "palette": {
        "primary": {
          "50": "#E4F3F5",
          "100": "#C4E9F5",
          "200": "#A6E1ED",
          "300": "#7ECED9",
          "400": "#5CB8CC",
          "500": "#41A0B7",
          "600": "#337D8F",
          "700": "#2D6D7D",
          "800": "#1E4954",
          "900": "#11282E"
        }
      }
    }
  }
});

export default function RootLayout({children}:{children: React.ReactNode}) {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }} defaultMode='system'>
      <JoyCssVarsProvider theme={theme} defaultMode='system'>
        <CssBaseline />
        <MenuProvider>
          <ThemeProvider>
            <html lang="pt-BR">
              <head>
                <link type='text/css' rel='stylesheet' href='global.css' />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
                <title>{process.env.NEXT_PUBLIC_PROJECT_NAME}</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#eeeeee" />
                <meta name="theme-color" content="#eeeeee" />
              </head>
              <body>
                <AuthSessionProvider>
                  <AlertsProvider>
                    {children}
                  </AlertsProvider>
                </AuthSessionProvider>
              </body>
            </html>
          </ThemeProvider>
        </MenuProvider>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

