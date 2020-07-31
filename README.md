# modular-express

A modular approach to defining express routes.

## Install

`yarn add cgutwin/modular-express`

Or add from a branch:

`yarn add cgutwin/modular-express#branch`

## Usage

```typescript
import ExpressServer from "modular-express"
import bodyParser from "body-parser"
import { Request, Response } from "express"

const server: ExpressServer = new ExpressServer({
  port: 5000,
  middleware: [
    bodyParser.json()
  ],
  routes: [
    {
      head: "/",
      name: "rootPath",
      paths: [
        {
          path: "/ping",
          method: "GET",
          controller: (req: Request, res: Response) => res.send('pong')
        }
      ]
    }
  ]
})

server.listen()
```

## License
MIT
