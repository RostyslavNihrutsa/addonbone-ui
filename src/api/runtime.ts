const runtime = chrome.runtime;

export const throwRuntimeError = () => {
    const error = runtime.lastError;

    if (error) {
        throw new Error(error.message);
    }
}
