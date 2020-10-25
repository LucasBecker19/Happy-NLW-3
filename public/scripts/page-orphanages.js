//constante não pode ser alterada
//criando mapa
const map = L.map('mapid').setView([-27.5980658,-48.5186695], 15)
// no mapa acima é setado a latitude, longitude e o zoom ( que é o número 15)


//criando e adicionando tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

//criando ícone
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]
})

function addMarker({id, name, lat, lng}) {

    //criando pop-up overlay
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name} <a href="/orphanage?id=${id}"> <img src="/images/arrow-white.svg"> </a> `) 
    // para usar variáveis no setContent, é necessário usar crase

    //criando e adicionando marcador
    L.marker([lat,lng], { icon }).addTo(map).bindPopup(popup)
    //não preciso colocar icon: icon porque a variável icon já existe

}

const orphanagesSpan = document.querySelectorAll('.orphanages span')

orphanagesSpan.forEach( span => {
    const orphanage = {
        //o dataset vai se referir ao data-algumaCoisa que tem no HTML. Ex no html: data-id="{{this.id}}"
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat, 
        lng: span.dataset.lng
    }

    addMarker(orphanage)
})