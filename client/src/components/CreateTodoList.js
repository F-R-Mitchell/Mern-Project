import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import TodoList from './TodoList'
import { useEffect } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import Alert from './Alert'

const CreateTodoList = () => {
  const {
    taskName,
    taskDescription,
    createTask,
    getTasks,
    displayAlert,
    handleChange,
    isLoading,
    isEditing,
    editTask,
    showAlert,
    tasks,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskName || !taskDescription) {
      displayAlert()
      return
    }
    if (isEditing) {
      editTask()
      getTasks()
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
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="text-3xl">{isEditing ? 'Edit Task' : 'Add Task'}</h4>
        {showAlert && <Alert />}
        <br />
        <div className="form-center">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Task Name"
                multiline
                maxRows={4}
                name="taskName"
                value={taskName}
                onChange={handleTaskInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Task Description"
                multiline
                maxRows={10}
                value={taskDescription}
                name="taskDescription"
                onChange={handleTaskInput}
              />
            </Grid>
          </Grid>
          <br />
          <Button
            variant="contained"
            sx={{ color: 'white', backgroundColor: '#2cb1bc' }}
            onClick={handleSubmit}
            type="button"
          >
            Submit
          </Button>
        </div>
      </form>
      {tasks.map((task, index) => {
        return <TodoList key={index} {...task} />
      })}
    </div>
  )
}
export default CreateTodoList
