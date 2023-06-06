// project javascript file;

const fetchData = async (query) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "2269a1a6",
            s: query,
        }
    });
    console.log(response.data);
}

const input = document.getElementById("input");

let timeoutId;
const onInput = event => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value.trim());
    }, 1000)
}

input.addEventListener("input", onInput) 