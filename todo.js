const toDoForm = document.querySelector(".js-toDoForm")
    toDoInput = toDoForm.querySelector("input")
    toDoList = document.querySelector(".js-toDoList")

const TODOS_LS = "toDos";

//function filterFn(toDo) {
    // 여기서 1(true)인 것들인 toDos만 return 할거야
//    return toDo.id === 1 }

// toDos = cleanToDos를 사용할 수 없기에 const -> let으로 바꿔준다.
let toDos = [];

function deleteToDo(event) {
    // parent가 누구인지 찾기
    //console.dir(event.target);
    //console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // 아래는 array안에 있는 모든 toDos를 통할거다.
    // filter는 array의 모든 items를 통해 함수를 실행하고
    // true인 items만 가지고 새로운 array를 만든다.
    // const cleanToDos = toDos.filter(filterFn);
    // 'cleanTodos'와'filter'가 하는 것은 'filterFn'이 체크가 된
    // items을 array를 주는 것
    // console.log(cleanToDos);
    
    const cleanToDos = toDos.filter(function(toDo) {
        // toDo.id와 li.id 비교
        // console.log(toDo.id, li.id);
        // li.id가 string이므로 parseInt를 사용해 숫자로 변경.
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
}

// saveToDos는 위의 toDos array를 가져와서 로컬에 저장하는 일을 하게 될 것.
function saveToDos() {
    // local storage에는, javascript의 data를 저장할 수 없고 오직 string만 저장할 수 있다.
    // JSON.stringify는 javascript object를 string으로 바꿔준다.
    // javascript는 local storage에 있는 모든 data를 string으로 저장한다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    
    // 만약 우리가 뭔가를 생성 하기를 원한다면?
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    // 이 text는 submit function에서 온 값
    span.innerText = text;
    // appendChild는 뭔가를 그의 father element 안에 넣는다.
    // span, delBtn을 li안에 넣는다.
    li.appendChild(delBtn);
    li.appendChild(span);
    // li를 toDoList안에 넣는다.
    // 나중에 버튼을 클릭했을 때 어떤 li를 지워야하는지 알 수 있게 li에 id를 준다.
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        // 뒤 text에는 paintToDo(text)의 text가 value로 온다.
        text: text,
        id: newId
        // toDos.length + 1
    };
    // toDos(array)안에 toDoObj(element)를 추가(push)
    toDos.push(toDoObj);
    saveToDos();
    // 작동이 잘 되는지 확인 console.log(text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);

    //enter누른 후 검색 단어를 검색창에서 비우기
    toDoInput.value = "";
}

// 아래 if 안에 들어가 있었지만 밖으로 뺄 수 있다.
//function something(toDo) {
//    console.log(toDo.text);};  

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //JSON은 데이터를 전달할 때, javascript가 그걸 다룰 수 있도록 object로 바꿔주는 기능 
        //string과 object로 변환 후 차이점 console.log로 보기
        // console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        //console.log(parsedToDos);

        //forEach는 array에 담겨있는 것들 각각에 한 번씩 함수를 실행시켜 주는 것.
        //parsedToDos.forEach(function(toDo) {
        //    console.log(toDo.text); });  
        // 밖으로 뺐다면,
        //parsedToDos.forEach(something); 
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    } 
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();