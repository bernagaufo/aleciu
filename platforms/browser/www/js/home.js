// Initialize Firebase
var config = {
    apiKey: "AIzaSyBdc0ImML1OYhvoFtOdhU4m8TTbCCBGtzI",
    authDomain: "alertasc-cc11f.firebaseapp.com",
    databaseURL: "https://alertasc-cc11f.firebaseio.com",
    projectId: "alertasc-cc11f",
    storageBucket: "alertasc-cc11f.appspot.com",
    messagingSenderId: "949793015710"
  };
  firebase.initializeApp(config);
  // traer datos de firebase
  firebase.database.enableLogging(false);
  var presenceRef = firebase.database().ref("disconnectmessage");
  // Write a string when this client loses connection
  presenceRef.onDisconnect().set("Te has quedado sin conexión!");
          // Find all dinosaurs whose names come before Pterodactyl lexicographically.
  var ref = firebase.database().ref("alerta");
  ref.orderByKey().endAt("titulo").on("child_added", function(snapshot) {
  });
          function initMap() {
            // Ciclo para poner marcas en el mapa, firebase
            var dbRef= firebase.database().ref('alerta');
                dbRef.on('value', function(snapshot) {
                snapshot.forEach(function(child) {
                var childs=child.val();
                var contentString = '<div class="row">'+
                  '<div class="card">'+
                    '<div class="card-image">'+
                      '<img width="auto" height="200" src="'+childs.foto+'">'+
                      '<span class="card-title">'+childs.titulo+'</span>'+
                      '<a href="'+childs.enlace+'" target="_blank" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>'+
                    '</div>'+
                    '<div class="card-content ">'+
                    '<div class="blue-text"><strong>Fecha: '+childs.timestamp+'</strong></div><br />'+
                    '<div class="black-text">'+childs.descripcion+'</div><br />'+
                    '</div>'+
                    '<a href="'+childs.enlace+'" target="_blank" class="red-text"><strong class="center-align">Seguir la nota</strong></a>'+
                  '</div>'+
              '</div>';
                
                if (childs.activo === 1){
                  if (childs.tipo){
                    var iconoP = childs.tipo;
                  }else{ 
                    var iconoP = "alerta";
                  };
                  var tituloA = childs.titulo;
                }else{
                  var iconoP = "alerta_antiguo";
                  var tituloA = "Archivo | "+ childs.titulo;
                };
                var marker = new google.maps.Marker({
                  position: {lat: childs.latitud, lng: childs.longitud},
                  map: map,
                  icon: iconBase + iconoP +'.gif',
                  title: tituloA,
                  animation: google.maps.Animation.DROP
                });
                var infowindow = new google.maps.InfoWindow({
                  content: contentString,
                  maxWidth: 230
                });
                marker.addListener('click', function() {
                infowindow.open(map, marker);
              });
              });
            });

            var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: 20.6737777, lng: -103.4054536},
              zoom: 12,
              fullscreenControl: false
            });
            var geocoder = new google.maps.Geocoder();
            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
            document.getElementById('submit').addEventListener('click', function() {
              geocodeAddress(geocoder, map);
            });
            function geocodeAddress(geocoder, resultsMap) {
              var address = document.getElementById('address').value;
              geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                  resultsMap.setCenter(results[0].geometry.location);
                  var marker = new google.maps.Marker({
                    map: resultsMap,
                    zoom: 15,
                    draggable: true,
                    position: results[0].geometry.location
                  });
                } else {
                  alert('Geocode was not successful for the following reason: ' + status);
                }
              });
            };
            var iconBase = 'img/iconos/';
            var infoWindow = new google.maps.InfoWindow({map: map});
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude

                };
                var marker = new google.maps.Marker({
                  icon: iconBase + 'mipos.png',
                  position: pos,
                  map: map,
                  title: 'MiPosicion'
                });
                // infoWindow.setPosition(pos);
                // infoWindow.setContent('Estas aqu&iacute;.');
                map.setCenter(pos);
              }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
              });
            } else {
              // Browser doesn't support Geolocation
              handleLocationError(false, infoWindow, map.getCenter());
            };          
};
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
};