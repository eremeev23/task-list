// import { forEach } from "core-js/core/array";

export default {
    actions: {},
    mutations: {
      addTask(state, newTask) {
        state.tasks.push(newTask);
      },
      deleteTask(state, task) {
        for (let i = 0; i < state.tasks.length; i++) {
          if(state.tasks[i].title == task) {
            state.tasks.splice(i, 1);
          }
        }
      },
      addSubtask(state, newSubtask) {
          for (let i = 0; i < state.tasks.length; i++) {
            if(state.tasks[i].title == newSubtask.h1) {
              state.tasks[i].taskList.push(newSubtask.titleItem);
            }
          }
      },
      removeSubTask(state, item) {
        for (let i = 0; i < state.tasks.length; i++) {
          let taskListsArr = state.tasks[i].taskList;
          for (let j = 0; j < taskListsArr.length; j++) {
            if (taskListsArr[j] == item) {
              taskListsArr.splice(j, 1);
              console.log(taskListsArr[j]);
            }
            console.log(taskListsArr[j], item);
          }
        }
      }
    },
    state: {
        tasks: [{
                  id: 1,
                  title: 'Утреннее совещание',
                  taskList: ['Включить компьютер', 'Прoверить пoчту', 'Подготовить план своей работы на день', 'Записать задания от руководителя']
                },
                {
                  id: 2,
                  title: 'Работа в первой половине дня',
                  taskList: ['Прочитать задания на день', 'Преступить к первому заданию', 'Провeрить почту', 'Приступить ко второму заданию']
                },
                {
                  id: 3,
                  title: 'Обед',
                  taskList: ['Разогреть обед', 'Поесть', 'Убрать за собой']
                },
                {
                  id: 4,
                  title: 'Работа во второй половине дня',
                  taskList: ['Приступить к третьему заданию', 'Отметить невыполненые задания', 'Проверить почту']
                },
                {
                  id: 5,
                  title: 'Вечернее совещание',
                  taskList: ['Отчитаться о проделанной работе', 'Убраться на рабочем месте', 'Выключить компьютер']
                }],
        statusModuleWindow: false
    },
    getters: {
        validTask(state) {
          return state.tasks.filter(task => {
            return task.title
          })
        },
        allTasks(state) {
            return state.tasks
        },
        currentStatus(state) {
            return state.statusModuleWindow
        }
    },
}