import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [];
if(JSON.parse(localStorage.getItem('todo'))){
  let localStore = JSON.parse(localStorage.getItem('todo'));
  initialTodos.push(...localStore);
}

function convertToJson(state, action) {
  if(action.type === "CREATE") {
    return JSON.stringify(state.concat(action.todo));
  };
  if(action.type === "TOGGLE") {
    return JSON.stringify(
      state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  if(action.type === "REMOVE") {
    return JSON.stringify(
      state.filter(todo => todo.id !== action.id)
    );
  };
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      localStorage.setItem('todo', convertToJson(state, action));
      return state.concat(action.todo);
    case 'TOGGLE':
      localStorage.setItem('todo', convertToJson(state, action));
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      localStorage.setItem('todo', convertToJson(state, action));
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(1);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}