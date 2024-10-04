import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { HttpException } from "./errors";

interface WithErrorHandling {
  (handler: RequestHandler): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export const withErrorHandling: WithErrorHandling = (handler: RequestHandler) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  const stack = err.stack || "";
  console.log("Error:");
  console.log(stack);
  const message = err.message || "Internal Server Error";
  return res.status(500).json({
    message
  });
};

export default errorHandler;
