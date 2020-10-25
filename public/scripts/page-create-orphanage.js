//constante não pode ser alterada
//criando mapa
const map = L.map('mapid').setView([-27.5980658,-48.5186695], 15)
// no mapa acima é preciso passar um id, setar a latitude, longitude e o zoom ( que é o número 15)


//criando e adicionando tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

//criando ícone
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68]
})

//o let é usado para que em qualquer momento eu possa alterar o marker
// o marker é um Layer!
let marker;

//criando e adicionando marcador
//quando o mapa for clicado, o event será enviado para a função com todas as informações necessárias
map.on('click',(event) => {
    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;

    //procurar no html um nome e atribuir um valor (são dois inputs hidden)
    document.querySelector('[name=lat]').value = latitude;
    document.querySelector('[name=lng]').value = longitude;

    //existe marcador no mapa? Sim? Então remova
    marker && map.removeLayer(marker);

    //opcao de add icone do marker 
    marker = L.marker([latitude,longitude], {icon}).addTo(map);

})



function addPhotoField(){
    // console.log('esta funcionando');

    //pegar o container de fotos
    const container = document.querySelector('#images');

    //pegar o container com todas as fields para duplicar 
    const fieldsContainer = document.querySelectorAll('.new-upload');

    //realizar o clone da última imagem adicionada. True = clona tudo. False = clona só a primeira tag
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    //verificar se o campo está vazio. Se sim, não adicione ao container de imagens
    const input = newFieldContainer.children[0]
         
    if(input.value == ""){
        return
    }

    //deletar informações antes de adicionar ao container de imgs
    input.value = ""
        
    //adicionar o clone ao container de imagens
    container.appendChild(newFieldContainer)
}
    

function deleteField(event){
    //pegar o campo que foi pedido a remoção
    const span = event.currentTarget

    //pegar o container com todos os fields
    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length < 2){
        //limpar valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    //remover se ter ao menos 2 campos
    span.parentNode.remove()

    
}

//selecionar sim e não... toggle = alternar 
function toggleSelect(event){
    //retirar classe .active (dos botoes)
    document.querySelectorAll('.button-select button')
    .forEach((button) => button.classList.remove('active'))

    //colocar a classe .active
    const button = event.currentTarget
    button.classList.add('active')

    //att o input hidden
    const input = document.querySelector('[name="open_on_weekends"]')

    input.value = button.dataset.value
}