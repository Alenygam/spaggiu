import React, {useMemo} from 'react'
import styled from 'styled-components'

import RoundReadOnlySlider from '../../parts/Sliders/RoundReadOnlySlider'
import getGradeColor from '../../common/getGradeColor';
import { Chart } from 'react-charts';

const Container = styled.div`
    height: 120px;
    background-color: #1E1F2F;
    border-radius: 10px;
    width: 350px;
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    margin-top: 10px;
`

export default function SidePanel({averageGrade, grades}) {
    const lengthGradesNotNull = grades.filter((grade) => !!grade.decimalValue).length;
    var gradesWithIndexAndNoNullValues = grades
        .filter((grade) => !!grade.decimalValue)
        .map((grade, index) => ({...grade, index: lengthGradesNotNull - index}))

    const data = [
        {
            label: "Voti",
            data: gradesWithIndexAndNoNullValues
        }
    ]

    const primaryAxis = useMemo(
        () => ({getValue: datum => datum.index}),
        []
    )

    const secondaryAxes = useMemo(
        () => [{getValue: datum => datum.decimalValue}],
        []
    )

    const getSeriesStyle = React.useCallback(() => ({
        fill: '#F78D99',
        stroke: '#F78D99'
    }), [])

    return (
        <Container>
            <div style={{position: 'relative'}}>
                <RoundReadOnlySlider
                    value={averageGrade}
                    progressColor={getGradeColor(averageGrade)}
                    size={120} 
                    progressWidth={10}
                />
                <p style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 20
                }}>
                    {averageGrade}
                </p>
            </div>
            <div style={{flexGrow: 1}}>
                <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,

                        getSeriesStyle: getSeriesStyle,
                        dark: true,
                        tooltip: {
                            render: () => null
                        }
                    }}
                />
            </div>
        </Container>
    )
}
