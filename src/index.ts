import express, { Application, NextFunction, Request, Response } from "express"
import { Route, Routes } from "./routes"

export type Middleware = (req: Request, res: Response, next: NextFunction) => void
type ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => void

// ExpressServer
// Dynamically add routes, middleware, error handlers to create an express server.
// Inspiration: https://github.com/aligoren/express-typescript-test
export default class ExpressServer {
  private server: Application
  private readonly port: number

  constructor(props: {
    port: number,
    routes: Routes[],
    middleware?: Middleware[],
    errorHandler?: ErrorHandler[]
  }) {
    this.server = express()
    this.port = props.port
    if (props.middleware) this.loadMiddleware(props.middleware)
    if (props.errorHandler) this.loadMiddleware(props.errorHandler)
    this.loadRoutes(props.routes)
  }

  public listen(): void {
    this.server.listen(this.port, (): void => {
      console.log(`server listening on port ${this.port}`)
    })
  }

  // Dynamically loads the routes defined in ./routes
  private loadRoutes(routes: Routes[]): void {
    for (let route of routes) {
      console.info(`loading route ${route.name} at ${route.head}`)
      const expressRoute = new Route(route)
      this.server.use(route.head, expressRoute.router)
      console.info(`finished loading ${route.name} at ${route.head}`)
    }
    console.info(`finished loading ${routes.length} routes.`)
  }

  private loadMiddleware(middleware: Middleware[] | ErrorHandler[]): void {
    for (let mw of middleware) this.server.use(mw)
  }
}
