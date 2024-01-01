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
const category_service_1 = __importDefault(require("./category.service"));
const category_validation_1 = __importDefault(require("./category.validation"));
const createCategory = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        req.body.icon = file.path;
    }
    yield category_validation_1.default.create.parseAsync(req.body);
    const result = yield category_service_1.default.create(req.body);
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category created successfully",
        data: result,
    });
}));
const getCategories = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getResult = yield category_service_1.default.getCategories(req.queryFeatures);
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
const getSingleCategory = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield category_service_1.default.getSingleCategory(id, req.queryFeatures);
    if (!result) {
        throw new customError_util_1.default("Category Not Found", http_status_1.default.NOT_FOUND);
    }
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const update = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const file = req.file;
    if (file) {
        req.body.icon = file.path;
    }
    yield category_validation_1.default.update.parseAsync(req.body);
    const result = yield category_service_1.default.update(id, req.body);
    if (!result) {
        throw new customError_util_1.default("Requested Category Not Found", http_status_1.default.NOT_FOUND);
    }
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category Updated Successfully",
        data: result,
    });
}));
const deleteCategory = (0, catchAsyncError_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield category_service_1.default.deleteCategory(id);
    if (!result) {
        throw new customError_util_1.default("Requested Category Not Found", http_status_1.default.NOT_FOUND);
    }
    (0, sendResponse_util_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category Deleted Successfully",
    });
}));
const categoryController = {
    createCategory,
    getCategories,
    getSingleCategory,
    update,
    deleteCategory,
};
exports.default = categoryController;
