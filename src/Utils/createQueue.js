/**
 * 
 * @param min the max number
 * @param max the min number
 * @returns a random number between a range
 */

export function createRandomNumber(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}