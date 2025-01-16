import React, { useState } from 'react';
import styled from 'styled-components';
import { createDespesa } from './api/finances';

export const Finances = () => {
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await createDespesa(tipo, valor, data, descricao);
            if (response.response.ok) {
                setSuccess('Despesa criada com sucesso!');
                setError('');
            } else {
                setError('Erro ao criar a despesa');
            }
        } catch (error) {
            setError('Erro ao criar a despesa');
            setSuccess('');
        }
    };

    return (
        <FinanceStyles>
            <h2>Despesas, receitas e orçamentos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="tipo">Tipo</label>
                    <select
                        id="tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    >
                        <option value="">Selecione um tipo</option>
                        <option value="Habitação">Habitação</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Alimentação">Alimentação</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Educação">Educação</option>
                        <option value="Lazer">Lazer</option>
                        <option value="Roupas">Roupas</option>
                        <option value="Tecnologia">Tecnologia</option>
                        <option value="Assinaturas e Serviços">Assinaturas e Serviços</option>
                        <option value="Investimentos">Investimentos</option>
                        <option value="Doações">Doações</option>
                        <option value="Impostos">Impostos</option>
                        <option value="Dívidas">Dívidas</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="valor">Valor</label>
                    <textarea
                        id="valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="data">Data</label>
                    <input
                        type="date"
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <button type="submit">Criar Despesa</button>
            </form>

            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </FinanceStyles>
    );
};

const FinanceStyles = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    h2 {
        font-size: 1.5rem;
        margin-bottom: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    div {
        margin-bottom: 15px;
    }

    label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    input, textarea, select {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 1rem;
    }

    button {
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #0056b3;
        }
    }

    p {
        font-size: 1rem;
        margin-top: 15px;
    }
`;
