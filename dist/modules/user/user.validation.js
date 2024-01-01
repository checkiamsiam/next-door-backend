"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createCustomerReq = zod_1.z.object({
    body: zod_1.z
        .object({
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        address: zod_1.z.string({
            required_error: "address is required",
        }),
        city: zod_1.z.string({
            required_error: "city is required",
        }),
        country: zod_1.z.string({
            required_error: "country is required",
        }),
        phone: zod_1.z.string({
            required_error: "phone is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email(),
    })
        .strict(),
});
const updateCustomerReq = zod_1.z.object({
    body: zod_1.z
        .object({
        password: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        status: zod_1.z
            .enum([client_1.CustomerStatus.active, client_1.CustomerStatus.disabled])
            .optional(),
    })
        .strict(),
});
const createAdminReq = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        phone: zod_1.z.string({
            required_error: "phone is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email(),
    }),
});
const userValidations = {
    createCustomerReq,
    createAdminReq,
    updateCustomerReq,
};
exports.default = userValidations;
