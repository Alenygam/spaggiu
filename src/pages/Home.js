import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import {useNavigate} from 'react-router-dom';

import GradesWidget from '../components/Home/GradesWidget';
import AbsencesWidget from '../components/Home/AbsencesWidget';

import Api from '../api/api';

const Container = styled.div`
    background-color: #282A3E;
    color: #FFFFFF;
    height: 100%;
    overflow: auto;
    position: relative;
    display: grid;
    place-items: center;
`;

const WidgetContainer = styled.div`
    overflow: auto;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(295px, 1fr));
    grid-auto-rows: 300px;
    grid-gap: 40px;
    padding: 25px;

    > div {
        display: grid;
        place-items: center;
    }
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
                <WidgetContainer>
                    <div>
                        <GradesWidget/>
                    </div>
                    <div>
                        <AbsencesWidget/>
                    </div>
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
