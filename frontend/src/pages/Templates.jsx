import { Link } from 'react-router-dom'
import { FiCheck, FiHeart, FiArrowRight } from 'react-icons/fi'

function Templates() {
  const templates = [
    {
      id: 'modern',
      name: 'Moderno',
      description: 'Design limpo e atual. Ótimo para profissionais de tecnologia, design e áreas inovadoras.',
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
      features: ['Visual contemporâneo', 'Seções bem organizadas', 'Fácil leitura']
    },
    {
      id: 'classic',
      name: 'Clássico',
      description: 'Tradicional e elegante. Ideal para áreas corporativas, administrativa e jurídica.',
      color: 'from-gray-600 to-gray-700',
      bgLight: 'bg-gray-50',
      textColor: 'text-gray-600',
      features: ['Formato tradicional', 'Transmite seriedade', 'Aceito em todas as empresas']
    },
    {
      id: 'creative',
      name: 'Criativo',
      description: 'Ousado e marcante. Perfeito para designers, publicitários e profissionais criativos.',
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
      features: ['Layout diferenciado', 'Destaca personalidade', 'Alto impacto visual']
    },
    {
      id: 'minimal',
      name: 'Minimalista',
      description: 'Simples e direto. Deixa o conteúdo falar por si, sem distrações.',
      color: 'from-emerald-500 to-emerald-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      features: ['Foco no conteúdo', 'Elegante e limpo', 'Fácil de personalizar']
    },
    {
      id: 'executive',
      name: 'Executivo',
      description: 'Sofisticado e profissional. Para quem busca cargos de liderança e gestão.',
      color: 'from-indigo-500 to-indigo-600',
      bgLight: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      features: ['Aparência premium', 'Destaca conquistas', 'Transmite experiência']
    },
    {
      id: 'academic',
      name: 'Acadêmico',
      description: 'Completo e detalhado. Ideal para professores, pesquisadores e estudantes.',
      color: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
      features: ['Espaço para formação', 'Valoriza estudos', 'Formato CV Lattes']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm mb-4">
            <FiHeart />
            <span>Todos os templates são gratuitos</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o modelo ideal para você
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada template foi pensado para diferentes perfis e áreas profissionais. 
            Todos são personalizáveis e geram PDFs de qualidade.
          </p>
        </div>

        {/* Dica */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 mb-12 border border-primary-100">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Não sabe qual escolher?</h3>
              <p className="text-gray-600 text-sm">
                Se você está em dúvida, comece com o template <strong>Moderno</strong> ou <strong>Clássico</strong>. 
                Eles funcionam bem para a maioria das vagas e são bem aceitos por recrutadores.
              </p>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Preview */}
              <div className={`h-44 bg-gradient-to-br ${template.color} relative overflow-hidden`}>
                <div className="absolute inset-4 bg-white rounded-xl shadow-sm">
                  <div className="p-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-full mb-2`}></div>
                    <div className="space-y-2">
                      <div className="h-2.5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                      <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {template.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {template.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCheck className="text-primary-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={`/builder?template=${template.id}`}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors group-hover:bg-primary-600"
                >
                  Usar este modelo
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Não encontrou o que procura? Você pode personalizar qualquer modelo ao seu gosto.
          </p>
          <Link 
            to="/builder" 
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            Começar agora
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Templates
