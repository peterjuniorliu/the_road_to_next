declare module "big.js" {
  class Big {
    constructor(value?: number | string | Big);
    static DP: number;
    static RM: number;
    static NE: number;
    static PE: number;
    static ROUND_DOWN: number;
    static ROUND_HALF_UP: number;
    static ROUND_HALF_EVEN: number;
    static ROUND_UP: number;
    abs(): Big;
    cmp(n: number | string | Big): number;
    div(n: number | string | Big): Big;
    eq(n: number | string | Big): boolean;
    gt(n: number | string | Big): boolean;
    gte(n: number | string | Big): boolean;
    lt(n: number | string | Big): boolean;
    lte(n: number | string | Big): boolean;
    minus(n: number | string | Big): Big;
    mod(n: number | string | Big): Big;
    mul(n: number | string | Big): Big;
    neg(): Big;
    plus(n: number | string | Big): Big;
    pow(n: number): Big;
    round(dp?: number, rm?: number): Big;
    sqrt(): Big;
    times(n: number | string | Big): Big;
    toExponential(dp?: number, rm?: number): string;
    toFixed(dp?: number, rm?: number): string;
    toNumber(): number;
    toPrecision(sd?: number, rm?: number): string;
    toString(): string;
    valueOf(): string;
  }

  export default Big;
}
