"use strict";

fetch('/src/js/data.json').then((res) =>{
    res.json().then((res) =>{
        console.log(res);
    }).catch((err) =>{
        console.log(err);
    })
})

const headerNav = document.querySelector('.header__nav');
const darkContainer = document.querySelector('.header__nav__dark-mode');
let darkContainerIcon = document.querySelector('.header__nav__dark-mode__icon');
let darkContainerTxt = document.querySelector('.header__nav__dark-mode__text');
let clear = true;

const searchBarInpt = document.querySelector('.main__nav__search-bar__inpt');
let countryName;
const main = document.querySelector('.main');
const nav = document.querySelector('.main__nav');
let flagsContainer = document.querySelector('.main__flags-container');

const verifyVisibility = (evt) =>{
    for (let i = 0; i < evt.length; i++){
        if (evt[i].isIntersecting == true){
            let id = parseInt(evt[i].target.id);
            let s = id / 100 + 0.5;
            evt[i].target.style.animation = `appear ${s}s forwards`;
        }
    }
}

const observer = new IntersectionObserver(verifyVisibility);

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

    observer.observe(container);
    
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

darkContainer.addEventListener('click', () =>{
    if (clear == true){
        clear = false;
        darkContainerIcon.classList.replace('fa-moon', 'fa-sun');
        darkContainerTxt.textContent = "Clear Mode";
        let darkStyles = document.createElement('STYLE');
        darkStyles.innerHTML = `

        *{
            color: #fff;
        }

        body{
            background-color: hsl(207, 26%, 17%);
        }

        .header__nav{
            background-color: hsl(209, 23%, 22%); 
            box-shadow: none;
        }

        .header__nav__dark-mode__text:hover{
            -webkit-text-stroke: .1px #fff;
        }

        .main__nav__search-bar{
            background-color: hsl(209, 23%, 22%);
            box-shadow: none;
            border-radius: 10px;
        }

        .main__nav__search-bar:focus, .main__nav__search-bar:focus-within{
            box-shadow: none;
        }

        .main__nav__search-bar__inpt{
            background-color: hsl(209, 23%, 22%);
        }

        .main__nav__select__default{
            background-color: hsl(209, 23%, 22%);
            box-shadow: none;
        }

        .main__nav__select__options-container{
            background-color: hsl(209, 23%, 22%);
            box-shadow: none;
        }

        .main__flags-container__country-container{
            background-color: hsl(209, 23%, 22%);
            box-shadow: none;
        }

        .main__country__img{
            box-shadow: none;
        }

        .main__country__data-container__border__border-container{
            box-shadow: none;
            background-color: hsl(209, 23%, 22%);
        }

        .footer__information-container{
            background: rgba(0, 0, 0, 1);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(14.1px);
            -webkit-backdrop-filter: blur(14.1px);
            border: 1px solid rgba(0, 0, 0, 0.3);
        }
        `
        document.head.appendChild(darkStyles);
        console.log("The page is in dark mode 🌑");
    } else if (clear == false){
        clear = true;
        darkContainerIcon.classList.replace('fa-sun', 'fa-moon');
        darkContainerTxt.textContent = "Dark Mode";
        let clearStyles = document.createElement('STYLE');
        clearStyles.innerHTML = `
        *{
            color: hsl(200, 15%, 8%);
        }

        body{
            background-color: #fff;
        }

        .header__nav{
            background-color: #fff; 
            box-shadow: 1px 1px 3px 2px #ddd;
        }

        .header__nav__dark-mode__text:hover{
            -webkit-text-stroke: .1px #000;
        }

        .main__nav__search-bar{
            background-color: #fff;
            box-shadow: 1px 1px 3px 2px #ddd;
            border-radius: 10px;
        }

        .main__nav__search-bar:focus, .main__nav__search-bar:focus-within{
            box-shadow: 1px 1px 3px 2px #ddd;
        }

        .main__nav__search-bar__inpt{
            background-color: #fff;
        }

        .main__nav__select__default{
            background-color: #fff;
            box-shadow: 1px 1px 3px 2px #ddd;
        }

        .main__nav__select__options-container{
            background-color: #fff;
            box-shadow: 1px 1px 3px 2px #ddd;
        }

        .main__flags-container__country-container{
            background-color: #fff;
            box-shadow: 1px 1px 3px 2px #ddd;
        }

        .main__country__img{
            box-shadow: 1px 1px 3px 2px #ddd;
        }

        .main__country__data-container__border__border-container{
            box-shadow: 1px 1px 3px 2px #ddd;
            background-color: #fff;
        }
        `
        document.head.appendChild(clearStyles);
        console.log("The page is in clear mode ☀️")
    }
})