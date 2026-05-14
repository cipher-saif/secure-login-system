import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 text-center">
        <h1 className="text-4xl font-bold mb-4">🔐 Secure Dashboard</h1>
        <p className="text-gray-300 mb-6">
          Your account is protected against brute force attacks.
        </p>

        <button
          onClick={logout}
          className="bg-red-500 px-6 py-3 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard