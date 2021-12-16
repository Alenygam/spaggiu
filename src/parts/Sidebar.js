import React, {useState} from 'react';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';

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

    transition: .5s;
    z-index: 999;
`;

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

const SidebarLink = styled.div`
    padding: 16px 0;
    text-align: center;
`

function SidebarLinks() {
    return (
        <>
            <SidebarLink>
                Voti
            </SidebarLink>
            <SidebarLink>
                Assenze
            </SidebarLink>
            <SidebarLink>
                Bacheca
            </SidebarLink>
            <SidebarLink>
                Agenda
            </SidebarLink>
        </>
    )
}

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SidebarContainer isOpen={isOpen}>
            <div style={{position: 'relative', height: '64px'}}>
                <OpenAndCloseButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                    <MaterialIcon icon="chevron_right" color="#ffffff" size={50}/>
                </OpenAndCloseButton>
            </div>
            {isOpen && <SidebarLinks/>}
        </SidebarContainer>
    )
}
