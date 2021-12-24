import React, {useState, useRef, useEffect} from 'react';

export default function RoundReadOnlySlider({value, progressColor, size, progressWidth}) {
    const center = size / 2;
    const radius = size / 2 - progressWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const actualValue = value * 10;

    const circleRef = useRef();
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const progressOffset = ((100 - actualValue) / 100) * circumference;
        setOffset(progressOffset);
    }, [circumference, actualValue])
    return (
        <svg width={size} height={size} style={{transform: 'rotate(-90deg)'}}>
            <circle
                ref={circleRef}
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
        // <CircleSlider 
        //     value={value} 
        //     max={10} 
        //     size={size} 
        //     disabled={true} 
        //     knobColor="transparent"
        //     progressWidth={progressWidth}
        //     progressColor={progressColor}
        //     knobRadius={0}
        // />
    )
}
