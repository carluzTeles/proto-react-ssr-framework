import React from 'react'

import ReactDOM from 'react-dom/client'

import { App } from './App'

import { urlToFilePath } from './ssr/urlParser'

async function hydrate() {
    const props = (window as any)._PROPS_

    const { default: Component } = await import(`./../src/pages/${urlToFilePath(props.path)}`)

    ReactDOM.hydrateRoot(
        document.getElementById('app') as any, 
        <App Component={Component} pageProps={props.pageProps} />,
    )   
}

hydrate()

