var markers = [];
var markerCluster;

function initMap(){
    var map;
    markers = [];
    markerCluster = null;
    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(39.6130537, 2.8864253),
        zoom: 9
    });
    getFincas(map);
}
function addmarker(latilongi, info, last, map) {
    var marker = new google.maps.Marker({
        position: latilongi,
        title: 'titol',
        clickable: true,
        map: map
    });
    var infowindow = new google.maps.InfoWindow({
        content: info
    });
    marker.info = infowindow;
    google.maps.event.addListener(marker, 'click', function() {
        marker.info.open(map, marker);
    });
    markers.push(marker);
    if(last==1){
        markerCluster = new MarkerClusterer(map, markers);
    }
}

function pintarFinques(xml, map){
    var xmlDoc = xml.responseXML;
    var fincas = xmlDoc.getElementsByTagName("finca");
    var i;
    for (i = 0; i < fincas.length; i++) {
        var codi = fincas[i].getElementsByTagName('codi')[0].textContent;
        var long = fincas[i].getElementsByTagName('coordenadas')[0].getElementsByTagName('longitud')[0].textContent;
        var lat  = fincas[i].getElementsByTagName('coordenadas')[0].getElementsByTagName('latitud')[0].textContent;
        var last = 0;
        if (i == fincas.length - 1) {last = 1;}
        var myLatlng = new google.maps.LatLng(lat,long);
        var nom = fincas[i].getElementsByTagName('nombre')[0].textContent;
        var poblacion = fincas[i].getElementsByTagName('poblacion')[0].textContent;
        var url = fincas[i].getElementsByTagName('imagenes')[0].getElementsByTagName('url')[0].textContent;
        var des = fincas[i].getElementsByTagName('descripcion')[0].textContent;
        var info = '        <div id="content" style="width:100%; max-width:400px;">'
                + '            <div id="siteNotice">'
                + '            </div>'
                + '            <a id="ln" onclick="loadPropiedad('+codi+')"><h1 id="firstHeading" class="firstHeading">'+nom+'</h1></a>'
                + '            <h4 id="firstHeading" class="firstHeading">'+poblacion+'</h4>'
                + '            <div id="bodyContent">'
                + '                <a id="ln" onclick="loadPropiedad('+codi+')"><img class="img-responsive" src="'+url+'" style="width:100%; max-width:400px;">'
                + '                </img></a>'
                + '                <p style="margin-top:20px">'+des+'</p>'
                + '            </div>'
                + '        </div>';
        addmarker(myLatlng, info, last, map);
    }
}

function getFincas(map) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            pintarFinques(xhttp, map);
        }
    };
    xhttp.open("GET", "xml/fincas.xml", true);
    xhttp.send();
}

