// project javascript file;

const fetchData = async (query) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "2269a1a6",
            s: query,
        }
    });
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input id = "input" class = "input" />
    <div class = "dropdown">
        <div class = "dropdown-menu">
            <div class = "dropdown-content results"></div>
        </div>
    </div>
`;

const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");
const input = document.getElementById("input");

const onInput = async event => {
    const movies = await fetchData(event.target.value.trim());  
    dropdown.classList.add("is-active");

    movies.forEach((movie) => {
        const movieOption = document.createElement("a");
        
        movieOption.classList.add("movie", "dropdown-item");
        movieOption.innerHTML = `
            <img src = "${movie.Poster}" />
            ${movie.Title}
        `;
        
        resultsWrapper.appendChild(movieOption);
    });
};

input.addEventListener("input", debounce(onInput, 1000));  