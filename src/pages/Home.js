import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import {useNavigate} from 'react-router-dom';

import Sidebar from '../parts/Sidebar';
import GradesWidget from '../components/Home/GradesWidget';

import Api from '../api/api';

const Container = styled.div`
    background-color: #0A2239;
    color: #FFFFFF;
    height: 100%;
    position: relative;
    overflow: hidden;
`;

const WidgetContainer = styled.div`
    width: calc(100% - 90px);
    height: 100%;
    position: absolute;
    top: 0;
    left: 90px;
    display: grid;
    grid-gap: 40px;
    padding: 40px;
`;

export default function Home() {
    const [isAuthed, setIsAuthed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const api = new Api();
        if (api.token) return setIsAuthed(true);

        navigate('/login');
    }, [navigate])

    if (isAuthed) {
        return (
            <Container>
                <Sidebar/>
                <WidgetContainer>
                    <GradesWidget/>
                </WidgetContainer>
            </Container>
        )
    } else {
        return (
            <Container>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'scale(1.5) translate(-50%, -50%)',
                }}>
                    <Spinner name="wandering-cubes" color="#D98324"/>
                </div>
            </Container>
        )
    }
}
