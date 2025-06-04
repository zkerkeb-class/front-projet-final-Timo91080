import React from 'react'
import './ArticleCard.css'

type ArticleProps = {
  title: string
  link: string
  pubDate: string
  source: string
  description: string
  image?: string
}

export default function ArticleCard({ title, link, pubDate, source, description, image }: ArticleProps) {
  return (
    <div className="article-card">
      {image && (
        <div className="article-image-container">
          <img src={image} alt={title} className="article-image" />
        </div>
      )}
      <h2 className="article-title">
        <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
      </h2>
      <div className="article-meta">
        <span>{source}</span> | <span>{new Date(pubDate).toLocaleDateString()}</span>
      </div>
      <p className="article-desc">{description}</p>
    </div>
  )
}