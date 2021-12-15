import React from 'react';
import styled from 'styled-components';

import Api from '../api/api';

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


    const submitForm = async (event, uid, passwd) => {
        event.preventDefault();
        setLoading(true);
        const api = new Api();
        await api.login(uid, passwd);
        setLoading(false);
    }

    return (
        <Container>
            <Triangles loading={loading}/>
            <LoginForm submitForm={submitForm}/>
            <BGImages/>
        </Container>
    );
}


