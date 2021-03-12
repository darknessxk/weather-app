import React from 'react';
import Layout from '../components/Layout';

const catError: string = "https://http.cat/404";


function ErrorNotFound() {
    return (<Layout title={''}>
        <img src={catError} />
    </Layout>);
}

export default ErrorNotFound;
