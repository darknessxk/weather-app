import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div<{ fluid?: boolean }>`
    ${tw`h-auto w-auto shadow-md bg-gray-200 flex flex-col`};
    padding: 0 ${props => (props.fluid || false ? '0' : '50px')};
`;

export default Container;
