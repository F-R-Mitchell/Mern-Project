import React, { useContext, useEffect, useReducer } from 'react'
import {
  CHANGE_PAGE,
  CLEAR_FILTERS,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  DISPLAY_ALERT,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  HANDLE_CHANGE,
  HIDE_ALERT,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  SET_EDIT_JOB,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from './actions'
import reducer from './reducer'
import axios from 'axios'

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  userLocation: '',
  jobLocation: '',
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  page: 1,
  numOfPages: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    })
    hideAlert()
  }
  const hideAlert = () => {
    setTimeout(
      () =>
        dispatch({
          type: HIDE_ALERT,
        }),
      3000
    )
  }
  const toggleSidebar = () => {
    dispatch({
      type: TOGGLE_SIDEBAR,
    })
  }

  const setUpUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      const { user, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText },
      })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.message },
      })
    }
    hideAlert()
  }
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      const { user, location } = data
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.message },
        })
      }
    }
    hideAlert()
  }

  const logoutUser = async () => {
    await authFetch.get('/auth/logout')
    dispatch({ type: LOGOUT_USER })
  }

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    })
  }

  const handleClearJob = () => {
    dispatch({
      type: CLEAR_VALUES,
    })
  }

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })
    try {
      const { position, company, jobLocation, jobType, status } = state
      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: CREATE_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.message },
      })
      hideAlert()
    }
  }

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state
    let url = `/jobs?page=${page}status=${searchStatus}&jobType=${searchType}&sort=${sort}`

    if (search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_JOBS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { jobs, totalJobs, numOfPages } = data
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      })
    } catch (error) {
      logoutUser()
    }
    hideAlert()
  }

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } })
  }

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN })

    try {
      const { position, company, jobLocation, jobType, status } = state

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: EDIT_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.message },
      })
    }
    hideAlert()
  }

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN })
    try {
      await authFetch.delete(`/jobs/${jobId}`)
      getJobs()
    } catch (error) {
      if (error.response.status === 401) {
        return
      }
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.message },
      })
    }
    hideAlert()
  }
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch.get('/jobs/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      })
    } catch (error) {
      return
    }
    hideAlert()
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN })
    try {
      const { data } = await authFetch('/auth/getCurrentUser')
      const { user, location } = data

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      })
    } catch (error) {
      if (error.response.status === 401) return
      logoutUser()
    }
  }
  useEffect(() => {
    getCurrentUser()
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setUpUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        handleClearJob,
        createJob,
        getJobs,
        editJob,
        setEditJob,
        deleteJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
export const displayAlert = () => {
  dispatchEvent({ type: DISPLAY_ALERT })
}

export { AppProvider, initialState }
