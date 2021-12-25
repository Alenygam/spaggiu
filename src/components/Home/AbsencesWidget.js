import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { useNavigate } from 'react-router-dom';

import Api from '../../api/api';

import AbsenceCard from '../../parts/Cards/AbsenceCard';

const WidgetContainer = styled.div`
    height: 300px;
    background-color: #1E1F2F;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    cursor: pointer;
    padding: 10px;
`;

export default function AbsencesWidget() {
    const [absences, setAbsences] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const api = new Api();
        api.absences({})
            .then((res => {
                if (res.error) return;
                setAbsences(res.reverse().splice(0, 4));
            }))
    }, [])

    if (!absences) {
        return (
            <WidgetContainer style={{
                display: 'grid',
                placeItems: 'center',
            }}>
                <Spinner name="wandering-cubes" color="#D98324"/>
            </WidgetContainer>
        )
    }
    return (
        <WidgetContainer onClick={() => {navigate('/absences')}}>
            <div style={{flexGrow: 1, display: 'grid', placeItems: 'center'}}>
                <p style={{fontSize: 28, fontFamily: 'Smooch'}}>
                    <b>Assenze</b>
                </p>
            </div>
            {
                absences.map((absence, index) => {
                    return <AbsenceCard key={`${index}-absence`} absence={absence}/>
                })
            }
        </WidgetContainer>
    )
}
