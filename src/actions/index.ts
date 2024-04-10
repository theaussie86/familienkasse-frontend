type Params = {
  meta?: Record<string, unknown>;
};

export async function fetchCheckMessage(params: Params) {
  try {
    const res = await fetch(`${import.meta.env.VITE_REST_API_URL}/`, {
      headers: { Authorization: `Bearer ${params.meta?.token}` },
    });
    const data = await res.text();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch message");
  }
}

export async function fetchTransactions(params: Params) {
  const response = await fetch(
    `${import.meta.env.VITE_REST_API_URL}/transaction/all`,
    {
      headers: { Authorization: `Bearer ${params.meta?.token}` },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
