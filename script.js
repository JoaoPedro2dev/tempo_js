const cidade = document.querySelector('#cidadeInput');
const search = document.querySelector('#search');
const key = 'fb37b853ff466458e939d137aaac94c6';

const temperaturaSpan = document.querySelector('#tmeperatura');
const cidadeNome = document.querySelector('#cidadeNome');
const climaP = document.querySelector('#clima');
const img = document.querySelector('#icon');
const container = document.querySelector('#infosContent');
const erro = document.querySelector('#erro');
const carregando = document.querySelector('#carregamento');

search.addEventListener('click', consulta);

function consulta(){
    if(erro.style.display === 'block'){
        erro.style.display = 'none'; 
    }

    carregando.style.display = 'block';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade.value.trim()}&appid=${key}&units=metric&lang=pt`)
    .then(response => response.json())
    .then(data => {
        carregando.style.display = 'none';
        if(data.name){
            const name = data.name 
            const clima = data.weather[0].description;
            const temperatura = data.main.temp;
            const icon = data.weather[0].icon;
            const pais = data.sys.country;

            cidadeNome.textContent = name+", "+pais;
            temperaturaSpan.textContent = temperatura + "C°";
            climaP.textContent = clima;
            img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            container.style.display = 'block';
        }else{
            erro.style.display = 'block';

            if(container.style.display === 'block'){
                container.style.display = 'none'; 
            }
        }
    })
    .catch(error => console.error('erro', error));
}