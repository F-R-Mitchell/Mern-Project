import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useAppContext } from '../context/appContext'
import { Box, Divider, Grid, IconButton } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const TodoList = ({ _id, taskName, taskDescription, index }) => {
  const { deleteTask, setEditTask } = useAppContext()

  //
  return (
    <Grid item xs={6}>
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
            <Typography noWrap>{taskName}</Typography>
          </AccordionSummary>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box>
            <IconButton onClick={() => setEditTask(_id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteTask(_id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider orientation="horizontal" variant="middle" flexItem />
        <AccordionDetails>
          <Typography style={{ wordWrap: 'break-word', maxWidth: '500px' }}>
            {taskDescription}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}
export default TodoList
