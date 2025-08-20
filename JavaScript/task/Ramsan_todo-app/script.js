const input = document.getElementById('todoInput');                                    //  input box for new tasks                                                              
const addBtn = document.getElementById('addBtn');                                     //  + button to add a task                                                               
const list = document.getElementById('todoList');                                       //  <ul> where tasks are shown                                                                    
const count = document.getElementById('count');                                            // Shows how many tasks are left                                             
const clearBtn = document.getElementById('clearCompleted');                                   // Clear Completed button                                                         
const noTask = document.getElementById('noTask');                                               // No tasks yet message                                                              


let todos = load();                                // Load tasks from localStorage (or start with an empty list)                                                                 
function save() {                                                   // Save the current list of tasks to localStorage                                                               
    const arr = [];  // Go through each task and encode it as a string
    for (let i = 0; i < todos.length; i++) {                                                                                                          
        const t = todos[i];
        if (t.done) {
            arr.push(t.text + '::done');                                    // Mark completed tasks                                                                                    
        } else {
            arr.push(t.text);                                                       // Just the text for active tasks                                                                            
        }
    }
    const str = arr.join('|');                                                    // Join all tasks with |                                                                               
    localStorage.setItem('todos', str);                                             // Save to localStorage                                                                              
}
function load() {                                                                    // Save to localStorage                                                                         
    const str = localStorage.getItem('todos');                                             // Get the string from localStorage                                                                          
    const arr = [];
    if (str) {
        const parts = str.split('|');                                                      // Split into each task                                                                               
        for (let i = 0; i < parts.length; i++) {
            const s = parts[i];
            if (s.endsWith('::done')) {
                arr.push({ text: s.slice(0, -6), done: true });                             // Completed task                                                                                       
            } else if (s) {
                arr.push({ text: s, done: false });                                              // Active task                                                                                  
            }
        }
    }
    return arr;                                                                                 // Return the array of todos                                                                              
}
function showTodos() {                                        // Show all tasks on the page and update the count                                                                                      
    let html = '';                                                                  // Start with an empty string for the list                                                                 
    let shown = 0;                                                                        // How many tasks are shown                                                                       
    let left = 0;                                                                          // How many tasks are not done                                                                  
     for (let i = 0; i < todos.length; i++) {                                                  // Build the HTML for each task                                                                   
        const t = todos[i];
        html += '<li';
        if (t.done) {
            html += ' class="completed"';                                         // Add class for completed tasks                                                                    
        }
        html += '>';
        html += '<input type="checkbox" data-idx="' + i + '"';
        if (t.done) {
            html += ' checked';                                          // Check the box if done
        }                                                                           
        html += '>';
        html += '<span>' + t.text + '</span>';                     // Show the task text                                                                      
        html += '</li>';
        shown = shown + 1;                                           // Count how many are shown                                                                     
    }
    list.innerHTML = html;                                                // Show all tasks in the <ul>                                                                          
    for (let i = 0; i < todos.length; i++) {                                // Count how many tasks are left (not done)                                                                        
        if (!todos[i].done) {
            left = left + 1;
        }
    }
    // No tasks yet! Add your first task above!//No active tasks above!//No complete tasks yet!

     if (shown) {                                                                                                                   
        noTask.style.display = 'none';
    } else {
        noTask.style.display = 'block';
    }
     if (left === 1) {                                              // Show the count of tasks left                                          
        count.textContent = left + ' task left';
    } else {
        count.textContent = left + ' tasks left';
    }
}
function addTodo() {                                                     //// Add a new task to the list                            
    const text = input.value.trim();                                       // Get the text and remove spaces                          
    if (!text) return;                                                                           // Do nothing if empty
    todos.push({ text: text, done: false });                                         // Add to the list
    input.value = '';                                                                // Clear the input box
    save();                                                                       // Save to localStorage
    showTodos();                                                            // Show the updated list
 }                                                                                   //// + is clicked add the task
 addBtn.onclick = addTodo;                              // When Enter is pressed in the input add the task                                        
input.onkeydown = function (e) {
    if (e.key === 'Enter') addTodo();
};
list.onclick = function (e) {                                   // When a checkbox is clicked, mark task as done/undone
    if (e.target.type === 'checkbox') {
        const idx = e.target.getAttribute('data-idx');                                     // Which task
        todos[idx].done = e.target.checked;                                 // Update done status
        save();
        showTodos();
    }
};

 clearBtn.onclick = function () {                           // ClearCompleted is clicked remove all done tasks
    const newTodos = [];
    for (let i = 0; i < todos.length; i++) {
        if (!todos[i].done) {
            newTodos.push(todos[i]);              // Keep only not done tasks
        }
    }
    todos = newTodos;
    save();
    showTodos();
};


showTodos();                                                                   // Show the tasks when the page loads
