import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import {useNavigate} from 'react-router-dom';

import Sidebar from '../parts/Sidebar';
import TabViewButtons from '../components/Grades/TabViewButtons';

import Api from '../api/api';

const Container = styled.div`
    background-color: #0A2239;
    color: #FFFFFF;
    height: 100%;
    position: relative;
    overflow: hidden;
`;


export default function Grades() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [periods, setPeriods] = useState();
    const [selectedPeriod, setSelectedPeriod] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const api = new Api();
        if (!api.token) return navigate('/login');
        setIsAuthed(true);
        api.periods().then((res) => {
            if (res.error) return;
            setPeriods(res);
        })

    }, [navigate])

    if (!isAuthed || !periods) {
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

    return (
        <Container>
            <Sidebar/>
            <TabViewButtons setPeriod={setSelectedPeriod} periods={periods} selectedPeriod={selectedPeriod}/>
        </Container>
    )
}
