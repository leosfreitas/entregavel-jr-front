import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  createBudget, 
  getBudgets, 
  deleteBudget 
} from "./api/budget";
import { PlusCircle, PencilSimple, Check, X } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Budget = () => {
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [budgets, setBudgets] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editFields, setEditFields] = useState({ tipo: "", valor: "" });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      const budgetsData = await getBudgets();
      setBudgets(budgetsData || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await createBudget(tipo, valor);
      if (response.response.ok) {
        toast.success("Budget criada com sucesso!");
        await refreshData();
        setTipo("");
        setValor("");
      } else {
        toast.error("Erro ao criar budget");
      }
    } catch (error) {
      toast.error("Erro ao criar budget");
    }
  };

  const handleDelete = async (budgetId: string) => {
    try {
      await deleteBudget(budgetId);
      toast.success("Budget deletada com sucesso!");
      await refreshData();
    } catch (err: any) {
      toast.error(err.message || "Erro ao deletar budget");
    }
  };

  // (Opcional) Funções para edição poderiam ser implementadas aqui se necessário.

  return (
    <div className="bg-white p-6 m-6 rounded shadow relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Orçamentos
      </h2>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Meus Orçamentos</h3>
        <ScrollArea className="h-80 border border-gray-300 mb-6">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                {["Tipo", "Valor", "Ações"].map(header => (
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
              {budgets.length > 0 ? (
                budgets.map((bud) => (
                  <tr key={bud._id} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2 border border-gray-300 text-center">{bud.tipo}</td>
                    <td className="p-2 border border-gray-300 text-center">R$ {bud.valor}</td>
                    <td className="p-2 border border-gray-300 text-center">
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(bud._id)}>
                        <X size={16} weight="bold" /> Deletar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    Nenhum orçamento cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
      </section>

      <div className="sticky bottom-0 bg-white p-6 border-t border-gray-300 z-10 flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4 justify-center">
          <div className="flex flex-col min-w-[120px]">
            <label className="font-semibold text-gray-700 mb-1">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="p-2 border rounded w-full"
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
          </div>

          <div className="flex flex-col min-w-[120px]">
            <label className="font-semibold text-gray-700 mb-1">Valor</label>
            <input
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              placeholder="Ex: 250.00"
              className="p-2 border rounded w-full"
            />
          </div>

          <Button type="submit" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            <PlusCircle size={18} weight="bold" />
            Criar Orçamento
          </Button>
        </form>
      </div>
    </div>
  );
};
