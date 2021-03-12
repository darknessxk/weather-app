import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/index.css'

// NOTE: Router can be accessed through this App Context or any Page routed

function AppMain({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
        </Head>
        <Component children={pageProps} />
    </>
}

export default AppMain;
