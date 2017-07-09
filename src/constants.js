import Color from 'color';

// Lets export color variables independently too
const basePrimary = '#3b1d52';
const basePrimaryLighter = '#62298e';
export const primaryBaseColor = Color(basePrimary);
export const primaryColor = Color(basePrimary).rgb().string();
export const primaryColorLight = Color(basePrimaryLighter).lighten(0.2).rgb().string();
export const primaryColorLighter = Color(basePrimaryLighter).lighten(0.4).rgb().string();
export const primaryColorLightest = Color(basePrimaryLighter).lighten(0.6).rgb().string();
export const primaryColorDark = Color(basePrimary).darken(0.3).rgb().string();
export const primaryColorDarker = Color(basePrimary).darken(0.4).rgb().string();
export const primaryColorDarkest = Color(basePrimary).darken(0.5).rgb().string();

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
