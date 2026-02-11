import type { ZodString } from "zod";

type ZodClientType = {
    id?: ZodString;
    name: ZodString;
    email: ZodString;
    phone: ZodString;
    city: ZodString;
};

type ClientType = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    city: string;
};

export type { ZodClientType, ClientType };