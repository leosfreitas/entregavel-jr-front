import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { createDespesa, getDespesas, deleteDespesa, editDespesa } from "./api/finances";
import { CurrencyDollar, PlusCircle, PencilSimple, Check, X } from "@phosphor-icons/react";

export const Finances = () => {
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [despesas, setDespesas] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null); 
  const [editFields, setEditFields] = useState({
    tipo: "",
    valor: "",
    data: "",
    descricao: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getDespesas();
        setDespesas(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // Função para criar despesa
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await createDespesa(tipo, valor, data, descricao);
      if (response.response.ok) {
        toast.success("Despesa criada com sucesso!");
        setSuccess("Despesa criada com sucesso!");

        const newDespesas = await getDespesas();
        setDespesas(newDespesas);

        // Limpa campos do formulário
        setTipo("");
        setValor("");
        setData("");
        setDescricao("");
      } else {
        toast.error("Erro ao criar a despesa");
        setError("Erro ao criar a despesa");
      }
    } catch (error) {
      toast.error("Erro ao criar a despesa");
      setError("Erro ao criar a despesa");
    }
  };

  // Função para deletar despesa
  const handleDelete = async (despesaId: string) => {
    try {
      await deleteDespesa(despesaId);
      toast.success("Despesa deletada com sucesso!");

      const newDespesas = await getDespesas();
      setDespesas(newDespesas);
    } catch (err: any) {
      toast.error(err.message || "Erro ao deletar despesa");
    }
  };

  // Função para editar despesa
  const handleEdit = (despesa: any) => {
    setEditing(despesa._id);
    setEditFields({
      tipo: despesa.tipo,
      valor: despesa.valor,
      data: despesa.data,
      descricao: despesa.descricao || "",
    });
  };

  const handleEditCancel = () => {
    setEditing(null);
    setEditFields({ tipo: "", valor: "", data: "", descricao: "" });
  };

  const handleEditSave = async () => {
    try {
      await editDespesa(editing!, editFields.tipo, editFields.valor, editFields.data, editFields.descricao);
      toast.success("Despesa editada com sucesso!");
      setEditing(null);

      const newDespesas = await getDespesas();
      setDespesas(newDespesas);
    } catch (err: any) {
      toast.error(err.message || "Erro ao editar despesa");
    }
  };

  const handleEditChange = (field: string, value: string) => {
    setEditFields({ ...editFields, [field]: value });
  };

  return (
    <FinanceContainer>
      <Title>
        <CurrencyDollar size={28} weight="bold" />
        Despesas, receitas e orçamentos
      </Title>

      {/* Tabela de despesas */}
      <DespesasSection>
        <h3>Minhas Despesas</h3>
        {despesas && despesas.length > 0 ? (
          <TableScrollContainer>
            <DespesasTable>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {despesas.map((desp) => (
                  <tr key={desp._id}>
                    <td>
                      {editing === desp._id ? (
                        <input
                          value={editFields.tipo}
                          onChange={(e) => handleEditChange("tipo", e.target.value)}
                        />
                      ) : (
                        desp.tipo
                      )}
                    </td>
                    <td>
                      {editing === desp._id ? (
                        <input
                          value={editFields.valor}
                          onChange={(e) => handleEditChange("valor", e.target.value)}
                        />
                      ) : (
                        `R$ ${desp.valor}`
                      )}
                    </td>
                    <td>
                      {editing === desp._id ? (
                        <input
                          type="date"
                          value={editFields.data}
                          onChange={(e) => handleEditChange("data", e.target.value)}
                        />
                      ) : (
                        desp.data
                      )}
                    </td>
                    <td>
                      {editing === desp._id ? (
                        <input
                          value={editFields.descricao}
                          onChange={(e) => handleEditChange("descricao", e.target.value)}
                        />
                      ) : (
                        desp.descricao || "-"
                      )}
                    </td>
                    <td>
                      {editing === desp._id ? (
                        <>
                          <ActionButton onClick={handleEditSave}>
                            <Check size={18} weight="bold" />
                            Salvar
                          </ActionButton>
                          <ActionButton onClick={handleEditCancel}>
                            <X size={18} weight="bold" />
                            Cancelar
                          </ActionButton>
                        </>
                      ) : (
                        <>
                          <ActionButton onClick={() => handleEdit(desp)}>
                            <PencilSimple size={18} weight="bold" />
                            Editar
                          </ActionButton>
                          <ActionButton onClick={() => handleDelete(desp._id)}>
                            Deletar
                          </ActionButton>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </DespesasTable>
          </TableScrollContainer>
        ) : (
          <NoData>Nenhuma despesa cadastrada.</NoData>
        )}
      </DespesasSection>

      {/* Form para criar nova despesa */}
      <StyledForm onSubmit={handleSubmit}>
        <FormItem>
          <label htmlFor="tipo">Tipo</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Selecione</option>
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
        </FormItem>

        <FormItem>
          <label htmlFor="valor">Valor</label>
          <input
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
            placeholder="Ex: 250.00"
          />
        </FormItem>

        <FormItem>
          <label htmlFor="data">Data</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </FormItem>

        <FormItem>
          <label htmlFor="descricao">Descrição</label>
          <input
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Compra de mercado"
          />
        </FormItem>

        <SubmitButton type="submit">
          <PlusCircle size={18} weight="bold" />
          Criar Despesa
        </SubmitButton>
      </StyledForm>
    </FinanceContainer>
  );
};

// -------------------------------------------------
//   ESTILIZAÇÕES (sem mudanças, só pra referência)
// -------------------------------------------------
const FinanceContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const DespesasSection = styled.div`
  h3 {
    font-size: 1.3rem;
    margin-bottom: 12px;
    color: #444;
  }
`;

const TableScrollContainer = styled.div`
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 24px;
`;

const DespesasTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #ddd;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
  }

  th {
    font-weight: bold;
  }

  td {
    vertical-align: middle;
  }
`;

const ActionButton = styled.button`
  margin-right: 8px;
  padding: 6px 10px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #bbb;
  }
`;

const NoData = styled.div`
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 24px;
`;

const StyledForm = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 110px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
    font-size: 0.9rem;
  }

  input,
  select {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 0.95rem;
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background-color: #007bff;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  transition: background-color 0.2s ease;
  &:hover {
    background-color: #0056b3;
  }
`;
