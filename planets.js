var navEls = document.querySelectorAll(".items");  //navbar elementebi
var navElsMob = document.querySelectorAll(".items-mob");  //navbar elementebi teleponis versiaze
var navMenu = document.querySelector('.right-mobile')//nav-menu teleponis
var planetCont = document.querySelector(".planet-info") //planetebis div-i
var burgerMenu = document.querySelector(".right-burger") //burger menu

const apiBaseUrl = 'https://planets-api.vercel.app/api/v1/planets/'; //api ritic vukavshirdebit backend-s
var planetName = "mercury";  //navbaridan li-s klikze aq icvleba mnishvneloba
var filteredData = new Object(); //data saidanac gamogvaq planetebis informacia html-shi


function getPlanets(){        //miviget planetebic informacia
    fetch(apiBaseUrl + planetName)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data)
    filteredData = data;
    getHtml('overview')
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
}

getPlanets();

navEls.forEach(el => {                    //navbaris klikze gaeshveba es rata magla daados line
  el.addEventListener('click',() => {
        navEls.forEach(item => {
            let className = item.children[1].innerText.toLowerCase();
            item.children[0].classList.remove(className)
        })
        
        var className = el.children[1].innerText.toLowerCase();
        el.children[0].classList.add(className)
   
        planetName = className;
        
        getPlanets();
    })
})

function handleButtonClick(event) {           //planetis gverdit sami gilaki roa magat klikze gaeshveba es rata shecvalos descriptioni
  const activeColor = filteredData.color || 'transparent';
  var type = 'overview'

  document.documentElement.style.setProperty('--active-color', activeColor);

  let button = event.target;
  console.log(button)
  if(button.innerText.includes('OVERVIEW')){
    type = 'overview'
    activeO = 'active-planet'
    activeS = ''
    activeG = ''
  }else if (button.innerText.includes('STRUCTURE')){
    type = 'structure'
    activeS = 'active-planet'
    activeO = ''
    activeG = ''
  }else{
    type ='geology'
    activeG= 'active-planet'
    activeS = ''
    activeO = ''
  }

  getHtml(type,activeO,activeS,activeG)
}


function getHtml(type,activeO,activeS,activeG){  // aq miviget damushavebuli html-i saidanac gamodis planetebis informacia

  planetCont.innerHTML = `
  <div class="mobile-btns"><button class="planet-btn-top ${activeO}" onclick="handleButtonClick(event)"><h1>OVERVIEW</h1></button>
  <button class="planet-btn-top ${activeS}" onclick="handleButtonClick(event)"><h1>STRUCTURE</h1></button>
  <button class="planet-btn-top ${activeG}" onclick="handleButtonClick(event)"><h1>SURFACE </h1></button></div>
    <div class="top">
      <div class="top-left"> <img class="planet-img" src="${filteredData.images.planet}" /> </div>
      <div class="top-right">
        <h1 class="planet-name">${filteredData.name}</h1>
        <p class="planet-desc">${filteredData[type].content}</p>
        <p class="planet-wiki">Source : <a href="${filteredData[type].source}">Wikipedia</a>  </p> 
        <button class="planet-btn ${activeO}" onclick="handleButtonClick(event)"><p>01</p> <h1>OVERVIEW</h1></button>
        <button class="planet-btn ${activeS}" onclick="handleButtonClick(event)">  <p>02</p> <h1>INTERNAL STRUCTURE</h1></button>
        <button class="planet-btn ${activeG}" onclick="handleButtonClick(event)">  <p>03</p> <h1>SURFACE GEOLOGY</h1></button>
      </div>
    </div>

    <div class="bottom">
      <div class="box"><p>ROTATION TIME</p> <p>${filteredData.rotation}</p></div>
      <div class="box"><p>REVOLUTION TIME</p> <p>${filteredData.revolution}</p></div>
      <div class="box"><p>RADIUS</p> <p>${filteredData.radius}</p></div>
      <div class="box"><p>AVERAGE TEMP.</p> <p>${filteredData.temperature}</p></div>
    </div>
  </div>
  `;

 
}



burgerMenu.addEventListener('click',() => { //navmenus gaxsna/daxurva
  if(  navMenu.style.display == 'flex'  ){
    navMenu.style.display = 'none'
    planetCont.style.display = 'flex'
  }else{
    navMenu.style.display = 'flex'
    planetCont.style.display = 'none'
  }
})

navElsMob.forEach(el => {
  el.addEventListener('click',() => { //mobail navmenu-dan sxva planetis naxva daklikebaze
    var className = el.children[1].innerText.toLowerCase();
    el.children[0].classList.add(className)

    planetName = className;
    navMenu.style.display = 'none'
    planetCont.style.display = 'flex'

    getPlanets();
  })
})


