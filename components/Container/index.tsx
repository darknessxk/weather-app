import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div<{ fluid?: boolean }>`
    ${tw`h-full w-full bg-gray-100`};
    
    flex: 1;
    
    display: flex;
    flex-direction: column;
    padding: 0 ${props => (props.fluid || false ? '0' : '50px')};
`;

export default Container;
