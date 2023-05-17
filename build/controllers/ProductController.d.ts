import { Request, Response } from "express";
declare class ProductController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    showProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { ProductController };
