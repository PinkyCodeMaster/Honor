import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const postTasks_Body = z
  .object({ name: z.string().min(1).max(500), done: z.boolean() })
  .passthrough();
const patchTasksId_Body = z
  .object({ name: z.string().min(1).max(500), done: z.boolean() })
  .partial()
  .passthrough();
const postCategories_Body = z
  .object({
    name: z.string().min(1).max(255),
    description: z.string().nullish(),
    handle: z.string().min(1).max(255),
    isActive: z.boolean().optional(),
    isInternal: z.boolean().optional(),
    rank: z.number().optional(),
    parentCategoryId: z.number().nullish(),
    metadata: z.string().nullish(),
  })
  .passthrough();
const patchCategoriesId_Body = z
  .object({
    name: z.string().min(1).max(255),
    description: z.string().nullable(),
    handle: z.string().min(1).max(255),
    isActive: z.boolean(),
    isInternal: z.boolean(),
    rank: z.number(),
    parentCategoryId: z.number().nullable(),
    metadata: z.string().nullable(),
  })
  .partial()
  .passthrough();

export const schemas = {
  postTasks_Body,
  patchTasksId_Body,
  postCategories_Body,
  patchCategoriesId_Body,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/",
    alias: "get",
    requestFormat: "json",
    response: z.object({ message: z.string() }).passthrough(),
  },
  {
    method: "get",
    path: "/categories",
    alias: "getCategories",
    requestFormat: "json",
    response: z.array(
      z
        .object({
          id: z.number(),
          name: z.string(),
          description: z.string().nullable(),
          handle: z.string(),
          isActive: z.boolean(),
          isInternal: z.boolean(),
          rank: z.number(),
          parentCategoryId: z.number().nullable(),
          metadata: z.string().nullable(),
          deletedAt: z.string().nullable(),
          createdAt: z.string().nullable(),
          updatedAt: z.string().nullable(),
        })
        .passthrough()
    ),
  },
  {
    method: "post",
    path: "/categories",
    alias: "postCategories",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `The category to create`,
        type: "Body",
        schema: postCategories_Body,
      },
    ],
    response: z
      .object({
        id: z.number(),
        name: z.string(),
        description: z.string().nullable(),
        handle: z.string(),
        isActive: z.boolean(),
        isInternal: z.boolean(),
        rank: z.number(),
        parentCategoryId: z.number().nullable(),
        metadata: z.string().nullable(),
        deletedAt: z.string().nullable(),
        createdAt: z.string().nullable(),
        updatedAt: z.string().nullable(),
      })
      .passthrough(),
    errors: [
      {
        status: 422,
        description: `The validation error(s)`,
        schema: z
          .object({
            success: z.boolean(),
            error: z
              .object({
                issues: z.array(
                  z
                    .object({
                      code: z.string(),
                      path: z.array(z.union([z.string(), z.number()])),
                      message: z.string().optional(),
                    })
                    .passthrough()
                ),
                name: z.string(),
              })
              .passthrough(),
          })
          .passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/categories/:id",
    alias: "getCategoriesId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().nullable(),
      },
    ],
    response: z
      .object({
        id: z.number(),
        name: z.string(),
        description: z.string().nullable(),
        handle: z.string(),
        isActive: z.boolean(),
        isInternal: z.boolean(),
        rank: z.number(),
        parentCategoryId: z.number().nullable(),
        metadata: z.string().nullable(),
        deletedAt: z.string().nullable(),
        createdAt: z.string().nullable(),
        updatedAt: z.string().nullable(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Category not found`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 422,
        description: `Invalid id error`,
        schema: z
          .object({
            success: z.boolean(),
            error: z
              .object({
                issues: z.array(
                  z
                    .object({
                      code: z.string(),
                      path: z.array(z.union([z.string(), z.number()])),
                      message: z.string().optional(),
                    })
                    .passthrough()
                ),
                name: z.string(),
              })
              .passthrough(),
          })
          .passthrough(),
      },
    ],
  },
  {
    method: "patch",
    path: "/categories/:id",
    alias: "patchCategoriesId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `The category updates`,
        type: "Body",
        schema: patchCategoriesId_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().nullable(),
      },
    ],
    response: z
      .object({
        id: z.number(),
        name: z.string(),
        description: z.string().nullable(),
        handle: z.string(),
        isActive: z.boolean(),
        isInternal: z.boolean(),
        rank: z.number(),
        parentCategoryId: z.number().nullable(),
        metadata: z.string().nullable(),
        deletedAt: z.string().nullable(),
        createdAt: z.string().nullable(),
        updatedAt: z.string().nullable(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Category not found`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 422,
        description: `The validation error(s)`,
        schema: z.union([
          z
            .object({
              success: z.boolean(),
              error: z
                .object({
                  issues: z.array(
                    z
                      .object({
                        code: z.string(),
                        path: z.array(z.union([z.string(), z.number()])),
                        message: z.string().optional(),
                      })
                      .passthrough()
                  ),
                  name: z.string(),
                })
                .passthrough(),
            })
            .passthrough(),
          z
            .object({
              success: z.boolean(),
              error: z
                .object({
                  issues: z.array(
                    z
                      .object({
                        code: z.string(),
                        path: z.array(z.union([z.string(), z.number()])),
                        message: z.string().optional(),
                      })
                      .passthrough()
                  ),
                  name: z.string(),
                })
                .passthrough(),
            })
            .passthrough(),
        ]),
      },
    ],
  },
  {
    method: "delete",
    path: "/categories/:id",
    alias: "deleteCategoriesId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().nullable(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Category not found`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 422,
        description: `Invalid id error`,
        schema: z
          .object({
            success: z.boolean(),
            error: z
              .object({
                issues: z.array(
                  z
                    .object({
                      code: z.string(),
                      path: z.array(z.union([z.string(), z.number()])),
                      message: z.string().optional(),
                    })
                    .passthrough()
                ),
                name: z.string(),
              })
              .passthrough(),
          })
          .passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/tasks",
    alias: "getTasks",
    requestFormat: "json",
    response: z.array(
      z
        .object({
          id: z.number(),
          name: z.string(),
          done: z.boolean(),
          createdAt: z.string().nullable(),
          updatedAt: z.string().nullable(),
        })
        .passthrough()
    ),
  },
  {
    method: "post",
    path: "/tasks",
    alias: "postTasks",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `The task to create`,
        type: "Body",
        schema: postTasks_Body,
      },
    ],
    response: z
      .object({
        id: z.number(),
        name: z.string(),
        done: z.boolean(),
        createdAt: z.string().nullable(),
        updatedAt: z.string().nullable(),
      })
      .passthrough(),
    errors: [
      {
        status: 422,
        description: `The validation error(s)`,
        schema: z
          .object({
            success: z.boolean(),
            error: z
              .object({
                issues: z.array(
                  z
                    .object({
                      code: z.string(),
                      path: z.array(z.union([z.string(), z.number()])),
                      message: z.string().optional(),
                    })
                    .passthrough()
                ),
                name: z.string(),
              })
              .passthrough(),
          })
          .passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/tasks/:id",
    alias: "getTasksId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().nullable(),
      },
    ],
    response: z
      .object({
        id: z.number(),
        name: z.string(),
        done: z.boolean(),
        createdAt: z.string().nullable(),
        updatedAt: z.string().nullable(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Task not found`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 422,
        description: `Invalid id error`,
        schema: z
          .object({
            success: z.boolean(),
            error: z
              .object({
                issues: z.array(
                  z
                    .object({
                      code: z.string(),
                      path: z.array(z.union([z.string(), z.number()])),
                      message: z.string().optional(),
                    })
                    .passthrough()
                ),
                name: z.string(),
              })
              .passthrough(),
          })
          .passthrough(),
      },
    ],
  },
  {
    method: "patch",
    path: "/tasks/:id",
    alias: "patchTasksId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `The task updates`,
        type: "Body",
        schema: patchTasksId_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().nullable(),
      },
    ],
    response: z
      .object({
        id: z.number(),
        name: z.string(),
        done: z.boolean(),
        createdAt: z.string().nullable(),
        updatedAt: z.string().nullable(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Task not found`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 422,
        description: `The validation error(s)`,
        schema: z.union([
          z
            .object({
              success: z.boolean(),
              error: z
                .object({
                  issues: z.array(
                    z
                      .object({
                        code: z.string(),
                        path: z.array(z.union([z.string(), z.number()])),
                        message: z.string().optional(),
                      })
                      .passthrough()
                  ),
                  name: z.string(),
                })
                .passthrough(),
            })
            .passthrough(),
          z
            .object({
              success: z.boolean(),
              error: z
                .object({
                  issues: z.array(
                    z
                      .object({
                        code: z.string(),
                        path: z.array(z.union([z.string(), z.number()])),
                        message: z.string().optional(),
                      })
                      .passthrough()
                  ),
                  name: z.string(),
                })
                .passthrough(),
            })
            .passthrough(),
        ]),
      },
    ],
  },
  {
    method: "delete",
    path: "/tasks/:id",
    alias: "deleteTasksId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().nullable(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Task not found`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 422,
        description: `Invalid id error`,
        schema: z
          .object({
            success: z.boolean(),
            error: z
              .object({
                issues: z.array(
                  z
                    .object({
                      code: z.string(),
                      path: z.array(z.union([z.string(), z.number()])),
                      message: z.string().optional(),
                    })
                    .passthrough()
                ),
                name: z.string(),
              })
              .passthrough(),
          })
          .passthrough(),
      },
    ],
  },
]);

export const honorClient = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
