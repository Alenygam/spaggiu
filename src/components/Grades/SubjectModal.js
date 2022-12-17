import React, {useEffect, useMemo} from 'react';
import styled from 'styled-components';
import RoundReadOnlySlider from '../../parts/Sliders/RoundReadOnlySlider';
import GradeCardForModal from '../../parts/Cards/GradeCardForModal';
import getGradeColor from '../../common/getGradeColor';

import { X } from 'phosphor-react';
import { Chart } from 'react-charts';

const CenterAbsolute = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default function SubjectModal({grades, subject, setModalData}) {
    const subjectGrades = grades.filter((grade) => grade.subjectId === subject.id);

    useEffect(() => {
        const closeAgendaModal = (ev) => {
            if (ev.key === "Escape") setModalData(null)
        }

        document.addEventListener('keydown', closeAgendaModal)
        return () => {
            document.removeEventListener('keydown', closeAgendaModal)
        }
    }, [setModalData])

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100vw',
            maxWidth: '320px',
            height: '300px',
            backgroundColor: '#1E1F2F',
            borderRadius: '10px',
            padding: '10px',
            color: '#FFFFFF',
            boxShadow: '0px 0px 300px black'
        }}>
            <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <CloseButton setModalData={setModalData}/>
                <div style={{
                    width: '100%',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <div style={{position: 'relative'}}>
                        <RoundReadOnlySlider
                            progressWidth={10}
                            value={subject.averageGrade}
                            size={120}
                            progressColor={getGradeColor(subject.averageGrade)}
                        />
                        <CenterAbsolute>
                            <p style={{fontSize: 18}}>{subject.averageGrade}</p>
                        </CenterAbsolute>
                    </div>
                    {
                        subjectGrades.length > 0 && (
                            <div style={{flexGrow: 1}}>
                                <SubjectChart subjectGrades={subjectGrades}/>
                            </div>
                        )
                    }
                </div>
                <div style={{
                    flexGrow: 1,
                    overflow: 'auto'
                }}>
                    {
                        subjectGrades.map((grade) => {
                            return <GradeCardForModal grade={grade} numberOfChars={21}/>
                        })
                    }
                </div>
            </div>
            
        </div>
    )
}

function SubjectChart({subjectGrades}) {
    const lengthGradesNotNull = subjectGrades.filter((grade) => !!grade.decimalValue).length;
    const gradesWithIndexAndNoNullValues = subjectGrades
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
    )
}

function CloseButton({setModalData}) {
    return (
        <div style={{
            width: '25px',
            height: '25px',
            borderRadius: '10px',
            position: 'absolute',
            top: 0,
            right: 0,
            cursor: 'pointer',
            backgroundColor: '#F13248',
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            zIndex: 999
        }} onClick={() => setModalData(null)}>
            <X size={20}/>
        </div>
    )
}