import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/Config'

function PostCard({$id , featuredimage , title}) {
  return (
    <Link to={`/post/${$id}`} className="block mb-4 max-w-sm overflow-hidden border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
      <img className="w-full h-48 object-cover" src={service.getFilePreview(featuredimage)} alt={title} />
      <div className="p-4">
        <h4 className="text-xl font-bold mb-2">{title}</h4>
      </div>
    </Link>
  )
}

export default PostCard




