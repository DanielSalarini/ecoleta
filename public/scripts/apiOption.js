function createOption(option, url) {
    option.innerHTML = '<option>Selecione a Cidade</option>'

    if(url == 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome') {
        fetch(url)
            .then(res => res.json())
            .then(locations => { 
                for(let local of locations) {
                    option.innerHTML += `<option value="${local.id}">${local.nome}</option>`
                }
            })
    } else {
        fetch(url)
            .then(res => res.json())
            .then(locations => { 
                for(let local of locations) {
                    option.innerHTML += `<option value="${local.nome}">${local.nome}</option>`
                }
            })
    }

}

function getUfs() {
    const ufSelect = document.querySelector('select[name=uf]')
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'

    createOption(ufSelect, url)
}

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    createOption(citySelect, url)
    citySelect.disabled = false
}

getUfs()

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)