import styled from 'styled-components';
import tw from 'twin.macro';
import React from "react";
import usePlacesAutocomplete, {getGeocode, getLatLng,} from "use-places-autocomplete";

import useOnclickOutside from "react-cool-onclickoutside";
import {setLocation} from "../../redux/reducers/location";
import {useAppDispatch} from "../../redux/hooks";

const Input = styled.input`
    ${tw`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-sm rounded-r-md sm:text-sm border-gray-300 p-6`};
`;

const Container = styled.div`
    ${tw`flex flex-col items-center content-center w-96 rounded-sm`};
`;

const SuggestionItem = styled.li`
    ${tw`p-2 hover:bg-gray-300 border-b border-gray-700 subpixel-antialiased rounded-sm`};
    transition: background-color 600ms ease;
`;

const MainText = styled.p`
    ${tw`text-lg font-semibold truncate w-80`};
`

const SmallText = styled.p`
    ${tw`text-xs font-thin`};
`

type LocationPickerProps = {
    onReady?: (result: { lat: number, lng: number }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({onReady}) => {
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {},
        debounce: 300,
    });

    const dispatch = useAppDispatch();

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e: any) => {
        setValue(e.target.value);
    };

    const handleSelect = ({description}: any) => () => {
        setValue(description, false);
        clearSuggestions();

        getGeocode({address: description})
            .then((results) => getLatLng(results[0]))
            .then(({lat, lng}) => {
                dispatch(setLocation({
                    lat: lat,
                    lon: lng
                }))
                onReady?.call(this, {lat, lng});
            })
            .catch((error) => {
                alert('Unable to fetch data from Google API check console')
                console.error('GAPI:', error);
            });
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: {main_text, secondary_text},
            } = suggestion;

            return (
                <SuggestionItem key={place_id} onClick={handleSelect(suggestion)}>
                    <MainText>{main_text}</MainText> <SmallText>{secondary_text}</SmallText>
                </SuggestionItem>
            );
        });

    return (
        <Container ref={ref}>
            <Input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Where to check for weather?"
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <ul>{renderSuggestions()}</ul>}
        </Container>
    );
};

export default LocationPicker;
