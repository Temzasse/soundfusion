import Color from 'color';

// Lets export color variables independently too
const basePrimary = '#331b42'; //  | #3b1d52
const basePrimaryLighter = '#d834ba';
export const primaryBaseColor = Color(basePrimary);
export const primaryLighterBaseColor = Color(basePrimaryLighter);
export const primaryColor = Color(basePrimary).rgb().string();
export const primaryColorLight = Color(basePrimaryLighter).rgb().string();
export const primaryColorLighter = Color(basePrimaryLighter).lighten(0.3).rgb().string();
export const primaryColorLightest = Color(basePrimaryLighter).lighten(0.5).rgb().string();
export const primaryColorDark = Color(basePrimary).darken(0.3).rgb().string();
export const primaryColorDarker = Color(basePrimary).darken(0.4).rgb().string();
export const primaryColorDarkest = Color(basePrimary).darken(0.5).rgb().string();

export const theme = {
  primaryBaseColor,
  primaryLighterBaseColor,
  primaryColor,
  primaryColorLight,
  primaryColorLighter,
  primaryColorLightest,
  primaryColorDark,
  primaryColorDarker,
  primaryColorDarkest,
};

export const GOOGLE_API_KEY = '***REMOVED***';
export const SOUNDCLOUD_CLIENT_ID = '***REMOVED***';
