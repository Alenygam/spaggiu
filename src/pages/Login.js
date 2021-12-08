import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #0A2239;
    color: #FFFFFF;
    display: grid;
    grid-template-columns: 500px 1fr;
    grid-template-rows: 100%;
    height: 100%;
`

const LeftTriangle = styled.div`
    position: relative;
    background: linear-gradient(
        to bottom right, 
        #D98324 0%, 
        #D98324 50%, 
        transparent 50%, 
        transparent 100%
    );
`

export default function Login() {
    return (
        <Container>
            <LeftTriangle>
            </LeftTriangle>
            <div></div>
        </Container>
    )
}