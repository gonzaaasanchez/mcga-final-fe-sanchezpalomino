import { User } from "firebase/auth";

export const userLocalStorageKey = 'user';
export const accessTokenLocalStorageKey = 'accessToken';

export const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key: string): any => {
    const storedData = localStorage.getItem(key);
    try {
        return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
        console.error(`Error parsing data for key ${key}:`, error);
        return null;
    }
};

export const userIsLogged = (): boolean => {
    return userToken().trim().length === 0;
};

export const userToken = (): string => {
    return getFromLocalStorage(accessTokenLocalStorageKey);
};

export const saveUserData = (user: User, token: string): any => {
    saveToLocalStorage(userLocalStorageKey, JSON.stringify(user));
    saveToLocalStorage(accessTokenLocalStorageKey, token);
};


export const cleanUserData = (): any => {
    saveToLocalStorage(userLocalStorageKey, '');
    saveToLocalStorage(accessTokenLocalStorageKey, '');
};