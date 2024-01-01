"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const create = zod_1.z
    .object({
    name: zod_1.z.string({
        required_error: "title is required",
    }),
    description: zod_1.z
        .string({
        invalid_type_error: "description is not valid",
    })
        .optional(),
    banner: zod_1.z.string().optional(),
    startDate: zod_1.z.string({
        invalid_type_error: "startDate is not valid",
    }),
    endDate: zod_1.z.string({
        invalid_type_error: "endDate is not valid",
    }),
    tagline: zod_1.z.string({
        invalid_type_error: "tagline is not valid",
        required_error: "tagline is required",
    }),
    type: zod_1.z.enum([
        client_1.CampaignType.buyToGetFree,
        client_1.CampaignType.discountPercentage,
        client_1.CampaignType.discountPrice,
    ], {
        required_error: "type is required",
        invalid_type_error: "type is not valid",
    }),
    discountPrice: zod_1.z.string().optional(),
    discountPercentage: zod_1.z.string().optional(),
    freeItems: zod_1.z
        .array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number(),
    }))
        .optional(),
})
    .strict();
const campaignValidation = {
    create,
};
exports.default = campaignValidation;
