import React from "react";

export default function Calendar({ date }) {
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

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            width: 'calc(100% - 490px)',
            position: 'absolute',
            left: '290px',
            top: '160px',
        }}>
            {
                // This is really ugly but it's just a prototype
                allMonthsDay.map((dayDate) => {
                    return (
                        <div style={{
                            height: '120px',
                            border: '1px solid white',
                            gridColumnStart: dayDate.getDay() + 1,
                            gridColumnEnd: dayDate.getDay() + 2
                        }}>
                            {dayDate.getDate()}
                        </div>
                    )
                })
            }
        </div>
    );
}
