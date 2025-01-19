import React, { useState, useEffect } from "react";
import { getUserData, updateUserData } from "./api/profile";
import toast from "react-hot-toast";

export const Profile = () => {
  const [appraiserData, setAppraiserData] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAppraiserData();
  }, []);

  const fetchAppraiserData = async () => {
    try {
      const data = await getUserData();
      setAppraiserData(data.data);
      setName(data.data.name);
      setEmail(data.data.email);
      setCpf(data.data.cpf);
      setPhone(data.data.phone);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar os dados do perfil");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateUserData(name, email, cpf, phone);
      if (response.response.ok) {
        toast.success("Dados atualizados com sucesso!");
        fetchAppraiserData();
        setIsEditing(false);
      } else {
        toast.error("Erro ao atualizar os dados");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao atualizar os dados");
    }
  };

  return (
    <div className="bg-white p-6 m-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Perfil do Avaliador</h2>
      {appraiserData ? (
        isEditing ? (
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">CPF</label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className="p-2 border rounded bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Telefone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 border rounded bg-white"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => window.location.href = "/user/auth/pwd/recovery/email"}
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
              >
                Mudar Senha
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <strong>Nome:</strong> {name}
            </div>
            <div>
              <strong>Email:</strong> {email}
            </div>
            <div>
              <strong>CPF:</strong> {cpf}
            </div>
            <div>
              <strong>Telefone:</strong> {phone}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Editar
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => window.location.href = "/user/auth/pwd/recovery/email"}
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
              >
                Mudar Senha
              </button>
            </div>
          </div>
        )
      ) : (
        <p>Carregando dados do perfil...</p>
      )}
    </div>
  );
};
