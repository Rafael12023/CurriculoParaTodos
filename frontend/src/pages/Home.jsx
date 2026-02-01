import { Link } from 'react-router-dom'
import { FiCheckCircle, FiDownload, FiEdit3, FiLayout, FiHeart, FiUsers, FiShield, FiStar } from 'react-icons/fi'

function Home() {
  const features = [
    {
      icon: <FiHeart className="text-3xl text-primary-500" />,
      title: '100% Gratuito',
      description: 'Sem custos escondidos. Criado para ajudar quem realmente precisa'
    },
    {
      icon: <FiEdit3 className="text-3xl text-primary-500" />,
      title: 'Simples e Acessível',
      description: 'Interface fácil de usar, pensada para todas as pessoas'
    },
    {
      icon: <FiLayout className="text-3xl text-primary-500" />,
      title: 'Templates Diversos',
      description: 'Modelos para diferentes áreas e estilos profissionais'
    },
    {
      icon: <FiDownload className="text-3xl text-primary-500" />,
      title: 'Download Imediato',
      description: 'Baixe seu currículo em PDF pronto para enviar'
    }
  ]

  const values = [
    {
      icon: <FiUsers className="text-2xl" />,
      title: 'Para Todas as Pessoas',
      description: 'Jovens em busca do primeiro emprego, profissionais em transição, pessoas retornando ao mercado de trabalho'
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: 'Seus Dados São Seus',
      description: 'Suas informações ficam apenas no seu navegador. Não armazenamos seus dados pessoais'
    },
    {
      icon: <FiStar className="text-2xl" />,
      title: 'Qualidade Profissional',
      description: 'Templates desenvolvidos seguindo as melhores práticas de recrutamento'
    }
  ]

  const steps = [
    { number: '1', title: 'Escolha seu Modelo', description: 'Selecione o template que mais combina com você' },
    { number: '2', title: 'Preencha seus Dados', description: 'Adicione suas experiências e habilidades' },
    { number: '3', title: 'Visualize o Resultado', description: 'Confira como ficou antes de baixar' },
    { number: '4', title: 'Baixe e Envie', description: 'Seu currículo está pronto para as oportunidades' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Acolhedor e Inclusivo */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm mb-6">
              <FiHeart className="text-secondary-300" />
              <span>Gratuito para sempre</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Seu currículo profissional,
              <br />
              <span className="text-secondary-300">sem nenhum custo</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Acreditamos que todas as pessoas merecem uma chance justa no mercado de trabalho. 
              Crie seu currículo gratuitamente e dê o próximo passo na sua carreira.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/builder" className="bg-white text-primary-700 font-bold py-4 px-8 rounded-lg hover:bg-secondary-100 transition-colors text-lg shadow-lg inline-flex items-center justify-center gap-2">
                <FiEdit3 />
                Criar Meu Currículo
              </Link>
              <Link to="/templates" className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary-700 transition-colors text-lg inline-flex items-center justify-center gap-2">
                <FiLayout />
                Ver Modelos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos / Valores */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Feito com propósito
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Este projeto foi criado pensando em você, que está em busca de uma oportunidade
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo o que você precisa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas simples e eficientes para criar um currículo de qualidade
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simples assim
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Em poucos minutos, seu currículo estará pronto
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card text-center border border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary-300 text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Motivation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-12 border border-primary-100">
            <FiHeart className="text-5xl text-primary-500 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
              "Todo mundo merece a chance de mostrar seu potencial. 
              Um currículo bem feito é o primeiro passo."
            </blockquote>
            <p className="text-gray-600">
              Criamos esta ferramenta com carinho, pensando em pessoas reais, 
              com histórias reais, em busca de oportunidades reais.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Seu próximo emprego pode estar a um currículo de distância. 
            Vamos construir juntos!
          </p>
          <Link to="/builder" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold py-4 px-8 rounded-lg hover:bg-secondary-100 transition-colors text-lg shadow-lg">
            <FiCheckCircle />
            Começar Agora - É Grátis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-white">
              <FiHeart className="text-primary-400" />
              <span className="font-semibold">Currículo Para Todos</span>
            </div>
            <p className="text-sm">
              Projeto gratuito e de código aberto. Feito com carinho para ajudar pessoas.
            </p>
            <p className="text-xs text-gray-500">
              &copy; 2026 - 100% Gratuito, sempre.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
