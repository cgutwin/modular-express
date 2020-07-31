import express, { Application } from "express"
import { Route, Routes } from "./routes"

// ExpressServer
// Dynamically add routes, middleware, error handlers to create an express server.
// Inspiration: https://github.com/aligoren/express-typescript-test
export default class ExpressServer {
  private server: Application
  private readonly port: number

  constructor(props: {
    port: number,
    routes: Routes[],
    middleware: any[],
    errorHandler?: any
  }) {
    this.server = express()
    this.port = props.port
    this.loadMiddleware(props.middleware)
    this.loadRoutes(props.routes)
    if (props.errorHandler) this.loadMiddleware(props.errorHandler)
  }

  public listen = (): void => {
    this.server.listen(this.port, () => {
      console.log(`server listening on port ${this.port}`)
    })
  }

  // Dynamically loads the routes defined in ./routes
  private loadRoutes = (routes: Routes[]): void => {
    for (let route of routes) {
      console.info(`loading route ${route.name} at ${route.head}`)
      const expressRoute = new Route(route)
      this.server.use(route.head, expressRoute.router)
      console.info(`finished loading ${route.name} at ${route.head}`)
    }
    console.info(`finished loading ${routes.length} routes.`)
  }

  private loadMiddleware = (middleware: any[]): void => {
    for (let mw of middleware) {
      this.server.use(mw)
    }
  }
}
