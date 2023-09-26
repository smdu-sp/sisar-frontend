import { DarkModeRounded, LightMode } from "@mui/icons-material";
import { IconButton, useColorScheme } from "@mui/joy";

export default function ThemeToggle({ ...props }) {
    const { mode, setMode } = useColorScheme();
    return (
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="outlined"
        color="neutral"
        sx={{ p: 0.5 }}
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light');
        }}
        {...props}
      >
        {mode === 'light' ?
        <DarkModeRounded color="primary" /> :
        <LightMode color="primary" />}
      </IconButton>
    );
  }