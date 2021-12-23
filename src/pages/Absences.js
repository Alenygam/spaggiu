import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-spinkit'

import Sidebar from '../parts/Sidebar';
import AbsenceCardForPage from '../parts/Cards/AbsenceCardForPage';
import Api from '../api/api';

const Container = styled.div`
    background-color: #0A2239;
    color: #FFFFFF;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: grid;
    place-items: center;
`;

const AbsencesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 600px;
    padding: 10px;
    overflow: auto;
`

export default function Absences() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [absences, setAbsences] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const api = new Api();
        if (api.token) {
            setIsAuthed(true);
        } else {
            navigate('/login');
        }

        api.absences({}).then((res) => {
            if (res.error) return;
            setAbsences(res.reverse());
        })
    }, [navigate])

    if (!isAuthed || !absences) {
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
            <AbsencesContainer>
                {
                    absences.map((absence) => {
                        return <AbsenceCardForPage absence={absence}/>
                    })
                }
            </AbsencesContainer>
        </Container>
    )
}
