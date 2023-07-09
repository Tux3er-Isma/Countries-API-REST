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
const nav = document.querySelector('.main__nav');
let flagsContainer = document.querySelector('.main__flags-container');

const createCountryInformationPage = (src, name, native, population, region, subRegion, capital, topLevelDomain, currencies, langArr, borderArr) =>{
    const container = document.createElement('DIV');
    const dataContainer = document.createElement('DIV');
    let img = document.createElement('IMG');
    const infoContainer = document.createElement('DIV');
    let title = document.createElement('H2');
    let nN = document.createElement('P');
    let p = document.createElement('P');
    let r = document.createElement('P');
    let sR = document.createElement('P');
    let c = document.createElement('P');
    let tLD = document.createElement('P');
    let curr = document.createElement('P');
    let l = document.createElement('P');
    let border = document.createElement('DIV');
    let borderSpan = document.createElement('SPAN');

    container.classList.add('main__country');
    img.classList.add('main__country__img');
    dataContainer.classList.add('main__country__data-container')
    infoContainer.classList.add('main__country__data-container__info-container');
    title.classList.add('main__country__data-container__title');
    nN.classList.add('main__country__data-container__info-container__native-name');
    p.classList.add('main__country__data-container__info-container__population');
    r.classList.add('main__country__data-container__info-container__region');
    sR.classList.add('main__country__data-container__info-container__sub-region');
    c.classList.add('main__country__data-container__info-container__capital');
    tLD.classList.add('main__country__data-container__info-container__top-level-domain');
    curr.classList.add('main__country__data-container__info-container__currencies');
    l.classList.add('main__country__data-container__info-container__lang');
    border.classList.add('main__country__data-container__border');
    borderSpan.classList.add('properties');
    borderSpan.classList.add('main__country__data-container__border__span')

    img.setAttribute('src', src);
    img.setAttribute('alt', name);
    title.textContent = name;
    nN.innerHTML = `<span class="properties">Native Name:</span> 
    <p>${native}</p>`;
    p.innerHTML = `<span class="properties">Population:</span> 
    <p>${population}</p>`;
    r.innerHTML = `<span class="properties">Region:</span> 
    <p>${region}</p>`;
    sR.innerHTML = `<span class="properties">Sub Region:</span> 
    <p>${subRegion}</p>`;
    c.innerHTML = `<span class="properties">Capital:</span> 
    <p>${capital}</p>`;
    tLD.innerHTML = `<span class="properties">Top Level Domain:</span> 
    <p>${topLevelDomain}</p>`;
    curr.innerHTML = `<span class="properties">Currencies:</span> 
    <p>${currencies}</p>`;
    let arr = [];
    langArr.map((lan) =>{
        arr.push(lan.name);
    })
    l.innerHTML = `<span class="properties">Languages: </span> 
    ${arr.join(', ')}
    `
    borderSpan.textContent = "Border Countries:";
    border.appendChild(borderSpan);



    if (borderArr != undefined){
        borderArr.forEach((element) =>{
            const borderContainer = document.createElement('DIV');
            borderContainer.classList.add('main__country__data-container__border__border-container');
            borderContainer.innerHTML = element;
            border.appendChild(borderContainer);
        })
    } else {
        borderSpan.innerHTML = "There aren't border countries"
    }

    infoContainer.appendChild(nN);
    infoContainer.appendChild(p);
    infoContainer.appendChild(r);
    infoContainer.appendChild(sR);
    infoContainer.appendChild(c);
    infoContainer.appendChild(tLD);
    infoContainer.appendChild(curr);
    infoContainer.appendChild(l);
    dataContainer.appendChild(title);
    dataContainer.appendChild(infoContainer);
    dataContainer.appendChild(border)
    container.appendChild(img);
    container.appendChild(dataContainer);
    main.appendChild(container);

    infoContainer.childNodes.forEach(element =>{
        element.style.display = 'flex';
        element.style.marginBottom = '5px';
    })

    window.addEventListener('popstate', (evt)  =>{
        console.log(evt);
        if (evt.state == null){
            main.childNodes[main.childNodes.length - 1].style.display = 'none';
            document.querySelector('.main__flags-container').style.display = 'flex';
            document.querySelector('.main__nav').style.display = 'flex';
        } else {
            main.childNodes[main.childNodes.length - 1].style.display = 'flex';
            flagsContainer.style.display = 'none';
            document.querySelector('.main__nav').style.display = 'none';
        }
    })
}

const createCountryContainer = (src, name, population, region, capital, seconds, id) =>{
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
    container.id = id;

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
    
    container.addEventListener('click', (evt) =>{
        fetch('/src/js/data.json').then((res) =>{
            res.json().then((res) =>{
                console.log(history);
                console.log(res[container.id]);
                let i = container.id;
                history.pushState({name: res[i].name},"" ,res[i].name);
                nav.style.display = 'none';
                flagsContainer.style.display = 'none';
                createCountryInformationPage(res[i].flags.png, res[i].name, res[i].nativeName, res[i].population, res[i].region, res[i].subregion, res[i].capital, res[i].topLevelDomain[0], res[i].currencies[0].code, res[i].languages, res[i].borders)
            })
        }).catch((err) =>{
            console.log(err);
        })
    })
}

fetch('/src/js/data.json').then(res =>{
    res.json().then(res =>{
        for (let i = 0; i < res.length; i++){
            createCountryContainer(res[i].flags.png, res[i].name, res[i].population, res[i].region, res[i].capital, i, i);
        }
    })
})

searchBarInpt.addEventListener('keyup', (evt) =>{
    fetch('/src/js/data.json').then(res =>{
        res.json().then(res =>{
            for (let i = 0; i < res.length; i++){
                if (res[i].name.toLowerCase().startsWith(evt.target.value.toLowerCase())) {
                    flagsContainer.childNodes[i].style.display = 'block';
                    sr.destroy()
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