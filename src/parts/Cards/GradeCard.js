import React from 'react'
import styled from 'styled-components'

import RoundReadOnlySlider from '../Sliders/RoundReadOnlySlider'
import getGradeColor from '../../common/getGradeColor'

const GradeCardContainer = styled.div`
    background-color: #191A27;
    display: flex;
    flex-direction: row;
    width: 295px;
    border-radius: 10px;
    margin: 5px 0;
    padding: 1px;
    height: 42px;
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
                    progressColor={getGradeColor(grade.decimalValue)}
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
