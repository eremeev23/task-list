<template>
  <div class="page-header">
        <button @click="current__status = !current__status" class="new-task" >Новоe задания</button>
        <!-- ADD TASK WINDOW -->
        <div v-show="current__status" class="task-window">
            <form class="add-task" @submit.prevent="submit">
                <button  class="close" @click.prevent="current__status = !current__status"><i class="far fa-times-circle"></i></button>
                <input class="input-text" type="text" id="newTask" placeholder="New task..." v-model="title">
                <button @click="submit" @click.prevent="current__status = !current__status" type="submit" class="submit"><i class="far fa-plus"></i></button>
                <label class="label" for="newTask">Новое задание</label>
            </form>
        </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'page-header',
    data() {
        return {
            id: '',
            title: '',
            taskList: []
        }
    },
    props: {
        current__status: {
        type: Boolean,
        default: false
        },
        tasks__data: {
        type: Array,
        default: () => []
        }
    },
    methods: {
        ...mapMutations(['addTask']),
        submit() {
            this.addTask({
                id: this.id,
                title: this.title,
                taskList: this.taskList
            })
            this.title = '';
            // this.current__status = !this.current__status
        }
    }
    
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.page-header {
    position: relative;
    height: 8vh;
    width: 100%;
}
.new-task {
    position: absolute;
    right: 25%;
    top: 40%;
    cursor: pointer;
    list-style: none;
    padding: 10px 25px;
    border: 1px solid #2c3e50;
    border-radius: 25px;
    text-decoration: none;
    color: inherit;
    font-size: 18px;
    font-weight: 600;
    transition: all .3s ease;
}
.new-task:hover {
    background: #2c3e50;
    color: #fff;
}
.task-window {
    position: fixed;
    background: rgba(49, 49, 49, 0.623);
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-task {
    position: relative;
    z-index: 10000;
    width: 660px;
    height: 320px;
    border: 2px solid #2c3e50;
    border-radius: 20px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.close {
    cursor: pointer;
    position: absolute;
    top: 1%;
    right: 1%;
    transform: rotateY(-50%);
    border: none;
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
    transition: all .3s ease;
}
.close:hover {
    color: #19232e;
    text-shadow: 0 0 1px #2c3e50, 0 0 1px #2c3e50;
}
.input-text {
    outline: none;
    width: 480px;
    font-size: 24px;
    padding: 5px 10px;
    color: #2c3e50;
    border: 1px solid #2c3e50;
    border-radius: 15px;
}
.label {
    position: absolute;
    top: 20%;
    left: 10%;
    font-size: 2rem;
    font-weight: 400;
}
.submit {
    width: 35px;
    height: 35px;
    border: none;
}
.fa-plus {
    cursor: pointer;
    color: #2c3e50;
    font-size: 32px;
    font-weight: 200;
    transition: all .3s ease;
}
.fa-plus:hover {
    color: #000;
}
@media (max-width: 1210px) {
    .new-task{
        right: 10%;
    }
}
@media (max-width: 920px) {
    .new-task{
        right: 1%;
    }
}
</style>