import { useState } from 'react'
import styles from './TodoApp.module.css'
import TodoList from './TodoList'

function loadNextId() {
  const savedNextId = localStorage.getItem('nextId')
  if (savedNextId) {
    return parseInt(savedNextId)
  }
  return 0
}

function saveNextId(nextId) {
  localStorage.setItem('nextId', nextId.toString())
}

function loadTodos() {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    return JSON.parse(savedTodos)
  }
  return []
}

function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

export default function TodoApp() {
  const [todos, setTodos] = useState(loadTodos())
  const [nextId, setNextId] = useState(loadNextId())
  const [text, setText] = useState('')

  function hendleAddTodo(e) {
    setText('')
    const newTodo = {
      id: nextId,
      text: text,
      done: false,
    }
    setTodos([...todos, newTodo])
    saveTodos([...todos, newTodo])

    setNextId(nextId + 1)
    saveNextId(nextId + 1)
  }

  function onChange(e) {
    setText(e.target.value)
  }

  function changeTodo(nextTodo) {
    setTodos(todos.map((todo) => (todo.id === nextTodo.id ? nextTodo : todo)))
    saveTodos(todos.map((todo) => (todo.id === nextTodo.id ? nextTodo : todo)))
  }

  function onDelete(todoId) {
    setTodos(todos.filter((todo) => todo.id !== todoId))
    saveTodos(todos.filter((todo) => todo.id !== todoId))
  }

  return (
    <div>
      <h1 style={{ color: 'white' }}>Todo List</h1>
      <form>
        <input
          className={styles.i}
          type="text"
          onChange={onChange}
          value={text}
        />
        <button className={styles.b} type="button" onClick={hendleAddTodo}>
          Add
        </button>
      </form>
      <TodoList todos={todos} changeTodo={changeTodo} onDelete={onDelete} />
      {/* <button className={styles.bd} onClick={() => localStorage.clear()}>
        clear all after exit
      </button> */}
    </div>
  )
}
