import React from 'react'
import moment from 'moment'
import 'moment/locale/en-gb'
const NewsArticle = ({ article }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col items-center mb-7">
        <h1 className="text-5xl font-bold mb-2 text-gray-900">
          <span className="text-[#2cb1bc]">LATEST</span> NEWS
        </h1>
        <div className="w-20 h-1 bg-[#2cb1bc] mb-8"></div>
      </div>

      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {article.map(
            (item) =>
              item.urlToImage && (
                <div key={item.id}>
                  <div
                    key={item.url}
                    className="rounded-lg overflow-hidden shadow-lg bg-[#2cb1bc] hover:shadow-xl transition-all duration-300"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={item.urlToImage}
                        alt={item.title}
                        className="w-full h-48 object-cover object-center"
                      />
                    </a>
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-2 text-white">
                        {item.title}
                      </h2>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-black-400 text-md font-bold mb-4">
                          {moment(item.publishedAt).fromNow()}
                        </p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0a6c74] border border-[#0a6c74] text-white py-2 px-4 rounded-md hover:bg-[#FFFFFF] hover:border-white hover:text-black transition-all duration-200"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        {/* {numOfNewsPages > 1 && <PaigeBtnContainer />} */}
      </>
    </div>
  )
}
export default NewsArticle
