if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
        console.log('Service Worker registration failed:', error);
    });
}

let deferredPrompt;
const installButton = document.getElementById('install-button');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    installButton.style.display = 'block';

    installButton.addEventListener('click', (e) => {
        // Hide the app provided install promotion
        installButton.style.display = 'none';
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    if ('Notification' in window && navigator.serviceWorker) {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        });
    }
});

function showNotification(title, options) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(function(registration) {
            registration.showNotification(title, options);
        });
    }
}

document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const timerInput = document.getElementById('todo-timer');
    const newTask = input.value.trim();
    const timerValue = parseInt(timerInput.value.trim(), 10);

    if (newTask) {
        const startTime = Date.now();
        const endTime = !isNaN(timerValue) && timerValue > 0 ? startTime + timerValue * 60000 : null;
        const todo = {
            task: newTask,
            timer: timerValue,
            startTime: startTime,
            endTime: endTime,
            id: Date.now()
        };
        addTodoToDOM(todo);
        saveTodoToLocalStorage(todo);
        input.value = '';
        timerInput.value = '';
    }
});
function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.textContent = todo.task;
    li.dataset.id = todo.id;

    if (todo.timer !== null) {
        const timerSpan = document.createElement('span');
        timerSpan.className = 'timer';
        li.appendChild(timerSpan);

        const interval = setInterval(() => {
            const remainingTime = Math.max(0, todo.endTime - Date.now());
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            timerSpan.textContent = ` (${minutes}:${seconds < 10 ? '0' : ''}${seconds} min)`;

            if (remainingTime <= 0) {
                clearInterval(interval);
                timerSpan.textContent = ' (Time up!)';
            }
        }, 1000);

        if ('serviceWorker' in navigator && 'Notification' in window) {
            const halfTime = todo.timerValue * 30000;
            const eightyPercentTime = todo.timerValue * 48000;
            const fullTime = todo.timerValue * 60000;

            todo.timeoutIds = [];
            todo.timeoutIds.push(setTimeout(() => {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.sync.register('sync-todo-' + todo.id + '-50');
                });
            }, halfTime)); // 50% of the time

            todo.timeoutIds.push(setTimeout(() => {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.sync.register('sync-todo-' + todo.id + '-80');
                });
            }, eightyPercentTime)); // 80% of the time

            todo.timeoutIds.push(setTimeout(() => {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.sync.register('sync-todo-' + todo.id + '-100');
                });
            }, fullTime)); // 100% of the time
        }
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '&#x1F5D1;'; // Trash can symbol
    deleteButton.addEventListener('click', function() {
        li.remove();
        removeTodoFromLocalStorage(todo.id);
        if (todo.timeoutIds) {
            todo.timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        }
    });
    li.appendChild(deleteButton);
    document.getElementById('todo-list').appendChild(li);
}
function saveTodoToLocalStorage(todo) {
    localStorage.setItem('todo-'+todo.id, JSON.stringify(todo));
}

function removeTodoFromLocalStorage(id) {
    localStorage.removeItem('todo-'+id);
}

function loadTodos() {
    const todos = keys.filter(key => key.startsWith('todos')).map(key => JSON.parse(localStorage.getItem(key)));
    todos.forEach(todo => addTodoToDOM(todo));
}

document.addEventListener('DOMContentLoaded', loadTodos);