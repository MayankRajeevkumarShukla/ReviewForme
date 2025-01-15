import React from 'react'

function Dashboard() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-8 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Welcome to the Dashboard!
      </h1>
      <p className="text-lg text-gray-700 text-center">
        You are successfully authenticated. 🎉
      </p>
    </div>
  </div>
  )
}

export default Dashboard
