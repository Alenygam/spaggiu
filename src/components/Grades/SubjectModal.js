import React, {useEffect} from 'react';
import styled from 'styled-components';
import RoundReadOnlySlider from '../../parts/Sliders/RoundReadOnlySlider';
import GradeCardForModal from '../../parts/Cards/GradeCardForModal';

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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '300px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '10px',
            color: '#0A2239'
        }}>
            <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'row'
            }}>
                <CloseButton setModalData={setModalData}/>
                <div style={{
                    width: '280px',
                    height: '280px',
                    position: 'relative'
                }}>
                    <RoundReadOnlySlider
                        progressWidth={10}
                        value={subject.averageGrade}
                        size={280}
                        progressColor="#D98324"
                    />
                    <CenterAbsolute>
                        <p style={{fontSize: 18}}>{subject.averageGrade}</p>
                    </CenterAbsolute>
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
            backgroundColor: '#B84A62',
            display: 'grid',
            placeItems: 'center',
            color: '#fff'
        }} onClick={() => setModalData(null)}>
            <p style={{textAlign: 'center'}}>X</p>
        </div>
    )
}