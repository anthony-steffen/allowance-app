const fetchTasks = async () => {
  const apiUrl = "https://allowance-backend-production.up.railway.app/tasks";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Inclua o token de autenticação, se necessário:
        // "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const tasks = await response.json(); // Converte a resposta para JSON
    console.log("Tarefas:", tasks);
    return tasks;
  } catch (error) {
    console.error("Erro ao buscar as tarefas:", error.message);
    return null; // Opcional: retorne um valor padrão em caso de erro
  }
};

// Função para fazer Requisição
const fetchRegister = async (name, email, password) => {
  const apiUrl = "https://allowance-backend-production.up.railway.app/auth/register";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const { token } = await response.json(); // Converte a resposta para JSON
    console.log("Token:", token);
    return token;
  } catch (error) {
    console.error("Erro ao fazer registro:", error.message);
    return null; // Opcional: retorne um valor padrão em caso de erro
  }
}


const fetchLogin = async (email, password) => {
  const apiUrl = "https://allowance-backend-production.up.railway.app/auth/login";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const { token } = await response.json(); // Converte a resposta para JSON
    console.log("Token:", token);
    return token;
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    return null; // Opcional: retorne um valor padrão em caso de erro
  }
};

// Chamar a função para verificar o funcionamento
fetchRegister(" teste", "teste@teste.com", "123456")
fetchLogin("teste@teste.com", "123456");
fetchTasks();

export { fetchRegister, fetchLogin, fetchTasks };