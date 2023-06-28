import { useState } from 'react'
import styles from './Todo.module.css'

export default function Todo({ todo, changeTodo, onDelete }) {
  const [edit, setEdit] = useState(false)

  function hendleEdit() {
    !edit ? setEdit(true) : setEdit(false)
  }

  let todoContent
  !edit
    ? (todoContent = (
        <>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={(e) =>
              changeTodo({
                ...todo,
                done: e.target.checked,
              })
            }
            className={styles.check}
          />
          <input className={styles.todo} readOnly value={todo.text} />
          <button onClick={hendleEdit} className={styles.b}>
            Edit
          </button>
        </>
      ))
    : (todoContent = (
        <>
          <input
            className={styles.todoEdit}
            onChange={(e) =>
              changeTodo({
                ...todo,
                text: e.target.value,
              })
            }
            value={todo.text}
          />
          <button onClick={hendleEdit} className={styles.b}>
            Save
          </button>
          <button className={styles.bd} onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </>
      ))

  return <div>{todoContent}</div>
}
