import express from 'express'

import { createServer as createViteServer } from 'vite'
import { render } from './ssr/render' 

async function createServer() {
    const app = express()

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    app.use(vite.middlewares)

    app.use("*", render({ vite }))

    app.listen(3000, () => console.log('Listening on :3000'))
}

createServer()