import React from 'react';
import { CircleSlider } from 'react-circle-slider';

export default function RoundReadOnlySlider({value, progressColor, size, progressWidth}) {
    return (
        <CircleSlider 
            value={value} 
            max={10} 
            size={size} 
            disabled={true} 
            knobColor="transparent"
            progressWidth={progressWidth}
            progressColor={progressColor}
            knobRadius={0}
        />
    )
}
