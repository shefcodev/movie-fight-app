// project javascript file!;

"use strict";

const createAutoComplete = ({ root, 
   renderOption, 
   onOptionSelect, 
   inputValue, 
   fetchData 
}) => {
   root.innerHTML = `
      <label><b>Search</b></label>
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
      const dataRes = await fetchData(event.target.value.trim()); 

      if (!dataRes.length) {
         dropdown.classList.remove("is-active");
         return;
      }

      dropdown.classList.add("is-active");
      resultsWrapper.innerHTML = ``;

      dataRes.forEach((data) => {
         const movieOption = document.createElement("a");

         movieOption.classList.add("movie", "dropdown-item"); 
         movieOption.innerHTML = renderOption(data);

         movieOption.addEventListener("click", () => {
            dropdown.classList.remove("is-active"); 
            input.value = inputValue(data);
            onOptionSelect(data); 
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