import React from 'react';
import styled from 'styled-components';
import Triangles from '../components/Login/Triangles';
import BGImages from '../components/Login/BGImages';
import LoginForm from '../components/Login/LoginForm';

const Container = styled.div`
    background-color: #0A2239;
    color: #FFFFFF;
    height: 100%;
    position: relative;
    overflow: hidden;
`;
export default function Login() {
    const [loading, setLoading] = React.useState(false);
    return (
        <Container>
            <Triangles loading={loading}/>
            <LoginForm/>
            <BGImages/>
        </Container>
    );
}


