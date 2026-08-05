import type { CoordinateSystem, Point } from './types';

export function createCoordinateSystem(
  width: number,
  height: number,
  padding: number,
  gridSize: number
): CoordinateSystem {
  const originX = width / 2;
  const originY = height / 2;

  function gridToPixel(gridX: number, gridY: number): { x: number; y: number } {
    return {
      x: originX + gridX * gridSize,
      y: originY - gridY * gridSize,
    };
  }

  function pixelToGrid(pixelX: number, pixelY: number): { x: number; y: number } {
    return {
      x: (pixelX - originX) / gridSize,
      y: (originY - pixelY) / gridSize,
    };
  }

  return {
    originX,
    originY,
    gridSize,
    padding,
    width,
    height,
    gridToPixel,
    pixelToGrid,
  };
}

export function isPointInBounds(
  point: Point,
  coordSystem: CoordinateSystem,
  margin: number = 0
): boolean {
  const maxGridX = Math.floor((coordSystem.width - coordSystem.padding - margin) / coordSystem.gridSize);
  const maxGridY = Math.floor((coordSystem.originY - coordSystem.padding - margin) / coordSystem.gridSize);

  return (
    point.x >= -maxGridX &&
    point.x <= maxGridX &&
    point.y >= -maxGridY &&
    point.y <= maxGridY
  );
}

export function generateGridRange(
  coordSystem: CoordinateSystem
): { minX: number; maxX: number; minY: number; maxY: number } {
  const maxX = Math.ceil((coordSystem.width - coordSystem.padding - coordSystem.originX) / coordSystem.gridSize);
  const minX = Math.floor((coordSystem.padding - coordSystem.originX) / coordSystem.gridSize);
  const maxY = Math.ceil((coordSystem.originY - coordSystem.padding) / coordSystem.gridSize);
  const minY = Math.floor((coordSystem.originY - coordSystem.height + coordSystem.padding) / coordSystem.gridSize);

  return { minX, maxX, minY, maxY };
}

export function formatCoordinate(value: number, precision: number = 2): string {
  return Number.isInteger(value) ? value.toString() : value.toFixed(precision);
}

export function polarToCartesian(r: number, theta: number, angleInDegrees: boolean = false): { x: number; y: number } {
  const thetaRad = angleInDegrees ? (theta * Math.PI) / 180 : theta;
  return {
    x: r * Math.cos(thetaRad),
    y: r * Math.sin(thetaRad),
  };
}

export function normalizeAngle(theta: number, angleInDegrees: boolean = false): number {
  let normalized = angleInDegrees ? theta % 360 : theta % (2 * Math.PI);
  if (normalized < 0) {
    normalized += angleInDegrees ? 360 : 2 * Math.PI;
  }
  return normalized;
}
