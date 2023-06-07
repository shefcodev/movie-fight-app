// project javascript file;

const fetchData = async (query) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "2269a1a6",
            s: query,
        }
    });
    console.log(response.data);
};

const input = document.getElementById("input");

const debounce = (callbackFunc, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callbackFunc.apply(null, args);
        }, delay);
    };
};

const onInput = event => {
    fetchData(event.target.value.trim());
};

input.addEventListener("input", debounce(onInput, 1000));