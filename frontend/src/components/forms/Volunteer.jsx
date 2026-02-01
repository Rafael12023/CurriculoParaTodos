import { useState } from 'react'
import { FiHeart, FiPlus, FiTrash2, FiMapPin } from 'react-icons/fi'
import MonthYearPicker from './MonthYearPicker'

function Volunteer({ data, onUpdate }) {
  const [volunteer, setVolunteer] = useState(data || [])

  const addVolunteer = () => {
    const newVolunteer = {
      id: Date.now(),
      organization: '',
      role: '',
      cause: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    const updated = [...volunteer, newVolunteer]
    setVolunteer(updated)
    onUpdate(updated)
  }

  const updateVolunteer = (id, field, value) => {
    const updated = volunteer.map(vol => 
      vol.id === id ? { ...vol, [field]: value } : vol
    )
    setVolunteer(updated)
    onUpdate(updated)
  }

  const removeVolunteer = (id) => {
    const updated = volunteer.filter(vol => vol.id !== id)
    setVolunteer(updated)
    onUpdate(updated)
  }

  const causes = [
    'Educação',
    'Meio Ambiente',
    'Saúde',
    'Direitos Humanos',
    'Combate à Pobreza',
    'Proteção Animal',
    'Arte e Cultura',
    'Esportes',
    'Tecnologia',
    'Religião',
    'Comunidade',
    'Outro'
  ]

  return (
    <div className="space-y-6">
      <div className="section-title">
        <FiHeart className="text-primary-500" />
        Trabalho Voluntário
      </div>

      <p className="text-gray-500 text-sm">
        Experiências voluntárias demonstram valores, habilidades interpessoais e 
        comprometimento social. Muitas empresas valorizam esse tipo de experiência!
      </p>

      <div className="space-y-6">
        {volunteer.map((vol, index) => (
          <div key={vol.id} className="card border-l-4 border-l-pink-400 animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                Experiência Voluntária
              </h3>
              <button
                type="button"
                onClick={() => removeVolunteer(vol.id)}
                className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                title="Remover"
              >
                <FiTrash2 size={18} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Organização *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ex: Cruz Vermelha, ONG local..."
                  value={vol.organization}
                  onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)}
                />
              </div>

              <div>
                <label className="input-label">Função/Cargo</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ex: Voluntário, Coordenador..."
                  value={vol.role}
                  onChange={(e) => updateVolunteer(vol.id, 'role', e.target.value)}
                />
              </div>

              <div>
                <label className="input-label">Causa</label>
                <select
                  className="input-field"
                  value={vol.cause}
                  onChange={(e) => updateVolunteer(vol.id, 'cause', e.target.value)}
                >
                  <option value="">Selecione a causa</option>
                  {causes.map(cause => (
                    <option key={cause} value={cause}>{cause}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label flex items-center gap-2">
                  <FiMapPin className="text-gray-400" />
                  Localização
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Cidade, Estado"
                  value={vol.location}
                  onChange={(e) => updateVolunteer(vol.id, 'location', e.target.value)}
                />
              </div>

              <div>
                <MonthYearPicker
                  label="Data de Início"
                  value={vol.startDate}
                  onChange={(value) => updateVolunteer(vol.id, 'startDate', value)}
                />
              </div>

              <div>
                <MonthYearPicker
                  label="Data de Término"
                  value={vol.endDate}
                  disabled={vol.current}
                  onChange={(value) => updateVolunteer(vol.id, 'endDate', value)}
                />
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vol.current}
                    onChange={(e) => updateVolunteer(vol.id, 'current', e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600">Ainda atuo como voluntário</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="input-label">Descrição das Atividades</label>
                <textarea
                  className="input-field h-24 resize-none"
                  placeholder="Descreva suas atividades, conquistas e impacto do seu trabalho voluntário..."
                  value={vol.description}
                  onChange={(e) => updateVolunteer(vol.id, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addVolunteer}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
      >
        <FiPlus size={20} />
        Adicionar Experiência Voluntária
      </button>

      {volunteer.length === 0 && (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 text-center">
          <FiHeart className="text-4xl text-pink-400 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-800 mb-2">Valorize suas experiências voluntárias!</h4>
          <p className="text-sm text-gray-600 mb-4">
            Trabalho voluntário demonstra proatividade, empatia e habilidades 
            que vão além do técnico.
          </p>
          <div className="text-xs text-gray-500">
            💡 Dica: Inclua trabalhos em igrejas, ONGs, campanhas sociais, 
            projetos comunitários ou qualquer ação solidária.
          </div>
        </div>
      )}
    </div>
  )
}

export default Volunteer
