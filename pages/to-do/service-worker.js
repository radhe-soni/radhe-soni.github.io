self.addEventListener('install', function(event) {
    console.log('Service Worker installed');
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker activated');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});


self.addEventListener('sync', function(event) {
    if (event.tag.startsWith('sync-todo-')) {
        event.waitUntil(syncTodoNotification(event.tag));
    }
});

function syncTodoNotification(tag) {
    return new Promise(function(resolve, reject) {
        const parts = tag.split('-');
        const id = parts[2];
        const percentage = parts[3];

        // Retrieve the specific todo item from local storage
        const todo = JSON.parse(localStorage.getItem('todo-' + id));

        if (todo) {
            let message = '';
            if (percentage === '50') {
                message = `Task "${todo.task}" has exhausted 50% of its time.`;
            } else if (percentage === '80') {
                message = `Task "${todo.task}" has exhausted 80% of its time.`;
            } else if (percentage === '100') {
                message = `Time up for Task "${todo.task}".`;
                // Remove the todo item from local storage
                localStorage.removeItem('todo-' + id);
            }

            // Show notification
            self.registration.showNotification('Task Reminder', {
                body: message,
                icon: './icon-360x360.png',
                badge: './icon-72x72.png'
            });
        }

        resolve();
    });
}