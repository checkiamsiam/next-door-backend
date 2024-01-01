import { Campaign } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import AppError from "../../utils/customError.util";
import sendResponse from "../../utils/sendResponse.util";
import campaignService from "./campaign.service";
import campaignValidation from "./campaign.validation";

const createCampaign: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const file = req.file;
    if (file) {
      req.body.banner = file.path;
    }
    await campaignValidation.create.parseAsync(req.body);
    const result = await campaignService.create(req.body);
    sendResponse<Campaign>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Campaign created successfully",
      data: result,
    });
  }
);
const getCampaigns: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const getResult = await campaignService.getCampaigns(req.queryFeatures);
    sendResponse<Partial<Campaign>[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: getResult.data,
      meta: {
        page: req.queryFeatures.page,
        limit: req.queryFeatures.limit,
        total: getResult.total || 0,
      },
    });
  }
);

const getSingleCampaign: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const result: Partial<Campaign> | null =
      await campaignService.getSingleCampaign(id);
    if (!result) {
      throw new AppError("Campaign Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<Campaign>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);

const addProduct: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    await campaignService.addProduct(id, req.body);

    sendResponse<Partial<Campaign>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "products added successfully",
    });
  }
);

const campaignController = {
  createCampaign,
  getCampaigns,
  getSingleCampaign,
  addProduct,
};

export default campaignController;
