import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getDespesas } from "../finances/api/finances";
import { ScrollArea } from "@/components/ui/scroll-area";

export const History = () => {
  const [despesas, setDespesas] = useState<any[]>([]);
  const [filteredDespesas, setFilteredDespesas] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterDataStart, setFilterDataStart] = useState("");
  const [filterDataEnd, setFilterDataEnd] = useState("");

  useEffect(() => {
    fetchDespesas();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [despesas, searchQuery, filterTipo, filterDataStart, filterDataEnd]);

  const fetchDespesas = async () => {
    try {
      const data = await getDespesas();
      setDespesas(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao obter despesas");
    }
  };

  const applyFilters = () => {
    let filtered = [...despesas];

    if (filterTipo) {
      filtered = filtered.filter((desp) => desp.tipo === filterTipo);
    }

    if (filterDataStart) {
      filtered = filtered.filter((desp) => desp.data >= filterDataStart);
    }
    if (filterDataEnd) {
      filtered = filtered.filter((desp) => desp.data <= filterDataEnd);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (desp) =>
          desp.descricao?.toLowerCase().includes(query) ||
          desp.tipo?.toLowerCase().includes(query)
      );
    }

    setFilteredDespesas(filtered);
  };

  return (
    <div className="bg-white p-6 m-6 rounded shadow relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Histórico de Transações
      </h2>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Buscar</label>
          <input
            type="text"
            placeholder="Digite para buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Filtrar por Tipo</label>
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Todos os Tipos</option>
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
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Data Início</label>
          <input
            type="date"
            value={filterDataStart}
            onChange={(e) => setFilterDataStart(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Data Fim</label>
          <input
            type="date"
            value={filterDataEnd}
            onChange={(e) => setFilterDataEnd(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>

      <ScrollArea className="h-80 border border-gray-300 mb-6">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              {["Tipo", "Valor", "Data", "Descrição"].map((header) => (
                <th
                  key={header}
                  className="p-2 border border-gray-300 font-semibold text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDespesas.length > 0 ? (
              filteredDespesas.map((desp) => (
                <tr key={desp._id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border border-gray-300 text-center">{desp.tipo}</td>
                  <td className="p-2 border border-gray-300 text-center">R$ {desp.valor}</td>
                  <td className="p-2 border border-gray-300 text-center">{desp.data}</td>
                  <td className="p-2 border border-gray-300 text-center">{desp.descricao || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Nenhuma transação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
};