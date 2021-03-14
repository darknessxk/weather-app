import React, {useCallback} from "react";
import axios from "axios";
import { setLocation } from "redux/reducers/location";
import Layout from '../components/Layout';
import {useAppDispatch} from "../redux/hooks";
import Tile from "../components/Tile";
import Text from "../components/Text";
import fetchUserIp from "../utils/fetchUserIp";
import fetchIpLocation from "../utils/fetchIpLocation";

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
                    const apiResponse = (await fetchUserIp()).data;
                    const ipInfo = (await fetchIpLocation(apiResponse.ip)).data;

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
                    Choose how we get your location
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
