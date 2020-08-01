import { NextFunction, Request, Response } from "express";
import { Routes } from "./routes";
export declare type Middleware = (req: Request, res: Response, next: NextFunction) => void;
declare type ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => void;
export default class ExpressServer {
    private server;
    private readonly port;
    constructor(props: {
        port: number;
        routes: Routes[];
        middleware?: Middleware[];
        errorHandler?: ErrorHandler[];
    });
    listen(): void;
    private loadRoutes;
    private loadMiddleware;
}
export {};
