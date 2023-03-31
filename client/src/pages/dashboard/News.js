import { useState } from 'react'
import { NewsContainer } from '../../components'
import NewsSearchContainer from '../../components/NewsSearchContainer'

const News = () => {
  const [categorySearch, setCategorySearch] = useState('')
  const [companySearch, setCompanySearch] = useState('')
  return (
    <>
      <NewsSearchContainer
        categorySearch={categorySearch}
        companySearch={companySearch}
        setCompanySearch={setCompanySearch}
        setCategorySearch={setCategorySearch}
      />
      <NewsContainer
        categorySearch={categorySearch}
        companySearch={companySearch}
      />
    </>
  )
}
export default News
