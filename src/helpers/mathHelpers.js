export const lerp = (x, v0, v1) => v0 + x * (v1 - v0);

export const clamp = (v, min, max) => Math.max(Math.min(v, max), min);

export const wrap = (v, min, max) =>
  min + ((((v - min) % (max - min)) + (max - min)) % (max - min));

export const smoothStep = (x, v0, v1) => {
  // if (x < v0) return v0;
  // if (x > v1) return v1;
  return v0 + (v1 - v0) * (x ** 2 * (3 - 2 * x));
};

export const smoothStepInv = (x, v0, v1) => {
  // if (x < v0) return 0;
  // if (x > v1) return 1;
  return v0 + (v1 - v0) * x * (2 * x ** 2 - 3 * x + 2);
};

export const smootherstep = (x, v0, v1) => {
  // if (x < v0) return v0;
  // if (x > v1) return v1;
  return v0 + (v1 - v0) * (x ** 3 * (x * (x * 6 - 15) + 10));
};

export const rsmul = (x, a) => {
  if (a == 0 || x == 0) return 0;
  return (a * x) / (2 * a * x - a - x + 1);
};

export const curvefit3 = (x, min, middle, max) => {
  return lerp(rsmul(x, (middle - min) / (max - min)), min, max);
};
