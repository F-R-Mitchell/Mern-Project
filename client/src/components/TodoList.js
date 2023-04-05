import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'

const TodoList = () => {
  const { getTasks, tasks } = useAppContext()
  useEffect(() => {
    getTasks()
  }, [])
  return (
    <div>
      {tasks.map((task) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{task.taskName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{task.taskDescription}</Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}
export default TodoList
