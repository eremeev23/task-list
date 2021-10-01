<template>
    <main class="main">
        <!-- MAIN LIST -->
        <ul class="task__list">
            <li class="task" v-for='task in tasks__data' :key="task.id" :task_data="task">
                <!-- MAIN LIST ITEM BODY-->
                <h1>{{task.title}}</h1>
                <button @click.prevent="createSubtask" @click="newSubTask = !newSubTask" class="add__task button">+</button>
                <button @click='deleteGlobalTask' class="delete__task button"><i class="fas fa-trash-alt"></i></button>
                <!-- SECONDERY LIST -->
                <ul class="taskItems__list">
                    <li class="taskItem" v-for='taskItem in task.taskList' :key="taskItem.id" :task_data="task">
                        <!-- SECONDERY LIST ITEM BODY -->
                        <input class="checkbox" type="checkbox" :name='taskItem' :id="taskItem">

                        <label class="taskItem__label" :for="taskItem" contenteditable='false'>
                            {{ taskItem }}
                            <div>
                                <button @click="changeTask" class="change__btn btn" f>
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button @click="deleteSubtask" class="delete__btn btn">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>

                        </label>
                    </li>
                    <li v-show="false" class="inputNewTask">
                        <form v-show="newSubTask" class="newTaskItem" @submit.prevent="newSubTask = !newSubTask">
                            <input v-model="titleItem" class="newTask" type="text" placeholder="New Task...">
                            <button @click="newSubTask = !newSubTask" @click.prevent="addSubTaskTitle" class="addSubtask__btn">Add</button>
                        </form>
                    </li>
                </ul>

            </li>
        </ul>
        
    </main>  
  
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
        return {
            newSubTask: false,
            newTitle: '',
            titleItem: ''
        }
  },
  props: {
    tasks__data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapMutations(['deleteTask', 'addSubtask', 'removeSubTask']),
    deleteGlobalTask: function(e) {
        const item = e.target;
        const task = item.parentElement;

        if(item.classList[0] === 'delete__task') {
            task.remove();
            const content = task.children[0].textContent;
            this.deleteTask(content);
        }
        if(item.classList[1] === 'fa-trash-alt') {
            const element = task.parentElement;
            element.remove();
            const content = task.parentElement.children[0].textContent;
            this.deleteTask(content);
        }
        console.log(item);
        console.log(task.children[0].textContent);

    },
    deleteSubtask: function(e) {
        const button = e.target;
        if (button.classList[0] === 'delete__btn') {
            const task = button.parentElement;
            task.parentElement.parentElement.remove();
            const item = task.parentElement.textContent;
            this.removeSubTask(item)
        }
        if (button.classList[1] === 'fa-trash-alt') {
            const btn = button.parentElement;
            const task = btn.parentElement;
            task.parentElement.parentElement.remove();
            const item = task.parentElement.textContent;
            this.removeSubTask(item)
        }
    },
    deleteHeaderTask: function(e) {
        const item = e.target;
        if(item.classList[0] === 'delete__task'){
            const task = item.parentElement;
            task.remove()
        }
        if(item.classList[1] === 'fa-trash-alt'){
            const btn = item.parentElement;
            const task = btn.parentElement;
            task.remove()
        }
    },
    changeTask: function(e) {
        let btn = e.target;
        
        if (btn.classList[0] === 'change__btn') {
            const item = btn.parentElement;
            const task = item.parentElement;
            const check = task.parentElement.children[0];
            if (task.getAttribute('contenteditable') == 'false') {
                task.setAttribute('contenteditable', 'true');
                btn.setAttribute('contenteditable', 'false');
                task.style.cursor = 'pointer';
                check.setAttribute('disabled', 'true');
            } else {
                if (task.getAttribute('contenteditable') == 'true') {
                    task.setAttribute('contenteditable', 'false');
                    check.removeAttribute('disabled');
                }
            }
        }

        if (btn.classList[1] === 'fa-pencil-alt' || btn.classList[1] === 'fa-check') {
            btn = btn.parentElement;
            const item = btn.parentElement;
            const task = item.parentElement;
            const check = task.parentElement.children[0];
            if (task.getAttribute('contenteditable') == 'false') {
                task.setAttribute('contenteditable', 'true');
                btn.setAttribute('contenteditable', 'false');
                task.style.cursor = 'pointer';
                check.setAttribute('disabled', 'true');
            } else {
                if (task.getAttribute('contenteditable') == 'true') {
                    task.setAttribute('contenteditable', 'false');
                    check.removeAttribute('disabled');
                }
            }
        }
    },
    createSubtask: function(e) {
        const button = e.target;
        const li = button.parentElement;
        const ul = li.children[3];
        const input = ul.lastElementChild;
        input.style.display = 'block';
    },
    addSubTaskTitle: function(e) {
        const button = e.target;
        const h1 = button.parentElement.parentElement.parentElement.parentElement.children[0].textContent;
        this.addSubtask({
            titleItem: this.titleItem,
            h1
        });
        this.titleItem = '';
        const ul = button.parentElement;
        const input = ul.children[0];
        input.style.display = 'none';
        button.style.display = 'none';
    }
  }
}
</script>

