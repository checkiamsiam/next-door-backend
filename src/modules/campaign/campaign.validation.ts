import { CampaignType } from "@prisma/client";
import { z } from "zod";

const create = z
  .object({
    name: z.string({
      required_error: "title is required",
    }),
    description: z
      .string({
        invalid_type_error: "description is not valid",
      })
      .optional(),
    banner: z.string().optional(),
    startDate: z.string({
      invalid_type_error: "startDate is not valid",
    }),
    endDate: z.string({
      invalid_type_error: "endDate is not valid",
    }),
    tagline: z.string({
      invalid_type_error: "tagline is not valid",
      required_error: "tagline is required",
    }),
    type: z.enum(
      [
        CampaignType.buyToGetFree,
        CampaignType.discountPercentage,
        CampaignType.discountPrice,
      ],
      {
        required_error: "type is required",
        invalid_type_error: "type is not valid",
      }
    ),
    discountPrice: z.string().optional(),
    discountPercentage: z.string().optional(),
    freeItems: z
      .array(
        z.object({
          productId: z.string(),
          quantity: z.number(),
        })
      )
      .optional(),
  })
  .strict();

const campaignValidation = {
  create,
};

export default campaignValidation;
