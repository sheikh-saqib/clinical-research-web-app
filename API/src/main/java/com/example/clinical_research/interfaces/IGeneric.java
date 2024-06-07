package com.example.clinical_research.interfaces;

import java.util.List;
import java.util.Optional;

public interface IGeneric<T, ID> {

    T save(T entity);

    List<T> findAll();

    Optional<T> findById(ID id);

    T update(ID id, T entityDetails);

    void deleteById(ID id);
}