<style scoped>
.main {
    min-height: 100vh;
}
.task__list {
    max-width: 55%;
    margin: 0 auto;
    padding: 0;
}
.task {
    position: relative;
    list-style: none;
    margin: 50px 0;
}
/* Global Task */
.task h1 {
    padding: 10px 0;
    border-bottom: 1px solid #2c3e50;
}
.button {
    cursor: pointer;
    position: absolute;
    height: 30px;
    width: 30px;
    padding: 7px 7px;
    border: 1px solid #2c3e50;
    border-radius: 50%;
    color: #2c3e50;
    transition: all .3s ease;
}
.button:hover {
    color: #fff;
    background: #2c3e50;
}
.add__task {
    font-size: 24px;
    padding: 0;
    top: 23px;
    right: 60px;
}
.delete__task {
    top: 23px;
    right: 25px;
}
/* Subtask */
.taskItem {
    position: relative;
    list-style: none;
    margin: 10px 35px;
    padding: 10px;
    font-size: 18px;
}
.checkbox {
    margin-right: 15px;
}
.taskItem__label {
    margin: 0 50px 0 0
}
.checkbox {
    cursor: pointer;
    position: absolute;
    z-index: -1;
    opacity: 0;
}
.checkbox+label {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    user-select: none;
}
.checkbox+label::before {
    position: absolute;
    left: -25px;
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    border-radius: 5px;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
}
.checkbox:checked+label::before {
    border-color: #2c3e50;
    background-color: #2c3e50;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.checkbox:checked+label {
    text-decoration: line-through;
    opacity: .7;
}
.btn {
    cursor: pointer;
    position: absolute;
    margin: 0 5px;
    width: 42px;
    height: 42px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #2c3e50;
    border: 1px solid #2c3e50;
    border-radius: 10px;
    background-color: inherit;
    transition: all .3s ease;
}
.delete__btn {
    right: 0;
}
.delete__btn:hover {
    background: #ff4141;
    color: #fff;
    border-color: #ff4141;
}
.change__btn {
    right: 45px;
}
.change__btn:hover {
    background: #ffd30f;
    color: #fff;
    border-color: #ffd30f;
}
/* New Task */
.inputNewTask {
    list-style: none;
}
.newTaskItem {
    margin: 10px 10px;
    position: relative;
}
.newTask {
    outline: none;
    margin: 10px 30px;
    padding: 5px 15px;
    width: 30%;
    font-size: 18px;
    font-weight: 200;
    border: none;
    border-bottom: 2px solid #2c3e50;
    color: #2c3e50;
}
.addSubtask__btn {
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    left: 40%;
    padding: 5px 15px;
    font-size: 18px;
    border: 1px solid #2c3e50;
    border-radius: 30px;
    color: #2c3e50;
    background: #fff;
    transition: all .3s ease-in-out;
}
.addSubtask__btn:hover {
    color: #fff;
    background: #2c3e50;
}
/* Adaptive */
@media (max-width: 1210px) {
    .task__list{
        max-width: 80%;
    }
}
@media (max-width: 920px) {
    .task__list{
        max-width: 100%;
    }
}
</style>