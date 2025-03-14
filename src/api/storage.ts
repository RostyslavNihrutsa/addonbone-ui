import {throwRuntimeError} from "./runtime";

const storage = chrome.storage
const storageLocal = storage?.local;

export const setToStorage = <T = any, I extends object = { [key: string]: T }>(items: I): Promise<I> => new Promise<I>((resolve, reject) => {
    storageLocal.set(items, () => {
        try {
            throwRuntimeError();

            resolve(items);
        } catch (e) {
            reject(e);
        }
    })
});

export const getFromStorage = <T = any, R = { [key: string]: T }>(keys: string | string[]): Promise<R> => new Promise<R>((resolve, reject) => {
    storageLocal.get(keys, results => {
        try {
            throwRuntimeError();

            resolve(results as R);
        } catch (e) {
            reject(e);
        }
    });
});

export const setValueToStorage = async <T = any>(key: string, value: T): Promise<T> => {
    await setToStorage<T>({[key]: value});

    return value;
}

export const getValueFromStorage = async <T = any, R = T | undefined>(key: string, defaults?: R): Promise<R> => {
    const results = await getFromStorage(key);

    return results[key] || defaults;
}
