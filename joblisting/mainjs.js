const jobs = document.querySelector("ul");

function getData()
{
    fetch("./data.json").then((response) => response.json()).then((data) => {
        data.forEach((element) => {
            let html = '';
          if (element.new && element.featured)
          {
            html = `<li id="select${element.id}" class="job">
              <div class="job_info">
                <img src="${element.logo}" alt="logo" class="logo"/>
                
                <div class="details">
                  <div class="company_details">
                    <h1 class="company">${element.company}</h1>
                    <div class="company_features">
                      <p class="new">new!</p>
                      <p class="featured"> featured</p>
                    </div>
                  </div>
                  <div class="job_position">
                    <p class="position">${element.position}</p>
                  </div>
                  <div class="job_posting">
                    <p class="posted-at">${element.postedAt}</p>
                    <p class="contract">${element.contract}</p>
                    <p class="location">. ${element.location}</p>
                  </div>
                </div>
              </div>
              <div class="requirements">
                <button class="role">${element.role}</button>
                <button class="level">${element.level}</button>
              </div>
            </li>`;
          }
          else if (element.new && !element.featured)
          {
            html = `<li id="${element.id}" class="job">
            <div class="job_info">
              <img src="${element.logo}" alt="logo" class="logo"/>
              <div class="details">
                <div class="company-details">
                  <h1 class="company">${element.company}</h1>
                  <div class="company_features">
                    <p class="new">new!</p>
                  </div>
                </div>
                <div class="job_position">
                  <p class="position">${element.position}</p>
                </div>
                <div class="job_posting">
                  <p class="posted-at">${element.postedAt}</p>
                  <p class="contract">${element.contract}</p>
                  <p class="location">${element.location}</p>
                </div>
              </div>
            </div>
            <div class="requirements">
              <button class="role">${element.role}</button>
              <button class="level">${element.level}</button>
            </div>
          </li>`;
          }
          else
          {
            html = `<li id="${element.id}" class="job">
            <div class="job_info">
              <img src="${element.logo}" alt="logo" class="logo"/>
              <div class="details">
                <div class="company-details">
                  <h1 class="company">${element.company}</h1>
                </div>
                <div class="job_position">
                  <p class="position">${element.position}</p>
                </div>
                <div class="job_posting">
                  <p class="posted-at">${element.postedAt}</p>
                  <p class="contract">${element.contract}</p>
                  <p class="location">${element.location}</p>
                </div>
              </div>
            </div>
            <div class="requirements">
              <button class="role">${element.role}</button>
              <button class="level">${element.level}</button>
            </div>
          </li>`;
          }
          jobs.innerHTML += html;
          skillsAndTools(element);
        });
    });
}

function skillsAndTools(element) {
    const require = document.querySelectorAll(".requirements");
    let skill, tool;
  
    for (let i = 0; i < element.languages.length; i++)
    {
      skill = document.createElement("button");
      skill.className = "skills";
      skill.textContent = element.languages[i];
  
      require.forEach((element) => {
        element.appendChild(skill);
      });
    }
  
    for (let i = 0; i < element.tools.length; i++) {
      tool = document.createElement("button");
      tool.className = "tools";
      tool.textContent = element.tools[i];
  
      require.forEach((element) => {
        element.appendChild(tool);
      });
    }
  }

  getData();

const filterBox = document.querySelector(".filter_box");
const filterItems = document.querySelector(".filter_items");
let list;

function showFilterItems(e) {
    list = document.createElement("li");
    let closeSearch = document.createElement("img");
    let searchSkill = document.createElement("p");
  
    let skill = e.target;
    let skillValue = e.target.textContent;
  
    if (skill.matches("button")) {
      searchSkill.textContent = skillValue;
      searchSkill.setAttribute("class", "search");
      closeSearch.src = "./images/icon-remove.svg";
      list.appendChild(searchSkill);
      list.appendChild(closeSearch);
  
      filterItems.appendChild(list);
      filterBox.style.display = "flex";
    }
  
    filterJobList();
  }

jobs.addEventListener("click", showFilterItems);

const filterJobList = () => {
  let search = document.querySelectorAll(".search");

  search.forEach((element) => {
    Array.from(jobs.children)
      .filter((bb) => !bb.textContent.includes(element.textContent))
      .forEach((bb) => bb.classList.add("filtered"));
  });
};

function removeSearch(e) {
  try {
    let searchSkill = e.target.parentElement;
    if (e.target.matches("img")) {
      searchSkill.remove();
      let search = document.querySelectorAll(".search");

      search.forEach((element) => {
        Array.from(jobs.children)
          .filter((joblist) => joblist.textContent.includes(element.textContent))
          .forEach((joblist) => joblist.classList.remove("filtered"));
      });
    } else if (e.target.matches("p")) {
      list.remove();
    }
    if (!filterItems.hasChildNodes()) {
      filterBox.style.display = "none";
      Array.from(jobs.children).forEach((joblist) =>
        joblist.classList.remove("filtered")
      );
    }
  } catch (error) {
    console.log("error");
  }
}

filterBox.addEventListener("click", removeSearch);