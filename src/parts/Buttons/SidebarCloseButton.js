import React from 'react'
import styled from 'styled-components';
import {ArrowArcRight} from 'phosphor-react';

const OpenAndCloseButton = styled.button`
    height: 64px;
    width: 64px;
    padding: 0;
    margin: 0;
    background-color: #07192A;
    border-radius: 10px;

    position: absolute;
    top: 0;
    left: ${(props) => !props.isOpen ? 'calc(50% - 32px)' : 'calc(100% - 64px)'};

    transform: 
        rotate(${(props) => props.isOpen ? '180deg' : '0deg'});

    transition: .5s;

    :hover {
        background-color: #05111C;
    }
`;

export default function SidebarCloseButton({isOpen, setIsOpen}) {
    return (
        <div style={{position: 'relative', height: '64px'}}>
            <OpenAndCloseButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                <ArrowArcRight color="#ffffff" size={50}/>
            </OpenAndCloseButton>
        </div>
    )
}
