// Array to store tasks
let tasks = [];
let editingTaskIndex = null;

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskTable = document.getElementById('taskTable');
const completionPercentage = document.getElementById('completionPercentage');
const addTaskButton = document.getElementById('addTaskButton');
const editTaskButton = document.getElementById('editTaskButton');

// Add Task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = {
    task_name: taskForm.task_name.value,
    stakeholder: taskForm.stakeholder.value,
    due_date: taskForm.due_date.value,
    status: taskForm.status.value,
  };

  if (editingTaskIndex === null) {
    tasks.push(task);
  } else {
    tasks[editingTaskIndex] = task;
    editingTaskIndex = null;
    addTaskButton.style.display = 'inline';
    editTaskButton.style.display = 'none';
  }

  renderTasks();
  updateCompletionPercentage();
  taskForm.reset();
});

// Edit Task
function editTask(index) {
  const task = tasks[index];
  taskForm.task_name.value = task.task_name;
  taskForm.stakeholder.value = task.stakeholder;
  taskForm.due_date.value = task.due_date;
  taskForm.status.value = task.status;

  editingTaskIndex = index;
  addTaskButton.style.display = 'none';
  editTaskButton.style.display = 'inline';
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  updateCompletionPercentage();
}

// Render Tasks
function renderTasks() {
  taskTable.innerHTML = '';
  tasks.forEach((task, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${task.task_name}</td>
      <td>${task.stakeholder}</td>
      <td>${task.due_date}</td>
      <td>${task.status}</td>
      <td>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    taskTable.appendChild(row);
  });
}

// Update Completion Percentage
function updateCompletionPercentage() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const percentage = totalTasks ? (completedTasks / totalTasks * 100).toFixed(2) : 0;
  completionPercentage.textContent = `Completion Percentage: ${percentage}%`;
}
