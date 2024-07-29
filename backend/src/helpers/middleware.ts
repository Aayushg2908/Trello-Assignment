import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    req.user = decodedData;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
