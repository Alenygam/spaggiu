import React from 'react'
import styled from 'styled-components';

import AllPeriodsButton from '../../parts/Buttons/AllPeriodsButton'
import PeriodButton from '../../parts/Buttons/PeriodButton'

const Container = styled.div`
    display: flex;
    flex-direction: column;

    > * {
        margin: 7px 0 0 0;
    }

    @media only screen and (max-width: 840px) {
	flex-direction: row;
	overflow: auto;
        > * {
            margin: 0;
        }
    }
`

export default function TabViewButtons({setPeriod, periods, selectedPeriod}) {
    return (
        <Container>
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
        </Container>
    )
}
