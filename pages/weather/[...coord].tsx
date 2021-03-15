import React, {ReactNode, useEffect, useState} from "react";
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import Text from "../../components/Text";
import OneCall from "../../utils/api/open-weather/onecall";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {OneCallResponse} from "../../utils/api/open-weather/onecallresponse.type";
import GeoDecoding from "../../utils/api/google/geodecoding";
import parseGeocodeName from "../../utils/parseGeocodeName";
import WeatherItem from "../../components/WeatherItem";
import Tile from "../../components/Tile";
import Title from "../../components/Title";
import ContentContainer from "../../components/ContentContainer";

const WeatherPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const {
        children: {
            data
        }
    } = props;

    const location = data.location;
    const router = useRouter();
    const weather: OneCallResponse = data.weather;

    const [RenderItems, setItems] = useState<ReactNode>(null);
    useEffect(() => {
        let renderItems = [];

        for (const [key, value] of Object.entries(weather.current)) {
            if (!['weather', 'dt', 'rain', 'snow'].includes(key)) {
                renderItems.push(<WeatherItem name={key} value={value.toString()} />)
            }
        }

        setItems(renderItems);
    }, [weather]);

    const locationName = parseGeocodeName(location.formatted_address);

    return (
        <Layout title={`Weather for ${locationName}`}>
            <ContentContainer>
                <Title className="text-center">
                    {locationName}
                </Title>
                <div className="flex flex-col">
                    {RenderItems}
                    <Tile className="border-t border-gray-400" onClick={() => router.push('/')}>
                        <Text>
                            Select a new place
                        </Text>
                    </Tile>
                </div>
            </ContentContainer>
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
