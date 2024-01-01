"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const create = zod_1.z
    .object({
    title: zod_1.z.string({
        required_error: "title is required",
    }),
    thumbnail: zod_1.z.string({
        required_error: "thumbnail is required",
    }),
    images: zod_1.z.string().optional(),
    salePrice: zod_1.z.number({
        required_error: "salePrice is required",
    }),
    regularPrice: zod_1.z.number({
        required_error: "regularPrice is required",
    }),
    status: zod_1.z
        .enum(["active", "disabled"], {
        invalid_type_error: "status must be a active or disabled",
    })
        .optional(),
    description: zod_1.z
        .string({
        required_error: "description is required",
    })
        .optional(),
    keyFeatures: zod_1.z
        .string({
        required_error: "keyFeatures is required",
    })
        .optional(),
    specifications: zod_1.z
        .string({
        required_error: "specifications is required",
    })
        .optional(),
    categoryId: zod_1.z.string({
        required_error: "categoryId is required",
    }),
    subCategoryId: zod_1.z.string({
        required_error: "subCategoryId is required",
    }),
    brandId: zod_1.z.string({
        required_error: "subCategoryId is required",
    }),
})
    .strict();
const update = zod_1.z
    .object({
    title: zod_1.z.string().optional(),
    thumbnail: zod_1.z.string().optional(),
    images: zod_1.z.string().optional(),
    salePrice: zod_1.z.number().optional(),
    regularPrice: zod_1.z.number().optional(),
    status: zod_1.z
        .enum(["active", "disabled"], {
        invalid_type_error: "status must be a active or disabled",
    })
        .optional(),
    description: zod_1.z.string().optional(),
    keyFeatures: zod_1.z.string().optional(),
    specifications: zod_1.z.string().optional(),
    categoryId: zod_1.z.string().optional(),
    subCategoryId: zod_1.z.string().optional(),
    brandId: zod_1.z.string().optional(),
})
    .strict();
const productValidation = {
    create,
    update,
};
exports.default = productValidation;
