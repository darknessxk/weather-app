import React, {ReactNode, useEffect, useState} from "react";
import Layout from '../../components/Layout';
import Text from "../../components/Text";
import OneCall from "../../api/open-weather/onecall";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {OneCallResponse} from "../../api/open-weather/onecallresponse.type";
import GeoDecoding from "../../api/google/geodecoding";
import parseGeocodeName from "../../utils/parseGeocodeName";
import WeatherItem from "../../components/WeatherItem";

const WeatherPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const {
        children: {
            data
        }
    } = props;

    const location = data.location;
    const weather: OneCallResponse = data.weather;

    const [RenderItems, setItems] = useState<ReactNode>(null);
    useEffect(() => {
        let renderItems = [];

        for (const [key, value] of Object.entries(weather.current)) {
            if (key !== 'weather') {
                renderItems.push(<WeatherItem name={key} value={value.toString()} />)
            }
        }

        setItems(renderItems);
    }, [weather]);

    const locationName = parseGeocodeName(location.formatted_address);

    return (
        <Layout title={`Weather for ${locationName}`}>
            <main className="flex flex-row md:flex-col flex-grow h-full overflow-hidden subpixel-antialiased">
                <Text className="text-center">
                    {locationName}
                </Text>
                <div className="flex flex-col">
                    {RenderItems}
                </div>
            </main>
        </Layout>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const {
        query: { coord }
    } = context;

    if (!coord) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const result = await OneCall(coord[0], coord[1], coord[2]);

    if (result.status === 500) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const geoDecodeResult = await GeoDecoding(coord[0], coord[1]);

    if (geoDecodeResult.status === 500) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            data: {
                weather: result.data as OneCallResponse,
                location: geoDecodeResult.data.results[0]
            },
        }
    }
}

export default WeatherPage
