import React from 'react'
import styled from 'styled-components'
import RoundReadOnlySlider from '../Sliders/RoundReadOnlySlider';
import getGradeColor from '../../common/getGradeColor';

const Card = styled.div`
    height: 100px;
    display: grid;
    grid-template-columns: 100px 1fr;
    background-color: #1E1F2F;
    border-radius: 10px;
    margin: 5px 0;
    cursor: pointer;
`

export default function SubjectCard({subject, onClick}) {
    return (
        <Card onClick={onClick}>
            <div style={{position: 'relative', display: 'grid', placeItems: 'center'}}>
                <RoundReadOnlySlider
                    value={subject.averageGrade}
                    progressColor={getGradeColor(subject.averageGrade)}
                    size={90}
                    progressWidth={10}
                />
                <p style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 18
                }}>{subject.averageGrade}</p>
            </div>
            <div style={{
                display: 'grid',
                placeItems: 'center'
            }}>
                <p style={{
                    textAlign: 'center',
                    maxWidth: 250,
                    fontSize: 18
                }}>
                    {subject.description}
                </p>
            </div>
        </Card>
    )
}
