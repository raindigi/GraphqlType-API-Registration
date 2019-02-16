import { Request, Response } from "express";

// tslint:disable-next-line:interface-name
export interface MyContext {
    req: Request;
    res: Response;
}