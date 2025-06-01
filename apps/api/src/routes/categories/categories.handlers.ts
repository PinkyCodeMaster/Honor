import type {  CreateRoute,  GetOneRoute,  ListRoute,  PatchRoute,  RemoveRoute,} from "./categories.routes";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { categories } from "@/db/schema/categories";
import type { AppRouteHandler } from "@/lib/types";
import { eq } from "drizzle-orm";
import db from "@/db";


export const list: AppRouteHandler<ListRoute> = async (c) => {
  const result = await db.query.categories.findMany();
  return c.json(result);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const category = c.req.valid("json");
  const [inserted] = await db.insert(categories).values(category).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const category = await db.query.categories.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!category) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(category, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: "ZodError",
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY
    );
  }

  const [updated] = await db
    .update(categories)
    .set(updates)
    .where(eq(categories.id, id))
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const result = await db.delete(categories).where(eq(categories.id, id));

  if (result.rowsAffected === 0) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
