import React, {useState, useEffect} from 'react'
import { unstable_batchedUpdates } from 'react-dom';
import styled from 'styled-components'
import Api from '../../api/api';
import {useNavigate} from 'react-router-dom';
import Spinner from 'react-spinkit';
import SubjectCard from '../../parts/Cards/SubjectCard';
import SidePanel from './SidePanel';
import SubjectModal from './SubjectModal';

const Container = styled.div`
    position: relative;
    min-height: calc(100vh - 200px);
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 200px);
`

export default function Subjects({period}) {
    const [subjects, setSubjects] = useState();
    const [grades, setGrades] = useState();
    const [averageGrade, setAverageGrade] = useState();
    const [modalData, setModalData] = useState();
    const navigate = useNavigate()

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
            if (period) args.periodID = period.periodPos;
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
    }, [navigate, period])

    if (!subjects || !grades || !averageGrade) {
        return (
            <Container>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(1.5)',
                }}>
                    <Spinner name="wandering-cubes" color="#F38D4F"/>
                </div>
            </Container>
        )
    } 

    return (
        <>
            <Container>
                <Box>
                    <SidePanel averageGrade={averageGrade} grades={grades}/>
                    <div style={{flexGrow: 1, overflow: 'auto', width: 315}}>
                        {
                            Object.keys(subjects).map((subject) => {
                                return <SubjectCard onClick={() => setModalData(subjects[subject])} subject={subjects[subject]} key={`${subject}-subject`}/>
                            })
                        }
                    </div>
                </Box>
            </Container>
            {modalData && <SubjectModal setModalData={setModalData} grades={grades} subject={modalData}/>}
        </>
    )
}
