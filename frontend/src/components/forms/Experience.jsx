import { FiBriefcase, FiPlus, FiTrash2 } from 'react-icons/fi'
import MonthYearPicker from './MonthYearPicker'

function Experience({ experiences, onAdd, onUpdate, onRemove }) {
  return (
    <div className="space-y-6">
      <div className="section-title">
        <FiBriefcase className="text-primary-500" />
        Experiência Profissional
      </div>
      
      <p className="text-gray-500 text-sm">
        Conte sobre suas experiências de trabalho. Não se preocupe se ainda não teve um emprego formal – 
        trabalhos voluntários, estágios e projetos pessoais também contam!
      </p>

      {experiences.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FiBriefcase className="text-4xl text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Nenhuma experiência adicionada</p>
          <button onClick={onAdd} className="btn-primary inline-flex items-center gap-2">
            <FiPlus />
            Adicionar Experiência
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="bg-gray-50 rounded-lg p-6 relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => onRemove(exp.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Remover"
                >
                  <FiTrash2 />
                </button>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-4">
                Experiência {index + 1}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Empresa *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Nome da empresa"
                    value={exp.company}
                    onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
                  />
                </div>

                <div>
                  <label className="input-label">Cargo *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Representante de conta"
                    value={exp.position}
                    onChange={(e) => onUpdate(exp.id, 'position', e.target.value)}
                  />
                </div>

                <div>
                  <label className="input-label">Cidade</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Rio de Janeiro"
                    value={exp.city || ''}
                    onChange={(e) => onUpdate(exp.id, 'city', e.target.value)}
                  />
                </div>

                <div>
                  <label className="input-label">Estado</label>
                  <select
                    className="input-field"
                    value={exp.state || ''}
                    onChange={(e) => onUpdate(exp.id, 'state', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>

                <div>
                  <MonthYearPicker
                    label="Data de Início"
                    required
                    value={exp.startDate}
                    onChange={(value) => onUpdate(exp.id, 'startDate', value)}
                  />
                </div>

                <div>
                  <MonthYearPicker
                    label="Data de Término"
                    value={exp.endDate}
                    disabled={exp.current}
                    onChange={(value) => onUpdate(exp.id, 'endDate', value)}
                  />
                  <label className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => onUpdate(exp.id, 'current', e.target.checked)}
                      className="rounded"
                    />
                    Trabalho atual
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="input-label">Descrição das Atividades</label>
                  <textarea
                    className="input-field h-28 resize-none"
                    placeholder="Descreva suas principais responsabilidades e conquistas neste cargo. Use verbos de ação como 'desenvolvi', 'implementei', 'gerenciei'..."
                    value={exp.description}
                    onChange={(e) => onUpdate(exp.id, 'description', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Dica: Foque em resultados mensuráveis e conquistas específicas.
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
            Adicionar Outra Experiência
          </button>
        </div>
      )}
    </div>
  )
}

export default Experience
