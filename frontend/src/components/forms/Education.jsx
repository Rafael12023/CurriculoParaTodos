import { FiBook, FiPlus, FiTrash2 } from 'react-icons/fi'
import MonthYearPicker from './MonthYearPicker'

function Education({ education, onAdd, onUpdate, onRemove }) {
  const degrees = [
    'Ensino Fundamental',
    'Ensino Médio',
    'Técnico',
    'Tecnólogo',
    'Bacharelado',
    'Licenciatura',
    'Pós-Graduação',
    'MBA',
    'Mestrado',
    'Doutorado'
  ]

  return (
    <div className="space-y-6">
      <div className="section-title">
        <FiBook className="text-primary-500" />
        Formação Acadêmica
      </div>
      
      <p className="text-gray-500 text-sm">
        Inclua sua formação acadêmica. Cursos técnicos, graduação, pós ou até cursos livres – 
        tudo que contribuiu para seu desenvolvimento vale a pena mencionar.
      </p>

      {education.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FiBook className="text-4xl text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Nenhuma formação adicionada</p>
          <button onClick={onAdd} className="btn-primary inline-flex items-center gap-2">
            <FiPlus />
            Adicionar Formação
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="bg-gray-50 rounded-lg p-6 relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => onRemove(edu.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Remover"
                >
                  <FiTrash2 />
                </button>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-4">
                Formação {index + 1}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Instituição de Ensino *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Universidade de Recife"
                    value={edu.institution}
                    onChange={(e) => onUpdate(edu.id, 'institution', e.target.value)}
                  />
                </div>

                <div>
                  <label className="input-label">Local da Instituição</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Recife, PE"
                    value={edu.location || ''}
                    onChange={(e) => onUpdate(edu.id, 'location', e.target.value)}
                  />
                </div>

                <div>
                  <label className="input-label">Diploma *</label>
                  <select
                    className="input-field"
                    value={edu.degree}
                    onChange={(e) => onUpdate(edu.id, 'degree', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {degrees.map(degree => (
                      <option key={degree} value={degree}>{degree}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="input-label">Área de Estudo *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Economia"
                    value={edu.field}
                    onChange={(e) => onUpdate(edu.id, 'field', e.target.value)}
                  />
                </div>

                <div>
                  <label className="input-label">Situação</label>
                  <select
                    className="input-field"
                    value={edu.status || ''}
                    onChange={(e) => onUpdate(edu.id, 'status', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Formado">Formado</option>
                    <option value="Cursando">Cursando</option>
                    <option value="Trancado">Trancado</option>
                    <option value="Incompleto">Incompleto</option>
                  </select>
                </div>

                <div>
                  <MonthYearPicker
                    label="Data de Início"
                    required
                    value={edu.startDate}
                    onChange={(value) => onUpdate(edu.id, 'startDate', value)}
                  />
                </div>

                <div>
                  <MonthYearPicker
                    label="Data de Conclusão"
                    value={edu.endDate}
                    disabled={edu.current}
                    onChange={(value) => onUpdate(edu.id, 'endDate', value)}
                  />
                  <label className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) => onUpdate(edu.id, 'current', e.target.checked)}
                      className="rounded"
                    />
                    Cursando atualmente
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="input-label">Descrição / Atividades Desenvolvidas</label>
                  <textarea
                    className="input-field h-28 resize-none"
                    placeholder="Descreva projetos desenvolvidos, TCC, iniciação científica, atividades extracurriculares, trabalhos relevantes..."
                    value={edu.description || ''}
                    onChange={(e) => onUpdate(edu.id, 'description', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Dica: Inclua projetos relevantes, TCC, pesquisas ou atividades que agregam valor ao seu currículo.
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={onAdd}
            className="w-full py-3 border-2 border-dashed border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
          >
            <FiPlus />
            Adicionar Outra Formação
          </button>
        </div>
      )}
    </div>
  )
}

export default Education
