const toggleBtn = document.querySelector(".toggle_btn");
const toggle = document.querySelector(".toggle");
const basicPrice = document.querySelector(".basic_price");
const profPrice = document.querySelector(".professional_price");
const masterPrice = document.querySelector(".master_price");

toggle.addEventListener ("click", function (e){
    e.preventDefault();
    if(toggle.classList.contains("monthly"))
    {
        toggle.classList.remove("monthly");
        toggle.classList.add("Annually")
        basicPrice.innerHTML = `<p class="basic_price"><span>&dollar;</span>199.99</p>`;
        profPrice.innerHTML = `  <p class="professional_price"> <span>&dollar;</span>249.99</p>`;
        masterPrice.innerHTML = `  <p class="master_price"> <span>&dollar;</span>399.99</p>`;
    }
    else
    {
        toggle.classList.add("monthly");
        toggle.classList.remove("anually");
        basicPrice.innerHTML = `<p class="basic_price"> <span>&dollar;</span>19.99</p>`;
        profPrice.innerHTML = `  <p class="professional_price"> <span>&dollar;</span>24.99</p>`;
        masterPrice.innerHTML = `  <p class="master_price"> <span>&dollar;</span>39.99</p>`;
    }
})