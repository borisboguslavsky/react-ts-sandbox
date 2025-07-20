/**
 * Generates a random number following a normal (bell curve) distribution within a specified range.
 * The distribution can be biased and its width controlled.
 *
 * @param min The minimum value of the range (inclusive).
 * @param max The maximum value of the range (inclusive).
 * @param step The increment to which the final value is rounded. If 0, no rounding is performed.
 * @param bias A number between 0 and 1 that sets the mean (peak) of the bell curve.
 *             - A bias of 0.5 centers the curve in the middle of the range.
 *             - A bias closer to 0 moves the peak towards `min`.
 *             - A bias closer to 1 moves the peak towards `max`.
 * @param width A number that controls the standard width (deviation) of the bell curve.
 *                  A smaller width creates a narrower, steeper curve (values are tightly clustered).
 *                  A larger width creates a wider, flatter curve (values are more spread out).
 * @returns A random number that follows the specified bell curve distribution.
 */
function rngBell(min: number, max: number, step: number, bias: number, width: number) {
  if (width <= 0) {
    width = 0.01;
  }

  function gaussian() {
    // Box-Muller transform for standard normal distribution
    var u = 0,
      v = 0;
    while (u === 0) u = Math.random(); // avoid 0
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  var range = max - min;
  var mean = min + range * bias; // shift the bell toward min or max
  var stddev = range / width; // width has to be greater than 0

  var value;
  do {
    value = gaussian() * stddev + mean;
  } while (value < min || value > max);

  if (step > 0) {
    value = Math.round((value - min) / step) * step + min;
    // Clamp to bounds in case rounding overflows
    if (value < min) value = min;
    if (value > max) value = max;
  }

  return value;
}
export default rngBell;
