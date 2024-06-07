package com.example.clinical_research.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.example.clinical_research.interfaces.IGeneric;

@Service
public abstract class GenericService<T, ID> implements IGeneric<T, ID> {

    @Autowired
    private JpaRepository<T, ID> repository;

    @Override
    public T save(T entity) {
        return repository.save(entity);
    }

    @Override
    public List<T> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<T> findById(ID id) {
        return repository.findById(id);
    }

    @Override
    public T update(ID id, T entityDetails) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Entity not found");
        }
        return repository.save(entityDetails);
    }

    @Override
    public void deleteById(ID id) {
        repository.deleteById(id);
    }

    protected void setRepository(JpaRepository<T, ID> repository) {
        this.repository = repository;
    }
}