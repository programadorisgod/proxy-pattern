import type { Request } from "express";
export const generateUrl = (req: Request, filename: string) => {
  return `${req.protocol}://${req.get("host")}/videos/${filename}`;
};
