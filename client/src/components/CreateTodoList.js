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
    handleClear,
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
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  color: 'white',
                  backgroundColor: '#2cb1bc',
                  '&:hover': {
                    backgroundColor: '#0e7c86',
                    color: 'white',
                  },
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  color: 'white',
                  backgroundColor: '#e98d95',
                  '&:hover': {
                    backgroundColor: '#842029',
                    color: 'white',
                  },
                }}
                onClick={(e) => {
                  e.preventDefault()
                  handleClear()
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>

      {tasks.map((task, index) => {
        return <TodoList key={index} {...task} />
      })}
    </div>
  )
}
export default CreateTodoList
