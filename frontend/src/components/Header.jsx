import { Link, useLocation } from 'react-router-dom'
import { FiFileText, FiHome, FiLayout, FiHeart } from 'react-icons/fi'

function Header() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <FiHeart className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-900">Currículo<span className="text-primary-600">ParaTodos</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <FiHome />
              <span>Início</span>
            </Link>
            <Link 
              to="/builder" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/builder') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <FiFileText />
              <span>Criar Currículo</span>
            </Link>
            <Link 
              to="/templates" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/templates') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <FiLayout />
              <span>Templates</span>
            </Link>
          </nav>

          <Link to="/builder" className="btn-primary hidden sm:block">
            Criar Currículo
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
