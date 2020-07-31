import { Router } from "express";
export interface Routes {
    name: string;
    head: string;
    middleware?: any[];
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
