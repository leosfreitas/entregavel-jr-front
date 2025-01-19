import { config } from "@/config/config";

export async function createBudget(
  tipo: string,
  valor: string
): Promise<{ response: Response; responseData: any }> {
  const { apiBaseUrl } = config;
  const requestRoute = "/user/create-budget";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tipo, valor }),
    credentials: "include" as RequestCredentials,
  };

  const response = await fetch(apiBaseUrl + requestRoute, options);
  if (!response.ok) {
    throw new Error("Erro ao criar budget");
  }
  const responseData = await response.json();
  console.log("Budget criada com sucesso:", responseData);
  return { response, responseData };
}

export async function getBudgets(): Promise<any[]> {
  const { apiBaseUrl } = config;
  const requestRoute = "/user/get-budgets";  

  const options = {
    method: "GET",
    credentials: "include" as RequestCredentials,
  };

  const response = await fetch(apiBaseUrl + requestRoute, options);
  if (!response.ok) {
    throw new Error("Erro ao obter budgets");
  }
  const data = await response.json();
  console.log("Budgets obtidos com sucesso:", data);
  return data;
}

export async function deleteBudget(budgetId: string) {
  const { apiBaseUrl } = config;
  const requestRoute = `/user/delete-budget/${budgetId}`;

  const options = {
    method: "DELETE",
    credentials: "include" as RequestCredentials,
  };

  const response = await fetch(apiBaseUrl + requestRoute, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao deletar budget");
  }
  const data = await response.json();
  return data;
}
