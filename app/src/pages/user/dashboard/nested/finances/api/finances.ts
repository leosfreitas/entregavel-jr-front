import { config } from "@/config/config";

export async function createDespesa(tipo: string, valor: string, data: string, descricao: string): Promise<{ response: Response, responseData: any }> {
    let { apiBaseUrl } = config;
    let requestRoute = '/user/create-despesa'; 
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tipo: tipo,
            valor: valor,
            data: data,
            descricao: descricao,
        }),
        credentials: 'include' as RequestCredentials,  
    };

    let response = await fetch(apiBaseUrl + requestRoute, options);

    if (!response.ok) {
        throw new Error('Erro ao criar despesa');
    }

    let responseData = await response.json();
    console.log('Despesa criada com sucesso:', responseData);

    return { response, responseData };
}
