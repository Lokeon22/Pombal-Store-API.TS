import { Request, Response, NextFunction } from "express";
export declare function ensureAuth(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
