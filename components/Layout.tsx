import React, {ReactNode} from 'react';
import Head from 'next/head';
import Container from "./Container";

type Props = {
    children?: ReactNode
    title?: string
    fluid?: boolean
};

const layout = ({children, title = '...', fluid = true}: Props) => {

    return <>
        <Head>
            <title>{title} | darknessxk</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        </Head>

        <div className="flex flex-col min-h-screen bg-gray-100">
            <Container children={children ?? []} fluid={fluid} />
        </div>
    </>;
};

export default layout;
