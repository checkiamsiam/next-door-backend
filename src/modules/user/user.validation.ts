import { CustomerStatus } from "@prisma/client";
import { z } from "zod";

const createCustomerReq = z.object({
  body: z
    .object({
      password: z.string({
        required_error: "Password is required",
      }),
      name: z.string({
        required_error: "Name is required",
      }),
      address: z.string({
        required_error: "address is required",
      }),
      city: z.string({
        required_error: "city is required",
      }),
      country: z.string({
        required_error: "country is required",
      }),
      phone: z.string({
        required_error: "phone is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email(),
    })
    .strict(),
});
const updateCustomerReq = z.object({
  body: z
    .object({
      password: z.string().optional(),
      name: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().email().optional(),
      status: z
        .enum([CustomerStatus.active, CustomerStatus.disabled])
        .optional(),
    })
    .strict(),
});

const createAdminReq = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    phone: z.string({
      required_error: "phone is required",
    }),
    email: z
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

export default userValidations;
