import { Button as MuiButton, CardContent, Grid, styled } from '@mui/material'
import Card from '@mui/material/Card'
import { useState } from 'react'

const OutputContainer = styled(`div`)(({ theme }) => ({
  width: '100%',
  textAlign: 'right',
  height: '2em',
  padding: theme.spacing(2),
  fontSize: '3em',
  overflow: 'hidden',
}))

const Button = styled(MuiButton)((props) => ({
  borderColor: props.selected ? '#fff' : 'rgba(44, 177, 188, 0.5)',
}))

const GridOperationButton = ({
  selectedOperation,
  operation,
  selectOperation,
}) => {
  return (
    <Grid item xs={3}>
      <Button
        fullWidth
        variant="outlined"
        sx={{ backgroundColor: 'rgb(44, 177, 188,.1)' }}
        onClick={() => selectOperation(operation)}
        selected={selectedOperation === operation}
      >
        {operation}
      </Button>
    </Grid>
  )
}
const GridDigitButton = ({ digit, enterDigit, xs = 3 }) => {
  return (
    <Grid item xs={xs}>
      <Button fullWidth variant="outlined" onClick={() => enterDigit(digit)}>
        {digit}
      </Button>
    </Grid>
  )
}

const Calculator = () => {
  const [prevValue, setPrevValue] = useState('')
  const [currentValue, setCurrentValue] = useState('0')
  const [operation, setOperation] = useState('')
  const [overwrite, setOverwrite] = useState(true)

  const equals = () => {
    const value = calculate()
    setCurrentValue(`${value}`)
    setPrevValue('')
    setOperation('')
    setOverwrite(true)
  }

  const calculate = () => {
    if (!prevValue || !operation) {
      return currentValue
    }
    const current = parseFloat(currentValue)
    const previous = parseFloat(prevValue)
    let result
    // eslint-disable-next-line default-case
    switch (operation) {
      case '÷':
        return previous / current
      case '*':
        result = previous * current
        break
      case '-':
        result = previous - current
        break
      case '+':
        result = previous + current
        break
    }
    return result
  }

  const clearValue = () => {
    setPrevValue('')
    setOperation('')
    setCurrentValue('0')
    setOverwrite(true)
  }

  const deleteValue = () => {
    setCurrentValue('0')
    setOverwrite(true)
  }
  const percent = () => {
    const current = parseFloat(currentValue)
    setCurrentValue((current / 100).toString())
  }
  const selectOperation = (x) => {
    if (prevValue) {
      const value = calculate()
      setCurrentValue(`${value}`)
      setPrevValue(`${value}`)
    } else {
      setPrevValue(currentValue)
    }
    setOperation(x)
    setOverwrite(true)
  }
  const setDigit = (digit) => {
    if (currentValue[0] === '0' && digit === '0') return
    if (currentValue.includes('.') && digit === '.') return

    if (overwrite && digit !== '.') {
      setCurrentValue(digit)
    } else {
      setCurrentValue(`${currentValue}${digit}`)
    }
    setOverwrite(false)
  }

  return (
    <Card sx={{ width: '28%' }}>
      <CardContent sx={{ width: '100%' }}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12}>
            <OutputContainer data-testid="output">
              {currentValue}
            </OutputContainer>
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridOperationButton
              operation={'AC'}
              selectOperation={clearValue}
              selectedOperation={operation}
            />
            <GridOperationButton
              operation={'C'}
              selectOperation={deleteValue}
              selectedOperation={operation}
            />
            <GridOperationButton
              operation={'%'}
              selectOperation={percent}
              selectedOperation={operation}
            />
            <GridOperationButton
              operation={'÷'}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={'7'} enterDigit={setDigit} />
            <GridDigitButton digit={'8'} enterDigit={setDigit} />
            <GridDigitButton digit={'9'} enterDigit={setDigit} />
            <GridOperationButton
              operation={'*'}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={'4'} enterDigit={setDigit} />
            <GridDigitButton digit={'5'} enterDigit={setDigit} />
            <GridDigitButton digit={'6'} enterDigit={setDigit} />
            <GridOperationButton
              operation={'-'}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={'1'} enterDigit={setDigit} />
            <GridDigitButton digit={'2'} enterDigit={setDigit} />
            <GridDigitButton digit={'3'} enterDigit={setDigit} />

            <GridOperationButton
              operation={'+'}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton xs={6} digit={'0'} enterDigit={setDigit} />
            <GridDigitButton digit={'.'} enterDigit={setDigit} />

            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={equals}>
                =
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default Calculator
