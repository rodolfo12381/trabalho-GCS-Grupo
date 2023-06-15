package com.tisv.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tisv.todolist.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
