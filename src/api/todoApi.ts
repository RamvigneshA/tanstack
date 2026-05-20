const getTodo = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }

  return response.json();
};

const getTodos = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
};

const addTodo = async (newTodo) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }

  return response.json();
};

export { getTodo, getTodos, addTodo };