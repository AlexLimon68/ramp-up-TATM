INSERT INTO todo_lists ( name ) VALUES ("casa");
INSERT INTO todo_lists ( name ) VALUES ("escuela");
INSERT INTO todo_lists ( name ) VALUES ("trabajo");

INSERT INTO tasks (
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    1,
    'Barrer',
    'Barrer',
    'in_progress',
    'medium',
    1.5
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    1,
    'Trapear',
    'Trapear',
    'pending',
    'low'
    1.5
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours 
) VALUES (
    1,
    'Lavar',
    'Lavar',
    'pending',
    'low',
    2.3
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    1,
    'Planchar',
    'Planchar',
    'pending',
    'high',
    0.5
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours 
) VALUES (
    1,
    'Cambiar foco',
    'Cambiar foco',
    'pending',
    'medium',
    1.2
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    1,
    'Comprar shampoo',
    'comprar shampoo',
    'pending',
    'medium',
    0.5
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    1,
    'Cocinar',
    'done',
    'high',
    'medium',
    1.0
);




INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    2,
    'Tarea 1 - automatas',
    'Tarea',
    'pending',
    'low',
    1.0
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    2,
    'Tarea 2 - Automatas',
    'tarea',
    'in_progress',
    'high',
    1.5
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    2,
    'Tarea 1 - BigData',
    'tarea',
    'done',
    'low',
    2.1
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    2,
    'Tarea 2 - BigData',
    'tarea',
    'done',
    "low",
    1.0
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    2,
    'Tarea 2 - IAGen',
    'tarea',
    'done',
    'low',
    1.5
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    2,
    'Tarea 1 - Ciencia Datos',
    'b',
    'done',
    'medium',
    1.2
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    2,
    'Tarea 4 - Ciencia Datos',
    'b',
    'pending',
    'high',
    2.5
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    2,
    'Tarea 1 - Calculo',
    'b',
    'done',
    'high',
    2.1
);



INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    3,
    'BD',
    'a',
    'pending',
    'high',
    3.5
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    3,
    'TS',
    'a',
    'pending',
    'high',
    4.0
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    3,
    'HTTP',
    'a',
    'pending',
    'high',
    5.5
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    3,
    'Node',
    'a',
    'done',
    'medium',
    3.0
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    3,
    'pnpm',
    'a',
    'done',
    'medium',
    3.5
);

INSERT INTO tasks ( 
    list_id, 
    title, 
    description, 
    status, 
    priority,
    estimated_hours
) VALUES (
    3,
    'Aclarar dudas',
    'a',
    'pending',
    'high',
    1.5
);


INSERT INTO tags (name) VALUES ("Aburrido");
INSERT INTO tags (name) VALUES ("Divertido");
INSERT INTO tags (name) VALUES ("Tedioso");
INSERT INTO tags (name) VALUES ("Confuso");
INSERT INTO tags (name) VALUES ("Tardado");


INSERT INTO tasks_tags (task_id, tag_id) VALUES (1, 1);
INSERT INTO tasks_tags (task_id, tag_id) VALUES (2, 1);
INSERT INTO tasks_tags (task_id, tag_id) VALUES (3, 1);
INSERT INTO tasks_tags (task_id, tag_id) VALUES (5, 5);
INSERT INTO tasks_tags (task_id, tag_id) VALUES (9, 3);
INSERT INTO tasks_tags (task_id, tag_id) VALUES (10, 4);
INSERT INTO tasks_tags (task_id, tag_id) VALUES (14, 2);
INSERT INTO tasks_tags (task_id, tag_id) VALUES (16, 4);
INSERT INTO tasks_tags (task_id, tag_id) VALUES (18, 4);
INSERT INTO tasks_tags (task_id, tag_id) VALUES (19, 2);
INSERT INTO tasks_tags (task_id, tag_id) VALUES (17, 4);


SELECT * FROM tasks WHERE status = 'pending' AND list_id = 2 ORDER BY due_date DESC;

SELECT * FROM tasks WHERE due_date <= CURDATE() AND (status = 'pending' OR status = 'in_progress');

SELECT td.name, COUNT(t.id) AS total FROM todo_lists td LEFT JOIN tasks t ON td.id = t.list_id GROUP BY td.name;

SELECT t.name, COUNT(tt.task_id) AS total FROM tags t JOIN tasks_tags tt ON t.id = tt.tag_id GROUP BY t.name ORDER BY total DESC LIMIT 3;

SELECT status, COUNT(status) AS total_estado FROM tasks WHERE list_id = 1 GROUP BY status;

ALTER TABLE tasks DROP FOREIGN KEY fk_task_list;
ALTER TABLE tasks DROP INDEX idx_task_list_status;
CREATE INDEX idx_task_list_status ON tasks(list_id, status);
ALTER TABLE tasks ADD CONSTRAINT fk_task_list FOREIGN KEY (list_id) REFERENCES todo_lists(id) ON DELETE CASCADE;

START TRANSACTION;

INSERT INTO tasks (list_id, title, description, status, priority) values (1, 'prueba2', 'p2', 'pending', 'low');
INSERT INTO tasks_tags (task_id, tag_id) VALUES (22, 6);

ROLLBACK;

