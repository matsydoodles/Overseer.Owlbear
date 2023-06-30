import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

interface CustomPaletteColor extends PaletteColor {
  customAttribute: string;
}

const starPaletteColor: CustomPaletteColor = {
  main: '#ffd700',
  light: '#fff350',
  dark: '#c7a500',
  contrastText: '#000000',
  customAttribute: 'custom value',
};

declare module '@mui/material/styles' {
  interface Palette {
    star: CustomPaletteColor;
  }
  interface PaletteOptions {
    star?: PaletteColorOptions;
  }
}

export { starPaletteColor };
