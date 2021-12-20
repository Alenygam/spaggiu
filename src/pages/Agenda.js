import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-spinkit';

import Api from '../api/api';

import Sidebar from '../parts/Sidebar';
import CalendarButtons from '../components/Agenda/CalendarButtons';
import Calendar from '../components/Agenda/Calendar';

const Container = styled.div`
    background-color: #0A2239;
    color: #FFFFFF;
    height: 100%;
    position: relative;
    overflow: hidden;
`;

export default function Agenda() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const api = new Api();
        if (api.token) return setIsAuthed(true);

        navigate('/login');
    }, [navigate])

    if (!isAuthed) {
        return (
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'scale(1.5) translate(-50%, -50%)',
            }}>
                <Spinner name="wandering-cubes" color="#D98324"/>
            </div>
        )
    }

    return (
        <Container>
            <Sidebar/>
            <CalendarButtons date={date} setDate={setDate}/>
            <Calendar date={date}/>
        </Container>
    )
}
