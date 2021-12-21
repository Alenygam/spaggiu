import React, {useEffect} from 'react'
import styled from 'styled-components';

const ModalContainer = styled.div`
    background-color: #ffffff;
    color: #0A2239;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 300px;
    border-radius: 10px;
    padding: 10px;
    overflow: auto;
`

const ModalBox = styled.div`
    position: relative;
`

const EventContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-auto-flow: column dense;
    min-height: 150px;
`

const Center = styled.div`
    display: grid;
    place-items: center;
`

export default function AgendaModal({events, dateString, setAgendaModel}) {    
    useEffect(() => {
        const closeAgendaModal = (ev) => {
            if (ev.key === "Escape") setAgendaModel(null)
        }

        document.addEventListener('keydown', closeAgendaModal)
        return () => {
            document.removeEventListener('keydown', closeAgendaModal)
        }
    }, [setAgendaModel])

    return (
        <ModalContainer>
            <ModalBox>
                <div style={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '10px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    cursor: 'pointer',
                    backgroundColor: '#B84A62',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff'
                }} onClick={() => setAgendaModel(null)}>
                    <p style={{textAlign: 'center'}}>X</p>
                </div>
                {
                    events[dateString].map((event, index) => {
                        const dStart = new Date(event["evtDatetimeBegin"]);
                        const dEnd = new Date(event["evtDatetimeEnd"]);

                        return (
                            <EventContainer key={`${event.evtId}-${index}`}>
                                <Center>
                                    <p style={{fontSize: 18}}>{dStart.toLocaleTimeString()} - {dEnd.toLocaleTimeString()}</p>
                                </Center>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <p style={{fontSize: 18, textAlign: 'center', borderBottom: '10px'}}>{event.authorName}</p>
                                    <Center style={{flexGrow: '1'}}>
                                        <p style={{fontSize: 18}}>{event.notes}</p>
                                    </Center>
                                </div>
                            </EventContainer>
                        )
                    })
                }
            </ModalBox>
        </ModalContainer>
    )
}
