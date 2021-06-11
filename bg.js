const body = document.querySelector("body");

const IMG_NUMBER = 10;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    // body.appendChild(image);
    // bgImage를 뒤로 보내기 위해 appendChild -> prepend
    body.prepend(image);
    
}
// 함수 불러오기
function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    // 이 function(함수)도 number(숫자)를 리턴해야겠지
    return number;
}

// 함수 만들기(funcion)
function init() {
    // 함수 안에 숫자 생성
    // floor 소수점 내림, ceil 올림
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init();