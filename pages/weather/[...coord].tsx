import React from "react";
import Layout from '../../components/Layout';
import Tile from "../../components/Tile";
import Text from "../../components/Text";
import OneCall from "../../api/open-weather/onecall";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {OneCallResponse} from "../../api/open-weather/onecallresponse.type";
import GeoDecoding from "../../api/google/geodecoding";

const WeatherPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log(props);

    return (
        <Layout title="Home">
            <main className="flex flex-row md:flex-col flex-grow h-full overflow-hidden subpixel-antialiased">
                <Text className="text-center">
                    Testing....
                </Text>
                <div className="flex">
                    <Tile>
                        2
                    </Tile>
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
