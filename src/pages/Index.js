import React, {useEffect} from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { useNavigate } from 'react-router-dom';

import Api from '../api/api';

const Container = styled.div`
    background-color: #0A2239;
    position: relative;
    height: 100%;
    width: 100%;
`

export default function Index() {
    const navigate = useNavigate();

    useEffect(() => {
        const api = new Api();
        if (api.token) {
            navigate('/home');
        } else {
            navigate('/login')
        }
    }, [navigate])

    return (
        <Container>
            <Spinner name="wandering-cubes" color="#D98324"/>
        </Container>
    )
}
