import React from 'react';

export default function RoundReadOnlySlider({value, progressColor, size, progressWidth, trackColor}) {
    if (!trackColor) trackColor = "#EEE";
    const center = size / 2;
    const radius = size / 2 - progressWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const actualValue = value * 10;

    const offset = ((100 - actualValue) / 100) * circumference;
    
    return (
        <svg width={size} height={size} style={{transform: 'rotate(-90deg)'}}>
            <circle
                stroke={trackColor}
                fill="none"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={progressWidth - 2}
            />
            <circle
                stroke={progressColor}
                fill="none"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={progressWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
            />
        </svg>
    )
}
