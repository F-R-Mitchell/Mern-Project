import { useMemo, useState } from 'react'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useAppContext } from '../context/appContext'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
const NewsSearchContainer = ({
  categorySearch,
  companySearch,
  setCompanySearch,
  setCategorySearch,
}) => {
  const { handleChange, isLoading, clearFilters } = useAppContext()
  const categoryOptions = [
    'general',
    'entertainment',
    'business',
    'health',
    'science',
    'sports',
    'technology',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setCompanySearch('')
    clearFilters()
  }

  const debounce = () => {
    let timeoutID
    return (e) => {

      
      setCompanySearch(e.target.value)
      // : setCompanySearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value })
      }, 3000)
    }
  }
  // eslint-disable-next-line
  const optimizeDebounce = useMemo(() => debounce(), [])
  return (
    <Wrapper>
      <form className="form">
        <h4 className="text-3xl">Search Form</h4>
        <div className="form-center">
          <FormRowSelect
            labelText="category search"
            name="categorySearch"
            value={categorySearch}
            handleChange={(e) => setCategorySearch(e.target.value)}
            list={categoryOptions}
          />
          <FormRow
            type="text"
            labelText="company search"
            name="companySearch"
            value={companySearch}
            handleChange={optimizeDebounce}
          />
          <button
            className="btn btn-block btn-danger w-1/2"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default NewsSearchContainer
