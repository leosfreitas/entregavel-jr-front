import { config } from "@/config/config";

export async function createFinance(
  categoria: string,
  tipo: string,
  valor: string,
  data: string,
  descricao: string
): Promise<{ response: Response; responseData: any }> {
  const { apiBaseUrl } = config;
  const requestRoute = "/user/create-finance";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoria,
      tipo,
      valor,
      data,
      descricao,
    }),
    credentials: "include" as RequestCredentials,
  };

  const response = await fetch(apiBaseUrl + requestRoute, options);

  if (!response.ok) {
    throw new Error("Erro ao criar finance");
  }

  const responseData = await response.json();
  console.log("finance criada com sucesso:", responseData);

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
  console.log("despesas obtidas com sucesso:", data);

  return data;
}

export async function getReceitas(): Promise<any[]> {
  const { apiBaseUrl } = config;
  const requestRoute = "/user/get-receitas";

  const options = {
    method: "GET",
    credentials: "include" as RequestCredentials,
  };

  const response = await fetch(apiBaseUrl + requestRoute, options);

  if (!response.ok) {
    throw new Error("Erro ao obter receitas");
  }

  const data = await response.json();
  console.log("receitas obtidas com sucesso:", data);

  return data;
}


export async function deleteFinance(financeId: string) {
  const { apiBaseUrl } = config;
  const requestRoute = `/user/delete-finance/${financeId}`;

  const options = {
    method: "DELETE",
    credentials: "include" as RequestCredentials, 
  };

  const response = await fetch(apiBaseUrl + requestRoute, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao deletar a finance");
  }

  const data = await response.json();
  return data; 
}

export async function editFinance(
  financeId: string,
  categoria: string,
  tipo: string,
  valor: string,
  data: string,
  descricao: string
): Promise<{ response: Response; responseData: any }> {
  const { apiBaseUrl } = config;
  const requestRoute = `/user/edit-finance/${financeId}`;

  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoria,
      tipo,
      valor,
      data,
      descricao,
    }),
    credentials: "include" as RequestCredentials,
  };

  let response = await fetch(apiBaseUrl + requestRoute, options);

  if (!response.ok) {
    let errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao editar a finance");
  }

  let responseData = await response.json();
  console.log("finance editada com sucesso:", responseData);

  return { response, responseData };
}
