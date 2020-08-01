import express, { Router } from "express"
import { Middleware } from "./index"

export interface Routes {
  name: string,
  head: string,
  middleware?: Middleware[]
  paths: {
    path: string,
    method: "GET" | "POST",
    controller: any
  }[]
}

interface RouteType {
  path: string,
  method: string,
  controller: any
}

export class Route {
  router: Router
  meta: Routes

  constructor(route: Routes) {
    this.router = express.Router()
    this.meta = route
    if (route.middleware) this.loadMiddleware(route.middleware)
    this.create(route.paths)
  }

  // Creates the express router and applies appropriate middleware for the path and its controller.
  create = (routes: RouteType[]): Router => {
    for (let route of routes) {
      console.info(`> ${route.method} .${route.path}`)
      switch (route.method) {
        case "POST":
          this.router.post(route.path, route.controller)
          break
        case "GET":
          this.router.get(route.path, route.controller)
          break
        default:
          console.warn(`No method provided on route ${route.path}`)
          break
      }
    }
    return this.router
  }

  // loads head specific middleware. applies to all paths in head.
  private loadMiddleware = (middleware: Middleware[]): void => {
    console.info(`loading middleware on route ${this.meta.head}`)
    for (let mw of middleware) this.router.use(mw)
    console.info(`loaded ${middleware.length} middleware on ${this.meta.head}`)
  }
}
