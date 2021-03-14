import React, {useCallback} from "react";
import { setLocation } from "redux/reducers/location";
import Layout from '../components/Layout';
import Text from "../components/Text";
import {useAppDispatch} from "../redux/store";
import axios from "axios";
import Tile from "../components/Tile";

const IndexPage = () => {
    const dispatch = useAppDispatch();

    const autoLocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }))
            },
            async () => {
                try {
                    const apiResponse = await axios.request({
                        url: 'https://api.my-ip.io/ip.json',
                        method: 'GET'
                    });

                    const ipInfo = await axios.request({
                        url: `http://ip-api.com/json/${apiResponse.data.ip}`,
                        method: 'GET'
                    });

                    dispatch(setLocation({
                        lat: ipInfo.data.lat,
                        lon: ipInfo.data.lon
                    }))
                }
                catch
                {
                    // now we go into form mode
                }
            },
            {enableHighAccuracy: true}
        );
    }, []);

    return (
        <Layout title="Home">
            <main className="flex flex-row md:flex-col flex-grow h-full overflow-hidden subpixel-antialiased">
                <Text className="text-center">
                    Choose one option
                </Text>
                <div className="flex">
                    <Tile>
                        <Text onClick={() => autoLocation()}>Auto</Text>
                    </Tile>
                    <Tile>
                        <Text>Manual</Text>
                    </Tile>
                </div>
            </main>
        </Layout>
    );
}

export default IndexPage
