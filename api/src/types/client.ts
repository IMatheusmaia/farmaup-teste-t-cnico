import type { ZodString } from "zod";

type ClientType = {
    id?: ZodString;
    name: ZodString;
    email: ZodString;
    phone: ZodString;
    city: ZodString;
};

export type { ClientType };