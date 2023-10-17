import ReactDOM from 'react-dom/client'

import React, { createElement } from 'react'

import { App } from './App'

ReactDOM.hydrateRoot(
    document.getElementById('app') as any, 
    <App />,
)   