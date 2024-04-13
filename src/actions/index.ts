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
  return response.json();
}

export async function deleteTransaction(variables: {
  _id: string;
  idToken?: string | null;
}) {
  const { idToken, _id } = variables;
  const response = await fetch(
    `${import.meta.env.VITE_REST_API_URL}/transaction/${_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function updateTransaction(variables: {
  _id: string;
  data: Partial<Transaction>;
  idToken?: string | null;
}) {
  const { idToken, _id, data: updates } = variables;
  const response = await fetch(
    `${import.meta.env.VITE_REST_API_URL}/transaction/${_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(updates),
    }
  );
  const data = await response.json();
  return data;
}
