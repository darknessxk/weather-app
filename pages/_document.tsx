import React from 'react'
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
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
                    <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}&libraries=places`}/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}
