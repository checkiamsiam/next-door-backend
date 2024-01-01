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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const prisma_helper_1 = __importDefault(require("../../helpers/prisma.helper"));
const prismaClient_1 = __importDefault(require("../../shared/prismaClient"));
const customError_util_1 = __importDefault(require("../../utils/customError.util"));
const generateId_util_1 = require("../../utils/generateId.util");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.$transaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const latestPost = yield txc.campaign.findMany({
            orderBy: { createdAt: "desc" },
            take: 1,
        });
        const generatedId = (0, generateId_util_1.generateNewID)("CN", (_a = latestPost[0]) === null || _a === void 0 ? void 0 : _a.id);
        payload.id = generatedId;
        const { freeItems } = payload, campaignData = __rest(payload, ["freeItems"]);
        if (campaignData.type === client_1.CampaignType.discountPercentage &&
            !campaignData.discountPercentage) {
            throw new customError_util_1.default("Discount Percentage is required", http_status_1.default.BAD_REQUEST);
        }
        else {
            campaignData.discountPercentage = parseInt(campaignData.discountPercentage);
        }
        if (campaignData.type === client_1.CampaignType.discountPrice &&
            !campaignData.discountPrice) {
            throw new customError_util_1.default("Discount Price is required", http_status_1.default.BAD_REQUEST);
        }
        else {
            campaignData.discountPrice = parseInt(campaignData.discountPrice);
        }
        if (campaignData.type === client_1.CampaignType.buyToGetFree &&
            (!freeItems || freeItems.length === 0)) {
            throw new customError_util_1.default("Free items is not defined", http_status_1.default.BAD_REQUEST);
        }
        const result = yield txc.campaign.create({
            data: campaignData,
        });
        if (freeItems && freeItems.length > 0) {
            const freeItemsWithQuantity = freeItems.map((item) => {
                return Object.assign(Object.assign({}, item), { campaignId: result.id });
            });
            yield txc.campaignFreeItems.createMany({
                data: freeItemsWithQuantity,
            });
        }
        return result;
    }));
    return result;
});
const getCampaigns = (queryFeatures) => __awaiter(void 0, void 0, void 0, function* () {
    const whereConditions = prisma_helper_1.default.findManyQueryHelper(queryFeatures, {
        searchFields: ["title", "description", "tagline"],
    });
    const query = {
        where: whereConditions,
        skip: queryFeatures.skip || undefined,
        take: queryFeatures.limit || undefined,
        orderBy: queryFeatures.sort,
    };
    if (queryFeatures.populate &&
        Object.keys(queryFeatures.populate).length > 0) {
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
    }
    else {
        if (queryFeatures.fields && Object.keys(queryFeatures.fields).length > 0) {
            query.select = Object.assign({ id: true }, queryFeatures.fields);
        }
    }
    const [result, count] = yield prismaClient_1.default.$transaction([
        prismaClient_1.default.campaign.findMany(query),
        prismaClient_1.default.campaign.count({ where: whereConditions }),
    ]);
    return {
        data: result,
        total: count,
    };
});
const getSingleCampaign = (id, queryFeatures) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        where: {
            id,
        },
    };
    if (queryFeatures.populate &&
        Object.keys(queryFeatures.populate).length > 0) {
        const queryFeaturePopulateCopy = Object.assign({}, queryFeatures.populate);
        query.include = Object.assign({ _count: true }, queryFeaturePopulateCopy);
    }
    else {
        if (queryFeatures.fields && Object.keys(queryFeatures.fields).length > 0) {
            query.select = Object.assign({ id: true }, queryFeatures.fields);
        }
    }
    const result = yield prismaClient_1.default.campaign.findUnique(query);
    return result;
});
const campaignService = {
    create,
    getCampaigns,
    getSingleCampaign,
};
exports.default = campaignService;
