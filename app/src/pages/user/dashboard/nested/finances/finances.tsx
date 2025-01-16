import styled from 'styled-components';

export const Finances = () => {
    return (
        <FinanceStyles>
            Despesas, receitas e orçamentos
        </FinanceStyles>
    )
}  

const FinanceStyles = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`