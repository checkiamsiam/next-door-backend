import { OrderStatus } from "@prisma/client";
import { z } from "zod";

const requestQuotation = z.object({
  body: z
    .object({
      items: z.array(
        z.object({
          productId: z.string({
            required_error: "productId is required",
            invalid_type_error: "productId must be a string",
          }),
          quantity: z.number({
            required_error: "quantity is required",
            invalid_type_error: "quantity must be a number",
          }),
        })
      ),
    })
    .strict(),
});

const statusParams = z.object({
  params: z
    .object({
      status: z.enum(
        [
          OrderStatus.requestQuotation,
          OrderStatus.quotationApproved,
          OrderStatus.spam,
          OrderStatus.ordered,
          OrderStatus.orderInProcess,
          OrderStatus.delivered,
        ],
        {
          invalid_type_error:
            "status must be a requestQuotation, quotationApproved, spam, ordered, orderInProcess or delivered",
          required_error: "status is required",
        }
      ),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      status: z.enum([OrderStatus.spam, OrderStatus.delivered], {
        invalid_type_error: "status must be a spam or delivered",
        required_error: "status is required",
      }),
    })
    .strict(),
});

const orderValidation = { requestQuotation, statusParams, update };

export default orderValidation;
