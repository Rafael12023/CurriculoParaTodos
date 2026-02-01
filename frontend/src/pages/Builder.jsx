import { useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiUser, FiBriefcase, FiBook, FiAward, FiGlobe, FiCode, FiDownload, FiEye, FiLayout, FiCheck, FiFolder, FiHeart, FiSmile, FiSave, FiUpload, FiFileText } from 'react-icons/fi'
import PersonalInfo from '../components/forms/PersonalInfo'
import Experience from '../components/forms/Experience'
import Education from '../components/forms/Education'
import Skills from '../components/forms/Skills'
import Languages from '../components/forms/Languages'
import Certifications from '../components/forms/Certifications'
import Projects from '../components/forms/Projects'
import Volunteer from '../components/forms/Volunteer'
import Interests from '../components/forms/Interests'
import CVPreview from '../components/CVPreview'
import { useReactToPrint } from 'react-to-print'

const initialData = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    linkedin: '',
    website: '',
    objective: '',
    birthDate: '',
    nationality: '',
    maritalStatus: '',
    driversLicense: '',
    gender: '',
    availability: '',
    workType: '',
    photo: '',
    github: '',
    twitter: '',
    instagram: '',
    youtube: '',
    behance: '',
    dribbble: '',
    medium: '',
    tiktok: '',
    pcd: '',
    salary: ''
  },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  volunteer: [],
  interests: []
}

const templates = [
  { id: 'modern', name: 'Moderno', color: 'bg-purple-500', description: 'Design limpo e contemporâneo' },
  { id: 'classic', name: 'Clássico', color: 'bg-gray-700', description: 'Tradicional e profissional' },
  { id: 'creative', name: 'Criativo', color: 'bg-purple-500', description: 'Ousado e diferenciado' },
  { id: 'minimal', name: 'Minimalista', color: 'bg-green-500', description: 'Simples e elegante' },
  { id: 'executive', name: 'Executivo', color: 'bg-indigo-600', description: 'Sofisticado para liderança' },
  { id: 'academic', name: 'Acadêmico', color: 'bg-amber-600', description: 'Ideal para pesquisadores' }
]

