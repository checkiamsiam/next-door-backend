"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const authorization_middleware_1 = __importDefault(require("../../middleware/authorization.middleware"));
const fileUpload_middleware_1 = __importDefault(require("../../middleware/fileUpload.middleware"));
const queryFeatures_middleware_1 = __importDefault(require("../../middleware/queryFeatures.middleware"));
const campaign_controller_1 = __importDefault(require("./campaign.controller"));
const campaignRoutes = express_1.default.Router();
// create campaign without defining including products
campaignRoutes.post("/create", (0, authorization_middleware_1.default)(client_1.UserRole.admin), (0, fileUpload_middleware_1.default)("banner", "campaign", [
    "image/jpeg",
    "image/jpg",
    "image/png",
]), campaign_controller_1.default.createCampaign);
campaignRoutes.get("/", (0, queryFeatures_middleware_1.default)("multiple"), campaign_controller_1.default.getCampaigns);
campaignRoutes.get("/:id", (0, queryFeatures_middleware_1.default)("single"), campaign_controller_1.default.getSingleCampaign);
exports.default = campaignRoutes;
