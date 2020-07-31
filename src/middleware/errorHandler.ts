import { NextFunction, Request, Response } from "express"

// https://expressjs.com/en/guide/error-handling.html
// next needs to be passed
// noinspection JSUnusedLocalSymbols
export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500)
    .jsonp({
      error: true,
      status: 500,
      name: err.name,
      message: err.message,
    })
}
