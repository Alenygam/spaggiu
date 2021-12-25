import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Api from '../api/api';

import LoginForm from '../components/Login/LoginForm';

const Container = styled.div`
    background-color: #282A3E;
    color: #FFFFFF;
    height: 100%;
    position: relative;
    overflow: hidden;
`;

export default function Login() {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate()


    const submitForm = async (event, uid, passwd) => {
        event.preventDefault();
        setLoading(true);
        const api = new Api();
        const login = await api.login(uid, passwd);
        // TODO: Add error message if failed login
        if (login.error) {
            setLoading(false);
            return;
        }

        navigate('/home');
    }

    return (
        <Container>
            <div style={{display: 'grid', placeItems: 'center'}}>
                <LoginForm loading={loading} submitForm={submitForm}/>
            </div>
        </Container>
    );
}


