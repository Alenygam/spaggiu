import React, {useState} from 'react';
import styled from 'styled-components';

import SidebarCloseButton from './Buttons/SidebarCloseButton';
import SidebarLinks from './Sidebar/SidebarLinks';

const SidebarContainer = styled.div`
    min-height: 100vh;
    background-color: #07192A;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    padding: 16px;
    width: ${(props) => props.isOpen ? '400px' : '90px'};

    overflow: hidden;

    transition: .5s;
    z-index: 999;
`;



export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SidebarContainer isOpen={isOpen}>
            <SidebarCloseButton isOpen={isOpen} setIsOpen={setIsOpen}/>
            <SidebarLinks isOpen={isOpen}/>
        </SidebarContainer>
    )
}
