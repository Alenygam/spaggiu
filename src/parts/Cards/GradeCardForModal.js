import React from 'react'

import RoundReadOnlySlider from '../Sliders/RoundReadOnlySlider'

export default function GradeCardForModal({grade, numberOfChars}) {
    if (!numberOfChars) numberOfChars = 13;

    return (
        <div style={{
            backgroundColor: '#EDC191',
            display: 'grid',
            gridTemplateColumns: '40px 40px 1fr',
            width: '100%',
            height: '40px',
            margin: '5px 0',
            borderRadius: '10px',
            color: "#0A2239"
        }}>
            <div style={{
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <RoundReadOnlySlider
                        value={grade.decimalValue}
                        progressColor="#2377C6"
                        size={40}
                        progressWidth={4}
                    />
                </div>
            </div>
            <div style={{position: 'relative'}}>
                <p style={{
                    fontSize: 18, 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    {grade.displayValue}
                </p>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <p 
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        width: '100%'
                    }}
                    title={grade.notesForFamily}
                >
                    {grade.notesForFamily.substr(0, numberOfChars)}...
                </p>
            </div>
        </div>
    )
}
