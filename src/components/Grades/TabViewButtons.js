import React from 'react'

import AllPeriodsButton from '../../parts/Buttons/AllPeriodsButton'
import PeriodButton from '../../parts/Buttons/PeriodButton'

export default function TabViewButtons({setPeriod, periods, selectedPeriod}) {
    return (
        <div style={{
            display: 'flex',
            overflow: 'auto',
            height: '48px'
        }}>
            <AllPeriodsButton setPeriod={setPeriod} selected={!selectedPeriod}/>
            {
                periods.map((period, index) => {
                    return <PeriodButton 
                        key={`${index}-periodButton`}
                        setPeriod={setPeriod} 
                        period={period} 
                        index={index} 
                        selected={JSON.stringify(period) === JSON.stringify(selectedPeriod)}
                    />
                })
            }
        </div>
    )
}
