import React, {useEffect, useState} from "react";
import Layout from '../components/Layout';
import Text from "../components/Text";

const IndexPage = () => {
    const [location, setLocation] = useState<GeolocationPosition | undefined>(undefined);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
            },
            () => console.error('not allowed'),
            {enableHighAccuracy: true}
        );
    }, [setLocation]);

    return (
        <Layout title="Home">
            <main className="flex flex-row md:flex-col flex-grow h-full overflow-hidden subpixel-antialiased">
                <Text>
                    Waiting for user permission...
                </Text>
            </main>
        </Layout>
    );
}

export default IndexPage
