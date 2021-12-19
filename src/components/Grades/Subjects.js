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

        api.subjects().then((res) => {
            if (res.error) return;
            setSubjects(res);
            console.log(res);
        })
    }, [navigate])

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
                    subjects.map((subject, index) => {
                        return <SubjectCard subject={subject} period={period} key={`${index}-subject`}/>
                    })
                }
            </FlexBox>
        </Container>
    )
}
