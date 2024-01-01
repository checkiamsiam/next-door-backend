import { UserRole } from "@prisma/client";
import express, { Router } from "express";
import authorization from "../../middleware/authorization.middleware";
import uploadToCloudinary from "../../middleware/fileUpload.middleware";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import campaignController from "./campaign.controller";

const campaignRoutes: Router = express.Router();

// create campaign without defining including products
campaignRoutes.post(
  "/create",
  authorization(UserRole.admin),
  uploadToCloudinary("banner", "campaign", [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ]),
  campaignController.createCampaign
);

campaignRoutes.get(
  "/",
  queryFeatures("multiple"),
  campaignController.getCampaigns
);

campaignRoutes.get(
  "/:id",
  queryFeatures("single"),
  campaignController.getSingleCampaign
);

export default campaignRoutes;
