import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { useNavigate } from 'react-router-dom';

import RoundReadOnlySlider from '../../parts/Sliders/RoundReadOnlySlider';
import GradeCard from '../../parts/Cards/GradeCard';
import Api from '../../api/api';

const WidgetContainer = styled.div`
    width: 400px;
    height: 300px;
    background-color: #FFFFFF;
    display: grid;
    grid-template-columns: 40% 60%;
    color: #0A2239;
    border-radius: 20px;
    padding: 50px 5px;
    cursor: pointer;
`;

export default function GradesWidget() {
    const [grades, setGrades] = useState();
    const [gradesAverage, setGradesAverage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        // It is literally impossible for this to not be authenticated. See home component
        const api = new Api();

        api.grades({})
            .then((res => {
                if (res.error) return; 
                var numberOfGrades = res.length;
                const sumOfGrades = res.reduce((a, b) => {
                    if (a.decimalValue === null || b.decimalValue === null) {
                        numberOfGrades--;
                    }
                    return {
                        decimalValue: a.decimalValue + b.decimalValue
                    }
                }).decimalValue * 100
                setGradesAverage(Math.round(sumOfGrades / numberOfGrades) / 100);
                setGrades(res.splice(0, 3));
            }))
    }, [])

    
    if (!grades || !gradesAverage) {
        return (
            <WidgetContainer style={{
                gridTemplateColumns: 'auto',
                placeItems: 'center',
            }}>
                <Spinner name="wandering-cubes" color="#D98324"/>
            </WidgetContainer>
        )
    }

    return (
        <WidgetContainer onClick={() => navigate('/grades')}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <p style={{fontSize: 18}}>
                    <b>Media</b>
                </p>
                <RoundReadOnlySlider
                    value={gradesAverage}
                    progressColor="#2377C6"
                    size={120}
                    progressWidth={10}
                />
                <p style={{fontSize: 18}}>
                    {gradesAverage}
                </p>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <p style={{fontSize: 18, marginBottom: '16px'}}>
                    <b>Voti Recenti</b>
                </p>
                {
                    grades.map((grade, index) => {
                        return <GradeCard key={`${index}-grade`} grade={grade}/>
                    })
                }
            </div>
        </WidgetContainer>
    )
}