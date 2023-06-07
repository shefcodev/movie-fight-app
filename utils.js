// project utility functions;

const debounce = (callbackFunc, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callbackFunc.call(null, ...args);
            // callbackFunc.apply(null, args);
        }, delay);
    };
};