const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep-address");
const streetInput = document.querySelector("#street-address");
const cityInput = document.querySelector("#city-address");
const neighborhoodInput = document.querySelector("#neighborhood-adress");
const stateInput = document.querySelector("#state-adress");
const numberInput = document.querySelector("#number-address");
const formInputs = document.querySelectorAll("[data-input]");

//Valida input do cep
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]|\./;
    const key = String.fromCharCode(e.keyCode);

    if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
});

numberInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]|\./;
    const key = String.fromCharCode(e.keyCode);

    if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
});

// adiciona e remove o atributo disable dos inputs
const toggleDisabled = () => {
    if (stateInput.hasAttribute("disabled")) {
        formInputs.forEach((input) => {
            input.removeAttribute("disabled");
        });
    } else {
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "disabled");
        });
    }
};
// Evento para pegar o endereço
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;
    if (inputValue.length === 8) {
        getAddress(inputValue);
    }
});

// acessa a api para pegar os dados de endereço 
const getAddress = async (cep) => {
    cepInput.blur();
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    console.log(formInputs);
    console.log(data.erro);

    // erro caso o cep seja invalido
    if (data.erro) {
        if (!streetInput.hasAttribute("disabled")) {
            toggleDisabled();
        }

        addressForm.reset();
        errorToast(text = "CEP Inválido, tente novamente.");
        return;
    }

    // abilita o atributo disable caso o input esteja vazio
    if (streetInput.value === "") {
        toggleDisabled();
    }

    streetInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    stateInput.value = data.uf;
};
