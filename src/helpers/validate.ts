import { RequestHandler } from "express";
import { validateOrReject } from "class-validator";

export function validateSchema<T extends object>(
  schema: new (...args: any[]) => T
): RequestHandler {
  return async (req, res, next) => {
    try {
      const obj = new schema(req.body);
      await validateOrReject(obj, {
        validationError: { target: false },
        whitelist: true,
      });
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
}
