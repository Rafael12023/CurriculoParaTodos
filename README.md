# Currículo Para Todos

Sistema completo para criação de currículos profissionais com múltiplos templates.

## Tecnologias

- **Backend**: Laravel 11 + PHP 8.2
- **Frontend**: React 18 + Vite + TailwindCSS
- **Geração de PDF**: DomPDF

## Estrutura do Projeto

```
apk_Curriculo/
├── backend/          # API Laravel
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── resources/views/pdf/  # Templates PDF
│
└── frontend/         # Aplicação React
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    └── public/
```

## Instalação

### Backend (Laravel)

1. Entre na pasta do backend:
```bash
cd backend
```

2. Copie o arquivo de ambiente:
```bash
cp .env.example .env
```

3. Instale as dependências:
```bash
composer install
```

4. Gere a chave da aplicação:
```bash
php artisan key:generate
```

5. Configure o banco de dados no arquivo `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=curriculo_perfeito
DB_USERNAME=root
DB_PASSWORD=
```

6. Execute as migrations:
```bash
php artisan migrate
```

7. Inicie o servidor:
```bash
php artisan serve
```

O backend estará disponível em `http://localhost:8000`

### Frontend (React)

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Copie o arquivo de ambiente:
```bash
cp .env.example .env
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## Funcionalidades

### Criar Currículo

1. Acesse a página inicial e clique em "Criar Currículo"
2. Preencha as seções:
   - **Dados Pessoais**: Nome, email, telefone, endereço, objetivo profissional
   - **Experiência**: Empresas, cargos, período e descrição das atividades
   - **Formação**: Instituições, graus e áreas de estudo
   - **Habilidades**: Lista de competências técnicas e comportamentais
   - **Idiomas**: Idiomas e níveis de proficiência
   - **Certificações**: Cursos e certificados profissionais
3. Visualize em tempo real no painel lateral
4. Baixe o PDF quando estiver pronto

### Templates Disponíveis

- **Moderno**: Design contemporâneo com cores vibrantes
- **Clássico**: Layout tradicional e formal
- **Criativo**: Design ousado para áreas criativas
- **Minimalista**: Foco no conteúdo, design limpo
- **Executivo**: Sofisticado para cargos de liderança
- **Acadêmico**: Formato CV para pesquisadores

## API Endpoints

### Currículos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/v1/resumes` | Lista todos os currículos |
| POST | `/api/v1/resumes` | Cria um novo currículo |
| GET | `/api/v1/resumes/{uuid}` | Busca currículo por UUID |
| PUT | `/api/v1/resumes/{uuid}` | Atualiza um currículo |
| DELETE | `/api/v1/resumes/{uuid}` | Remove um currículo |

### PDF

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/v1/pdf/generate` | Gera PDF a partir de dados |
| GET | `/api/v1/resumes/{uuid}/pdf` | Download do PDF |
| GET | `/api/v1/resumes/{uuid}/pdf/preview` | Visualização do PDF |

## Estrutura de Dados

```json
{
  "template": "modern",
  "personal": {
    "fullName": "João da Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "address": "Rua Exemplo, 123",
    "city": "São Paulo",
    "state": "SP",
    "linkedin": "linkedin.com/in/joaosilva",
    "website": "joaosilva.dev",
    "objective": "Desenvolvedor Full-Stack..."
  },
  "experiences": [
    {
      "company": "Empresa XYZ",
      "position": "Desenvolvedor Senior",
      "startDate": "2020-01",
      "endDate": "2024-01",
      "current": false,
      "description": "Desenvolvimento de sistemas..."
    }
  ],
  "education": [
    {
      "institution": "Universidade ABC",
      "degree": "Bacharelado",
      "field": "Ciência da Computação",
      "startDate": "2015-01",
      "endDate": "2019-12",
      "current": false
    }
  ],
  "skills": [
    { "name": "JavaScript", "level": 5 },
    { "name": "React", "level": 4 }
  ],
  "languages": [
    { "name": "Português", "level": "Nativo" },
    { "name": "Inglês", "level": "Fluente" }
  ],
  "certifications": [
    {
      "name": "AWS Certified Developer",
      "issuer": "Amazon Web Services",
      "date": "2023-06",
      "url": "https://..."
    }
  ]
}
```

## Licença

MIT License
