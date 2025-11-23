/**
 * @brief Eases a transition between two values over time
 *
 * @param {Number} curr - Current value
 * @param {Number} dst  - Final number to reach
 * @param {Number} time - Time to transition
 *
 * @returns Eased value
 */
export const lerp = (curr, dst, time) => curr * (1 - time) + dst * time;