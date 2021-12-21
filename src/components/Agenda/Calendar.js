import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Spinner from "react-spinkit";
import Api from "../../api/api";
import { useNavigate } from "react-router-dom";
import CalendarDay from "./CalendarDay";

const Container = styled.div`
    width: calc(100% - 490px);
    position: absolute;
    left: 290px;
    top: 160px;
    overflow: auto;
    height: calc(100% - 320px);
    padding: 15px;
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

    const beginString = `${date.getFullYear()}${date.getMonth() + 1}01`
    const endString = `${date.getFullYear()}${date.getMonth() + 1}${allMonthsDay[allMonthsDay.length - 1].getDate()}`

    useEffect(() => {
        const api = new Api();
        if (!api.token) return navigate('/login');

        api.agenda({begin: beginString, end: endString}).then((res) => {
            if (res.error) return;
            let events = {};
            // Parsing events by date
            for (let event of res) {
                let d = new Date(event["evtDatetimeBegin"]);
                const dateString = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`;
                if (!events[dateString]) events[dateString] = [];
                events[dateString].push(event);
                setEvents(events);
            }
        })

    }, [navigate, date, beginString, endString])

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
        </>
    );
}
