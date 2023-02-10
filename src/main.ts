import "./styles/header.css";
import "./styles/main.css";
import "./styles/default.css";
import "./styles/task-list.css";

type Task = {
  id: Number;
  value: string;
};

const selector = (element: string) => document.querySelector(element)!;

const taskList = selector("div.tasks");
const taskInput = selector("#insert-task") as HTMLInputElement;
const createdTasks = selector("#created span") as HTMLDivElement;
const button = selector("button[type=button]");
const tasksConcludedAmmount = selector("#completed span") as HTMLDivElement;

const tasks = [] as Task[];

const createTask = (event: Event) => {
  event.preventDefault();

  const taskValue = taskInput.value;

  const task = {
    id: Math.random(),
    value: taskValue,
  };

  tasks.push(task);

  renderTasks();
};

const renderTasks = () => {
  taskList.innerHTML = "";

  tasks.map((task, index) => {
    const divElement = createElement("div");
    divElement.classList.add("each-task");

    const labelElement = createElement("label");

    labelElement.setAttribute("for", String(task.id));

    const inputElement = createElement("input");

    inputElement.setAttribute("type", "checkbox");
    inputElement.setAttribute("id", String(task.id));

    inputElement.onchange = () => handleCheckbox();

    const buttonElement = createElement("button");

    buttonElement.setAttribute("type", "button");
    buttonElement.setAttribute("id", "delete-task");
    buttonElement.onclick = () => deleteTask(index);

    const elements = [labelElement, buttonElement];

    divElement.append(...elements);

    labelElement.append(inputElement);

    labelElement.insertAdjacentText("beforeend", task.value);

    taskList.appendChild(divElement);
  });
  const tasksAmmount = tasks.length;

  createdTasks.innerText = String(tasksAmmount);

  taskInput.value = "";
};

button.addEventListener("click", createTask);

function handleCheckbox() {
  const checkboxInputs = taskList.querySelectorAll<HTMLInputElement>("input[type=checkbox]");

  let tasksConcluded = 0;

  checkboxInputs.forEach((checkbox) => checkbox.checked && tasksConcluded++);

  const tasksAmmount = tasks.length;

  tasksConcludedAmmount.innerHTML = `${tasksConcluded} de ${tasksAmmount}`;
}

const deleteTask = (index: number) => {
  tasks.splice(index, 1);
  renderTasks();
};

const createElement = (tagName: string) => document.createElement(tagName);
