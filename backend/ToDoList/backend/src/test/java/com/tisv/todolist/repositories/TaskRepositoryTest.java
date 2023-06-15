package com.tisv.todolist.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.tisv.todolist.entities.Role;
import com.tisv.todolist.entities.Task;

@DataJpaTest
public class TaskRepositoryTest {

	@Autowired
	private TaskRepository repository;

	private long idExistente;
	private long idNaoExistente;
	private long quantidadeTask;

	@BeforeEach
	void setUp() throws Exception {
		idExistente = 1L;
		idNaoExistente = 1000L;
		quantidadeTask = 1;
	}

	@Test
	public void salvarDevePersistirATaskQuandoIdENulo() {
		Task task = new Task();

		task = repository.save(task);

		Assertions.assertNotNull(task.getId());
		Assertions.assertEquals(quantidadeTask + 1, task.getId());
	}

	@Test
	public void deleteDeveDeletarTaskQuandoIdExiste() {

		Task task = new Task();
		task = repository.save(task);

		repository.deleteById(idExistente);

		Optional<Task> result = repository.findById(idExistente);
		Assertions.assertFalse(result.isPresent());
	}
	
	@Test
	public void deleteDeveLancarExcecaoQuandoIdNaoExiste() {
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(idNaoExistente);
		});

	}
}
