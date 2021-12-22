import React from 'react'
import styled from 'styled-components'
import RoundReadOnlySlider from '../Sliders/RoundReadOnlySlider';

const Card = styled.div`
    height: 100px;
    display: grid;
    grid-template-columns: 100px 1fr;
    width: 470px;
    background-color: #061523;
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;
`
const CardContainer = styled.div`
    display: grid;
    place-items: center;
`
export default function SubjectCard({subject, onClick}) {
    return (
        <CardContainer>
            <Card onClick={onClick}>
                <div style={{position: 'relative'}}>
                    <RoundReadOnlySlider
                        value={subject.averageGrade}
                        progressColor="#B84A62"
                        size={100}
                        progressWidth={8}
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
        </CardContainer>
    )
}
