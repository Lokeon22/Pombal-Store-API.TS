import { Request, Response } from "express";
declare class UsersController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { UsersController };
