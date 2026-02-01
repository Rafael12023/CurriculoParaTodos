import { useState, useRef } from 'react'
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiLinkedin, FiGlobe, FiPlus, FiX, 
  FiCalendar, FiFlag, FiHeart, FiTruck, FiUsers, FiStar, FiBriefcase,
  FiGithub, FiTwitter, FiInstagram, FiYoutube, FiCamera, FiLoader
} from 'react-icons/fi'
import { SiBehance, SiDribbble, SiMedium, SiTiktok } from 'react-icons/si'

function PersonalInfo({ data, onUpdate }) {
  const fileInputRef = useRef(null)
  const [cepLoading, setCepLoading] = useState(false)
  const [cepError, setCepError] = useState('')

  // Função para formatar telefone
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return `(${numbers}`
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value)
    onUpdate('phone', formatted)
  }

  // Função para formatar e buscar CEP
  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

  const handleCepChange = async (e) => {
    const formatted = formatCep(e.target.value)
    onUpdate('zipCode', formatted)
    
    const numbers = formatted.replace(/\D/g, '')
    if (numbers.length === 8) {
      setCepLoading(true)
      setCepError('')
      try {
        const response = await fetch(`https://viacep.com.br/ws/${numbers}/json/`)
        const data = await response.json()
        if (data.erro) {
          setCepError('CEP não encontrado')
        } else {
          onUpdate('address', data.logradouro || '')
          onUpdate('neighborhood', data.bairro || '')
          onUpdate('city', data.localidade || '')
          onUpdate('state', data.uf || '')
        }
      } catch (error) {
        setCepError('Erro ao buscar CEP')
      } finally {
        setCepLoading(false)
      }
    }
  }

  // Campos adicionais disponíveis
  const additionalFields = [
    { id: 'birthDate', label: 'Data de Nascimento', icon: FiCalendar, type: 'date' },
    { id: 'nationality', label: 'Nacionalidade', icon: FiFlag, type: 'text', placeholder: 'Brasileira' },
    { id: 'maritalStatus', label: 'Estado Civil', icon: FiHeart, type: 'select', options: ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União Estável'] },
    { id: 'driversLicense', label: 'CNH', icon: FiTruck, type: 'select', options: ['Categoria A', 'Categoria B', 'Categoria AB', 'Categoria C', 'Categoria D', 'Categoria E'] },
    { id: 'gender', label: 'Gênero', icon: FiUsers, type: 'select', options: ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'] },
    { id: 'availability', label: 'Disponibilidade', icon: FiBriefcase, type: 'select', options: ['Imediata', 'Em 15 dias', 'Em 30 dias', 'A combinar'] },
    { id: 'workType', label: 'Tipo de Trabalho', icon: FiStar, type: 'select', options: ['CLT', 'PJ', 'Estágio', 'Freelancer', 'Qualquer modalidade'] },
    { id: 'pcd', label: 'PCD', icon: FiUsers, type: 'select', options: ['Sim', 'Não', 'Prefiro não informar'] },
    { id: 'salary', label: 'Pretensão Salarial', icon: FiStar, type: 'text', placeholder: 'R$ 5.000,00' },
  ]

  // Redes sociais disponíveis
  const socialNetworks = [
    { id: 'github', label: 'GitHub', icon: FiGithub, placeholder: 'github.com/seuusuario', color: 'text-gray-800' },
    { id: 'twitter', label: 'Twitter/X', icon: FiTwitter, placeholder: 'twitter.com/seuusuario', color: 'text-sky-500' },
    { id: 'instagram', label: 'Instagram', icon: FiInstagram, placeholder: 'instagram.com/seuusuario', color: 'text-pink-500' },
    { id: 'youtube', label: 'YouTube', icon: FiYoutube, placeholder: 'youtube.com/@seucanal', color: 'text-red-500' },
    { id: 'behance', label: 'Behance', icon: SiBehance, placeholder: 'behance.net/seuusuario', color: 'text-blue-600' },
    { id: 'dribbble', label: 'Dribbble', icon: SiDribbble, placeholder: 'dribbble.com/seuusuario', color: 'text-pink-400' },
    { id: 'medium', label: 'Medium', icon: SiMedium, placeholder: 'medium.com/@seuusuario', color: 'text-gray-700' },
    { id: 'tiktok', label: 'TikTok', icon: SiTiktok, placeholder: 'tiktok.com/@seuusuario', color: 'text-gray-900' },
  ]

  const [activeFields, setActiveFields] = useState(() => {
    return additionalFields
      .filter(field => data[field.id])
      .map(field => field.id)
  })

  const [activeSocials, setActiveSocials] = useState(() => {
    return socialNetworks
      .filter(social => data[social.id])
      .map(social => social.id)
  })

  const toggleField = (fieldId) => {
    if (activeFields.includes(fieldId)) {
      setActiveFields(activeFields.filter(id => id !== fieldId))
      onUpdate(fieldId, '')
    } else {
      setActiveFields([...activeFields, fieldId])
    }
  }

  const toggleSocial = (socialId) => {
    if (activeSocials.includes(socialId)) {
      setActiveSocials(activeSocials.filter(id => id !== socialId))
      onUpdate(socialId, '')
    } else {
      setActiveSocials([...activeSocials, socialId])
    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onUpdate('photo', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    onUpdate('photo', '')
  }

  const renderAdditionalField = (field) => {
    const Icon = field.icon
    
    if (field.type === 'select') {
      return (
        <div key={field.id} className="relative bg-white border border-gray-200 rounded-xl p-4">
          <button
            type="button"
            onClick={() => toggleField(field.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
            title="Remover campo"
          >
            <FiX size={16} />
          </button>
          <label className="input-label flex items-center gap-2">
            <Icon className="text-primary-500" />
            {field.label}
          </label>
          <select
            className="input-field mt-1"
            value={data[field.id] || ''}
            onChange={(e) => onUpdate(field.id, e.target.value)}
          >
            <option value="">Selecione</option>
            {field.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )
    }
    
    if (field.type === 'date') {
      return (
        <div key={field.id} className="relative bg-white border border-gray-200 rounded-xl p-4">
          <button
            type="button"
            onClick={() => toggleField(field.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
            title="Remover campo"
          >
            <FiX size={16} />
          </button>
          <label className="input-label flex items-center gap-2">
            <Icon className="text-primary-500" />
            {field.label}
          </label>
          <div className="grid grid-cols-3 gap-2 mt-1">
            <input
              type="number"
              min="1"
              max="31"
              placeholder="Dia"
              className="input-field text-center"
              value={data[field.id] ? data[field.id].split('-')[2] : ''}
              onChange={(e) => {
                const current = data[field.id] ? data[field.id].split('-') : ['', '', '']
                const day = e.target.value.padStart(2, '0')
                onUpdate(field.id, `${current[0] || '2000'}-${current[1] || '01'}-${day}`)
              }}
            />
            <select
              className="input-field"
              value={data[field.id] ? data[field.id].split('-')[1] : ''}
              onChange={(e) => {
                const current = data[field.id] ? data[field.id].split('-') : ['', '', '']
                onUpdate(field.id, `${current[0] || '2000'}-${e.target.value}-${current[2] || '01'}`)
              }}
            >
              <option value="">Mês</option>
              <option value="01">Jan</option>
              <option value="02">Fev</option>
              <option value="03">Mar</option>
              <option value="04">Abr</option>
              <option value="05">Mai</option>
              <option value="06">Jun</option>
              <option value="07">Jul</option>
              <option value="08">Ago</option>
              <option value="09">Set</option>
              <option value="10">Out</option>
              <option value="11">Nov</option>
              <option value="12">Dez</option>
            </select>
            <input
              type="number"
              min="1900"
              max="2030"
              placeholder="Ano"
              className="input-field text-center"
              value={data[field.id] ? data[field.id].split('-')[0] : ''}
              onChange={(e) => {
                const current = data[field.id] ? data[field.id].split('-') : ['', '', '']
                onUpdate(field.id, `${e.target.value}-${current[1] || '01'}-${current[2] || '01'}`)
              }}
            />
          </div>
        </div>
      )
    }
    
    return (
      <div key={field.id} className="relative bg-white border border-gray-200 rounded-xl p-4">
        <button
          type="button"
          onClick={() => toggleField(field.id)}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
          title="Remover campo"
        >
          <FiX size={16} />
        </button>
        <label className="input-label flex items-center gap-2">
          <Icon className="text-primary-500" />
          {field.label}
        </label>
        <input
          type="text"
          className="input-field mt-1"
          placeholder={field.placeholder}
          value={data[field.id] || ''}
          onChange={(e) => onUpdate(field.id, e.target.value)}
        />
      </div>
    )
  }

  const availableFields = additionalFields.filter(f => !activeFields.includes(f.id))
  const availableSocials = socialNetworks.filter(s => !activeSocials.includes(s.id))

  return (
    <div className="space-y-6">
      <div className="section-title">
        <FiUser className="text-primary-500" />
        Dados Pessoais
      </div>
      
      <p className="text-gray-500 text-sm">
        Essas informações ajudam os recrutadores a entrar em contato com você. 
        Preencha apenas o que se sentir confortável em compartilhar.
      </p>

      {/* Foto e Nome */}
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-5 border border-primary-100">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Upload de Foto */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {data.photo ? (
                <div className="relative">
                  <img 
                    src={data.photo} 
                    alt="Foto do perfil" 
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"
                    title="Remover foto"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-28 h-28 rounded-full bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors"
                >
                  <FiCamera className="text-gray-400 text-2xl mb-1" />
                  <span className="text-xs text-gray-500">Adicionar</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Foto (opcional)</p>
          </div>

          {/* Informações de Contato */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiMail className="text-primary-600" />
              Informações de Contato
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Nome *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Daniela"
                  value={data.firstName || ''}
                  onChange={(e) => onUpdate('firstName', e.target.value)}
                />
              </div>

              <div>
                <label className="input-label">Sobrenome *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Pereira"
                  value={data.lastName || ''}
                  onChange={(e) => onUpdate('lastName', e.target.value)}
                />
              </div>

              <div>
                <label className="input-label">E-mail *</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    className="input-field pl-10"
                    placeholder="d.pereira@gmail.com"
                    value={data.email}
                    onChange={(e) => onUpdate('email', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Telefone *</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    className="input-field pl-10"
                    placeholder="(21) 12345-6789"
                    value={data.phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Endereço */}
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiMapPin className="text-primary-600" />
          Endereço
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="input-label">CEP</label>
            <div className="relative">
              <input
                type="text"
                className={`input-field ${cepLoading ? 'pr-8' : ''} ${cepError ? 'border-red-400' : ''}`}
                placeholder="22253-000"
                value={data.zipCode || ''}
                onChange={handleCepChange}
                maxLength={9}
              />
              {cepLoading && (
                <FiLoader className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500 animate-spin" />
              )}
            </div>
            {cepError && <p className="text-xs text-red-500 mt-1">{cepError}</p>}
          </div>

          <div>
            <label className="input-label">Estado</label>
            <select
              className="input-field"
              value={data.state}
              onChange={(e) => onUpdate('state', e.target.value)}
            >
              <option value="">UF</option>
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
            <label className="input-label">Cidade</label>
            <input
              type="text"
              className="input-field"
              placeholder="Rio de Janeiro"
              value={data.city}
              onChange={(e) => onUpdate('city', e.target.value)}
            />
          </div>

          <div>
            <label className="input-label">Bairro</label>
            <input
              type="text"
              className="input-field"
              placeholder="Copacabana"
              value={data.neighborhood || ''}
              onChange={(e) => onUpdate('neighborhood', e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="input-label">Endereço</label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Rua das Flores, 24"
                value={data.address}
                onChange={(e) => onUpdate('address', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Links Profissionais */}
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiGlobe className="text-primary-600" />
          Links e Redes Sociais
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="input-label flex items-center gap-2">
              <FiLinkedin className="text-blue-600" />
              LinkedIn
            </label>
            <input
              type="url"
              className="input-field"
              placeholder="linkedin.com/in/seuusuario"
              value={data.linkedin}
              onChange={(e) => onUpdate('linkedin', e.target.value)}
            />
          </div>

          <div>
            <label className="input-label flex items-center gap-2">
              <FiGlobe className="text-primary-600" />
              Website/Portfólio
            </label>
            <input
              type="url"
              className="input-field"
              placeholder="www.seusite.com"
              value={data.website}
              onChange={(e) => onUpdate('website', e.target.value)}
            />
          </div>

          {/* Redes sociais ativas */}
          {activeSocials.map(socialId => {
            const social = socialNetworks.find(s => s.id === socialId)
            if (!social) return null
            const Icon = social.icon
            return (
              <div key={social.id} className="relative">
                <button
                  type="button"
                  onClick={() => toggleSocial(social.id)}
                  className="absolute top-0 right-0 text-gray-400 hover:text-red-500 p-1 z-10"
                  title="Remover"
                >
                  <FiX size={14} />
                </button>
                <label className="input-label flex items-center gap-2">
                  <Icon className={social.color} />
                  {social.label}
                </label>
                <input
                  type="url"
                  className="input-field"
                  placeholder={social.placeholder}
                  value={data[social.id] || ''}
                  onChange={(e) => onUpdate(social.id, e.target.value)}
                />
              </div>
            )
          })}
        </div>

        {/* Botões para adicionar redes sociais */}
        {availableSocials.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Adicionar redes sociais:</p>
            <div className="flex flex-wrap gap-2">
              {availableSocials.map(social => {
                const Icon = social.icon
                return (
                  <button
                    key={social.id}
                    type="button"
                    onClick={() => toggleSocial(social.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium transition-colors ${social.color}`}
                    title={`Adicionar ${social.label}`}
                  >
                    <Icon size={14} />
                    {social.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Objetivo Profissional */}
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiStar className="text-primary-600" />
          Objetivo Profissional
        </h3>
        <textarea
          className="input-field h-32 resize-none"
          placeholder="Descreva brevemente seus objetivos profissionais e o que você busca em sua carreira..."
          value={data.objective}
          onChange={(e) => onUpdate('objective', e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-2">
          💡 Dica: Seja específico sobre a área ou cargo que deseja. Exemplo: "Busco oportunidade como Analista de Marketing Digital"
        </p>
      </div>

      {/* Informações Adicionais - Campos ativos */}
      {activeFields.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FiPlus className="text-primary-600" />
            Informações Adicionais
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {activeFields.map(fieldId => {
              const field = additionalFields.find(f => f.id === fieldId)
              return field ? renderAdditionalField(field) : null
            })}
          </div>
        </div>
      )}

      {/* Botões para adicionar campos */}
      {availableFields.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600 mb-3">
            Adicione informações extras ao seu currículo (opcional):
          </p>
          <div className="flex flex-wrap gap-2">
            {availableFields.map(field => {
              const Icon = field.icon
              return (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => toggleField(field.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm font-medium transition-colors"
                >
                  <FiPlus size={14} />
                  <Icon size={14} />
                  {field.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalInfo
