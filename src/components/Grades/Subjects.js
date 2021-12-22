import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Api from '../../api/api';
import {useNavigate} from 'react-router-dom';
import Spinner from 'react-spinkit';
import SubjectCard from '../../parts/Cards/SubjectCard';
import RoundReadOnlySlider from '../../parts/Sliders/RoundReadOnlySlider';
import GradeCard from '../../parts/Cards/GradeCard';

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
    height: 100%;
    overflow: auto;
`

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    padding: 10px;
    grid-gap: 10px;
    grid-auto-flow: row;
    height: 100%;
`

export default function Subjects({period}) {
    const [subjects, setSubjects] = useState();
    const [grades, setGrades] = useState();
    const [averageGrade, setAverageGrade] = useState();
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
            
            setAverageGrade(getAverageGrade(allGradesForPeriod));
            setSubjects(res);
            setGrades(allGradesForPeriod);
        })()
    }, [navigate, period])

    if (!subjects || !grades || !averageGrade) {
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
            <GridContainer>
                <FlexBox>
                    <div style={{
                        width: '250px',
                        height: '250px',
                        backgroundColor: '#061523',
                        borderRadius: '10px',
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <RoundReadOnlySlider
                                value={averageGrade}
                                progressColor="#B84A62"
                                size={200} 
                                progressWidth={10}
                            />
                        </div>
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
                    {grades.splice(0, 3).map((grade) => <GradeCard key={grade.evtId} grade={grade} numberOfChars={13}/>)}
                </FlexBox>
                <FlexBox>
                    {
                        Object.keys(subjects).map((subject) => {
                            return <SubjectCard subject={subjects[subject]} key={`${subject}-subject`}/>
                        })
                    }
                </FlexBox>
            </GridContainer>
        </Container>
    )
}
