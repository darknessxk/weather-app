import styled from 'styled-components';
import tw from 'twin.macro';

const bgPath = 'assets/bg.png'

const Body = styled.div`
    ${tw`flex flex-col w-screen content-center justify-center items-center min-h-screen`};
    background-image: url(${bgPath});
`;

export default Body;
