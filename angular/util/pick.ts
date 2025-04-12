/**
 * Picks specific keys from an object and returns a new object with only those keys.
 *
 * @template T - The type of the source object
 * @template K - The keys to pick from the object (must be keys of T)
 * @param {T} object - The source object to pick properties from
 * @param {K[]} keys - An array of keys to pick
 * @returns {Pick<T, K>} - A new object with only the picked keys
 *
 * @example
 * const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
 * const partial = pick(user, ['id', 'email']);
 * // partial is { id: 1, email: 'alice@example.com' }
 */
export function pick<T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Pick<T, K>);
}
