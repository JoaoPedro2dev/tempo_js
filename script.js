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

document.addEventListener('keydown', function(event){
    
    if(event.key === 'Enter'){
        if(cidade.value.trim() !== ''){
            consulta();
        }else{
            erro.style.display = 'block';
            erro.innerHTML = 'Digite algo';
        }
    }
})

search.addEventListener('click', () => {
    if(cidade.value.trim() == ''){
        erro.style.display = 'block';
        erro.textContent = 'Digite algo';
    }else{
        consulta();
    }
});

function consulta(){
    if(erro.style.display === 'block'){
        erro.style.display = 'none'; 
        erro.innerHTML = 'Não encontramos sua cidade';
    }

    carregando.style.display = 'block';
    fahrenheit.style.display = 'none';
    celsius.style.display = 'none';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade.value.trim()}&appid=${key}&units=metric&lang=pt`)
    .then(response => response.json())
    .then(data => {
        carregando.style.display = 'none';
        fahrenheit.style.display = 'none';
        celsius.style.display = 'none';
        if(data.name){
            const name = data.name 
            const clima = data.weather[0].description;
            let temperatura = data.main.temp;
            const icon = data.weather[0].icon;
            const pais = data.sys.country;

            temperatura = temperatura.toFixed(2).replace(".", ",");

            cidadeNome.textContent = name+", "+pais;
            temperaturaSpan.textContent = temperatura  + "C°";
            climaP.textContent = clima;
            img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            container.style.display = 'block';

            const fahrenheit = document.querySelector('#fahrenheit');
            const celsius  = document.querySelector('#celsius');

            fahrenheit.addEventListener('click', () => {
                const newTemperatura = Number(temperatura.replace(',','.')) * 1.8 + 32;
                temperaturaSpan.textContent = newTemperatura.toFixed(2).replace(".", ",") + "F°";
            })

            fahrenheit.style.display = 'block';

            celsius.addEventListener('click', () => {
                temperaturaSpan.textContent = temperatura + "C°";
            })

            celsius.style.display = 'block';
            
        }else{
            erro.style.display = 'block';
            erro.innerHTML = 'Não encontramos sua cidade';

            if(container.style.display === 'block'){
                container.style.display = 'none'; 
            }
        }
    })
    .catch(error => console.error('erro', error));
}