import { useMemo, useState } from 'react'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useAppContext } from '../context/appContext'
import FormRow from './FormRow'
const NewsSearchContainer = () => {
  const { handleChange, isLoading } = useAppContext()

  
  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleSearch('')
    setCompanySearch('')
  }
  const [titleSearch, setTitleSearch] = useState('')
  const [companySearch, setCompanySearch] = useState('')

  const debounce = () => {
    let timeoutID
    return (e) => {
      e.target.name === 'titleSearch'
        ? setTitleSearch(e.target.value)
        : setCompanySearch(e.target.value)

      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value })
      }, 1000)
    }
  }
  // eslint-disable-next-line
  const optimizeDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="title search"
            name="titleSearch"
            value={titleSearch ?? ''}
            handleChange={optimizeDebounce}
          />
          <FormRow
            type="text"
            labelText="company search"
            name="companySearch"
            value={companySearch ?? ''}
            handleChange={optimizeDebounce}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default NewsSearchContainer
