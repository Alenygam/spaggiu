import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import {HouseLine, GraduationCap, AddressBook, CalendarBlank} from 'phosphor-react'

const SidebarLinksContainer = styled.div`
    flex-direction: column;
    display: flex;
    white-space: nowrap;
    z-index: 998;
    position: fixed;
    top: 0;
    left: ${(props) => props.isOpen ? '0px' : '-300px'};
    height: 100%;
    width: 300px;
    transition: .5s;
    background-color: #191A27;
`

const SidebarLink = styled.button`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    background-color: transparent;
    color: #fff;
    transition: .25s;
    padding: 16px;
    margin: 5px;

    :hover {
        background-color: #F45F71;
    }

    div {
        flex-grow: 1;
        position: relative;
        height: 100%;
    }

    div > p {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`

export default function SidebarLinks({isOpen}) {
    const navigate = useNavigate();

    return (
        <SidebarLinksContainer isOpen={isOpen}>
            <SidebarLink onClick={() => navigate('/home')}>
                <HouseLine size={30}/>
                <div>
                    <p>Home</p>
                </div>
            </SidebarLink>
            <SidebarLink onClick={() => navigate('/grades')}>
                <GraduationCap size={30}/>
                <div>
                    <p style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'}}>Voti</p>
                </div>
            </SidebarLink>
            <SidebarLink onClick={() => navigate('/absences')}>
                <AddressBook size={30}/>
                <div>
                    <p>Assenze</p>
                </div>
            </SidebarLink>
            <SidebarLink onClick={() => navigate('/agenda')}>
                <CalendarBlank size={30}/>
                <div>
                    <p>Agenda</p>
                </div>
            </SidebarLink>
        </SidebarLinksContainer>
    )
}
