const cidade = document.querySelector("#cidadeInput");
const search = document.querySelector("#search");
const key = "fb37b853ff466458e939d137aaac94c6";

const temperaturaSpan = document.querySelector("#tmeperatura");
const cidadeNome = document.querySelector("#cidadeNome");
const climaP = document.querySelector("#clima");
const img = document.querySelector("#icon");
const container = document.querySelector("#infosContent");
const fahrenheit = document.querySelector("#fahrenheit");
const celsius = document.querySelector("#celsius");

const alerta = document.querySelector("#alerta");

// console.log(alerta.textContent);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") consulta();
});

search.addEventListener("click", () => {
  consulta();
});

function consulta() {
  modfiAlerta(true, "Procurando...");
  modfiContainer(false);

  fahrenheit.style.display = "none";
  celsius.style.display = "none";

  if (cidade.value.trim() === "") {
    modfiAlerta(true, "Digite o nome de uma cidade");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade.value.trim()}&appid=${key}&units=metric&lang=pt`
  )
    .then((response) => response.json())
    .then((data) => {
      fahrenheit.style.display = "none";
      celsius.style.display = "none";

      modfiAlerta();

      if (data.name) {
        const name = data.name;
        const clima = data.weather[0].description;
        let temperatura = data.main.temp;
        const icon = data.weather[0].icon;
        const pais = data.sys.country;

        temperatura = temperatura.toFixed(2).replace(".", ",");

        cidadeNome.textContent = name + ", " + pais;
        temperaturaSpan.textContent = temperatura + "C°";
        climaP.textContent = clima;
        img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        modfiContainer(true);

        fahrenheit.addEventListener("click", () => {
          const newTemperatura =
            Number(temperatura.replace(",", ".")) * 1.8 + 32;
          temperaturaSpan.textContent =
            newTemperatura.toFixed(2).replace(".", ",") + "F°";
        });

        fahrenheit.style.display = "block";

        celsius.addEventListener("click", () => {
          temperaturaSpan.textContent = temperatura + "C°";
        });

        celsius.style.display = "block";
      } else {
        modfiAlerta(true, "Não encontramos sua cidade");
        modfiContainer();
      }
    })
    .catch((error) => console.error("erro", error));
}

function modfiAlerta(visible, text) {
  alerta.style.display = visible ? "block" : "none";
  const strong = alerta.children;
  strong[0].textContent = text;
}

function modfiContainer(visible) {
  container.style.display = visible ? "block" : "none";
}
