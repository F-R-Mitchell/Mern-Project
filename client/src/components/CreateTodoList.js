import FormRow from './FormRow'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import TodoList from './TodoList'
import { useEffect } from 'react'

const CreateTodoList = () => {
  const {
    taskName,
    taskDescription,
    createTask,
    getTasks,
    displayAlert,
    handleChange,
    isLoading,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskName || !taskDescription) {
      displayAlert()
      return
    }
    createTask()
    getTasks()
  }
  const handleTaskInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  useEffect(() => {
    getTasks()
  // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return (
      <div>
        <Loading center />
      </div>
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h4 className="text-3xl">Add Task</h4>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Task Name"
            name="taskName"
            value={taskName}
            handleChange={handleTaskInput}
          />
          <FormRow
            type="text"
            labelText="Task Description"
            name="taskDescription"
            value={taskDescription}
            handleChange={handleTaskInput}
          />
          <button
            className="btn btn-block submit-btn bg-[#2cb1bc]"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
      <TodoList />
    </div>
  )
}
export default CreateTodoList
