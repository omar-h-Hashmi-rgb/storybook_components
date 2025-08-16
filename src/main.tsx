import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">React Components Assignment</h1>
      <p className="text-gray-600 mb-4">
        This project contains two React components built with TypeScript and TailwindCSS.
      </p>
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-blue-800">
          <strong>To view the components:</strong> Run <code className="bg-blue-100 px-2 py-1 rounded">npm run storybook</code>
        </p>
      </div>
    </div>
  </React.StrictMode>,
)