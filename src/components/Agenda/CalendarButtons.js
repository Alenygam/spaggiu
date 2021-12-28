import React from 'react'
import PrevNextCalendarButton from '../../parts/Buttons/PrevNextCalendarButton'

const monthNames = [
    "Gennaio", 
    "Febbraio", 
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"
];


export default function CalendarButtons({date, setDate, setAgendaModal}) {
    const setPreviousMonth = () => {
        const d = new Date(date);
        d.setMonth(date.getMonth() - 1);
        setDate(d);
        setAgendaModal(null)
    }
    
    const setNextMonth = () => {
        const d = new Date(date);
        d.setMonth(date.getMonth() + 1);
        setDate(d);
        setAgendaModal(null)
    }

    return (
        <div style={{
            display: 'flex',
        }}>
            <PrevNextCalendarButton onClick={setPreviousMonth}>Precedente</PrevNextCalendarButton>
            <div style={{
                display: 'grid',
                placeItems: 'center',
                flex: '1'
            }}>
                <p style={{fontSize: 18, textAlign: 'center'}}>{monthNames[date.getMonth()]} {date.getFullYear()}</p>
            </div>
            <PrevNextCalendarButton onClick={setNextMonth}>Prossimo</PrevNextCalendarButton>
        </div>
    )
}
