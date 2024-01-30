import { WbSunny, Nightlight } from "@mui/icons-material";
import { IconButton, useColorScheme } from "@mui/joy";

export default function ThemeToggle({ ...props }) {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      color="primary"
      sx={{ p: 0.5 }}
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
      {...props}
    >
      {mode === 'light' ? <WbSunny fontSize="small" /> : <Nightlight fontSize="small" />}
    </IconButton>
  );
}