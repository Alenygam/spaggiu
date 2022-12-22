import React, {useState, useEffect, useMemo} from 'react'
import { unstable_batchedUpdates } from 'react-dom';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import {useNavigate} from 'react-router-dom';
import {Chart} from 'react-charts'
import { useMediaQuery } from 'usehooks-ts';

import TabViewButtons from '../components/Grades/TabViewButtons';
import getGradeColor from '../common/getGradeColor';

import Api from '../api/api';
import SubjectCard from '../parts/Cards/SubjectCard';
import RoundReadOnlySlider from '../parts/Sliders/RoundReadOnlySlider';
import SubjectModal from '../components/Grades/SubjectModal';

const Container = styled.div`
    background-color: #282A3E;
    color: #FFFFFF;
    min-height: 100%;
    overflow: auto;
    display: grid;
    place-items: center;
    padding: 60px 20px;
`;

const InnerContainer = styled.div`
    width: 805px;
    height: 570px;
    display: grid;
    grid-template-columns: 480px 295px;
    grid-template-rows: auto 1fr;
    grid-gap: 30px;

    @media only screen and (max-width: 840px) {
	width: auto;
        grid-template-rows: auto auto 1fr;
        grid-template-columns: 1fr;
    }
`

const GeneralAverage = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
    background-color: #1e1f2f;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div > p {
        font-size: 40px;
    }

    > div {
        margin-top: 16px;
    }

    @media only screen and (max-width: 840px) {
        padding: 5px;
        grid-template-rows: auto auto 1fr;
        grid-template-columns: 1fr;
        flex-direction: row;
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;
        > div > p {
            font-size: 22px;
        }
        > div {
            margin-top: 0;
        }
    }
`

function Graph ({grades}) {
    const lengthGradesNotNull = grades.filter((grade) => !!grade.decimalValue).length;
    var gradesWithIndexAndNoNullValues = grades
        .filter((grade) => !!grade.decimalValue)
        .map((grade, index) => ({...grade, index: lengthGradesNotNull - index}));

    const data = [
        {
            label: "Voti",
            data: gradesWithIndexAndNoNullValues
        }
    ];

    const primaryAxis = useMemo(
        () => ({getValue: datum => datum.index}),
        []
    );

    const secondaryAxes = useMemo(
        () => [{getValue: datum => datum.decimalValue}],
        []
    )

    const getSeriesStyle = React.useCallback(() => ({
        fill: '#F78D99',
        stroke: '#F78D99'
    }), [])

    return (
        <div style={{width: '95%', height: '100%', margin: '20px'}}>
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
    )
	
}


export default function Grades() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [periods, setPeriods] = useState();
    const [selectedPeriod, setSelectedPeriod] = useState();

    const [subjects, setSubjects] = useState();
    const [grades, setGrades] = useState();
    const [averageGrade, setAverageGrade] = useState();
    const [modalData, setModalData] = useState();
    const isMobile = useMediaQuery('(max-width: 840px)');

    const navigate = useNavigate();

    useEffect(() => {
        const api = new Api();
        if (!api.token) return navigate('/login');
        setIsAuthed(true);
        api.periods().then((res) => {
            if (res.error) return;
            setPeriods(res);
        })

    }, [navigate])

    useEffect(() => {
        const api = new Api();
        if (!api.token) return navigate('/login');

        const getAverageGrade = (gradesArray) => {
                var numberOfGrades = gradesArray.length;
                if (numberOfGrades < 1) {
                    return 0;
                }
                var sum = 0;
                for (let grade of gradesArray) {
                    if (grade.decimalValue === null) {
                        numberOfGrades--;
                    }

                    sum += grade.decimalValue;
                }
                sum = sum * 100;

                return Math.round(sum / numberOfGrades) / 100;
        }

        (async () => {
            var res = {};

            const allSubjects = await api.subjects()
            if (allSubjects.error) return;

            let args = {};
            if (selectedPeriod) args.periodID = selectedPeriod.periodPos;
            const allGradesForPeriod = await api.grades(args);
            if (!allGradesForPeriod) return;

            for (let subject of allSubjects) {
                const subjectGrades = allGradesForPeriod.filter((obj) => obj.subjectId === subject.id);

                res[subject.id] = {
                    averageGrade: getAverageGrade(subjectGrades),
                    ...subject
                }
            }
            
            unstable_batchedUpdates(() => {
                setAverageGrade(getAverageGrade(allGradesForPeriod));
                setSubjects(res);
                setGrades(allGradesForPeriod);
            })
        })()
    }, [navigate, selectedPeriod])

    if (!isAuthed || !periods || !subjects) {
        return (
            <Container>
                <div style={{
                    display: 'grid',
                    placeItems: 'center',
                    transform: 'scale(1.5)'
                }}>
                    <Spinner name="wandering-cubes" color="#F38D4F"/>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <InnerContainer>
                <GeneralAverage>
                    <div style={{position: 'relative'}}>
                        <RoundReadOnlySlider
                            value={averageGrade}
                            progressColor={getGradeColor(averageGrade)}
                            size={isMobile ? 120 : 250}
                            progressWidth={isMobile ? 12 : 20}
                        />
                        <p style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}>{averageGrade}</p>
                    </div>
                    <Graph grades={grades}/>
                </GeneralAverage>
                <TabViewButtons setPeriod={setSelectedPeriod} periods={periods} selectedPeriod={selectedPeriod}/>
                {/* Fuck scrollbars */}
                <div style={{overflow: 'auto', padding: '0 7px 0 0'}}>
                    {
                        Object.keys(subjects)
                            .sort((a, b) => subjects[b].averageGrade - subjects[a].averageGrade)
                            .map((el) =>
                                <SubjectCard onClick={() => setModalData(subjects[el])} subject={subjects[el]} key={`${el}-subject`} />
                            )
                    }
                </div>
            </InnerContainer>
            {modalData && <SubjectModal setModalData={setModalData} grades={grades} subject={modalData}/>}
        </Container>
    )
}
