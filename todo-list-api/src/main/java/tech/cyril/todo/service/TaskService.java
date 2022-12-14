package tech.cyril.todo.service;

import tech.cyril.todo.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    List<Task> getAll(boolean include_delete);
    Optional<Task> get(Long id);
    Long insert(Task task);
    void updateById(Task task);
    void deleteById(Long id);

}
