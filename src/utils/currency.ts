import {Prisma} from "../generated/prisma/client";
import {MyBig} from "../lib/big";

type MoneyInput = number | string | Prisma.Decimal;

const toMoneyString = (amount: MoneyInput) =>
{
    return typeof amount === "string" ? amount : amount.toString();
};

export const toDecimalString = (amount: MoneyInput) =>
{
    return new MyBig(toMoneyString(amount)).toFixed(2);
};

export const toCurrency = (amount: MoneyInput) =>
{
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(Number(toDecimalString(amount)));
};
