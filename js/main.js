var elMovList = document.querySelector('.movie__list')
var elSel_category = document.querySelector('.sel_category')
var partMovie = movies.slice(0, 100)
var elOfBody = document.querySelector('.offcanvas-body');
function fnRender(data) {
    var locData = JSON.parse(window.localStorage.getItem('localData'))
    elMovList.innerHTML = ''
    data.forEach((item) => {
        var newLI = document.createElement('li')
        newLI.innerHTML = `
        <div class="card" style="width: 18rem; ">
        <img src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title style="color: #fff;">${item.Title.toString().slice(0, 20)}</h5>
            <p class="card-text style="color: #fff;">${item.Categories.toString().slice(0, 15)}</p>
            <p class="card-text style="color: #fff;">${item.movie_year}</p>
            <p class="card-text style="color: #fff;">${item.imdb_rating}</p>
            <div  class="d-flex justify-content-between align-items-center">
            <a  href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank"
            class="btn btn-primary">watch movie</a>
            <i onclick="setId('${item.ytid}')" 
            class="${locData.find((j) => j.ytid == item.ytid) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart text-dark'}"></i>
            </div>
        </div>
        </div>`
            elMovList.appendChild(newLI)
        })
    }
fnRender(partMovie)


function fnYear(value) {
    if (value == 'old') {
        fnRender(partMovie.sort((a, b) => a.movie_year - b.movie_year));
    } else {
        fnRender(partMovie.sort((a, b) => b.movie_year - a.movie_year));
    }
}


function fnRanting(value) {
    if (value == 'min') {
        fnRender(partMovie.sort((a, b) => a.imdb_rating - b.imdb_rating));
    } else {
        fnRender(partMovie.sort((a, b) => b.imdb_rating - a.imdb_rating));
    }
}

var CategoriesArr = []
partMovie.forEach((item) => {
    if (CategoriesArr.includes(item.Categories) == false) {
        CategoriesArr.push(item.Categories)
    }
})
CategoriesArr.sort().forEach((item) => {
    var newOption = document.createElement('option')
    newOption.textContent = item
    newOption.value = item
    elSel_category.appendChild(newOption)
})

function fnCategory(value) {
    fnRender(partMovie.filter((item) => item.Categories == value));
}

function fnSearch(value) {
    value.preventDefault()
    var val = value.target.inpSearch.value
    fnRender(partMovie.filter((item) => item.Title.toString().toLowerCase().includes(val.
        toLowerCase()) == true));
}

var foaArr = []
if (window.localStorage.getItem('localData')) {
    foaArr = JSON.parse(window.localStorage.getItem('localData'))
}
function setId(id) {
    if (window.localStorage.getItem('localData')) {
        foaArr = JSON.parse(window.localStorage.getItem('localData'))
    }
    if (foaArr.find((item) => item.ytid == id)) {
        window.localStorage.setItem('localData', JSON.stringify(foaArr.filter((i) => i.ytid != id)))
    } else {
        foaArr.push(partMovie.find((item) => item.ytid == id));
        window.localStorage.setItem('localData', JSON.stringify(foaArr))
    }
    fnRender(partMovie)

}

function fnLocDataRender() {
    elOfBody.innerHTML = ''
    var foaArr = JSON.parse(window.localStorage.getItem('localData')) || [];
    foaArr.forEach((item) => {
        var newH2 = document.createElement('div');
        newH2.innerHTML = `
        <div class="card d-flex flex-row mb-3" style="width: 22rem;">
        <img src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" class="card-img" alt="...">
        <div class="card-body">
            <h5 class="card-title">${item.Title.toString().slice(0, 20)}</h5>
            <p class="card-text">${item.movie_year}</p>
            <div  class="d-flex justify-content-between align-items-center">
            <a  href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank" 
            class="btn btn-primary">watch movie</a>
            </div>
            <i onclick="setId('${item.ytid}')" 
            onclick="setId()" class="bi bi-x-lg" style="width: 22rem;" ></i>
        </div>
        </div>
        `;
        elOfBody.appendChild(newH2);
    });
}

const input = document.querySelector('input[name="inpSearch"]');
input.addEventListener('focus', function() {
    input.classList.add('focused');
});

input.addEventListener('blur', function() {
    input.classList.remove('focused');
});
