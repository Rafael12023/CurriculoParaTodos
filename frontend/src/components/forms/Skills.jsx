import { FiCode, FiPlus, FiTrash2 } from 'react-icons/fi'

function Skills({ skills, onAdd, onUpdate, onRemove }) {
  const skillLevels = [
    { value: 1, label: 'Básico' },
    { value: 2, label: 'Intermediário' },
    { value: 3, label: 'Avançado' },
    { value: 4, label: 'Especialista' },
    { value: 5, label: 'Expert' }
  ]

  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git',
    'Excel', 'Word', 'PowerPoint', 'Photoshop', 'Figma',
    'Gestão de Projetos', 'Liderança', 'Comunicação', 'Negociação',
    'Análise de Dados', 'Marketing Digital', 'SEO', 'Vendas'
  ]

  return (
    <div className="space-y-6">
      <div className="section-title">
        <FiCode className="text-primary-500" />
        Habilidades
      </div>
      
      <p className="text-gray-500 text-sm">
        Quais são seus pontos fortes? Pode ser conhecimento técnico, uso de ferramentas, 
        ou habilidades pessoais como organização e trabalho em equipe.
      </p>

      {/* Sugestões de habilidades */}
      <div className="bg-primary-50 rounded-lg p-4">
        <p className="text-sm font-medium text-primary-800 mb-2">Sugestões:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.slice(0, 10).map((skill) => (
            <button
              key={skill}
              onClick={() => {
                onAdd()
                // O último skill adicionado será atualizado
                setTimeout(() => {
                  const lastSkill = skills[skills.length]
                  if (lastSkill) {
                    onUpdate(lastSkill.id, 'name', skill)
                  }
                }, 0)
              }}
              className="px-3 py-1 bg-white text-primary-600 text-sm rounded-full border border-primary-200 hover:bg-primary-100 transition-colors"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FiCode className="text-4xl text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Nenhuma habilidade adicionada</p>
          <button onClick={onAdd} className="btn-primary inline-flex items-center gap-2">
            <FiPlus />
            Adicionar Habilidade
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={skill.id} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
              <div className="flex-1">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Nome da habilidade"
                  value={skill.name}
                  onChange={(e) => onUpdate(skill.id, 'name', e.target.value)}
                />
              </div>
              
              <div className="w-48">
                <select
                  className="input-field"
                  value={skill.level}
                  onChange={(e) => onUpdate(skill.id, 'level', parseInt(e.target.value))}
                >
                  {skillLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex-shrink-0">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`w-3 h-3 rounded-full ${
                        star <= skill.level ? 'bg-primary-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => onRemove(skill.id)}
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
            Adicionar Outra Habilidade
          </button>
        </div>
      )}
    </div>
  )
}

export default Skills
