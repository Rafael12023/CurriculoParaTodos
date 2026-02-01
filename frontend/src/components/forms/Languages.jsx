import { FiGlobe, FiPlus, FiTrash2 } from 'react-icons/fi'

function Languages({ languages, onAdd, onUpdate, onRemove }) {
  const languageLevels = [
    'Básico',
    'Intermediário',
    'Avançado',
    'Fluente',
    'Nativo'
  ]

  const commonLanguages = [
    'Português',
    'Inglês',
    'Espanhol',
    'Francês',
    'Alemão',
    'Italiano',
    'Mandarim',
    'Japonês',
    'Coreano',
    'Russo'
  ]

  return (
    <div className="space-y-6">
      <div className="section-title">
        <FiGlobe className="text-primary-500" />
        Idiomas
      </div>
      
      <p className="text-gray-500 text-sm">
        Fala outros idiomas? Mesmo um nível básico pode fazer diferença. 
        Seja honesto sobre seu nível – os recrutadores valorizam sinceridade.
      </p>

      {languages.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FiGlobe className="text-4xl text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Nenhum idioma adicionado</p>
          <button onClick={onAdd} className="btn-primary inline-flex items-center gap-2">
            <FiPlus />
            Adicionar Idioma
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {languages.map((lang, index) => (
            <div key={lang.id} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
              <div className="flex-1">
                <select
                  className="input-field"
                  value={lang.name}
                  onChange={(e) => onUpdate(lang.id, 'name', e.target.value)}
                >
                  <option value="">Selecione o idioma</option>
                  {commonLanguages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                  <option value="other">Outro</option>
                </select>
                {lang.name === 'other' && (
                  <input
                    type="text"
                    className="input-field mt-2"
                    placeholder="Digite o idioma"
                    onChange={(e) => onUpdate(lang.id, 'name', e.target.value)}
                  />
                )}
              </div>
              
              <div className="w-48">
                <select
                  className="input-field"
                  value={lang.level}
                  onChange={(e) => onUpdate(lang.id, 'level', e.target.value)}
                >
                  {languageLevels.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex-shrink-0 w-20">
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-center ${
                  lang.level === 'Nativo' ? 'bg-green-100 text-green-800' :
                  lang.level === 'Fluente' ? 'bg-purple-100 text-purple-800' :
                  lang.level === 'Avançado' ? 'bg-purple-100 text-purple-800' :
                  lang.level === 'Intermediário' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {lang.level}
                </div>
              </div>
              
              <button
                onClick={() => onRemove(lang.id)}
                className="text-red-500 hover:text-red-700 p-2"
                title="Remover"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
          
          <button
            onClick={onAdd}
            className="w-full py-3 border-2 border-dashed border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
          >
            <FiPlus />
            Adicionar Outro Idioma
          </button>
        </div>
      )}
    </div>
  )
}

export default Languages
