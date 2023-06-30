import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

interface CustomPaletteColor extends PaletteColor {
  customAttribute: string;
}

const pooPaletteColor: CustomPaletteColor = {
    main: '#6e4f3d',
    light: '#b59381',
    dark: '#402b1e',
    contrastText: '#ffffff',
    customAttribute: 'custom value',
  };

declare module '@mui/material/styles' {
  interface Palette {
    poo: CustomPaletteColor;
  }
  interface PaletteOptions {
    poo?: PaletteColorOptions;
  }
}

export { pooPaletteColor };