function Builder() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTemplate = searchParams.get('template') || 'modern'
  
  const [activeSection, setActiveSection] = useState('personal')
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate)
  const [cvData, setCvData] = useState(initialData)
  const [showPreview, setShowPreview] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const cvRef = useRef(null)
  const printRef = useRef(null)
  const fileInputRef = useRef(null)

  const sections = [
    { id: 'personal', label: 'Dados Pessoais', icon: FiUser },
    { id: 'experience', label: 'Experiência', icon: FiBriefcase },
    { id: 'education', label: 'Formação', icon: FiBook },
    { id: 'projects', label: 'Projetos', icon: FiFolder },
    { id: 'skills', label: 'Habilidades', icon: FiCode },
    { id: 'languages', label: 'Idiomas', icon: FiGlobe },
    { id: 'certifications', label: 'Certificações', icon: FiAward },
    { id: 'volunteer', label: 'Voluntariado', icon: FiHeart },
    { id: 'interests', label: 'Interesses', icon: FiSmile }
  ]

  const updatePersonal = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }))
  }

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        id: Date.now(),
        company: '',
        position: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }))
  }

  const updateExperience = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        institution: '',
        location: '',
        degree: '',
        field: '',
        status: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }))
  }

  const updateEducation = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addSkill = () => {
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: 3 }]
    }))
  }

  const updateSkill = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }))
  }

  const removeSkill = (id) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  const addLanguage = () => {
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, { id: Date.now(), name: '', level: 'Intermediário' }]
    }))
  }

  const updateLanguage = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    }))
  }

  const removeLanguage = (id) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }))
  }

  const addCertification = () => {
    setCvData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        id: Date.now(),
        name: '',
        issuer: '',
        date: '',
        url: ''
      }]
    }))
  }

  const updateCertification = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }))
  }

  const removeCertification = (id) => {
    setCvData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }))
  }

  // Projetos
  const updateProjects = (projects) => {
    setCvData(prev => ({ ...prev, projects }))
  }

  // Voluntariado
  const updateVolunteer = (volunteer) => {
    setCvData(prev => ({ ...prev, volunteer }))
  }

  // Interesses
  const updateInterests = (interests) => {
    setCvData(prev => ({ ...prev, interests }))
  }

  // Salvar currículo como JSON
  const saveToFile = () => {
    const dataStr = JSON.stringify(cvData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `curriculo-${cvData.personal.firstName || 'novo'}-${cvData.personal.lastName || 'usuario'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Carregar currículo de arquivo JSON
  const loadFromFile = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const loadedData = JSON.parse(e.target.result)
          setCvData(loadedData)
          alert('Currículo carregado com sucesso!')
        } catch (error) {
          alert('Erro ao carregar o arquivo. Verifique se é um arquivo JSON válido.')
        }
      }
      reader.readAsText(file)
    }
  }

  // Exportar para DOC (HTML que abre no Word)
  const exportToDoc = () => {
    const content = printRef.current
    if (!content) return

    const fullName = cvData.personal.firstName 
      ? `${cvData.personal.firstName} ${cvData.personal.lastName}` 
      : 'Curriculo'

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${fullName}</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.4; margin: 1cm; }
          h1 { font-size: 18pt; margin-bottom: 5pt; }
          h2 { font-size: 14pt; margin-top: 12pt; margin-bottom: 6pt; border-bottom: 1px solid #ccc; padding-bottom: 3pt; }
          h3 { font-size: 12pt; margin-top: 8pt; margin-bottom: 4pt; }
          p { margin: 4pt 0; }
          .section { margin-bottom: 12pt; }
          .contact { color: #666; font-size: 10pt; }
          .date { color: #888; font-size: 10pt; }
          ul { margin: 4pt 0; padding-left: 20pt; }
          li { margin: 2pt 0; }
        </style>
      </head>
      <body>
        ${generateDocContent()}
      </body>
      </html>
    `

    const blob = new Blob(['\\ufeff', htmlContent], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fullName.replace(/\\s+/g, '_')}_Curriculo.doc`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Gerar conteúdo HTML para DOC
  const generateDocContent = () => {
    const { personal, experiences, education, skills, languages, certifications, projects, volunteer, interests } = cvData
    
    const formatDate = (date) => {
      if (!date) return ''
      const [year, month] = date.split('-')
      const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      return `${months[parseInt(month) - 1]} ${year}`
    }

    let html = `
      <h1>${personal.firstName} ${personal.lastName}</h1>
      <p class="contact">
        ${personal.email ? personal.email : ''}
        ${personal.phone ? ' | ' + personal.phone : ''}
        ${personal.address ? ' | ' + personal.address : ''}
        ${personal.neighborhood ? ', ' + personal.neighborhood : ''}
        ${personal.city ? ' - ' + personal.city + (personal.state ? '/' + personal.state : '') : ''}
      </p>
      ${personal.linkedin ? '<p class="contact">LinkedIn: ' + personal.linkedin + '</p>' : ''}
      ${personal.website ? '<p class="contact">Website: ' + personal.website + '</p>' : ''}
    `

    if (personal.objective) {
      html += `
        <div class="section">
          <h2>Objetivo</h2>
          <p>${personal.objective}</p>
        </div>
      `
    }

    if (experiences.length > 0) {
      html += '<div class="section"><h2>Experiência Profissional</h2>'
      experiences.forEach(exp => {
        html += `
          <h3>${exp.position}</h3>
          <p><strong>${exp.company}</strong>${exp.city ? ', ' + exp.city : ''}${exp.state ? ' - ' + exp.state : ''}</p>
          <p class="date">${formatDate(exp.startDate)} - ${exp.current ? 'Atual' : formatDate(exp.endDate)}</p>
          ${exp.description ? '<p>' + exp.description.replace(/\\n/g, '<br>') + '</p>' : ''}
        `
      })
      html += '</div>'
    }

    if (education.length > 0) {
      html += '<div class="section"><h2>Formação Acadêmica</h2>'
      education.forEach(edu => {
        html += `
          <h3>${edu.degree} - ${edu.field}</h3>
          <p><strong>${edu.institution}</strong>${edu.location ? ', ' + edu.location : ''}</p>
          <p class="date">${formatDate(edu.startDate)} - ${edu.current ? 'Cursando' : formatDate(edu.endDate)}</p>
          ${edu.description ? '<p>' + edu.description + '</p>' : ''}
        `
      })
      html += '</div>'
    }

    if (projects?.length > 0) {
      html += '<div class="section"><h2>Projetos</h2>'
      projects.forEach(proj => {
        html += `
          <h3>${proj.name}</h3>
          ${proj.technologies ? '<p><em>' + proj.technologies + '</em></p>' : ''}
          ${proj.description ? '<p>' + proj.description + '</p>' : ''}
          ${proj.link ? '<p>Link: ' + proj.link + '</p>' : ''}
        `
      })
      html += '</div>'
    }

    if (skills.length > 0) {
      html += '<div class="section"><h2>Habilidades</h2><ul>'
      skills.forEach(skill => {
        html += `<li>${skill.name}</li>`
      })
      html += '</ul></div>'
    }

    if (languages.length > 0) {
      html += '<div class="section"><h2>Idiomas</h2><ul>'
      languages.forEach(lang => {
        html += `<li>${lang.name} - ${lang.level}</li>`
      })
      html += '</ul></div>'
    }

    if (certifications.length > 0) {
      html += '<div class="section"><h2>Certificações</h2><ul>'
      certifications.forEach(cert => {
        html += `<li>${cert.name} - ${cert.issuer} (${formatDate(cert.date)})</li>`
      })
      html += '</ul></div>'
    }

    if (volunteer?.length > 0) {
      html += '<div class="section"><h2>Trabalho Voluntário</h2>'
      volunteer.forEach(vol => {
        html += `
          <h3>${vol.role}</h3>
          <p><strong>${vol.organization}</strong></p>
          <p class="date">${formatDate(vol.startDate)} - ${vol.current ? 'Atual' : formatDate(vol.endDate)}</p>
          ${vol.description ? '<p>' + vol.description + '</p>' : ''}
        `
      })
      html += '</div>'
    }

    if (interests?.length > 0) {
      html += '<div class="section"><h2>Interesses</h2><p>' + interests.join(', ') + '</p></div>'
    }

    return html
  }

  // Usar react-to-print para melhor qualidade
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Curriculo-${cvData.personal.firstName ? `${cvData.personal.firstName}-${cvData.personal.lastName}` : 'Novo'}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 15mm 10mm 20mm 10mm;
        @bottom-center {
          content: counter(page);
          font-size: 10pt;
          color: #666;
        }
      }
      @media print {
        html, body {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .cv-page {
          page-break-inside: avoid;
        }
        section {
          page-break-inside: avoid;
          padding-top: 5mm;
        }
      }
    `
  })

  const changeTemplate = (templateId) => {
    setSelectedTemplate(templateId)
    setSearchParams({ template: templateId })
    setShowTemplateSelector(false)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfo data={cvData.personal} onUpdate={updatePersonal} />
      case 'experience':
        return (
          <Experience
            experiences={cvData.experiences}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onRemove={removeExperience}
          />
        )
      case 'education':
        return (
          <Education
            education={cvData.education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onRemove={removeEducation}
          />
        )
      case 'skills':
        return (
          <Skills
            skills={cvData.skills}
            onAdd={addSkill}
            onUpdate={updateSkill}
            onRemove={removeSkill}
          />
        )
      case 'languages':
        return (
          <Languages
            languages={cvData.languages}
            onAdd={addLanguage}
            onUpdate={updateLanguage}
            onRemove={removeLanguage}
          />
        )
      case 'certifications':
        return (
          <Certifications
            certifications={cvData.certifications}
            onAdd={addCertification}
            onUpdate={updateCertification}
            onRemove={removeCertification}
          />
        )
      case 'projects':
        return (
          <Projects
            data={cvData.projects}
            onUpdate={updateProjects}
          />
        )
      case 'volunteer':
        return (
          <Volunteer
            data={cvData.volunteer}
            onUpdate={updateVolunteer}
          />
        )
      case 'interests':
        return (
          <Interests
            data={cvData.interests}
            onUpdate={updateInterests}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Actions Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Monte seu Currículo</h1>
            <p className="text-sm text-gray-500 hidden sm:block">Preencha no seu ritmo, salve quando quiser</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary flex items-center gap-2 text-sm"
              title="Carregar currículo salvo"
            >
              <FiUpload />
              <span className="hidden md:inline">Carregar</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={loadFromFile}
              className="hidden"
            />
            <button
              onClick={saveToFile}
              className="btn-secondary flex items-center gap-2 text-sm"
              title="Salvar currículo"
            >
              <FiSave />
              <span className="hidden md:inline">Salvar</span>
            </button>
            <button
              onClick={() => setShowTemplateSelector(true)}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <FiLayout />
              <span className="hidden lg:inline">Template:</span> {templates.find(t => t.id === selectedTemplate)?.name}
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <FiEye />
              <span className="hidden md:inline">{showPreview ? 'Editar' : 'Visualizar'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-primary flex items-center gap-2"
            >
              <FiDownload />
              PDF
            </button>
            <button
              onClick={exportToDoc}
              className="btn-secondary flex items-center gap-2"
            >
              <FiFileText />
              DOC
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="card sticky top-36">
              <h2 className="font-semibold text-gray-900 mb-4">Preencha cada seção</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        activeSection === section.id
                          ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="text-lg" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-5">
            <div className="card animate-fadeIn">
              {renderSection()}
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-4">
            <div className="sticky top-36">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-800 text-white px-4 py-2 text-sm font-medium flex justify-between items-center">
                  <span>Pré-visualização</span>
                  <button
                    onClick={() => setShowTemplateSelector(true)}
                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                  >
                    Trocar Template
                  </button>
                </div>
                <div className="p-4 bg-gray-200 max-h-[600px] overflow-auto">
                  <div ref={cvRef} className="transform scale-[0.35] origin-top-left" style={{ width: '285%' }}>
                    <CVPreview data={cvData} template={selectedTemplate} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Escolher Template</h2>
              <button
                onClick={() => setShowTemplateSelector(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Selecione o template desejado. Suas informações serão preservadas.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => changeTemplate(template.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                      selectedTemplate === template.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <FiCheck className="text-white text-sm" />
                      </div>
                    )}
                    <div className={`w-full h-20 ${template.color} rounded-lg mb-3`}>
                      <div className="p-2">
                        <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full mb-1"></div>
                        <div className="w-16 h-2 bg-white bg-opacity-50 rounded"></div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">Pré-visualização do Currículo</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowTemplateSelector(true)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <FiLayout />
                  Trocar Template
                </button>
                <button
                  onClick={handlePrint}
                  className="btn-primary flex items-center gap-2"
                >
                  <FiDownload />
                  PDF
                </button>
                <button
                  onClick={exportToDoc}
                  className="btn-secondary flex items-center gap-2"
                >
                  <FiFileText />
                  DOC
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-8 bg-gray-100">
              <div className="flex justify-center">
                <CVPreview data={cvData} template={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Print Container - This is what gets printed */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div ref={printRef}>
          <CVPreview data={cvData} template={selectedTemplate} />
        </div>
      </div>
    </div>
  )
}

export default Builder
