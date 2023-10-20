import fs from "fs"
import path from "path"
import { ViteDevServer } from "vite"
import { urlToFilePath } from "./urlParser"

type Props = {
    url: string
    vite: ViteDevServer
}

type Result = {
    template: string
    Page: any
    App: any
    props: any
}

export const pageLoader = async ({
    url,
    vite
}: Props): Promise<Result> => {
    let template = fs.readFileSync(
        path.resolve(process.cwd(), "proto", "templates", "index.html"),
        'utf-8'
    )

    template = await vite.transformIndexHtml(url, template)

    const srcFolder = path.resolve(process.cwd(), "src")

    const pagesFolderPath = path.resolve(srcFolder, "pages")

    const [{ default: Page, getServerSideProps }, { App }] = await Promise.all([
        vite.ssrLoadModule(`${pagesFolderPath}/${urlToFilePath(url)}`),
        vite.ssrLoadModule('/proto/App.tsx')
    ])

    let props = {}

    const isSSR = !!getServerSideProps

    if(isSSR) props = await getServerSideProps()

    return { template, Page, props, App }
}