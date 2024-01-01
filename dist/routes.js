"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const brand_route_1 = __importDefault(require("./modules/brand/brand.route"));
const campaign_route_1 = __importDefault(require("./modules/campaign/campaign.route"));
const category_route_1 = __importDefault(require("./modules/category/category.route"));
const notification_route_1 = __importDefault(require("./modules/notification/notification.route"));
const product_route_1 = __importDefault(require("./modules/product/product.route"));
const search_route_1 = __importDefault(require("./modules/search/search.route"));
const subCategory_route_1 = __importDefault(require("./modules/subCategory/subCategory.route"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const router = express_1.default.Router();
const routes = [
    {
        path: "/users",
        route: user_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    {
        path: "/category",
        route: category_route_1.default,
    },
    {
        path: "/sub-category",
        route: subCategory_route_1.default,
    },
    {
        path: "/brand",
        route: brand_route_1.default,
    },
    {
        path: "/product",
        route: product_route_1.default,
    },
    {
        path: "/campaign",
        route: campaign_route_1.default,
    },
    {
        path: "/search",
        route: search_route_1.default,
    },
    {
        path: "/notification",
        route: notification_route_1.default,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
