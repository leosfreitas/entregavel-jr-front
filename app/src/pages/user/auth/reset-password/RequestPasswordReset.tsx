import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { requestPasswordReset } from './api/RequestPasswordReset';

export const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await requestPasswordReset(email);
      toast.success('Link de redefinição de senha enviado com sucesso.');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao solicitar redefinição de senha.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Redefinição de Senha
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu email"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-[#3c50e0] px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Enviar Link
          </button>
            <p className="mt-6 text-center text-sm text-gray-600">
            Lembrou da senha?{' '}
            <a href="/user/auth/login" className="font-medium text-[#3c50e0] hover:underline">
              Faça login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
