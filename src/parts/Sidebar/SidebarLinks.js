import React, {useRef, useState, useEffect} from 'react'
import styled, {keyframes} from 'styled-components';
import { useNavigate } from 'react-router-dom';

const sidebarAnimation = keyframes`
    0% {opacity: 0%;}
    100% {opacity: 100%;}
`

const sidebarAnimationReverse = keyframes`
    0% {opacity: 100%;}
    100% {opacity: 0%;}
`

const SidebarLinksContainer = styled.div`
    flex-direction: column;
    display: ${(props) => props.isFlex ? 'flex' : 'none'};

    animation-name: ${(props) => props.isOpen ? sidebarAnimation : sidebarAnimationReverse};
    animation-duration: .5s;
    white-space: nowrap;
`

const SidebarLink = styled.button`
    padding: 16px 0;
    margin: 8px 0;
    font-size: 16px;
    text-align: center;
    border-radius: 10px;
    background-color: transparent;
    color: #fff;
    transition: .25s;

    :hover {
        background-color: #B84A62;
    }
`

export default function SidebarLinks({isOpen}) {
    const [isFlex , setIsFlex] = useState(false)
    const isMounted = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        isMounted.current = true;

        return () => isMounted.current = false;
    }, [])
    
    // I link appaiono per un secondo anche quando la barra e chiusa, per la prima volta
    // TODO: Fix this
    useEffect(() => {
        setIsFlex(true);
        if (!isOpen) {
            setTimeout(() => {
                if (isMounted.current) setIsFlex(false);
            }, 500)
        }
    }, [isOpen])

    return (
        <SidebarLinksContainer isOpen={isOpen} isFlex={isFlex}>
            <SidebarLink onClick={() => navigate('/grades')}>
                Voti
            </SidebarLink>
            <SidebarLink onClick={() => navigate('/absences')}>
                Assenze
            </SidebarLink>
            <SidebarLink onClick={() => navigate('/noticeboard')}>
                Bacheca
            </SidebarLink>
            <SidebarLink onClick={() => navigate('/agenda')}>
                Agenda
            </SidebarLink>
        </SidebarLinksContainer>
    )
}
