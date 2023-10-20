import React from 'react'

import ReactDOMServer from 'react-dom/server'

import { Request, RequestHandler, Response } from "express"

import { ViteDevServer } from "vite"
import { pageLoader } from "./pageLoader"

type Props = {
    vite: ViteDevServer
}

export const render = ({ vite }: Props): RequestHandler =>
    async (req: Request, res: Response) => {
        try {
            const url = req.originalUrl

            let { App, Page, props, template } = await pageLoader({
                url,
                vite
            })

            const appHtml = await ReactDOMServer.renderToString(
                React.createElement(App, {
                    Component: Page,
                    pageProps: props
                })
            )

            const html = template
                .replace(`<!--app-html-->`, appHtml)
                .replace(
                    "</head>",
                    `<script type="text/javascript">window._PROPS_ = ${JSON.stringify(
                        {
                            path: url,
                            pageProps: props
                        }
                    )}</script></head>`
                );

            res.status(200).set({ "Content-Type": "text/html" }).end(html)
        } catch (e: any) {
            vite.ssrFixStacktrace(e);
            console.error(e);
            res.status(500).end(e.message);
        }
    }