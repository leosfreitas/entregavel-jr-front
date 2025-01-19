import React, { useState, useEffect } from "react";
import { getUserData, updateUserData } from "./api/profile";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
    }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await getUserData();
      setUserData(data.data);
      setName(data.data.name);
      setEmail(data.data.email);
      setCpf(data.data.cpf);
      setPhone(data.data.phone);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar os dados do perfil.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserData(name, email, cpf, phone);
      toast.success("Dados atualizados com sucesso!");
      fetchUserData();
      setIsEditing(false);
    } catch (error) {
      toast.error("Erro ao atualizar os dados.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex justify-center pt-12 pb-12">
        <h1 className="text-2xl font-bold text-gray-800">Perfil</h1>
      </div>

      <div className="flex items-start justify-center">
        <div className="relative min-h-[500px] p-8 bg-white shadow-xl rounded-sm w-2/3 mx-auto">
        <h3 className="text-xl font-semibold mb-8 text-black">Meu Perfil</h3>
          {userData ? (
            isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                    CPF
                  </label>
                  <input
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="absolute bottom-4 right-4 flex gap-4">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                        Salvar
                    </button>
                    </div>
              </form>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <p className="mt-1 px-4 py-2 rounded-md bg-gray-100 text-sm text-gray-800">
                    {name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 px-4 py-2 rounded-md bg-gray-100 text-sm text-gray-800">
                    {email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CPF
                  </label>
                  <p className="mt-1 px-4 py-2 rounded-md bg-gray-100 text-sm text-gray-800">
                    {cpf}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Telefone
                  </label>
                  <p className="mt-1 px-4 py-2 rounded-md bg-gray-100 text-sm text-gray-800">
                    {phone}
                  </p>
                </div>
              </div>
            )
          ) : (
            <p className="text-center text-gray-600">Carregando dados do perfil...</p>
          )}
          {!isEditing && (
            <div className="absolute bottom-4 right-4 flex gap-4">
                <button
                type="button"
                onClick={() => navigate("/user/auth/pwd/recovery/email")}
                className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                    Mudar Senha
                </button>
                <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                Editar
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
