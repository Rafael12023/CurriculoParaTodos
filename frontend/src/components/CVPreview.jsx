import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGlobe, FiGithub, FiTwitter, FiInstagram, FiYoutube, FiExternalLink, FiHeart, FiFolder, FiSmile } from 'react-icons/fi'

function CVPreview({ data, template = 'modern' }) {
  const formatDate = (date) => {
    if (!date) return ''
    const [year, month] = date.split('-')
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    return `${months[parseInt(month) - 1]} ${year}`
  }

  // Função para formatar nome completo
  const getFullName = (personal) => {
    const parts = []
    if (personal.firstName) parts.push(personal.firstName)
    if (personal.lastName) parts.push(personal.lastName)
    return parts.join(' ') || 'Seu Nome'
  }

  // Função para formatar endereço completo
  const formatAddress = (personal) => {
    const parts = []
    if (personal.address) parts.push(personal.address)
    if (personal.neighborhood) parts.push(personal.neighborhood)
    if (personal.city) {
      let location = personal.city
      if (personal.state) location += ` - ${personal.state}`
      parts.push(location)
    }
    if (personal.zipCode) parts.push(personal.zipCode)
    return parts.join(', ')
  }

  // Função para formatar localização da experiência
  const formatExpLocation = (exp) => {
    if (exp.city && exp.state) return `${exp.city}, ${exp.state}`
    return exp.city || exp.state || ''
  }

  // Função para formatar informações adicionais
  const getAdditionalInfo = (personal) => {
    const info = []
    if (personal.birthDate) {
      const [year, month, day] = personal.birthDate.split('-')
      info.push(`${day}/${month}/${year}`)
    }
    if (personal.nationality) info.push(personal.nationality)
    if (personal.gender && personal.gender !== 'Prefiro não informar') info.push(personal.gender)
    if (personal.maritalStatus) info.push(personal.maritalStatus)
    if (personal.driversLicense) info.push(`CNH ${personal.driversLicense}`)
    if (personal.pcd && personal.pcd !== 'Não' && personal.pcd !== 'Prefiro não informar') info.push(`PCD: ${personal.pcd}`)
    if (personal.availability) info.push(`Disponibilidade: ${personal.availability}`)
    if (personal.workType) info.push(personal.workType)
    if (personal.salary) info.push(`Pretensão: ${personal.salary}`)
    return info
  }

  // Função para pegar redes sociais
  const getSocialLinks = (personal) => {
    const socials = []
    if (personal.github) socials.push({ icon: FiGithub, url: personal.github, label: 'GitHub' })
    if (personal.twitter) socials.push({ icon: FiTwitter, url: personal.twitter, label: 'Twitter' })
    if (personal.instagram) socials.push({ icon: FiInstagram, url: personal.instagram, label: 'Instagram' })
    if (personal.youtube) socials.push({ icon: FiYoutube, url: personal.youtube, label: 'YouTube' })
    return socials
  }

  const templates = {
    modern: <ModernTemplate data={data} formatDate={formatDate} formatAddress={formatAddress} getFullName={getFullName} formatExpLocation={formatExpLocation} getAdditionalInfo={getAdditionalInfo} />,
    classic: <ClassicTemplate data={data} formatDate={formatDate} formatAddress={formatAddress} getFullName={getFullName} formatExpLocation={formatExpLocation} getAdditionalInfo={getAdditionalInfo} />,
    creative: <CreativeTemplate data={data} formatDate={formatDate} formatAddress={formatAddress} getFullName={getFullName} formatExpLocation={formatExpLocation} getAdditionalInfo={getAdditionalInfo} />,
    minimal: <MinimalTemplate data={data} formatDate={formatDate} formatAddress={formatAddress} getFullName={getFullName} formatExpLocation={formatExpLocation} getAdditionalInfo={getAdditionalInfo} />,
    executive: <ExecutiveTemplate data={data} formatDate={formatDate} formatAddress={formatAddress} getFullName={getFullName} formatExpLocation={formatExpLocation} getAdditionalInfo={getAdditionalInfo} />,
    academic: <AcademicTemplate data={data} formatDate={formatDate} formatAddress={formatAddress} getFullName={getFullName} formatExpLocation={formatExpLocation} getAdditionalInfo={getAdditionalInfo} />
  }

  return templates[template] || templates.modern
}

