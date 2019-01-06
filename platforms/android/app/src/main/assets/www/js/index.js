var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.addEventListener("backbutton", onBackKeyDown, false);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function exitFromApp(){
    if (navigator.app) {
        navigator.app.exitApp();
    } else if (navigator.device) {
        navigator.device.exitApp();
    } else {
        window.close();
    }
};
function onBackKeyDown(){
    // alert('Atrás');
    return false;
};
// checar la geolocation
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("navigator.geolocation works well");
}
var onSuccess = function(position) {};
function onError(error) {
    alert('Verifica que tengas activada tu geolocalización.');
}
navigator.geolocation.getCurrentPosition(onSuccess, onError);

app.initialize();

var admobid = {
    banner: 'ca-app-pub-0211823635398974/8309002577',
    interstitial: 'ca-app-pub-0211823635398974/7783943294'
};
admob.banner.config({
        id: admobid.banner,
        isTesting: false,
        autoShow: true,
        size: FLUID,
        bannerAtTop: false,
    });
    // Create banner
    admob.banner.prepare()
    // Show the banner
    admob.banner.show();