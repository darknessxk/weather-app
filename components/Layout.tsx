import React, {} from 'react';
import Head from 'next/head';
import Container from "./Container";
import Body from "./Body";

type LayoutProps = {
    title?: string
    fluid?: boolean
};

const Layout: React.FC<LayoutProps> = ({children, title = '...', fluid = true}) => {

    return <>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        </Head>

        <Body>
            <Container children={children ?? []} fluid={fluid} />
        </Body>
    </>;
};

export default Layout;
