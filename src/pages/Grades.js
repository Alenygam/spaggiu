import React, {useState, useEffect} from 'react'
import { unstable_batchedUpdates } from 'react-dom';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import {useNavigate} from 'react-router-dom';

import TabViewButtons from '../components/Grades/TabViewButtons';
import getGradeColor from '../common/getGradeColor';
// import Subjects from '../components/Grades/Subjects';

import Api from '../api/api';
import SubjectCard from '../parts/Cards/SubjectCard';
import RoundReadOnlySlider from '../parts/Sliders/RoundReadOnlySlider';

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
`


export default function Grades() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [periods, setPeriods] = useState();
    const [selectedPeriod, setSelectedPeriod] = useState();

    const [subjects, setSubjects] = useState();
    const [grades, setGrades] = useState();
    const [averageGrade, setAverageGrade] = useState();
    const [modalData, setModalData] = useState();

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
                <div style={{
                    gridColumnStart: '1',
                    gridColumnEnd: '2',
                    gridRowStart: '1',
                    gridRowEnd: '3',
                    backgroundColor: '#1e1f2f',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{position: 'relative', marginTop: '16px'}}>
                        <RoundReadOnlySlider
                            value={averageGrade}
                            progressColor={getGradeColor(averageGrade)}
                            size={250}
                            progressWidth={20}
                        />
                        <p style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '40px'
                        }}>{averageGrade}</p>
                    </div>
                </div>
                <TabViewButtons setPeriod={setSelectedPeriod} periods={periods} selectedPeriod={selectedPeriod}/>
                {/* Fuck scrollbars */}
                <div style={{overflow: 'auto', padding: '0 7px 0 0'}}>
                    {
                        Object.keys(subjects)
                            .sort((a, b) => subjects[b].averageGrade - subjects[a].averageGrade)
                            .map((el) =>
                                <SubjectCard subject={subjects[el]} key={`${el}-subject`} />
                            )
                    }
                </div>
            </InnerContainer>
        </Container>
    )
}
