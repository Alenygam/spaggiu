import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Api from '../../api/api';
import RoundReadOnlySlider from '../Sliders/RoundReadOnlySlider';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-spinkit';

const Card = styled.div`
    height: 100px;
    display: grid;
    grid-template-columns: 100px 1fr;
    width: 470px;
    background-color: #061523;
    border-radius: 10px;
    margin: 5px;
`
const CardContainer = styled.div`
    display: grid;
    place-items: center;
`

const LoadingContainer = styled.div`
    width: 470px;
    height: 100px;
    display: grid;
    place-items: center;
`


export default function SubjectCard({period, subject}) {
    const [averageGrade, setAverageGrade] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const api = new Api();
        if (!api.token) return navigate('/login');

        const args = {
            subjectID: subject.id
        };
        if (period) args.periodID = period.periodPos
        api.grades(args).then((res) => {
            if (res.error) return;
            var numberOfGrades = res.length;
            if (res.length < 1) return setAverageGrade(0);
            const sumOfGrades = res.reduce((a, b) => {
                if (a.decimalValue === null || b.decimalValue === null) {
                    numberOfGrades--;
                }
                return {
                    decimalValue: a.decimalValue + b.decimalValue
                }
            }).decimalValue * 100
            setAverageGrade(Math.round(sumOfGrades / numberOfGrades) / 100);
        })
    }, [navigate, period, subject.id])

    if(averageGrade === null || averageGrade === undefined) {
        return (
            <CardContainer>
                <LoadingContainer>
                        <Spinner name="wandering-cubes" color="#D98324"/>
                </LoadingContainer>
            </CardContainer>
        )
    }

    return (
        <CardContainer>
            <Card>
                <div style={{position: 'relative'}}>
                    <RoundReadOnlySlider
                        value={averageGrade}
                        progressColor="#B84A62"
                        size={100}
                        progressWidth={8}
                    />
                    <p style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: 18
                    }}>{averageGrade}</p>
                </div>
                <div style={{
                    display: 'grid',
                    placeItems: 'center'
                }}>
                    <p style={{
                        textAlign: 'center',
                        maxWidth: 250,
                        fontSize: 18
                    }}>
                        {subject.description}
                    </p>
                </div>
            </Card>
        </CardContainer>
    )
}
