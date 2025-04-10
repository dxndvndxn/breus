// Map number x from range [a, b] to [c, d]
const map = (x: number, a: number, b: number, c: number, d: number) =>
  ((x - a) * (d - c)) / (b - a) + c;

// Linear interpolation
const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

// Clamp val within min and max
const clamp = (val: number, min: number, max: number) =>
  Math.max(Math.min(val, max), min);

// Random float
const getRandomFloat = (min: number, max: number) =>
  (Math.random() * (max - min) + min).toFixed(2);

// distance between two points
const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1);

const lineEq = (
  y2: number,
  y1: number,
  x2: number,
  x1: number,
  currentVal: number
) => {
  const m = (y2 - y1) / (x2 - x1);
  const b = y1 - m * x1;

  return m * currentVal + b;
};

export { map, lerp, clamp, getRandomFloat, distance, lineEq };
