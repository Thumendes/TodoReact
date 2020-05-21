import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Context = createContext([]);
const url = "http://localhost:3001/todos";

export default ({ children }) => {
  //Estados
  const [todos, setTodos] = useState([]);

  // Função que atualiza os Todos
  const getTodos = async () => {
    const { data } = await axios.get(url);
    setTodos(data);
  };

  // Função que atualiza o estado do componente
  useEffect(() => {
    getTodos();
  }, []);

  // Função que atualiza o Todo e retorna os Todos alterados
  const updateDados = async (target, id) => {
    const currTodo = todos.find((todo) => todo.id === id);
    await axios.put(`${url}/${id}`, { ...currTodo, feito: target.checked });
    getTodos();
  };

  //Função que adiciona o Todo
  const addTodo = async (title) => {
    const templateTodo = { feito: false, title: title };
    await axios.post(url, templateTodo);
    getTodos();
  };

  //Função que deleta o Todo
  const removeTodo = async (id) => {
    await axios.delete(`${url}/${id}`);
    getTodos();
  };

  const updateValueTodo = async (value, id) => {
    const currTodo = todos.find((todo) => todo.id === id);
    await axios.put(`${url}/${id}`, { ...currTodo, title: value });
    getTodos()
  };

  return (
    <Context.Provider
      value={{ todos, updateDados, addTodo, removeTodo, updateValueTodo }}
    >
      {children}
    </Context.Provider>
  );
};
