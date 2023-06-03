(function () {
    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('check');

    async function fetchTodo() {
        //GET REQUEST
        // fetch('https://jsonplaceholder.typicode.com/todos')
        //     .then(function(response){

        //         return response.json();
        //     }).then(function(data){
        //        tasks = data;
        //        renderList(); 
        //     })
        //     .catch(function(error){
        //         console.log('error', error);
        //     })

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data;
            renderList();
        } catch (error) {
            console.log(error);
        }


    }

    function addTaskToDom(task) {
        const li = document.createElement('li');

        li.innerHTML = `

        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="pngtree-delete-icon-image_1129289.jpg" class="delete" data-id= "${task.id}" />
        
              
    `;
        taskList.append(li);
    }

    function renderList() {
        taskList.innerHTML = '';
        for (let i = 0; i < tasks.length; i++) {
            addTaskToDom(tasks[i]);
        }

        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask(taskId) {
        const task = tasks.filter(function (task) {
            return task.id === Number(taskId);
        });
        if (task.length > 0) {
            const currentTask = task[0];
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification('Task Toggled Successfully!!');
            return;
        }
        showNotification('Toggle Task Failed!!');
    }

    function deleteTask(taskId) {
        const newTasks = tasks.filter(function (task) {
            return task.id !== Number(taskId);
        });
        tasks = newTasks;
        renderList();
        showNotification('Task Deleted Successfully');
    }

    function addTask(task) {
        if (task) {
            // fetch('https://jsonplaceholder.typicode.com/todos', {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(task),
            // })
            //     .then(function (response) {
            //         return response.json();
            //     }).then(function (data) {
            //         console.log(data);
            //         tasks.push(task);
            //         renderList();
            //         showNotification('Task Added Successfully');
            //     })
            //     .catch(function (error) {
            //         console.log('error', error);
            //     })
            tasks.push(task);
            renderList();
            showNotification('Task Added Successfully');
            return;
        }
        showNotification('Task cannot be added, try again!');
    }

    function showNotification(text) {
        alert(text);
    }

    function handleInputKeypress(e) {
        if (e.key === 'Enter') {
            const title = e.target.value;
            console.log(title);
            if (!title) {
                showNotification('Task Cannot be Empty, Please Enter the task');
                return;
            }

            const task = {
                title,
                id: Date.now(),
                completed: false
            }
            e.target.value = '';
            addTask(task);
        }
    }

    function handleClickListener(e) {
        const target = e.target;
        console.log(target);

        if (target.className === 'delete') {

            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;

        } else if (target.className === 'custom-checkbox') {

            const taskId = target.id;
            toggleTask(taskId);
            return;

        }
    }

    function intializeApp() {
        fetchTodo();
        addTaskInput.addEventListener('keyup', handleInputKeypress);
        document.addEventListener('click', handleClickListener);
    }

    intializeApp();
})()



