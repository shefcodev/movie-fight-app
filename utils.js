// project utility functions;

const debounce = (callbackFunc, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
       }
        timeoutId = setTimeout(() => {
            removeMovies(document.querySelectorAll(".movie"));
            callbackFunc.call(null, ...args);
            // callbackFunc.apply(null, args);
        }, delay);
    };
};

const removeMovies = (movieList) => {
    if (movieList.length) {
        movieList.forEach((movie) => {
            movie.remove();
        })
    }
} // by Contr by Shefcodev;