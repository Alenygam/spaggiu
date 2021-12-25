import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { useNavigate } from 'react-router-dom';

import RoundReadOnlySlider from '../../parts/Sliders/RoundReadOnlySlider';
import GradeCard from '../../parts/Cards/GradeCard';
import Api from '../../api/api';
import getGradeColor from '../../common/getGradeColor';

const WidgetContainer = styled.div`
    height: 300px;
    background-color: #1E1F2F;
    color: #FFFFFF;
    border-radius: 20px;
    cursor: pointer;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CenterAbsolute = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

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
            <div style={{position: 'relative', height: 140}}>
                <CenterAbsolute>
                    <RoundReadOnlySlider
                        value={gradesAverage}
                        progressColor={getGradeColor(gradesAverage)}
                        size={120}
                        progressWidth={10}
                    />
                </CenterAbsolute>
                <CenterAbsolute>
                    <p style={{
                        fontSize: 18, 
                    }}>
                        {gradesAverage}
                    </p>
                </CenterAbsolute>
            </div>
            {
                grades.map((grade, index) => {
                    return <GradeCard key={`${index}-grade`} grade={grade}/>
                })
            }
        </WidgetContainer>
    )
}