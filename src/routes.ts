import express, { Router } from "express"

export interface Routes {
  name: string,
  head: string,
  middleware?: any[]
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
    this.loadMiddleware(route.middleware)
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
  private loadMiddleware = (middleware: any[] | undefined): void => {
    if (middleware) {
      console.info(`loading middleware on route ${this.meta.head}`)
      for (let mw of middleware) {
        this.router.use(mw)
      }
      console.info(`loaded ${middleware.length} middleware on ${this.meta.head}`)
    }
  }
}
