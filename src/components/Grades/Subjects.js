import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Api from '../../api/api';
import {useNavigate} from 'react-router-dom';
import Spinner from 'react-spinkit';
import SubjectCard from '../../parts/Cards/SubjectCard';

const Container = styled.div`
    position: absolute;
    top: 160px;
    left: 290px;
    width: calc(100% - 490px);
    height: calc(100% - 320px);
`

const FlexBox = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: auto;
`

export default function Subjects({period}) {
    const [subjects, setSubjects] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        const api = new Api();
        if (!api.token) return navigate('/login');

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

                var numberOfGrades = subjectGrades.length;
                if (numberOfGrades < 1) {
                    res[subject.id] = {
                        averageGrade: 0,
                        ...subject
                    }
                    continue;
                }
                var sum = 0;
                for (let grade of subjectGrades) {
                    if (grade.decimalValue === null) {
                        numberOfGrades--;
                    }

                    sum += grade.decimalValue;
                }
                sum = sum * 100;

                const averageGrade = Math.round(sum / numberOfGrades) / 100;

                res[subject.id] = {
                    averageGrade: averageGrade,
                    ...subject
                }
            }
            
            setSubjects(res);
        })()
    }, [navigate, period])

    if (!subjects) {
        return (
            <Container>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'scale(1.5) translate(-50%, -50%)',
                }}>
                    <Spinner name="wandering-cubes" color="#D98324"/>
                </div>
            </Container>
        )
    } 

    return (
        <Container>
            <FlexBox>
                {
                    Object.keys(subjects).map((subject) => {
                        return <SubjectCard subject={subjects[subject]} key={`${subject}-subject`}/>
                    })
                }
            </FlexBox>
        </Container>
    )
}
