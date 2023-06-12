// project javascript file!;

"use strict";

const createAutoComplete = ({ root, }) => {
    root.innerHTML = `
        <label><b>Search for a Movie</b></label>
        <input class = "input" />
        <div class = "dropdown">
            <div class = "dropdown-menu">
                <div class = "dropdown-content results"></div>
            </div>
        </div>
    `;

    const dropdown = root.querySelector(".dropdown");
    const resultsWrapper = root.querySelector(".results");
    const input = root.querySelector(".input");

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
                onMovieSelect(movie);
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
}