// Template Moderno
function ModernTemplate({ data, formatDate, formatAddress, getFullName, formatExpLocation, getAdditionalInfo }) {
  const address = formatAddress(data.personal)
  const additionalInfo = getAdditionalInfo(data.personal)
  
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg print:shadow-none" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header com cor */}
      <div className="bg-purple-600 text-white px-8 py-6">
        <div className="flex items-start gap-6">
          {/* Foto */}
          {data.personal.photo && (
            <img 
              src={data.personal.photo} 
              alt="Foto" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">
              {getFullName(data.personal)}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm mt-3">
              {data.personal.email && (
                <div className="flex items-center gap-1">
                  <span>✉</span>
                  <span>{data.personal.email}</span>
                </div>
              )}
              {data.personal.phone && (
                <div className="flex items-center gap-1">
                  <span>📱</span>
                  <span>{data.personal.phone}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>{address}</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm mt-2">
              {data.personal.linkedin && (
                <div className="flex items-center gap-1">
                  <span>💼</span>
                  <span>{data.personal.linkedin}</span>
                </div>
              )}
              {data.personal.github && (
                <div className="flex items-center gap-1">
                  <span>💻</span>
                  <span>{data.personal.github}</span>
                </div>
              )}
              {data.personal.website && (
                <div className="flex items-center gap-1">
                  <span>🌐</span>
                  <span>{data.personal.website}</span>
                </div>
              )}
            </div>
            {additionalInfo.length > 0 && (
              <div className="text-sm mt-2 text-purple-100">
                {additionalInfo.join(' • ')}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Objetivo */}
        {data.personal.objective && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-purple-600 border-b-2 border-purple-600 pb-1 mb-3">
              OBJETIVO PROFISSIONAL
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.personal.objective}
            </p>
          </section>
        )}

        {/* Experiência */}
        {data.experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-purple-600 border-b-2 border-purple-600 pb-1 mb-3">
              EXPERIÊNCIA PROFISSIONAL
            </h2>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-purple-600 text-sm">
                        {exp.company}
                        {formatExpLocation(exp) && <span className="text-gray-500"> - {formatExpLocation(exp)}</span>}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 flex-shrink-0">
                      {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formação */}
        {data.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-purple-600 border-b-2 border-purple-600 pb-1 mb-3">
              FORMAÇÃO ACADÊMICA
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree} em {edu.field}</h3>
                      <p className="text-sm text-gray-600">
                        {edu.institution}
                        {edu.location && <span> - {edu.location}</span>}
                        {edu.status && <span className="text-purple-600"> ({edu.status})</span>}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 flex-shrink-0">
                      {formatDate(edu.startDate)} - {edu.current ? 'Cursando' : formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Habilidades */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 border-b-2 border-purple-600 pb-1 mb-3">
                HABILIDADES
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{skill.name}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-2 h-2 rounded-full ${
                            star <= skill.level ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Idiomas */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 border-b-2 border-purple-600 pb-1 mb-3">
                IDIOMAS
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{lang.name}</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Certificações */}
        {data.certifications?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-bold text-purple-600 border-b-2 border-purple-600 pb-1 mb-3">
              CERTIFICAÇÕES
            </h2>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{cert.name}</h3>
                    <p className="text-xs text-gray-600">{cert.issuer}</p>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projetos */}
        {data.projects?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-bold text-purple-600 border-b-2 border-purple-600 pb-1 mb-3">
              PROJETOS
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <div className="flex gap-2 text-xs">
                      {project.link && (
                        <span className="text-purple-600">🔗 Demo</span>
                      )}
                      {project.github && (
                        <span className="text-gray-600">💻 Código</span>
                      )}
                    </div>
                  </div>
                  {project.technologies && (
                    <p className="text-xs text-purple-600 mt-1">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Voluntariado */}
        {data.volunteer?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-bold text-purple-600 border-b-2 border-purple-600 pb-1 mb-3">
              TRABALHO VOLUNTÁRIO
            </h2>
            <div className="space-y-4">
              {data.volunteer.map((vol) => (
                <div key={vol.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{vol.role || 'Voluntário'}</h3>
                      <p className="text-purple-600 text-sm">
                        {vol.organization}
                        {vol.cause && <span className="text-gray-500"> - {vol.cause}</span>}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 flex-shrink-0">
                      {formatDate(vol.startDate)} - {vol.current ? 'Atual' : formatDate(vol.endDate)}
                    </span>
                  </div>
                  {vol.description && (
                    <p className="text-sm text-gray-600 mt-1">{vol.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interesses */}
        {data.interests?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-bold text-purple-600 border-b-2 border-purple-600 pb-1 mb-3">
              INTERESSES E HOBBIES
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest, idx) => (
                <span key={idx} className="text-sm border border-purple-300 text-purple-700 px-3 py-1 rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Template Clássico
function ClassicTemplate({ data, formatDate, formatAddress, getFullName, formatExpLocation, getAdditionalInfo }) {
  const address = formatAddress(data.personal)
  const additionalInfo = getAdditionalInfo(data.personal)
  
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg print:shadow-none p-10" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header centralizado */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getFullName(data.personal)}
        </h1>
        
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {address && <span>• {address}</span>}
        </div>
        {(data.personal.linkedin || data.personal.website) && (
          <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600 mt-1">
            {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
            {data.personal.website && <span>• {data.personal.website}</span>}
          </div>
        )}
        {additionalInfo.length > 0 && (
          <div className="text-sm text-gray-500 mt-2">
            {additionalInfo.join(' | ')}
          </div>
        )}
      </div>

      {/* Objetivo */}
      {data.personal.objective && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
            Objetivo
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed italic">
            {data.personal.objective}
          </p>
        </section>
      )}

      {/* Experiência */}
      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Experiência Profissional
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 italic text-sm">
                  {exp.company}
                  {formatExpLocation(exp) && `, ${formatExpLocation(exp)}`}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formação */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Formação Acadêmica
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} - {edu.field}
                    {edu.status && <span className="text-gray-600 font-normal"> ({edu.status})</span>}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(edu.endDate) || 'Em andamento'}
                  </span>
                </div>
                <p className="text-gray-700 italic text-sm">
                  {edu.institution}
                  {edu.location && ` - ${edu.location}`}
                </p>
                {edu.description && (
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Habilidades e Idiomas */}
      <div className="grid grid-cols-2 gap-8">
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
              Habilidades
            </h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {data.skills.map((skill) => (
                <li key={skill.id}>• {skill.name}</li>
              ))}
            </ul>
          </section>
        )}

        {data.languages.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
              Idiomas
            </h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {data.languages.map((lang) => (
                <li key={lang.id}>• {lang.name} - {lang.level}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Certificações */}
      {data.certifications.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Certificações
          </h2>
          <ul className="text-sm text-gray-700 space-y-1">
            {data.certifications.map((cert) => (
              <li key={cert.id}>• {cert.name} - {cert.issuer} ({formatDate(cert.date)})</li>
            ))}
          </ul>
        </section>
      )}

      {/* Projetos */}
      {data.projects?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Projetos
          </h2>
          <div className="space-y-3">
            {data.projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  {project.link && <span className="text-xs text-purple-600">🔗</span>}
                  {project.github && <span className="text-xs text-gray-600">💻</span>}
                </div>
                {project.technologies && (
                  <p className="text-xs text-gray-500 italic">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trabalho Voluntário */}
      {data.volunteer?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Trabalho Voluntário
          </h2>
          <div className="space-y-3">
            {data.volunteer.map((vol, idx) => (
              <div key={idx}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(vol.startDate)} - {vol.current ? 'Atual' : formatDate(vol.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 italic text-sm">{vol.organization}</p>
                {vol.description && (
                  <p className="text-sm text-gray-600 mt-1">{vol.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interesses */}
      {data.interests?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Interesses e Hobbies
          </h2>
          <p className="text-sm text-gray-700">
            {data.interests.join(' • ')}
          </p>
        </section>
      )}
    </div>
  )
}

// Template Criativo
function CreativeTemplate({ data, formatDate, formatAddress, getFullName, formatExpLocation, getAdditionalInfo }) {
  const address = formatAddress(data.personal)
  const fullName = getFullName(data.personal)
  const additionalInfo = getAdditionalInfo(data.personal)
  
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg print:shadow-none flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div className="w-1/3 bg-purple-700 text-white p-6">
        {/* Avatar placeholder */}
        <div className="w-24 h-24 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
          {fullName.charAt(0).toUpperCase()}
        </div>
        
        <h1 className="text-xl font-bold text-center mb-6">
          {fullName}
        </h1>

        {/* Contato */}
        <div className="space-y-3 mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-purple-500 pb-1">
            Contato
          </h2>
          {data.personal.email && (
            <div className="text-xs flex items-center gap-2">
              <span>✉</span> <span className="break-all">{data.personal.email}</span>
            </div>
          )}
          {data.personal.phone && (
            <div className="text-xs flex items-center gap-2">
              <span>📱</span> {data.personal.phone}
            </div>
          )}
          {address && (
            <div className="text-xs flex items-center gap-2">
              <span>📍</span> {address}
            </div>
          )}
          {data.personal.linkedin && (
            <div className="text-xs flex items-center gap-2">
              <span>💼</span> <span className="break-all">{data.personal.linkedin}</span>
            </div>
          )}
          {data.personal.website && (
            <div className="text-xs flex items-center gap-2">
              <span>🌐</span> <span className="break-all">{data.personal.website}</span>
            </div>
          )}
        </div>

        {/* Informações Adicionais */}
        {additionalInfo.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-purple-500 pb-1 mb-3">
              Informações
            </h2>
            <div className="space-y-1">
              {additionalInfo.map((info, idx) => (
                <div key={idx} className="text-xs">{info}</div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-purple-500 pb-1 mb-3">
              Habilidades
            </h2>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="text-xs mb-1">{skill.name}</div>
                  <div className="w-full bg-purple-500 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Idiomas */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-purple-500 pb-1 mb-3">
              Idiomas
            </h2>
            <div className="space-y-1">
              {data.languages.map((lang) => (
                <div key={lang.id} className="text-xs">
                  {lang.name}: {lang.level}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo Principal */}
      <div className="w-2/3 p-6">
        {/* Objetivo */}
        {data.personal.objective && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-purple-700 mb-2">Sobre Mim</h2>
            <p className="text-gray-600 text-sm">{data.personal.objective}</p>
          </section>
        )}

        {/* Experiência */}
        {data.experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-purple-700 mb-3">Experiência</h2>
            <div className="space-y-4 border-l-2 border-purple-200 pl-4">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-5 w-2 h-2 bg-purple-700 rounded-full mt-2" />
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-purple-600 text-sm">
                    {exp.company}
                    {formatExpLocation(exp) && <span className="text-gray-500"> - {formatExpLocation(exp)}</span>}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formação */}
        {data.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-purple-700 mb-3">Formação</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {edu.degree} em {edu.field}
                    {edu.status && <span className="text-gray-500 font-normal"> ({edu.status})</span>}
                  </h3>
                  <p className="text-purple-600 text-xs">
                    {edu.institution}
                    {edu.location && ` - ${edu.location}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.endDate) || 'Em andamento'}
                  </p>
                  {edu.description && (
                    <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificações */}
        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">Certificações</h2>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <span className="font-medium">{cert.name}</span>
                  <span className="text-gray-500"> - {cert.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projetos */}
        {data.projects?.length > 0 && (
          <section className="mt-4">
            <h2 className="text-lg font-bold text-purple-700 mb-3">Projetos</h2>
            <div className="space-y-3">
              {data.projects.map((project, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    {project.link && <span className="text-xs">🔗</span>}
                    {project.github && <span className="text-xs">💻</span>}
                  </div>
                  {project.technologies && (
                    <p className="text-xs text-purple-500">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trabalho Voluntário */}
        {data.volunteer?.length > 0 && (
          <section className="mt-4">
            <h2 className="text-lg font-bold text-purple-700 mb-3">Voluntariado</h2>
            <div className="space-y-3">
              {data.volunteer.map((vol, idx) => (
                <div key={idx}>
                  <h3 className="font-medium text-gray-900">{vol.role}</h3>
                  <p className="text-sm text-purple-500">{vol.organization}</p>
                  <p className="text-xs text-gray-400">
                    {formatDate(vol.startDate)} - {vol.current ? 'Atual' : formatDate(vol.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interesses */}
        {data.interests?.length > 0 && (
          <section className="mt-4">
            <h2 className="text-lg font-bold text-purple-700 mb-3">Interesses</h2>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest, idx) => (
                <span key={idx} className="text-xs border border-purple-300 text-purple-600 px-2 py-1 rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Template Minimalista
function MinimalTemplate({ data, formatDate, formatAddress, getFullName, formatExpLocation, getAdditionalInfo }) {
  const address = formatAddress(data.personal)
  const additionalInfo = getAdditionalInfo(data.personal)
  
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg print:shadow-none p-12" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header minimalista */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-2">
          {getFullName(data.personal)}
        </h1>
        <div className="text-sm text-gray-500 space-x-4">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {address && <span>{address}</span>}
        </div>
        {(data.personal.linkedin || data.personal.website) && (
          <div className="text-sm text-gray-500 space-x-4 mt-1">
            {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
            {data.personal.website && <span>{data.personal.website}</span>}
          </div>
        )}
        {additionalInfo.length > 0 && (
          <div className="text-xs text-gray-400 mt-2">
            {additionalInfo.join(' • ')}
          </div>
        )}
      </div>

      {/* Objetivo */}
      {data.personal.objective && (
        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed">{data.personal.objective}</p>
        </section>
      )}

      {/* Experiência */}
      {data.experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Experiência
          </h2>
          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-400">
                    {formatDate(exp.startDate)} — {exp.current ? 'Presente' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {exp.company}
                  {formatExpLocation(exp) && `, ${formatExpLocation(exp)}`}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formação */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Formação
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-gray-900">
                    {edu.degree} em {edu.field}
                    {edu.status && <span className="text-gray-400 font-normal text-sm"> ({edu.status})</span>}
                  </h3>
                  <span className="text-xs text-gray-400">{formatDate(edu.endDate)}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {edu.institution}
                  {edu.location && ` - ${edu.location}`}
                </p>
                {edu.description && (
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills e Idiomas em linha */}
      <div className="flex gap-12">
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={skill.id} className="text-sm text-gray-600">
                  {skill.name}{index < data.skills.length - 1 && ' •'}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.languages.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Idiomas
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((lang, index) => (
                <span key={lang.id} className="text-sm text-gray-600">
                  {lang.name}{index < data.languages.length - 1 && ' •'}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Certificações */}
      {data.certifications.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Certificações
          </h2>
          <div className="space-y-1">
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-sm text-gray-600">
                {cert.name} — {cert.issuer}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Projetos */}
      {data.projects?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Projetos
          </h2>
          <div className="space-y-3">
            {data.projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  {project.link && <span className="text-xs">🔗</span>}
                  {project.github && <span className="text-xs">💻</span>}
                </div>
                {project.technologies && (
                  <p className="text-xs text-gray-400">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trabalho Voluntário */}
      {data.volunteer?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Voluntariado
          </h2>
          <div className="space-y-3">
            {data.volunteer.map((vol, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-gray-900">{vol.role}</h3>
                  <span className="text-xs text-gray-400">
                    {formatDate(vol.startDate)} — {vol.current ? 'Atual' : formatDate(vol.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{vol.organization}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interesses */}
      {data.interests?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Interesses
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest, idx) => (
              <span key={idx} className="text-sm text-gray-600">
                {interest}{idx < data.interests.length - 1 && ' •'}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Template Executivo
function ExecutiveTemplate({ data, formatDate, formatAddress, getFullName, formatExpLocation, getAdditionalInfo }) {
  const address = formatAddress(data.personal)
  const additionalInfo = getAdditionalInfo(data.personal)
  
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg print:shadow-none" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header elegante */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white px-10 py-8">
        <h1 className="text-4xl font-bold mb-2">
          {getFullName(data.personal)}
        </h1>
        <div className="flex flex-wrap gap-6 text-indigo-200 text-sm">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {address && <span>{address}</span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
        </div>
        {additionalInfo.length > 0 && (
          <div className="text-sm text-indigo-300 mt-2">
            {additionalInfo.join(' | ')}
          </div>
        )}
      </div>

      <div className="p-10">
        {/* Objetivo/Resumo Executivo */}
        {data.personal.objective && (
          <section className="mb-8 border-l-4 border-indigo-600 pl-4">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-2">
              Resumo Executivo
            </h2>
            <p className="text-gray-700">{data.personal.objective}</p>
          </section>
        )}

        {/* Experiência */}
        {data.experiences.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider border-b-2 border-indigo-600 pb-2 mb-4">
              Trajetória Profissional
            </h2>
            <div className="space-y-6">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-right">
                    <p className="text-sm text-gray-500">
                      {formatDate(exp.startDate)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {exp.current ? 'Presente' : formatDate(exp.endDate)}
                    </p>
                  </div>
                  <div className="col-span-3 border-l-2 border-gray-200 pl-4">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-indigo-600 font-medium">
                      {exp.company}
                      {formatExpLocation(exp) && <span className="text-gray-500 font-normal"> - {formatExpLocation(exp)}</span>}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formação */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider border-b-2 border-indigo-600 pb-2 mb-4">
              Formação Acadêmica
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {edu.degree} em {edu.field}
                        {edu.status && <span className="text-gray-500 font-normal"> ({edu.status})</span>}
                      </h3>
                      <p className="text-indigo-600">
                        {edu.institution}
                        {edu.location && <span className="text-gray-500"> - {edu.location}</span>}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(edu.endDate)}</span>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Competências e Idiomas */}
        <div className="grid grid-cols-2 gap-8">
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider border-b-2 border-indigo-600 pb-2 mb-4">
                Competências
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider border-b-2 border-indigo-600 pb-2 mb-4">
                Idiomas
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="font-medium text-indigo-600">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Certificações */}
        {data.certifications.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider border-b-2 border-indigo-600 pb-2 mb-4">
              Certificações
            </h2>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <span className="text-gray-700">{cert.name} — {cert.issuer}</span>
                  <span className="text-sm text-gray-500">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projetos */}
        {data.projects?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider border-b-2 border-indigo-600 pb-2 mb-4">
              Projetos Destacados
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {project.link && <span>🔗</span>}
                    {project.github && <span>💻</span>}
                  </div>
                  {project.technologies && (
                    <p className="text-xs text-indigo-600">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trabalho Voluntário */}
        {data.volunteer?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider border-b-2 border-indigo-600 pb-2 mb-4">
              Experiência Voluntária
            </h2>
            <div className="space-y-4">
              {data.volunteer.map((vol, idx) => (
                <div key={idx}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(vol.startDate)} - {vol.current ? 'Atual' : formatDate(vol.endDate)}
                    </span>
                  </div>
                  <p className="text-indigo-600">{vol.organization}</p>
                  {vol.description && (
                    <p className="text-sm text-gray-600 mt-1">{vol.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interesses */}
        {data.interests?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider border-b-2 border-indigo-600 pb-2 mb-4">
              Interesses Pessoais
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.interests.map((interest, idx) => (
                <span key={idx} className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded border border-indigo-200">
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Template Acadêmico
function AcademicTemplate({ data, formatDate, formatAddress, getFullName, formatExpLocation, getAdditionalInfo }) {
  const address = formatAddress(data.personal)
  const additionalInfo = getAdditionalInfo(data.personal)
  
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg print:shadow-none p-10" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header acadêmico */}
      <div className="text-center mb-8 pb-4 border-b-2 border-amber-600">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getFullName(data.personal)}
        </h1>
        <div className="text-sm text-gray-600 space-x-3">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>| {data.personal.phone}</span>}
          {address && <span>| {address}</span>}
        </div>
        {(data.personal.linkedin || data.personal.website) && (
          <div className="text-sm text-amber-700 mt-1 space-x-3">
            {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
            {data.personal.website && <span>| {data.personal.website}</span>}
          </div>
        )}
        {additionalInfo.length > 0 && (
          <div className="text-sm text-gray-500 mt-2">
            {additionalInfo.join(' | ')}
          </div>
        )}
      </div>

      {/* Objetivo/Área de Interesse */}
      {data.personal.objective && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-amber-800 mb-2">Área de Interesse</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.personal.objective}</p>
        </section>
      )}

      {/* Formação - primeiro em currículo acadêmico */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-amber-800 border-b border-amber-600 pb-1 mb-3">
            Formação Acadêmica
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} em {edu.field}
                    {edu.status && <span className="text-gray-600 font-normal"> ({edu.status})</span>}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {edu.current ? 'Em andamento' : formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 italic">
                  {edu.institution}
                  {edu.location && ` - ${edu.location}`}
                </p>
                {edu.description && (
                  <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experiência Profissional/Acadêmica */}
      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-amber-800 border-b border-amber-600 pb-1 mb-3">
            Experiência Profissional
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 italic">
                  {exp.company}
                  {formatExpLocation(exp) && `, ${formatExpLocation(exp)}`}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificações */}
      {data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-amber-800 border-b border-amber-600 pb-1 mb-3">
            Certificações e Cursos
          </h2>
          <ul className="space-y-2">
            {data.certifications.map((cert) => (
              <li key={cert.id} className="text-sm">
                <span className="font-medium">{cert.name}</span> — {cert.issuer}, {formatDate(cert.date)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Habilidades e Idiomas */}
      <div className="grid grid-cols-2 gap-8">
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-amber-800 border-b border-amber-600 pb-1 mb-3">
              Habilidades Técnicas
            </h2>
            <ul className="text-sm space-y-1">
              {data.skills.map((skill) => (
                <li key={skill.id}>• {skill.name}</li>
              ))}
            </ul>
          </section>
        )}

        {data.languages.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-amber-800 border-b border-amber-600 pb-1 mb-3">
              Idiomas
            </h2>
            <ul className="text-sm space-y-1">
              {data.languages.map((lang) => (
                <li key={lang.id}>• {lang.name}: {lang.level}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Projetos de Pesquisa */}
      {data.projects?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-bold text-amber-800 border-b border-amber-600 pb-1 mb-3">
            Projetos de Pesquisa
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  {project.link && <span>🔗</span>}
                  {project.github && <span>💻</span>}
                </div>
                {project.technologies && (
                  <p className="text-sm text-amber-700 italic">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trabalho Voluntário */}
      {data.volunteer?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-bold text-amber-800 border-b border-amber-600 pb-1 mb-3">
            Atividades Voluntárias
          </h2>
          <div className="space-y-3">
            {data.volunteer.map((vol, idx) => (
              <div key={idx}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(vol.startDate)} - {vol.current ? 'Atual' : formatDate(vol.endDate)}
                  </span>
                </div>
                <p className="text-amber-700 italic">{vol.organization}</p>
                {vol.description && (
                  <p className="text-sm text-gray-600 mt-1">{vol.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interesses */}
      {data.interests?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-bold text-amber-800 border-b border-amber-600 pb-1 mb-3">
            Interesses e Hobbies
          </h2>
          <p className="text-sm text-gray-700">
            {data.interests.join(' • ')}
          </p>
        </section>
      )}
    </div>
  )
}

export default CVPreview
