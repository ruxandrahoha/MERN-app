import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { apiFetch } from "../api";

export default function useRegister() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await apiFetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}
