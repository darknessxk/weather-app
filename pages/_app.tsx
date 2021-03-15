import React from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import {Provider} from "react-redux";
import '../styles/index.css'
import {store} from "../redux/store";

// NOTE: Router can be accessed through this App Context or any Page routed

function AppMain({Component, pageProps}: AppProps) {
    return <Provider store={store}>
        <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
        </Head>
        <Component children={pageProps}/>
    </Provider>
}

export default AppMain;
