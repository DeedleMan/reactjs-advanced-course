import { AUTH_STORAGE_KEY } from "@/shared/api/baseApi";

interface IStorageUser {
  id: string;
  email: string;
}

type TStoredData = { user: IStorageUser; accessToken: string };

export const loadAuthFromStorage = (): TStoredData | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as TStoredData;
    }
  } catch {
    // ex
  }
  return null;
};

export const saveAuthToStorage = (
  user: IStorageUser,
  accessToken: string,
): void =>
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, accessToken }));

export const clearAuthFromStorage = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
