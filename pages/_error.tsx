import React from 'react';
import { ErrorProps } from 'next/error';
import Layout from '../components/Layout';

function Error({ statusCode }: ErrorProps) {
    return (<Layout title={`Error ${statusCode}`}>
        <img src={`https://http.cat/${statusCode}`} />
    </Layout>);
}

Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode }
}

export default Error;
