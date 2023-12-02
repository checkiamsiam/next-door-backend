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
const validateRequest_middleware_1 = __importDefault(require("../../middleware/validateRequest.middleware"));
const order_controller_1 = __importDefault(require("./order.controller"));
const order_validation_1 = __importDefault(require("./order.validation"));
const orderRoutes = express_1.default.Router();
orderRoutes.post("/request-quotation", (0, authorization_middleware_1.default)(client_1.UserRole.customer), (0, validateRequest_middleware_1.default)(order_validation_1.default.requestQuotation), order_controller_1.default.requestQuotation);
orderRoutes.get("/get-single-order/:id", (0, authorization_middleware_1.default)(client_1.UserRole.customer, client_1.UserRole.admin), order_controller_1.default.getSingleOrder);
orderRoutes.get("/get-my-orders/:status", (0, validateRequest_middleware_1.default)(order_validation_1.default.statusParams), (0, authorization_middleware_1.default)(client_1.UserRole.customer), (0, queryFeatures_middleware_1.default)("multiple"), order_controller_1.default.getMyOrders);
orderRoutes.get("/:status", (0, validateRequest_middleware_1.default)(order_validation_1.default.statusParams), (0, authorization_middleware_1.default)(client_1.UserRole.admin), (0, queryFeatures_middleware_1.default)("multiple"), order_controller_1.default.getOrders);
orderRoutes.patch("/quotation-approve/:id", (0, authorization_middleware_1.default)(client_1.UserRole.admin), (0, fileUpload_middleware_1.default)("quotation", "quotations", ["application/pdf"]), order_controller_1.default.quotationApprove);
orderRoutes.patch("/update/:id", (0, authorization_middleware_1.default)(client_1.UserRole.admin), (0, validateRequest_middleware_1.default)(order_validation_1.default.update), order_controller_1.default.updateOrderStatus);
orderRoutes.patch("/confirm-order/:id", (0, authorization_middleware_1.default)(client_1.UserRole.customer), order_controller_1.default.confirmOrder);
orderRoutes.patch("/decline-order/:id", (0, authorization_middleware_1.default)(client_1.UserRole.customer), order_controller_1.default.declineOrder);
orderRoutes.patch("/add-invoice/:id", (0, authorization_middleware_1.default)(client_1.UserRole.admin), (0, fileUpload_middleware_1.default)("invoice", "invoices", ["application/pdf"]), order_controller_1.default.invoiceUpload);
exports.default = orderRoutes;
