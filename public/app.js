const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

async function fetchTasks() {
  const res = await fetch("/tasks");
  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  for (const task of tasks) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", async () => {
      await fetch(`/tasks/${task.id}`, { method: "DELETE" });
      fetchTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  }
}

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = taskInput.value.trim();
  if (!text) return;

  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  taskInput.value = "";
  fetchTasks();
});

fetchTasks();
