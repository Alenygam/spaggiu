import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-spinkit'

import AbsenceCard from '../parts/Cards/AbsenceCard';
import Api from '../api/api';

const Container = styled.div`
    background-color: #282A3E;
    color: #FFFFFF;
    padding: 60px 20px;
    position: relative;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: auto;
`;

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
            {
                absences.map((absence) => {
                    return <AbsenceCard absence={absence}/>
                })
            }
        </Container>
    )
}
