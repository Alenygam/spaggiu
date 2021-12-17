import React from 'react'

import RoundReadOnlySlider from '../Sliders/RoundReadOnlySlider'

export default function GradeCard({grade}) {
    return (
        <div style={{
            backgroundColor: '#EDC191',
            display: 'grid',
            gridTemplateColumns: '40px 40px 1fr',
            width: '100%',
            height: '40px',
            margin: '5px',
            borderRadius: '10px'
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
                <p style={{
                    fontSize: 18,
                    textAlign: 'center',
                    width: '100%'
                }}>
                    {grade.subjectDesc.substr(0, 13)}...
                </p>
            </div>
        </div>
    )
}
