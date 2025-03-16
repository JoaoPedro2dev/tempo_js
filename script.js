const cidade = document.querySelector('#cidadeInput');
const search = document.querySelector('#search');
const key = 'fb37b853ff466458e939d137aaac94c6';

const temperaturaSpan = document.querySelector('#tmeperatura');
const cidadeNome = document.querySelector('#cidadeNome');
const climaP = document.querySelector('#clima');
const img = document.querySelector('#icon');

search.addEventListener('click', () => {
    console.log(cidade);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade.value.trim()}&appid=${key}&units=metric&lang=pt`)
    .then(response => response.json())
    .then(data => {
        const name = data.name 
        const clima = data.weather[0].description;
        const temperatura = data.main.temp;
        const icon = data.weather[0].icon;

        console.log('cidade' + icon);

        cidadeNome.textContent = name;
        temperaturaSpan.textContent = temperatura + "C°";
        climaP.textContent = clima;
        img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                    // https://openweathermap.org/img/wn/{ICON}@2x.png

    })
    .catch(error => console.error('erro', error));
})