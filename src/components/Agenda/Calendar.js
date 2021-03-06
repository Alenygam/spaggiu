import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Spinner from "react-spinkit";
import Api from "../../api/api";
import { useNavigate } from "react-router-dom";
import CalendarDay from "./CalendarDay";
import AgendaModal from "./AgendaModal";

const Container = styled.div`
    position: relative;
    overflow: auto;
    padding: 15px;
    flex-grow: 1;
`;

export default function Calendar({ date }) {
    const [events, setEvents] = useState();
    const [modalToShow, setModalToShow] = useState();
    const navigate = useNavigate();
    var allMonthsDay = [];

    // Holy shit this actually works oh my god my god my god my god
    while (true) {
        var prevDate = allMonthsDay[allMonthsDay.length - 1]?.getDate()
        const d = new Date(date.getFullYear(), date.getMonth(), !!prevDate ? prevDate + 1 : 1);
        if (d.getMonth() !== date.getMonth()) {
            break;
        }
        allMonthsDay.push(d);
    }

    var dateMonthString = String(date.getMonth() + 1);
    if (dateMonthString.length < 2) {
        dateMonthString = 0 + dateMonthString;
    }

    const beginString = `${date.getFullYear()}${dateMonthString}01`
    const endString = `${date.getFullYear()}${dateMonthString}${allMonthsDay[allMonthsDay.length - 1].getDate()}`

    useEffect(() => {
        const api = new Api();
        if (!api.token) return navigate('/login');
        setEvents(null);

        api.agenda({begin: beginString, end: endString}).then((res) => {
            if (res.error) return;
            let events = {};
            // Parsing events by date
            for (let event of res) {
                let d = new Date(event["evtDatetimeBegin"]);
                const dateString = `${d.getFullYear()}${dateMonthString}${d.getDate()}`;
                if (!events[dateString]) events[dateString] = [];
                events[dateString].push(event);
            }
            setEvents(events);
        })

    }, [navigate, date, dateMonthString, beginString, endString])

    if (!events) {
        return (
            <Container>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <Spinner name="wandering-cubes" color="#D98324"/>
                </div>
            </Container>
        )
    }

    return (
        <>
            <Container>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gridGap: '5px'
                }}>
                    {
                        allMonthsDay.map((dayDate) => {
                            return (
                                <CalendarDay events={events} dayDate={dayDate} setModalToShow={setModalToShow}/>
                            )
                        })
                    }
                </div>
            </Container>
            {modalToShow && <AgendaModal setAgendaModel={setModalToShow} events={events} dateString={modalToShow}/>}
        </>
    );
}
