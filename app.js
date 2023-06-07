// project javascript file;

const fetchData = async (query) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "2269a1a6",
            s: query,
        }
    });
    return response.data.Search;
};

const input = document.getElementById("input");

const onInput = async event => {
    const movies = await fetchData(event.target.value.trim());

    movies.forEach((movie) => {
        const div = document.createElement("div");
        div.className = "movie";
        div.innerHTML = `
            <img src = "${movie.Poster}" />
            <h1>${movie.Title}</h1>
        `;
        document.getElementById("target").appendChild(div);
    });
};

input.addEventListener("input", debounce(onInput, 1000)); 