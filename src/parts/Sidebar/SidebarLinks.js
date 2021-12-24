import React, {useRef, useState, useEffect} from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import {HouseLine, GraduationCap, AddressBook, Files, CalendarBlank} from 'phosphor-react'

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
        background-color: #B84A62;
    }
`

export default function SidebarLinks({isOpen}) {
    const navigate = useNavigate();

    return (
        <SidebarLinksContainer isOpen={isOpen}>
            <SidebarLink onClick={() => navigate('/home')}>
                <HouseLine size={30}/>
                <div style={{flexGrow: 1, position: 'relative'}}>
                    <p style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'}}>Home</p>
                </div>
            </SidebarLink>
            <SidebarLink onClick={() => navigate('/grades')}>
                <GraduationCap size={30}/>
                <div style={{flexGrow: 1, position: 'relative'}}>
                    <p style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'}}>Voti</p>
                </div>
            </SidebarLink>
            <SidebarLink onClick={() => navigate('/absences')}>
                <AddressBook size={30}/>
                <div style={{flexGrow: 1, position: 'relative'}}>
                    <p style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'}}>Assenze</p>
                </div>
            </SidebarLink>
            <SidebarLink onClick={() => navigate('/noticeboard')}>
                <Files size={30}/>
                <div style={{flexGrow: 1, position: 'relative'}}>
                    <p style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'}}>Bacheca</p>
                </div>
            </SidebarLink>
            <SidebarLink onClick={() => navigate('/agenda')}>
                <CalendarBlank size={30}/>
                <div style={{flexGrow: 1, position: 'relative'}}>
                    <p style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'}}>Agenda</p>
                </div>
            </SidebarLink>
        </SidebarLinksContainer>
    )
}
