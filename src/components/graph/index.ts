export { default as SistemaCartesiano } from './SistemaCartesiano.astro';
export { default as SistemaPolar } from './SistemaPolar.astro';
export type { Point, PolarPoint, GraphConfig, ColorTheme, CoordinateSystem, TooltipData } from './types';
export { themes, getTheme, mergeThemes } from './themes';
export {
  createCoordinateSystem,
  isPointInBounds,
  generateGridRange,
  formatCoordinate,
  polarToCartesian,
  normalizeAngle
} from './utils';
