import React, {  } from "react";
import Layout from '../components/Layout';
import faker from 'faker';

const IndexPage = () => {
    return (
        <Layout title="Home">
            <main className="flex flex-row md:flex-col flex-grow h-full overflow-hidden subpixel-antialiased">
                {faker.company.companyName()}
                <hr />
                {faker.company.catchPhrase()}
                <br />
            </main>
        </Layout>
    );
}

export default IndexPage
