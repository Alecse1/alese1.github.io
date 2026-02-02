const button = document.getElementById("btn");
const title = document.getElementById("title");

button.addEventListener("click", () => {
  title.textContent = "You clicked the button 😄";
});
