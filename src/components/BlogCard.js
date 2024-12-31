import React from 'react';
import { CalendarIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 overflow-hidden display-webkit-box webkit-line-clamp-2 webkit-box-orient-vertical">
          <Link 
            to={`/posts/${post.id}`} 
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h2>
        
        <div className="flex-grow">
          <p className="text-gray-600 text-sm overflow-hidden display-webkit-box webkit-line-clamp-3 webkit-box-orient-vertical">
            {post.content}
          </p>
        </div>
      </div>

      <div className="mt-auto px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 rounded-b-lg">
        <div className="flex items-center text-gray-500 text-sm">
          <UserIcon className="w-4 h-4 mr-2" />
          <span className="font-medium">
            {post.email || 'Anonymous'}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;