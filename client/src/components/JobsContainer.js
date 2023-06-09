import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import PaigeBtnContainer from './PaigeBtnContainer'
import Alert from './Alert'
const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    numOfPages,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    showAlert,
    minSalary,
    maxSalary,
  } = useAppContext()

  useEffect(() => {
    getJobs()
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort, minSalary, maxSalary])

  if (isLoading) {
    return (
      <div>
        <Loading center />
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <div>No Jobs to Display</div>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5 className=" text-xl">
        {totalJobs} Job{jobs.length > 1 && 's'} found
      </h5>

      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PaigeBtnContainer />}
    </Wrapper>
  )
}
export default JobsContainer
