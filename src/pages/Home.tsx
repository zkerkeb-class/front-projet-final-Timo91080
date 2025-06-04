import React from 'react'
import { mockArticles } from '../api/mockArticles'
import ArticleCard from '../components/ArticleCard'
import './Home.css'
export default function Home() {
  return (
    <div>
      <div className='Actufoot'>Tout sur le foot </div>
      {mockArticles.map((article, idx) => (
        <ArticleCard key={idx} {...article} />
      ))}
    </div>
  )
}