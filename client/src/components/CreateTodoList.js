import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FormRow from './FormRow'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'

const TodoList = () => {
  const {
    taskName,
    taskDescription,
    createTask,
    getTasks,
    displayAlert,
    isEditing,
    handleChange,
    isLoading,
    tasks,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskName || !taskDescription) {
      displayAlert()
      return
    }
    createTask()
  }
  const handleTaskInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }
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
    </div>
  )
}
export default TodoList
