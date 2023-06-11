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

    if (!movies.length) {
        dropdown.classList.remove("is-active");
        return;
    }

    dropdown.classList.add("is-active");
    resultsWrapper.innerHTML = ``;

    movies.forEach((movie) => {
        const movieOption = document.createElement("a");
        const imgSRC = (movie.Poster === "N/A") ? "" : movie.Poster;

        movieOption.classList.add("movie", "dropdown-item");
        movieOption.innerHTML = `
            <img src = "${imgSRC}" />
            ${movie.Title}
        `;

        movieOption.addEventListener("click", () => {
            dropdown.classList.remove("is-active"); 
            input.value = movie.Title;
            const { imdbID: reqId } = movie;
            onMovieSelect(reqId);
        })
        resultsWrapper.appendChild(movieOption);
    });
};
 
input.addEventListener("input", debounce(onInput, 1000));  

document.addEventListener("click", event => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove("is-active");
    } 
})

const onMovieSelect = async reqId => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "2269a1a6",
            i: reqId,
        }
    })
    document.querySelector("#summary").innerHTML = movieTemplate(response.data);
}

const movieTemplate = movieDetail => {
    return `
        <article class = "media">
            <figure class = "media-left">
                <p class = "image">
                    <img src = "${movieDetail.Poster}" />
                </p>
            </figure>
            <div class = "media-content'>
                <div class = "content'>
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
    `;
}