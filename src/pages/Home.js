import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import {useNavigate} from 'react-router-dom';

import Sidebar from '../parts/Sidebar';
import GradesWidget from '../components/Home/GradesWidget';
import AbsencesWidget from '../components/Home/AbsencesWidget';

import Api from '../api/api';

const Container = styled.div`
    background-color: #0A2239;
    color: #FFFFFF;
    min-height: 100%;
    position: relative;
`;

const WidgetContainer = styled.div`
    overflow: auto;
    width: 100%;
    height: 100%;
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
                    <AbsencesWidget/>
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
