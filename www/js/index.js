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
        initAd();
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

// funcion AdMob
function initAd(){
        if ( window.plugins && window.plugins.AdMob ) {
            var ad_units = {
                android : {
                    banner: 'ca-app-pub-0211823635398974/8309002577',       //PUT ADMOB ADCODE HERE
                    interstitial: 'ca-app-pub-0211823635398974/7783943294'  //PUT ADMOB ADCODE HERE
                }
            };
            var admobid = ( /(android)/i.test(navigator.userAgent) ) ? ad_units.android;
 
            window.plugins.AdMob.setOptions( {
                publisherId: admobid.banner,
                interstitialAdId: admobid.interstitial,
                adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,  //use SMART_BANNER, BANNER, LARGE_BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD
                bannerAtTop: false, // set to true, to put banner at top
                overlap: true, // banner will overlap webview 
                offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                isTesting: false, // receiving test ad
                autoShow: false // auto show interstitial ad when loaded
            });
 
            registerAdEvents();
            window.plugins.AdMob.createInterstitialView();  //get the interstitials ready to be shown
            window.plugins.AdMob.requestInterstitialAd();
 
        } else {
            //alert( 'admob plugin not ready' );
        }
};

function showBannerFunc(){
    window.plugins.AdMob.createBannerView();
}
//display the interstitial
function showInterstitialFunc(){
    window.plugins.AdMob.showInterstitialAd();
}

app.initialize();
showBannerFunc();

document.getElementById('version').innerHTML = 'Versión 1.7';

