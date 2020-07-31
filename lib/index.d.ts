import { Routes } from "./routes";
export default class ExpressServer {
    private server;
    private readonly port;
    constructor(props: {
        port: number;
        routes: Routes[];
        middleware: any[];
        errorHandler?: any;
    });
    listen: () => void;
    private loadRoutes;
    private loadMiddleware;
}
