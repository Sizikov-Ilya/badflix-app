import { useEffect, useState, ReactNode } from "react";
import { createTheme, ThemeProvider, PaletteMode } from "@mui/material";
import { ColorModeContext } from "./ColorModeContext";

interface ToggleColorModeProps {
  children: ReactNode;
}

export default function ToggleColorMode({ children }: ToggleColorModeProps) {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  useEffect(() => {
    const modeFromLocalStorage = localStorage.getItem("theme") as PaletteMode;
    if (modeFromLocalStorage) {
      setMode(modeFromLocalStorage);
    } else {
      localStorage.setItem("theme", "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
