
// 1. HTML 요소 가져오기
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyMessage = document.getElementById("empty-message");


// 2. 저장된 할 일 불러오기
const savedTasks = localStorage.getItem("todo-tasks");

const tasks = savedTasks ? JSON.parse(savedTasks) : [];


// 3. 할 일 저장 함수
function saveTasks() {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}


// 4. 화면에 할 일 목록을 표시하는 함수
function renderTasks() {

    // 기존 목록 비우기
    taskList.innerHTML = "";

    let completedCount = 0;

    // 배열에 있는 할 일을 하나씩 화면에 표시
    for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i];

        // li 생성
        const item = document.createElement("li");
        item.className = "task-item";

        // 체크박스와 글자를 감쌀 label 생성
        const label = document.createElement("label");
        label.className = "task-label";

        // 체크박스 생성
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-check";
        checkbox.checked = task.completed;

        // 할 일 글자 생성
        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        // 완료 상태라면 completed 클래스 추가
        if (task.completed) {
            item.classList.add("completed");
            completedCount++;
        }

        // 체크박스 변경 이벤트
        checkbox.addEventListener("change", function() {
            tasks[i].completed = checkbox.checked;

            saveTasks();
            renderTasks();
        });

        // 삭제 버튼 생성
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "삭제";

        // 삭제 버튼 클릭 이벤트
        deleteButton.addEventListener("click", function() {
            tasks.splice(i, 1);

            saveTasks();
            renderTasks();
        });

        // 요소들을 연결
        label.append(checkbox);
        label.append(text);

        item.append(label);
        item.append(deleteButton);

        taskList.append(item);
    }

    // 전체 및 완료 개수 표시
    taskCount.textContent =
        "전체 " + tasks.length + "개 · 완료 " + completedCount + "개";

    // 할 일이 없으면 안내 문구 표시
    emptyMessage.hidden = tasks.length !== 0;
}


// 5. 새로운 할 일 추가 함수
function addTask() {

    // 입력창의 값 가져오기
    const text = taskInput.value.trim();

    // 아무것도 입력하지 않았을 경우
    if (text === "") {
        alert("할 일을 입력해 줘!");
        taskInput.focus();
        return;
    }

    // 새로운 할 일을 배열에 추가
    tasks.push({
        text: text,
        completed: false
    });

    // 입력창 비우기
    taskInput.value = "";

    // 저장 후 화면 갱신
    saveTasks();
    renderTasks();

    taskInput.focus();
}


// 6. 추가 버튼 클릭 이벤트
addButton.addEventListener("click", addTask);


// 7. Enter 키로 할 일 추가
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// 8. 페이지가 처음 열릴 때 목록 표시
renderTasks();
