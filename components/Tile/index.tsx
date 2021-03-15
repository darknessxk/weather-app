import styled from 'styled-components';
import tw from 'twin.macro';

const Tile = styled.div`
    ${tw`flex-grow hover:bg-gray-200 bg-gray-300 text-center`};
    cursor: pointer;
    
    transition: background-color 500ms ease;
`;

export default Tile;
