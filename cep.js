console.log("=== CEP ===");


function onlyNumbers(e) {
    this.value = this.value.replace(/\D+/g, "");
}

function validateEntry() {    
    if (this.value.length === 8) {
        this.classList.remove("error");
        getAddress(this.value);
    } else {        
        this.classList.add("error");
        this.focus();
        document.getElementById("btn").disabled = true;
    }
}

function getAddress(postalCode) {
    const endpoint = `https://viacep.com.br/ws/${postalCode}/json/`;

    const config = {
        method: "GET"
    };

    fetch(endpoint, config)
        .then(function(resp) { return resp.json(); })
        .then(getAddressSuccess)
        .catch(getAddressError);

}

const cepInfo = document.querySelector("#cep");
console.log(cepInfo)

let listCep = (localStorage.listCep) ? JSON.parse(localStorage.listCep) : [] ;

function testCep(){
    const erro = address.erro
    console.log(erro)
    if (address.erro=="false") {
        getAddressSuccess()
} else {
    alert("erro")
}
}

//function getAddressSuccess(){
    //if (address.erro=="false") {
        //getAddressList()
//} else {
//    alert("erro")
//}

function getAddressSuccess(address) {
    const { logradouro, cep, localidade, uf, bairro } = address;
    console.log(address)
    //const erro = address.erro
    //console.log(erro)
//if (address.erro === "false") {}
        listCep.push(address)
        document.querySelector(".cards").innerHTML = listCep.map(function(addresses) {
            return `<div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${addresses.logradouro}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                    ${addresses.bairro} - ${addresses.localidade} - ${addresses.uf}
                </h6>
                <p class="card-text">${addresses.cep}</p>
            </div>
        </div>`
        }).join('');    
        localStorage.setItem("adresses", JSON.stringify(addresses))
}

function getAddressError() {
}

document.querySelector("#cep").addEventListener("input", onlyNumbers);
document.querySelector("#cep").addEventListener("focusout", validateEntry);
document.addEventListener("submit", getAddress);
document.querySelector('#submit').addEventListener("click", getAddress)
//document.addEventListener( "DOMContentLoaded", getAddress, e => {e.preventDefault()})
//document.addEventListener("DOMContentLoaded", getAddressSuccess)



