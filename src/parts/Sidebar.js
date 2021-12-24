import React, {useState} from 'react';
import styled from 'styled-components';
import {List} from 'phosphor-react';

import SidebarLinks from './Sidebar/SidebarLinks';

const ButtonContainer = styled.div`
    position: fixed;
    top: 10px;
    left: ${(props) => props.isOpen ? '310px' : '10px'};
    width: 40px;
    height: 40px;
    z-index: 999;
    transform: rotate(${(props) => props.isOpen ? '270deg' : '0'});
    transition: .5s;
    border-radius: 10px;
    cursor: pointer;
    background-color: #F38D4F;

    display: grid;
    place-items: center;

    :hover {
        background-color: #F45F71;
    }
`

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ButtonContainer isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <List size={32.5}></List>
            </ButtonContainer>
            <SidebarLinks isOpen={isOpen}/>
        </>
    )
}
