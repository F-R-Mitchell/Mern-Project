import NewsArticle from './NewsArticle'
import { useEffect, useState } from 'react'
import Loading from './Loading'

const NewsContainer = ({ categorySearch, companySearch }) => {
  const [newsArticles, setNewsArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState('')

  const newsArticleAPI = (categorySearch, companySearch) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
      categorySearch ?? 'general'
    }&apiKey=${process.env.REACT_APP_API_KEY}`

    setIsLoading(true)

    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          data.articles.forEach((item, i) => {
            item.id = i + 1
          })
          setStatus(data.status)
          setNewsArticles([data.articles])
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    newsArticleAPI(categorySearch, companySearch)
    // eslint-disable-next-line
  }, [categorySearch, companySearch])

  if (status !== 'ok') {
    return <div>No Articles to Display</div>
  }

  return (
    <div>
      {isLoading ? (
        <Loading center />
      ) : (
        <NewsArticle article={newsArticles[0]} />
      )}
    </div>
  )
}
export default NewsContainer
