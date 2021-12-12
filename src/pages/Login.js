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

const apiBaseURL = process.env.REACT_APP_API_URL;

export default function Login() {
    const [loading, setLoading] = React.useState(false);

    const submitForm = async (event, uid, passwd) => {
        event.preventDefault();
        setLoading(true);
        const res = await fetch(`${apiBaseURL}/auth/login`, {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify({
                ident: null,
                pass: passwd,
                uid: uid,
            }),
            headers: {'Content-Type': 'application/json'}
        })

        const json = await res.json();
        localStorage.setItem("uid", json.ident.substring(1));
        localStorage.setItem("token", json.token);
        localStorage.setItem("expire", json.expire);
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


