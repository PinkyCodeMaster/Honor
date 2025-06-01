import { insertCategorySchema, patchCategorySchema, selectCategorySchema, } from "../../db/schema/categories.js";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createRoute, z } from "@hono/zod-openapi";
import { notFoundSchema } from "../../lib/constants.js";
const tags = ["Categories"];
export const list = createRoute({
    path: "/categories",
    method: "get",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.array(selectCategorySchema), "The list of categories"),
    },
});
export const create = createRoute({
    path: "/categories",
    method: "post",
    request: {
        body: jsonContentRequired(insertCategorySchema, "The category to create"),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectCategorySchema, "The created category"),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertCategorySchema), "The validation error(s)"),
    },
});
export const getOne = createRoute({
    path: "/categories/{id}",
    method: "get",
    request: {
        params: IdParamsSchema,
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectCategorySchema, "The requested category"),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Category not found"),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdParamsSchema), "Invalid id error"),
    },
});
export const patch = createRoute({
    path: "/categories/{id}",
    method: "patch",
    request: {
        params: IdParamsSchema,
        body: jsonContentRequired(patchCategorySchema, "The category updates"),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectCategorySchema, "The updated category"),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Category not found"),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(patchCategorySchema).or(createErrorSchema(IdParamsSchema)), "The validation error(s)"),
    },
});
export const remove = createRoute({
    path: "/categories/{id}",
    method: "delete",
    request: {
        params: IdParamsSchema,
    },
    tags,
    responses: {
        [HttpStatusCodes.NO_CONTENT]: {
            description: "Category deleted",
        },
        [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Category not found"),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdParamsSchema), "Invalid id error"),
    },
});
