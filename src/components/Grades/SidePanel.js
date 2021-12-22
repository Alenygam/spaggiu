import React from 'react'
import RoundReadOnlySlider from '../../parts/Sliders/RoundReadOnlySlider'

export default function SidePanel({averageGrade, grades}) {
    return (
        <>
            <div style={{
                width: '250px',
                height: '250px',
                backgroundColor: '#061523',
                borderRadius: '10px',
                position: 'relative',
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <RoundReadOnlySlider
                        value={averageGrade}
                        progressColor="#B84A62"
                        size={200} 
                        progressWidth={10}
                    />
                </div>
                <p style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 20
                }}>
                    {averageGrade}
                </p>
            </div>
        </>
    )
}
