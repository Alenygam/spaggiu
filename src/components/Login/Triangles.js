import React from 'react';
import styled from 'styled-components';

export default function Triangles({loading}) {
    return (
        <div style={{overflow: 'hidden'}}>
            <Triangle1 isLoading={loading}/>
            <Triangle2 isLoading={loading}/>
        </div>
    );
}

const Triangle1 = styled.div`
    background: #B84A62;
    clip-path: polygon(0 0, 0 100%, calc(100% - 500px) 100%, 100% 0);
    transform: ${props => props.isLoading 
        ? "translateX(-50px)"
        : "translateX(calc(-100% + 500px))"
    };
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 998;
    
    transition: 1s;
    transition-delay: ${props => props.isLoading ? '.5s' : '0s'};
`;
const Triangle2 = styled.div`
    background: #D98324;
    clip-path: polygon(0 0, 0 100%, calc(100% - 500px) 100%, 100% 0);
    transform: ${props => props.isLoading 
        ? "translateX(-50px)"
        : "translateX(calc(-100% + 550px))"
    };
    left: 0;
    top: 0;
    height: 100%;
    width: calc(100% + 50px);
    position: absolute;
    z-index: 997;

    transition: 1s;
    transition-delay: ${props => props.isLoading ? '0s' : '.5s'};
`;
