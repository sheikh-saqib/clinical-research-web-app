package com.example.clinical_research.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

public abstract class GenericService<T, ID> {

    @Autowired
    private JpaRepository<T, ID> repository;

    public T save(T entity) {
        return repository.save(entity);
    }

    public List<T> findAll() {
        return repository.findAll();
    }

    public Optional<T> findById(ID id) {
        return repository.findById(id);
    }

    public T update(ID id, T entityDetails) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Entity not found");
        }
        return repository.save(entityDetails);
    }

    public void deleteById(ID id) {
        repository.deleteById(id);
    }

    protected void setRepository(JpaRepository<T, ID> repository) {
        this.repository = repository;
    }
}
