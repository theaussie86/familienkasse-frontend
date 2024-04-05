// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchCheckMessage(params: any) {
  try {
    const res = await fetch(`${import.meta.env.VITE_REST_API_URL}/`, {
      headers: { Authorization: `Bearer ${params.meta.token}` },
    });
    const data = await res.text();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch message");
  }
}
