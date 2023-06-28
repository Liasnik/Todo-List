import Todo from './Todo'

export default function TodoList({ todos, changeTodo, onDelete }) {
  return (
    <div style={{ margin: '20px auto' }}>
      {todos.map((t) => (
        <div key={t.id} style={{ display: 'flex' }}>
          <Todo todo={t} changeTodo={changeTodo} onDelete={onDelete} />
        </div>
      ))}
    </div>
  )
}
