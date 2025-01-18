import { config } from "@/config/config";

export async function createDespesa(
  tipo: string,
  valor: string,
  data: string,
  descricao: string
): Promise<{ response: Response; responseData: any }> {
  const { apiBaseUrl } = config;
  const requestRoute = "/user/create-despesa";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tipo,
      valor,
      data,
      descricao,
    }),
    credentials: "include" as RequestCredentials,
  };

  const response = await fetch(apiBaseUrl + requestRoute, options);

  if (!response.ok) {
    throw new Error("Erro ao criar despesa");
  }

  const responseData = await response.json();
  console.log("Despesa criada com sucesso:", responseData);

  return { response, responseData };
}

export async function getDespesas(): Promise<any[]> {
  const { apiBaseUrl } = config;
  const requestRoute = "/user/get-despesas";

  const options = {
    method: "GET",
    credentials: "include" as RequestCredentials,
  };

  const response = await fetch(apiBaseUrl + requestRoute, options);

  if (!response.ok) {
    throw new Error("Erro ao obter despesas");
  }

  const data = await response.json();
  console.log("Despesas obtidas com sucesso:", data);

  return data;
}

export async function deleteDespesa(despesaId: string) {
  const { apiBaseUrl } = config;
  const requestRoute = `/user/delete-despesa/${despesaId}`;

  const options = {
    method: "DELETE",
    credentials: "include" as RequestCredentials, 
  };

  const response = await fetch(apiBaseUrl + requestRoute, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao deletar a despesa");
  }

  const data = await response.json();
  return data; 
}
