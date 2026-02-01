import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const resumeService = {
  // Lista todos os currículos
  getAll: async () => {
    const response = await api.get('/resumes')
    return response.data
  },

  // Busca um currículo por UUID
  getById: async (uuid) => {
    const response = await api.get(`/resumes/${uuid}`)
    return response.data
  },

  // Cria um novo currículo
  create: async (data) => {
    const response = await api.post('/resumes', data)
    return response.data
  },

  // Atualiza um currículo existente
  update: async (uuid, data) => {
    const response = await api.put(`/resumes/${uuid}`, data)
    return response.data
  },

  // Remove um currículo
  delete: async (uuid) => {
    const response = await api.delete(`/resumes/${uuid}`)
    return response.data
  },

  // Gera PDF a partir de dados (sem salvar)
  generatePdf: async (data) => {
    const response = await api.post('/pdf/generate', data, {
      responseType: 'blob'
    })
    return response.data
  },

  // Baixa PDF de um currículo salvo
  downloadPdf: async (uuid) => {
    const response = await api.get(`/resumes/${uuid}/pdf`, {
      responseType: 'blob'
    })
    return response.data
  }
}

export default api
