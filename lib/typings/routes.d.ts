import { Router } from "express";
import { Middleware } from "./index";
export interface Routes {
    name: string;
    head: string;
    middleware?: Middleware[];
    paths: {
        path: string;
        method: "GET" | "POST";
        controller: any;
    }[];
}
interface RouteType {
    path: string;
    method: string;
    controller: any;
}
export declare class Route {
    router: Router;
    meta: Routes;
    constructor(route: Routes);
    create: (routes: RouteType[]) => Router;
    private loadMiddleware;
}
export {};
