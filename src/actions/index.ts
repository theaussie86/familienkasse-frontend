import { Transaction } from "../types";

export type ContextType = {
  meta?: Record<string, unknown>;
};

export async function fetchCheckMessage(params: ContextType) {
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

export async function fetchTransactions(params: ContextType) {
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

export async function createTransaction(
  variables: Omit<Transaction, "_id"> & { idToken?: string | null }
) {
  const { idToken, ...params } = variables;
  const response = await fetch(
    `${import.meta.env.VITE_REST_API_URL}/transaction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(params),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
