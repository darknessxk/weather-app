import React, {useCallback, useState, useEffect} from "react";
import { useRouter } from 'next/router'
import {setLocation} from "redux/reducers/location";
import Layout from '../components/Layout';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import Tile from "../components/Tile";
import Text from "../components/Text";
import fetchUserIp from "../utils/fetchUserIp";
import fetchIpLocation from "../utils/fetchIpLocation";
import LocationPicker from "../components/LocationPicker";

const IndexPage = () => {
    const dispatch = useAppDispatch();
    const location = useAppSelector(state => state.location);
    const router = useRouter();
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        if (isReady) {
            (async () => {
                await router.push(`/weather/${location.lat}/${location.lon}`);
            })();
        }
    }, [isReady]);

    const autoLocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }))

                setIsReady(true);
            },
            async () => {
                try {
                    const apiResponse = (await fetchUserIp()).data;
                    const ipInfo = (await fetchIpLocation(apiResponse.ip)).data;

                    dispatch(setLocation({
                        lat: ipInfo.data.lat,
                        lon: ipInfo.data.lon
                    }))

                    setIsReady(true);
                } catch {
                    setShowLocationInput(true);
                }
            },
            {enableHighAccuracy: true}
        );
    }, []);

    const [showLocationInput, setShowLocationInput] = useState<boolean>(false)

    return (
        <Layout title="Home">
            <main className="flex flex-row md:flex-col flex-grow h-full overflow-hidden subpixel-antialiased">
                {!showLocationInput ? (
                        <>
                            <Text className="text-center">
                                Choose how we get your location
                            </Text>
                            <div className="flex">
                                <Tile onClick={() => autoLocation()}>
                                    <Text>Auto</Text>
                                </Tile>
                                <Tile onClick={() => setShowLocationInput(true)}>
                                    <Text>Manual</Text>
                                </Tile>
                            </div>
                        </>
                    ) :
                    (
                        <div className="flex">
                            <LocationPicker onReady={() => setIsReady(true)} />
                        </div>
                    )
                }
            </main>
        </Layout>
    );
}

export default IndexPage
