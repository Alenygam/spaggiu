import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import {useNavigate} from 'react-router-dom';

import Sidebar from '../parts/Sidebar';
import GradesWidget from '../components/Home/GradesWidget';
import AbsencesWidget from '../components/Home/AbsencesWidget';

import Api from '../api/api';

const Container = styled.div`
    background-color: #282A3E;
    color: #FFFFFF;
    height: 100%;
    overflow: auto;
    position: relative;
`;

const WidgetContainer = styled.div`
    overflow: auto;
    width: 100%;
    min-height: 100%;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat( auto-fill, minmax(295px, 1fr));
    grid-gap: 40px;
    padding: 60px 40px;
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
