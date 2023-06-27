window.sr = ScrollReveal();

fetch('/src/js/data.json').then((res) =>{
    res.json().then((res) =>{
        console.log(res);
    }).catch((err) =>{
        console.log(err);
    })
})
const searchBarInpt = document.querySelector('.main__nav__search-bar__inpt');
let countryName;
const main = document.querySelector('.main');
let flagsContainer = document.querySelector('.main__flags-container');

const createCountryContainer = (src, name, population, region, capital, seconds) =>{
    const container = document.createElement('DIV');
    let img = document.createElement('IMG');
    const infoContainer = document.createElement('DIV');
    let cName = document.createElement('H3');
    let cPopulation = document.createElement('DIV');
    let cRegion = document.createElement('DIV');
    let cCapital = document.createElement('P');

    container.classList.add('main__flags-container__country-container');
    img.classList.add('main__flags-container__country-container__img'),
    infoContainer.classList.add('main__flags-container__country-container__info-container');
    cName.classList.add('main__flags-container__country-container__info-container__name');
    cPopulation.classList.add('main__flags-container__country-container__info-container__population');
    cRegion.classList.add('main__flags-container__country-container__info-container__region');
    cCapital.classList.add('main__flags-container__country-container__info-container__capital')

    img.setAttribute('src', src);
    img.setAttribute('alt', name);
    cName.textContent = name;
    cPopulation.innerHTML = `<span class="properties">Population:</span> 
    <p>${population}</p>`;
    cRegion.innerHTML = `<span class="properties">Region:</span>
    <p>${region}</p>`;
    cCapital.innerHTML = `<span class="properties">Capital:</span>
    <p>${capital}</p>`;

    infoContainer.appendChild(cName);
    infoContainer.appendChild(cPopulation);
    infoContainer.appendChild(cRegion);
    infoContainer.appendChild(cCapital);
    container.appendChild(img);
    container.appendChild(infoContainer);
    flagsContainer.appendChild(container);

    // sr.reveal(container, {
    //     delay: seconds,
    // })
}

fetch('/src/js/data.json').then(res =>{
    res.json().then(res =>{
        for (let i = 0; i < res.length; i++){
            createCountryContainer(res[i].flags.png, res[i].name, res[i].population, res[i].region, res[i].capital, i);
        }
    })
})

searchBarInpt.addEventListener('keyup', (evt) =>{
    fetch('/src/js/data.json').then(res =>{
        res.json().then(res =>{
            for (let i = 0; i < res.length; i++){
                if (res[i].name.toLowerCase().startsWith(evt.target.value.toLowerCase())) {
                    flagsContainer.childNodes[i].style.display = 'block';
                } else {
                    flagsContainer.childNodes[i].style.display = 'none';
                }
            }
        })
    })
})

document.querySelector('.main__nav__select__options-container').childNodes.forEach((continent) =>{
    continent.addEventListener('click', (evt) =>{
        fetch('/src/js/data.json').then(res =>{
            res.json().then(res =>{
                for (let i = 0; i < res.length; i++){
                    if (res[i].region.toLowerCase().startsWith(evt.target.innerHTML.toLowerCase())){
                        flagsContainer.childNodes[i].style.display = 'block';
                    } else {
                        flagsContainer.childNodes[i].style.display = 'none';
                    }
                }
            })
        })
    })
})