/**
 * Generate a random integer greater than or equal to `min` and less than `max`.
 *
 * @param min - The lower bound (inclusive)
 * @param max - The upper bound (exclusive)
 * @returns A random integer x such that `min <= x < max`
 * @throws If `max` is less than or equal to `min`
 */
export function getRandomInt(min: number, max: number): number {
	if (max <= min) throw new Error("max must be greater than min");
	return Math.floor(Math.random() * (max - min)) + min;
}