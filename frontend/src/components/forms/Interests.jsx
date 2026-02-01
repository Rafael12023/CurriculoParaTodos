import { useState } from 'react'
import { FiSmile, FiPlus, FiX, FiMusic, FiBook, FiCamera, FiFilm, FiHeart, FiCoffee, FiSun } from 'react-icons/fi'
import { 
  MdSportsSoccer, MdFitnessCenter, MdOutlineVideogameAsset, 
  MdOutlinePets, MdOutlineTheaters, MdOutlineBrush 
} from 'react-icons/md'

function Interests({ data, onUpdate }) {
  const [interests, setInterests] = useState(data || [])
  const [customInterest, setCustomInterest] = useState('')

  // Lista de interesses pré-definidos com ícones
  const predefinedInterests = [
    { id: 'esportes', name: 'Esportes', icon: MdSportsSoccer, color: 'bg-green-100 text-green-600' },
    { id: 'musica', name: 'Música', icon: FiMusic, color: 'bg-purple-100 text-purple-600' },
    { id: 'leitura', name: 'Leitura', icon: FiBook, color: 'bg-amber-100 text-amber-600' },
    { id: 'fotografia', name: 'Fotografia', icon: FiCamera, color: 'bg-pink-100 text-pink-600' },
    { id: 'cinema', name: 'Cinema/Séries', icon: FiFilm, color: 'bg-red-100 text-red-600' },
    { id: 'games', name: 'Games', icon: MdOutlineVideogameAsset, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'fitness', name: 'Academia/Fitness', icon: MdFitnessCenter, color: 'bg-orange-100 text-orange-600' },
    { id: 'pets', name: 'Animais de Estimação', icon: MdOutlinePets, color: 'bg-teal-100 text-teal-600' },
    { id: 'teatro', name: 'Teatro', icon: MdOutlineTheaters, color: 'bg-rose-100 text-rose-600' },
    { id: 'arte', name: 'Arte/Desenho', icon: MdOutlineBrush, color: 'bg-cyan-100 text-cyan-600' },
    { id: 'viagens', name: 'Viagens', icon: FiSun, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'gastronomia', name: 'Gastronomia', icon: FiCoffee, color: 'bg-stone-100 text-stone-600' },
    { id: 'voluntariado', name: 'Causas Sociais', icon: FiHeart, color: 'bg-red-100 text-red-600' },
  ]

  const toggleInterest = (interestName) => {
    let updated
    if (interests.includes(interestName)) {
      updated = interests.filter(i => i !== interestName)
    } else {
      updated = [...interests, interestName]
    }
    setInterests(updated)
    onUpdate(updated)
  }

  const addCustomInterest = () => {
    if (customInterest.trim() && !interests.includes(customInterest.trim())) {
      const updated = [...interests, customInterest.trim()]
      setInterests(updated)
      onUpdate(updated)
      setCustomInterest('')
    }
  }

  const removeInterest = (interestName) => {
    const updated = interests.filter(i => i !== interestName)
    setInterests(updated)
    onUpdate(updated)
  }

  const isCustom = (interest) => {
    return !predefinedInterests.some(p => p.name === interest)
  }

  return (
    <div className="space-y-6">
      <div className="section-title">
        <FiSmile className="text-primary-500" />
        Interesses e Hobbies
      </div>

      <p className="text-gray-500 text-sm">
        Seus hobbies podem ser um diferencial! Eles mostram sua personalidade e 
        podem criar conexões com recrutadores que compartilham interesses semelhantes.
      </p>

      {/* Interesses selecionados */}
      {interests.length > 0 && (
        <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-5 border border-primary-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Seus interesses:</h4>
          <div className="flex flex-wrap gap-2">
            {interests.map(interest => {
              const predefined = predefinedInterests.find(p => p.name === interest)
              const Icon = predefined?.icon || FiSmile
              const colorClass = predefined?.color || 'bg-gray-100 text-gray-600'
              
              return (
                <span
                  key={interest}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${colorClass}`}
                >
                  <Icon size={16} />
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-1 hover:text-red-500 transition-colors"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Grid de interesses pré-definidos */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Selecione seus interesses:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {predefinedInterests.map(interest => {
            const Icon = interest.icon
            const isSelected = interests.includes(interest.name)
            
            return (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.name)}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  isSelected 
                    ? 'border-primary-500 bg-primary-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${interest.color}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-sm font-medium ${isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                  {interest.name}
                </span>
                {isSelected && (
                  <span className="text-xs text-primary-500">✓ Selecionado</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Adicionar interesse personalizado */}
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Adicionar outro interesse:</h4>
        <div className="flex gap-3">
          <input
            type="text"
            className="input-field flex-1"
            placeholder="Ex: Xadrez, Culinária Japonesa, Astronomia..."
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
          />
          <button
            type="button"
            onClick={addCustomInterest}
            disabled={!customInterest.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FiPlus size={18} />
            Adicionar
          </button>
        </div>
      </div>

      {interests.length === 0 && (
        <div className="text-center py-6">
          <div className="text-xs text-gray-500">
            💡 Dica: Interesses como "leitura" podem indicar curiosidade intelectual, 
            "esportes em equipe" demonstram trabalho em grupo, e "games" podem 
            indicar pensamento estratégico.
          </div>
        </div>
      )}
    </div>
  )
}

export default Interests
