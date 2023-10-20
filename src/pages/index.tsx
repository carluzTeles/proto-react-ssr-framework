import React from 'react'

export default function HomePage({ props }) {
    return <h1>${props.name}</h1>
}

export async function getServerSideProps() {
    return ({
        props: {
            name: 'Home page'
        }
    })
}