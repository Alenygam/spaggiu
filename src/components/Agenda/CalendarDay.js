import React from 'react';
import styled from 'styled-components';

const CalendarDayStyle = styled.div`
    height: 120px;
    grid-column-start: ${(props) => props.dayDate.getDay() + 1};
    grid-column-end: ${(props) => props.dayDate.getDay() + 2};
    background-color: #07192A;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

const EventCirclesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row dense;
    flex-grow: 1;
`

const CircleContainer = styled.div`
    height: 20px;
    display: grid;
    place-items: center;
`

const Circle = styled.div`
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: #B84A62;
`

export default function CalendarDay({events, dayDate, setModalToShow}) {
    const dateString = `${dayDate.getFullYear()}${dayDate.getMonth() + 1}${dayDate.getDate()}`;

    return (
        <CalendarDayStyle 
        dayDate={dayDate}
        onClick={() => setModalToShow(dateString)}
        >
            <p style={{ width: "100%", textAlign: "center", marginBottom: '10px' }}>
                {dayDate.getDate()}
            </p>
            {
                events[dateString] && (
                    <EventCirclesContainer>
                        {
                            events[dateString].map((event) => {
                                return (
                                    <CircleContainer key={event.evtId}>
                                        <Circle/>
                                    </CircleContainer>
                                )
                            })
                        }
                    </EventCirclesContainer>
                )
            }
        </CalendarDayStyle>
    );
}
