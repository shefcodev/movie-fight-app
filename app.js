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

const onInput = event => {
    fetchData(event.target.value.trim());
};

input.addEventListener("input", debounce(onInput, 1000));