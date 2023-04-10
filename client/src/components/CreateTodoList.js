import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import TodoList from './TodoList'
import { useEffect } from 'react'
import { Button, Grid, TextField } from '@mui/material'

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
      <form className="form">
        <h4 className="text-3xl">Add Task</h4>
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
                onChange={handleTaskInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Task Description"
                multiline
                maxRows={4}
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
          >
            Submit
          </Button>
        </div>
      </form>
      <TodoList />
    </div>
  )
}
export default CreateTodoList
