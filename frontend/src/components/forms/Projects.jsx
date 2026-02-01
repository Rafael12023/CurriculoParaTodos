import { useState } from 'react'
import { FiFolder, FiPlus, FiTrash2, FiExternalLink, FiGithub, FiImage } from 'react-icons/fi'

function Projects({ data, onUpdate }) {
  const [projects, setProjects] = useState(data || [])

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      github: '',
      image: ''
    }
    const updated = [...projects, newProject]
    setProjects(updated)
    onUpdate(updated)
  }

  const updateProject = (id, field, value) => {
    const updated = projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    )
    setProjects(updated)
    onUpdate(updated)
  }

  const removeProject = (id) => {
    const updated = projects.filter(proj => proj.id !== id)
    setProjects(updated)
    onUpdate(updated)
  }

  return (
    <div className="space-y-6">
      <div className="section-title">
        <FiFolder className="text-primary-500" />
        Projetos e Portfólio
      </div>

      <p className="text-gray-500 text-sm">
        Mostre seus melhores trabalhos! Projetos pessoais, freelances ou contribuições 
        open source demonstram suas habilidades na prática.
      </p>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="card border-l-4 border-l-primary-400 animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                Projeto
              </h3>
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                title="Remover projeto"
              >
                <FiTrash2 size={18} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="input-label">Nome do Projeto *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ex: App de Gerenciamento de Tarefas"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="input-label">Descrição</label>
                <textarea
                  className="input-field h-24 resize-none"
                  placeholder="Descreva o projeto, seu objetivo e seu papel no desenvolvimento..."
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="input-label">Tecnologias Utilizadas</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ex: React, Node.js, MongoDB, TypeScript"
                  value={project.technologies}
                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Separe as tecnologias por vírgula</p>
              </div>

              <div>
                <label className="input-label flex items-center gap-2">
                  <FiExternalLink className="text-primary-500" />
                  Link do Projeto
                </label>
                <input
                  type="url"
                  className="input-field"
                  placeholder="https://meuprojeto.com"
                  value={project.link}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                />
              </div>

              <div>
                <label className="input-label flex items-center gap-2">
                  <FiGithub className="text-gray-700" />
                  Repositório GitHub
                </label>
                <input
                  type="url"
                  className="input-field"
                  placeholder="github.com/usuario/projeto"
                  value={project.github}
                  onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addProject}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
      >
        <FiPlus size={20} />
        Adicionar Projeto
      </button>

      {projects.length === 0 && (
        <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-6 text-center">
          <FiFolder className="text-4xl text-primary-400 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-800 mb-2">Mostre o que você sabe fazer!</h4>
          <p className="text-sm text-gray-600 mb-4">
            Projetos práticos são uma ótima forma de demonstrar suas habilidades, 
            especialmente se você está começando na carreira.
          </p>
          <div className="text-xs text-gray-500">
            💡 Dica: Inclua projetos de estudos, desafios de programação, 
            trabalhos da faculdade ou qualquer trabalho que você tenha orgulho.
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
