var navEls = document.querySelectorAll(".items");
var planetCont = document.querySelector(".planet-info")

const ApiUrl = 'https://planets-api.vercel.app/api/v1/planets/';
var planetName = "mercury"; 


function getPlanets(){
    window.location.hash = '#' + planetName;

    fetch(ApiUrl + planetName)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    setPlanetsData(data)
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
}

getPlanets();

navEls.forEach(item => {
    item.addEventListener('click',() => {
        navEls.forEach(item1 => {
            let className = item1.children[1].innerText.toLowerCase();
            item1.children[0].classList.remove(className)
        })
        
        var className = item.children[1].innerText.toLowerCase();
        item.children[0].classList.add(className)
   
        planetName = className;
        
        getPlanets();
    })
})

function setPlanetsData(data){
    console.log(data)
    planetCont.innerHTML = ''
    planetCont.innerHTML += ` 
    <div class="top">
    <div class="top-left"> <img src="${data.images.planet}"/> </div>
    <div class="top-right">
      <h1>${data.name}</h1>
      <p>${data.overview.content}</p>
      <p>Source : <a href="${data.overview.source}">Wikipedia</a>  </p> 
      <button class="planet-btn">01 OVERVIEW</button>
      <button class="planet-btn">02 INTERNAL STRUCTURE</button>
      <button class="planet-btn">03 SURFACE GEOLOGY</button>
    </div>
  </div>

  <div class="bottom">
    <div class="box">ROTATION TIME <p>${data.rotation}</p></div>
    <div class="box">REVOLUTION TIME <p>${data.revolution}</p></div>
    <div class="box">RADIUS <p>${data.radius}</p></div>
    <div class="box">AVERAGE TEMP. <p>${data.temperature}</p></div>
  </div>
</div>
`

}

