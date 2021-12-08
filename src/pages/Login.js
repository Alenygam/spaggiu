import React from 'react';
import styled from 'styled-components';
import Triangles from '../components/Login/Triangles';

const Container = styled.div`
    background-color: #0A2239;
    color: #FFFFFF;
    height: 100%;
    position: relative;
`;
export default function Login() {
    const [loading, setLoading] = React.useState(true);
    return (
        <Container>
            <Triangles loading={loading}/>
        </Container>
    );
}
