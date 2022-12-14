package tech.cyril.todo.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private Boolean done;

    @Column(nullable = false)
    private LocalDateTime createTime;

    @Column(nullable = false)
    private Boolean deleted;

    @PrePersist
    private void prePersist(){
        if(done == null){done = false;}
        if(createTime == null){createTime = LocalDateTime.now();}
        if(deleted == null){deleted = false;}
    }
}
