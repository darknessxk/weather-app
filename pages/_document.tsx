import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <style jsx global>
                        {`
              html,
              body {
                width: 100%;
                height: 100%;
              }
            `}
                    </style>

                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async ctx => {
    // Render app and page and get the context of the page with collected side effects.
    const originalRenderPage = ctx.renderPage
    const sheets = new ServerStyleSheet();

    ctx.renderPage = () => (
        originalRenderPage({
            enhanceApp: App => props => sheets.collectStyles(<App {...props} />)
        })
    );

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            <React.Fragment key="styles">
                {initialProps.styles}
                {sheets.getStyleElement()}
            </React.Fragment>
        ]
    }
}
