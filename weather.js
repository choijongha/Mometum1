const API_KEY = "074a341bd2e2cb66730184a1f6a065d7";
const COORDS = 'coords';

function getWeather(lat, log){
    //fetch() 안에 데이터를 넣으면 데이터를 불러옴
    fetch(``)

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
    //latitude = latitude,
    //longitude = longitude
    // javascript의 작은 팁
    // 객체에 변수의 이름과 객체의 key 이름을 같게 저장할 때는 
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        // getWeather
    }
}


function init(){
    loadCoords();
}

init();