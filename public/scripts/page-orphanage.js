//criando objeto para especificar o que pode e não pode fazer no mapa
//será usado na criação do mapa como argumento
const options = {
    dragging: false, //arrastar
    touchZoom: false, //touch notebook/celular
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false //botoes + e -
}

//obetendo valores do html
const lat = document.querySelector('span[data-lat]').dataset.lat
const lng = document.querySelector('span[data-lng]').dataset.lng


//criando mapa
const map = L.map('mapid', options).setView([lat,lng], 16)
// no mapa acima é setado a latitude, longitude e o zoom ( que é o número 16)


//criando e adicionando tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

//criando ícone
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]
})


//criando e adicionando marcador
L.marker([lat,lng], { icon }).addTo(map) 
//não preciso colocar icon: icon porque a variável icon já existe



//////////image gallery
function selectImage(event){
    //console.log("cliquei no botao"); //vai mostrar no console o parâmetro passado
    
    
    const button = event.currentTarget //alvo atual

    //////////////remover todas as classes .active
    const buttons = document.querySelectorAll(".images button") 
    
    
    buttons.forEach(removeActiveClass)

    function removeActiveClass(button){
        button.classList.remove("active")
    }

    /*
    ou.....
    buttons.forEach((buttons) => {
        button.classList.remove("active")
    })
     */ 
    

    /////////////selecionar a imagem clicada
    const image = button.children[0] 
        //vai pegar o primeiro filho do botao (no caso, cada botao tem uma img,
        // entao cada botao tem apenas um filho e esse filho é a imagem que está na posição 0)
    
    const imageContainer = document.querySelector(".orphanage-details > img")
        //o '>' serve para pegar a img do primeiro nível apenas

    


    ///////////////////atualizar o container de imagem
    imageContainer.src = image.src
   
   
    //////////////////adicionar a classe .active para este botao
    button.classList.add("active");
}