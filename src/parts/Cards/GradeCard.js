import React from 'react'
import styled from 'styled-components'

import RoundReadOnlySlider from '../Sliders/RoundReadOnlySlider'

const GradeCardContainer = styled.div`
    background-color: #F6A979;
    color: #000000;
    display: flex;
    flex-direction: row;
    width: 280px;
    border-radius: 10px;
    margin: 5px 0;
    height: 40px;
`

export default function GradeCard({grade, numberOfChars}) {
    if (!numberOfChars) numberOfChars = 22;

    return (
        <GradeCardContainer>
            <div style={{
                position: 'relative',
            }}>
                <RoundReadOnlySlider
                    value={grade.decimalValue}
                    progressColor="#2377C6"
                    size={40}
                    progressWidth={5}
                />
                <p style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>{grade.displayValue}</p>
            </div>
            <div style={{marginLeft: 10, display: 'grid', placeItems: 'center'}}>
                <p 
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        width: '100%'
                    }}
                    title={grade.subjectDesc}
                >
                    {grade.subjectDesc.substr(0, numberOfChars)}
                    {grade.subjectDesc.substr(0, numberOfChars) === grade.subjectDesc 
                        ? '' 
                        : '...'}
                </p>
            </div>
        </GradeCardContainer>
    )
}
