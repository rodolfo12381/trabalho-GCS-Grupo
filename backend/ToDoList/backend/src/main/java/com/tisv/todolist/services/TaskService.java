package com.tisv.todolist.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tisv.todolist.entities.Task;
import com.tisv.todolist.repositories.TaskRepository;
import com.tisv.todolist.services.exceptions.DatabaseException;
import com.tisv.todolist.services.exceptions.ResourceNotFoundException;

@Service
public class TaskService {

	
	@Autowired
	private TaskRepository repository;
	
	
	@Transactional(readOnly = true)
	public Page<Task> findAllPaged(Pageable pageable) {
		return repository.findAll(pageable);
	}
	
	@Transactional
	public Task insert(Task dto) {
		return repository.save(dto);
	}
	
	@Transactional
	public Task update(Long id, Task dto) {
		try {
			Task entity = repository.getReferenceById(id);
			entity.setTitle(dto.getTitle());
			entity.setDifficulty(dto.getDifficulty());
			entity.setUsuario(dto.getUsuario());
			entity = repository.save(entity);
			return entity;
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
	
	
}
