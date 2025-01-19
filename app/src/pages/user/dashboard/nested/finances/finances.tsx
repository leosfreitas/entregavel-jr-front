import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { 
  createFinance, 
  getDespesas, 
  getReceitas, 
  deleteFinance, 
  editFinance 
} from "./api/finances";
import { CurrencyDollar, PlusCircle, PencilSimple, Check, X } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Finances = () => {
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  const [despesas, setDespesas] = useState<any[]>([]);
  const [receitas, setReceitas] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editFields, setEditFields] = useState({
    categoria: "",
    tipo: "",
    valor: "",
    data: "",
    descricao: "",
  });

  // Arrays de opções para Receita e Despesa
  const receitaOptions = [
    "Salário",
    "Bonificações",
    "Comissões",
    "Dividendos",
    "Juros",
    "Rendimentos",
    "Freelance",
    "Lucro de Vendas",
    "Aposentadoria",
    "Pensão",
    "Investimentos"
  ];

  const despesaOptions = [
    "Habitação",
    "Transporte",
    "Alimentação",
    "Saúde",
    "Educação",
    "Lazer",
    "Roupas",
    "Tecnologia",
    "Assinaturas e Serviços",
    "Investimentos",
    "Doações",
    "Impostos",
    "Dívidas",
    "Outros"
  ];

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      const despesasData = await getDespesas();
      setDespesas(despesasData || []);
      const receitasData = await getReceitas();
      setReceitas(receitasData || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await createFinance(categoria, tipo, valor, data, descricao);
      if (response.response.ok) {
        toast.success("Finance criada com sucesso!");
        await refreshData();
        setTipo("");
        setValor("");
        setData("");
        setDescricao("");
      } else {
        toast.error("Erro ao criar finance");
      }
    } catch (error) {
      toast.error("Erro ao criar finance");
    }
  };

  const handleDelete = async (financeId: string) => {
    try {
      await deleteFinance(financeId);
      toast.success("Finance deletada com sucesso!");
      await refreshData();
    } catch (err: any) {
      toast.error(err.message || "Erro ao deletar finance");
    }
  };

  const handleEdit = (finance: any) => {
    setEditing(finance._id);
    setEditFields({
      categoria: finance.categoria,
      tipo: finance.tipo,
      valor: finance.valor,
      data: finance.data,
      descricao: finance.descricao || "",
    });
  };

  const handleEditCancel = () => {
    setEditing(null);
    setEditFields({ categoria: "", tipo: "", valor: "", data: "", descricao: "" });
  };

  const handleEditSave = async () => {
    try {
      await editFinance(
        editing!, 
        editFields.categoria, 
        editFields.tipo, 
        editFields.valor, 
        editFields.data, 
        editFields.descricao
      );
      toast.success("Finance editada com sucesso!");
      setEditing(null);
      await refreshData();
    } catch (err: any) {
      toast.error(err.message || "Erro ao editar finance");
    }
  };

  const handleEditChange = (field: string, value: string) => {
    setEditFields({ ...editFields, [field]: value });
  };

  return (
    <div className="bg-white p-6 m-6 rounded shadow relative">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-gray-800">
        <CurrencyDollar size={28} weight="bold" />
        Despesas e Receitas
      </h2>

      {/* Tabela de despesas */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Minhas Despesas</h3>
        <ScrollArea className="h-80 border border-gray-300 mb-6">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                {["Tipo", "Valor", "Data", "Descrição", "Ações"].map(header => (
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
              {despesas.length > 0 ? (
                despesas.map((desp) => (
                  <tr key={desp._id} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2 border border-gray-300 text-center">
                      {editing === desp._id ? (
                        <input 
                          className="w-full p-1 border rounded text-center"
                          value={editFields.tipo}
                          onChange={(e) => handleEditChange("tipo", e.target.value)}
                        />
                      ) : (
                        desp.tipo
                      )}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {editing === desp._id ? (
                        <input 
                          className="w-full p-1 border rounded text-center"
                          value={editFields.valor}
                          onChange={(e) => handleEditChange("valor", e.target.value)}
                        />
                      ) : (
                        `R$ ${desp.valor}`
                      )}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {editing === desp._id ? (
                        <input 
                          type="date"
                          className="w-full p-1 border rounded text-center"
                          value={editFields.data}
                          onChange={(e) => handleEditChange("data", e.target.value)}
                        />
                      ) : (
                        desp.data
                      )}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {editing === desp._id ? (
                        <input 
                          className="w-full p-1 border rounded text-center"
                          value={editFields.descricao}
                          onChange={(e) => handleEditChange("descricao", e.target.value)}
                        />
                      ) : (
                        desp.descricao || "-"
                      )}
                    </td>
                    <td className="p-2 border border-gray-300 flex gap-2 justify-center">
                      {editing === desp._id ? (
                        <>
                          <Button variant="default" size="sm" onClick={handleEditSave}>
                            <Check size={16} weight="bold" /> Salvar
                          </Button>
                          <Button variant="secondary" size="sm" onClick={handleEditCancel}>
                            <X size={16} weight="bold" /> Cancelar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="default" size="sm" onClick={() => handleEdit(desp)}>
                            <PencilSimple size={16} weight="bold" /> Editar
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(desp._id)}>
                            <X size={16} weight="bold" /> Deletar
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    Nenhuma despesa cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
      </section>

      {/* Tabela de receitas */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Minhas Receitas</h3>
        <ScrollArea className="h-80 border border-gray-300 mb-6">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                {["Tipo", "Valor", "Data", "Descrição", "Ações"].map(header => (
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
              {receitas.length > 0 ? (
                receitas.map((rec) => (
                  <tr key={rec._id} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2 border border-gray-300 text-center">
                      {editing === rec._id ? (
                        <input 
                          className="w-full p-1 border rounded text-center"
                          value={editFields.tipo}
                          onChange={(e) => handleEditChange("tipo", e.target.value)}
                        />
                      ) : (
                        rec.tipo
                      )}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {editing === rec._id ? (
                        <input 
                          className="w-full p-1 border rounded text-center"
                          value={editFields.valor}
                          onChange={(e) => handleEditChange("valor", e.target.value)}
                        />
                      ) : (
                        `R$ ${rec.valor}`
                      )}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {editing === rec._id ? (
                        <input 
                          type="date"
                          className="w-full p-1 border rounded text-center"
                          value={editFields.data}
                          onChange={(e) => handleEditChange("data", e.target.value)}
                        />
                      ) : (
                        rec.data
                      )}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {editing === rec._id ? (
                        <input 
                          className="w-full p-1 border rounded text-center"
                          value={editFields.descricao}
                          onChange={(e) => handleEditChange("descricao", e.target.value)}
                        />
                      ) : (
                        rec.descricao || "-"
                      )}
                    </td>
                    <td className="p-2 border border-gray-300 flex gap-2 justify-center">
                      {editing === rec._id ? (
                        <>
                          <Button variant="default" size="sm" onClick={handleEditSave}>
                            <Check size={16} weight="bold" /> Salvar
                          </Button>
                          <Button variant="secondary" size="sm" onClick={handleEditCancel}>
                            <X size={16} weight="bold" /> Cancelar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="default" size="sm" onClick={() => handleEdit(rec)}>
                            <PencilSimple size={16} weight="bold" /> Editar
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(rec._id)}>
                            <X size={16} weight="bold" /> Deletar
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    Nenhuma receita cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
      </section>

      {/* Formulário fixo para criar finance */}
      <div className="sticky bottom-0 bg-white p-6 border-t border-gray-300 z-10 flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4 justify-center">
          <div className="flex flex-col min-w-[120px]">
            <label className="font-semibold text-gray-700 mb-1">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              className="p-2 border rounded w-full"
            >
              <option value="">Selecione</option>
              <option value="Despesa">Despesa</option>
              <option value="Receita">Receita</option>
            </select>
          </div>

          <div className="flex flex-col min-w-[120px]">
            <label className="font-semibold text-gray-700 mb-1">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="p-2 border rounded w-full"
            >
              <option value="">Selecione</option>
              {categoria === "Receita" &&
                receitaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              }
              {categoria === "Despesa" &&
                despesaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              }
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

          <div className="flex flex-col min-w-[120px]">
            <label className="font-semibold text-gray-700 mb-1">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="flex flex-col min-w-[120px]">
            <label className="font-semibold text-gray-700 mb-1">Descrição</label>
            <input
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Compra de mercado"
              className="p-2 border rounded w-full"
            />
          </div>

          <Button 
            type="submit" 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            <PlusCircle size={18} weight="bold" />
            Criar {categoria || "Finance"}
          </Button>
        </form>
      </div>
    </div>
  );
};
