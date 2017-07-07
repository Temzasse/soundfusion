import Color from 'color';

// Lets export color variables independently too
const basePrimary = '#3b1d52';
export const primaryBaseColor = Color(basePrimary);
export const primaryColor = Color(basePrimary).hsl().string();
export const primaryColorLight = Color(basePrimary).lighten(0.3).hsl().string();
export const primaryColorLighter = Color(basePrimary).lighten(0.4).hsl().string();
export const primaryColorLightest = Color(basePrimary).lighten(0.6).hsl().string();
export const primaryColorDark = Color(basePrimary).darken(0.3).hsl().string();
export const primaryColorDarker = Color(basePrimary).darken(0.4).hsl().string();
export const primaryColorDarkest = Color(basePrimary).darken(0.5).hsl().string();

export const theme = {
  primaryColor,
  primaryColorLight,
  primaryColorLighter,
  primaryColorLightest,
  primaryColorDark,
  primaryColorDarker,
  primaryColorDarkest,
};

export const GOOGLE_API_KEY = '***REMOVED***';
