import { z } from "zod";

const create = z
  .object({
    title: z.string({
      required_error: "title is required",
    }),
    thumbnail: z.string({
      required_error: "thumbnail is required",
    }),
    images: z.string().optional(),
    salePrice: z.number({
      required_error: "salePrice is required",
    }),
    regularPrice: z.number({
      required_error: "regularPrice is required",
    }),
    status: z
      .enum(["active", "disabled"] as [string, ...string[]], {
        invalid_type_error: "status must be a active or disabled",
      })
      .optional(),
    description: z
      .string({
        required_error: "description is required",
      })
      .optional(),
    keyFeatures: z
      .string({
        required_error: "keyFeatures is required",
      })
      .optional(),
    specifications: z
      .string({
        required_error: "specifications is required",
      })
      .optional(),
    categoryId: z.string({
      required_error: "categoryId is required",
    }),
    subCategoryId: z.string({
      required_error: "subCategoryId is required",
    }),
    brandId: z.string({
      required_error: "subCategoryId is required",
    }),
  })
  .strict();

const update = z
  .object({
    title: z.string().optional(),
    thumbnail: z.string().optional(),
    images: z.string().optional(),
    salePrice: z.number().optional(),
    regularPrice: z.number().optional(),
    status: z
      .enum(["active", "disabled"] as [string, ...string[]], {
        invalid_type_error: "status must be a active or disabled",
      })
      .optional(),
    description: z.string().optional(),
    keyFeatures: z.string().optional(),
    specifications: z.string().optional(),
    categoryId: z.string().optional(),
    subCategoryId: z.string().optional(),
    brandId: z.string().optional(),
  })
  .strict();

const productValidation = {
  create,
  update,
};

export default productValidation;
