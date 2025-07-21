/**
 * Generates a random number within a specified range, with a given step and a linear bias.
 * The bias parameter creates a triangular probability distribution.
 *
 * @param min The minimum value of the range (inclusive).
 * @param max The maximum value of the range (inclusive).
 * @param step The increment between possible values.
 * @param bias A number between 0 and 1 that controls the linear slope of the probability.
 *             - A bias of 0 makes the probability highest at `min` and decrease linearly towards `max`.
 *             - A bias of 0.5 results in a uniform (flat) distribution.
 *             - A bias of 1 makes the probability lowest at `min` and increase linearly towards `max`.
 * @returns A random number within the specified range and constraints.
 */
function rngFlat(min: number, max: number, step: number, bias: number): number {
  if (min > max) {
    [min, max] = [max, min]; // Ensure min is less than or equal to max
  }
  if (step <= 0) {
    throw new Error("Step must be a positive number.");
  }
  if (bias < 0 || bias > 1) {
    throw new Error("Bias must be between 0 and 1.");
  }

  // The number of possible values (steps) in the range.
  const numSteps = Math.floor((max - min) / step) + 1;

  if (numSteps === 1) {
    return min;
  }

  // Generate two uniform random numbers
  const r1 = Math.random();
  const r2 = Math.random();

  let biasedRandom: number;

  if (r1 < bias) {
    // If r1 is within the bias, favor the max value
    biasedRandom = Math.max(r2, Math.random());
  } else {
    // Otherwise, favor the min value
    biasedRandom = Math.min(r2, Math.random());
  }

  const randomStep = Math.floor(biasedRandom * numSteps);
  const value = min + randomStep * step;

  // Clamp the value to be within the max bound, as the last step can sometimes exceed it.
  return Math.min(value, max);
}

export default rngFlat;
