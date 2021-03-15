import styled from 'styled-components';
import tw from 'twin.macro';
import React from 'react'
import Text from "../Text";
import parseWeatherItemName from "../../utils/parseWeatherItemName";

const WeatherItemContainer = styled.div`
    ${tw`flex bg-gray-300 text-center place-content-between`};
`;

type WeatherItemProps = {
    name: string;
    value: string;
}

const WeatherItem: React.FC<WeatherItemProps> = ({ name, value }) => {
    const [k, v] = parseWeatherItemName(name, value);
    return <WeatherItemContainer>
        <Text>{k}</Text>
        <Text>{v}</Text>
    </WeatherItemContainer>
}

export default WeatherItem;
