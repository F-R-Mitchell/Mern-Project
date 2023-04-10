import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useAppContext } from '../context/appContext'
import { Box, Divider, IconButton } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const TodoList = () => {
  const { tasks, deleteTask } = useAppContext()

  //
  return (
    <div>
      {tasks.map((task, index) => {
        return (
          <Accordion>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
              key={index}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ mr: 'auto' }}
              >
                <Typography>{task.taskName}</Typography>
              </AccordionSummary>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box>
                <IconButton onClick={() => alert('edit')}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteTask(task._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
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
