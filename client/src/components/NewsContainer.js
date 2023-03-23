import NewsArticle from './NewsArticle'
import { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'

const NewsContainer = () => {
  const [newsArticles, setNewsArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const newsArticleAPI = () => {
    setIsLoading(true)
    fetch(
      'https://newsapi.org/v2/everything?q=apple&from=2023-03-21&to=2023-03-21&sortBy=popularity&apiKey=9fc5b7e85c294785a69f7147a00db595'
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsArticles([...newsArticles, data.articles])
        setIsLoading(false)
      })
  }

  useEffect(() => {
    newsArticleAPI()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading center />
      ) : (
        newsArticles.map((newsArticle) => {
          return <NewsArticle article={newsArticle} />
        })
      )}
      <button type="button" onClick={newsArticleAPI}></button>
    </div>
  )
}
export default NewsContainer
