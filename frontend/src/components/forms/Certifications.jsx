import { FiAward, FiPlus, FiTrash2, FiExternalLink } from 'react-icons/fi'
import MonthYearPicker from './MonthYearPicker'

function Certifications({ certifications, onAdd, onUpdate, onRemove }) {
  return (
    <div className="space-y-6">
      <div className="section-title">
        <FiAward className="text-primary-500" />
        Certificações e Cursos
      </div>
      
      <p className="text-gray-500 text-sm">
        Cursos online, workshops, certificações técnicas... Tudo que você aprendeu 
        e pode agregar valor ao seu trabalho é bem-vindo aqui.
      </p>

      {certifications.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FiAward className="text-4xl text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Nenhuma certificação adicionada</p>
          <button onClick={onAdd} className="btn-primary inline-flex items-center gap-2">
            <FiPlus />
            Adicionar Certificação
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="bg-gray-50 rounded-lg p-6 relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => onRemove(cert.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Remover"
                >
                  <FiTrash2 />
                </button>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-4">
                Certificação {index + 1}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="input-label">Nome do Certificado/Curso *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ex: AWS Certified Solutions Architect"
                    value={cert.name}
                    onChange={(e) => onUpdate(cert.id, 'name', e.target.value)}
                  />
                </div>

                <div>
                  <label className="input-label">Instituição Emissora *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ex: Amazon Web Services"
                    value={cert.issuer}
                    onChange={(e) => onUpdate(cert.id, 'issuer', e.target.value)}
                  />
                </div>

                <div>
                  <MonthYearPicker
                    label="Data de Conclusão"
                    value={cert.date}
                    onChange={(value) => onUpdate(cert.id, 'date', value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="input-label">
                    <FiExternalLink className="inline mr-1" />
                    URL da Credencial (opcional)
                  </label>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="https://www.credential.net/..."
                    value={cert.url}
                    onChange={(e) => onUpdate(cert.id, 'url', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Link para verificação online do certificado
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
            Adicionar Outra Certificação
          </button>
        </div>
      )}
    </div>
  )
}

export default Certifications
