import React, { useContext, useState } from "react";
import {
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  TextField,
  Box,
  IconButton,
} from "@material-ui/core";
import { Add, Delete, Edit, Check } from "@material-ui/icons";
import { Context } from "../../Context";

const FormAddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const adicionarTodo = () => {
    addTodo(title);
    setTitle("");
  };

  const handleEnterClick = (event) => {
    if (event.key === "Enter") {
      addTodo(title);
      setTitle("");
    }
  };

  return (
    <Box>
      <IconButton onClick={adicionarTodo}>
        <Add />
      </IconButton>
      <TextField
        onKeyPress={handleEnterClick}
        placeholder="Adicione uma tarefa"
        size="small"
        onChange={({ target }) => setTitle(target.value)}
        value={title}
      />
    </Box>
  );
};

const Todo = () => {
  const {
    todos,
    updateDados,
    addTodo,
    removeTodo,
    updateValueTodo,
  } = useContext(Context);
  const [isEditing, setIsEditing] = useState({ current: null, text: "" });

  const handleEdit = (current, text) => {
    setIsEditing({ current: current, text: text });
  };

  const saveEdit = () => {
    updateValueTodo(isEditing.text, isEditing.current);
    setIsEditing({ current: null, text: "" });
  };

  return (
    <>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} size="small">
            <Box hidden={isEditing.current === todo.id}>
              <FormControlLabel
                onDoubleClick={() => handleEdit(todo.id, todo.title)}
                label={todo.feito ? <strike>{todo.title}</strike> : todo.title}
                onChange={({ target }) => updateDados(target, todo.id)}
                control={<Checkbox checked={todo.feito} />}
              />
              <IconButton onClick={() => removeTodo(todo.id)} color="secondary">
                <Delete />
              </IconButton>
              <IconButton onClick={() => handleEdit(todo.id, todo.title)}>
                <Edit />
              </IconButton>
            </Box>
            <Box hidden={isEditing.current !== todo.id}>
              <TextField
                value={isEditing.text}
                onChange={({ target }) =>
                  setIsEditing({ ...isEditing, text: target.value })
                }
              />
              <IconButton onClick={saveEdit}>
                <Check />
              </IconButton>
            </Box>
          </ListItem>
        ))}
        <FormAddTodo addTodo={addTodo} />
      </List>
    </>
  );
};

export default Todo;
