import React, { useState } from 'react';

//components
import Header from './components/Header'
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

//CSS
import styles from './App.module.css'

//Interface
import { ITask } from './interfaces/Task';
import axios from 'axios';

function App() {

  const [taskList,setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)
  
  const deleteTask = async (id: number) => {

    try {
      const response = await axios.delete(`http://localhost:8080/task/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if(display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask):void => {
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const udpateTask = async (id: number, title: string, difficulty: number) => {

    const updatedTask: ITask = {id,title,difficulty}

    try {
      const response = await axios.put(`http://localhost:8080/task/${id}`, updatedTask);
      console.log(response.data);
  
      const updatedItems = taskList.map((task) => {
        return task.id === updatedTask.id ? updatedTask : task;
      });
  
      setTaskList(updatedItems);
      hideOrShowModal(false);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  }

  return (

    <div className="App">
      <Modal children={<TaskForm btnText='Editar Tarefa' taskList={taskList} task={taskToUpdate} handleUpdate={udpateTask}/>}/>
      <Header/>
      <main className={styles.main}>
        <div>
            <h2>O que você vai fazer?</h2>
            <TaskForm btnText='Criar Tarefa' taskList={taskList} setTaskList={setTaskList}/>
        </div>
        <div>
          <h2>Suas tarefas:</h2>
            <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
