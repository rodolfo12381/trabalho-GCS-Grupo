import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

// CSS
import styles from "./TaskForm.module.css";
// Interface
import { ITask } from "../interfaces/Task";

interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number): void;
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/task");
        const tasks = response.data.content;
        if (tasks.length > 0) {
          setTaskList!([...taskList, ...tasks]);
        }
      } catch (error) {
        console.error("Erro ao obter as tarefas:", error);
      }
    };
  
    fetchData();
  }, []);

  const addTaskHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleUpdate) {
      handleUpdate(id, title, difficulty);
    } else {
      const id = Math.floor(Math.random() * 1000);
      const newTask: ITask = { id, title, difficulty };

      try {
        const response = await axios.post("http://localhost:8080/task",newTask);
        const { data } = response;
        console.log(data);

      // Adicione o ID da tarefa recuperado do banco de dados à nova tarefa
        newTask.id = data.id;

      // Adicione a nova tarefa à lista
      setTaskList!([...taskList, newTask]);
      } catch (error) {
        console.error("Erro ao obter os usuários:", error);
      }

      setTitle("");
      setDifficulty(0);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDifficulty(parseInt(e.target.value));
    }
  };

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input
          type="text"
          name="difficulty"
          placeholder="Dificuldade da tarefa"
          onChange={handleChange}
          value={difficulty}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;
