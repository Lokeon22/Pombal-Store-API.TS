import { Request, Response } from "express";
declare class SessionsController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { SessionsController };
