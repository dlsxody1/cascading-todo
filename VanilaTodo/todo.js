const todoForm = document.querySelector(".todo__form");
const todoButton = document.querySelector(".todo__button");
const todoInput = document.querySelector(".todo__input");
const todo = document.querySelector(".todo");
const todoCheckbox = document.querySelector(".todo__check");

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoContainer = document.createElement("div");
  const todoContent = document.createElement("div");
  const todoCheckbox = document.createElement("input");

  const todoValue = todoInput.value;
  if (todoValue.length === 0) alert("내용 채워주세요");
  else {
    todoCheckbox.type = "checkbox";
    todoCheckbox.className = "todo__check";
    todoContent.innerHTML = todoValue;
    todoContainer.className = "todo__value";

    todoContainer.appendChild(todoContent);
    todoContainer.appendChild(todoCheckbox);

    todo.appendChild(todoContainer);
  }
});

todo.addEventListener("click", function (e) {
  const target = e.target;

  if (target.className === "todo__check") {
    const todoValue = target.parentElement;
    console.log(todoValue);
    if (target.checked) {
      todoValue.style.textDecoration = "line-through";
    } else {
      todoValue.style.textDecoration = "none";
    }
  }
});
