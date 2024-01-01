"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const catchAsyncError_util_1 = __importDefault(require("../../utils/catchAsyncError.util"));
const customError_util_1 = __importDefault(require("../../utils/customError.util"));
const sendResponse_util_1 = __importDefault(require("../../utils/sendResponse.util"));
const campaign_service_1 = __importDefault(require("./campaign.service"));
const campaign_validation_1 = __importDefault(require("./campaign.validation"));
const createCampaign = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        req.body.banner = file.path;
    }
    yield campaign_validation_1.default.create.parseAsync(req.body);
    const result = yield campaign_service_1.default.create(req.body);
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Campaign created successfully",
        data: result,
    });
}));
const getCampaigns = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getResult = yield campaign_service_1.default.getCampaigns(req.queryFeatures);
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: getResult.data,
        meta: {
            page: req.queryFeatures.page,
            limit: req.queryFeatures.limit,
            total: getResult.total || 0,
        },
    });
}));
const getSingleCampaign = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield campaign_service_1.default.getSingleCampaign(id, req.queryFeatures);
    if (!result) {
        throw new customError_util_1.default("Campaign Not Found", http_status_1.default.NOT_FOUND);
    }
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const addProduct = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield campaign_service_1.default.addProduct(id, req.body);
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const campaignController = {
    createCampaign,
    getCampaigns,
    getSingleCampaign,
    addProduct,
};
exports.default = campaignController;
