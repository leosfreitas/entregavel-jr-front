import styled from 'styled-components';

export const History = () => {
    return (
        <HistoryStyles>
            Histórico de transações
        </HistoryStyles>
    )
}  

const HistoryStyles = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`