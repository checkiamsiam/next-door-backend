import { Campaign, CampaignType, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import prismaHelper from "../../helpers/prisma.helper";
import {
  IQueryFeatures,
  IQueryResult,
} from "../../interfaces/queryFeatures.interface";
import prisma from "../../shared/prismaClient";
import AppError from "../../utils/customError.util";
import { generateNewID } from "../../utils/generateId.util";

const create = async (
  payload: Campaign & { freeItems: { productId: string; quantity: number }[] }
): Promise<Campaign> => {
  const result = await prisma.$transaction(async (txc) => {
    const latestPost = await txc.campaign.findMany({
      orderBy: { createdAt: "desc" },
      take: 1,
    });
    const generatedId = generateNewID("CN", latestPost[0]?.id);
    payload.id = generatedId;
    const { freeItems, ...campaignData } = payload;

    if (
      campaignData.type === CampaignType.discountPercentage &&
      !campaignData.discountPercentage
    ) {
      throw new AppError(
        "Discount Percentage is required",
        httpStatus.BAD_REQUEST
      );
    } else {
      campaignData.discountPercentage = parseInt(
        campaignData.discountPercentage as any
      );
    }

    if (
      campaignData.type === CampaignType.discountPrice &&
      !campaignData.discountPrice
    ) {
      throw new AppError("Discount Price is required", httpStatus.BAD_REQUEST);
    } else {
      campaignData.discountPrice = parseInt(campaignData.discountPrice as any);
    }

    if (
      campaignData.type === CampaignType.buyToGetFree &&
      (!freeItems || freeItems.length === 0)
    ) {
      throw new AppError("Free items is not defined", httpStatus.BAD_REQUEST);
    }

    const result = await txc.campaign.create({
      data: campaignData,
    });

    if (freeItems && freeItems.length > 0) {
      const freeItemsWithQuantity = freeItems.map((item) => {
        return {
          ...item,
          campaignId: result.id,
        };
      });
      await txc.campaignFreeItems.createMany({
        data: freeItemsWithQuantity,
      });
    }

    return result;
  });
  return result;
};

const getCampaigns = async (
  queryFeatures: IQueryFeatures
): Promise<IQueryResult<Campaign>> => {
  const whereConditions: Prisma.CampaignWhereInput =
    prismaHelper.findManyQueryHelper<Prisma.CampaignWhereInput>(queryFeatures, {
      searchFields: ["title", "description", "tagline"],
    });

  const query: Prisma.CampaignFindManyArgs = {
    where: whereConditions,
    skip: queryFeatures.skip || undefined,
    take: queryFeatures.limit || undefined,
    orderBy: queryFeatures.sort,
  };

  if (
    queryFeatures.populate &&
    Object.keys(queryFeatures.populate).length > 0
  ) {
    const queryFeaturePopulateCopy: Prisma.CampaignInclude = {
      ...queryFeatures.populate,
    };

    query.include = {
      _count: true,
      ...queryFeaturePopulateCopy,
    };
  } else {
    if (queryFeatures.fields && Object.keys(queryFeatures.fields).length > 0) {
      query.select = { id: true, ...queryFeatures.fields };
    }
  }
  const [result, count] = await prisma.$transaction([
    prisma.campaign.findMany(query),
    prisma.campaign.count({ where: whereConditions }),
  ]);

  return {
    data: result,
    total: count,
  };
};

const getSingleCampaign = async (
  id: string
): Promise<Partial<Campaign> | null> => {
  const query: Prisma.CampaignFindUniqueArgs = {
    where: {
      id,
    },
  };

  query.include = {
    _count: true,
    freeItems: {
      include: {
        product: true,
      },
    },
    products: {
      include: {
        product: true,
      },
    },
  };

  const result: Partial<Campaign> | null = await prisma.campaign.findUnique(
    query
  );

  return result;
};

const addProduct = async (
  id: string,
  products: { productId: string }[]
): Promise<void> => {
  await prisma.$transaction(async (txc) => {
    const campaignItems = products.map((item) => {
      return {
        ...item,
        campaignId: id,
      };
    });

    const result = await txc.campaignItems.createMany({
      data: campaignItems,
    });

    return result;
  });
};

const campaignService = {
  create,
  getCampaigns,
  getSingleCampaign,
  addProduct,
};

export default campaignService;
