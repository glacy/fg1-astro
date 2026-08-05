export interface Point {
  x: number;
  y: number;
  label?: string;
  color?: string;
  id?: string;
}

export interface PolarPoint {
  r: number;
  theta: number;
  label?: string;
  color?: string;
  id?: string;
  tooltipOffset?: { x: number; y: number };
}

export interface GraphConfig {
  width?: number;
  height?: number;
  padding?: number;
  gridSize?: number;
  theme?: 'light' | 'dark' | 'auto';
  colors?: Partial<ColorTheme>;
  animatePoints?: boolean;
  showTooltips?: boolean;
  interactive?: boolean;
}

export interface ColorTheme {
  background: string;
  grid: string;
  axis: string;
  text: string;
  primary: string;
  secondary: string;
  guide: string;
  tooltip: string;
  tooltipText: string;
  warning: string;
}

export interface CoordinateSystem {
  originX: number;
  originY: number;
  gridSize: number;
  padding: number;
  width: number;
  height: number;

  gridToPixel(gridX: number, gridY: number): { x: number; y: number };
  pixelToGrid(pixelX: number, pixelY: number): { x: number; y: number };
}

export interface TooltipData {
  x: number;
  y: number;
  content: string;
  visible: boolean;
}
