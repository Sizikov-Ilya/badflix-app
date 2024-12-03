import { createContext } from "react";
import { PaletteMode } from "@mui/material";

interface ColorModeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: "dark", // Значение по умолчанию
  toggleColorMode: () => {}, // Пустая функция по умолчанию
});
