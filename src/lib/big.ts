import Big from "big.js";

const ROUND_DOWN = 0;
const ROUND_HALF_UP = 1;
const ROUND_HALF_EVEN = 2;
const ROUND_UP = 3;

Object.assign(Big, {
    ROUND_DOWN,
    ROUND_HALF_UP,
    ROUND_HALF_EVEN,
    ROUND_UP,
});

Big.DP = 2;
Big.RM = ROUND_HALF_EVEN;

export const MyBig = Big;
export {ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP};
