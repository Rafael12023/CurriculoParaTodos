<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Currículo - {{ $resume->full_name }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DejaVu Serif', Georgia, serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #333;
            padding: 40px;
        }
        
        .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        
        .header h1 {
            font-size: 26pt;
            font-weight: bold;
            color: #000;
            margin-bottom: 10px;
        }
        
        .contact-info {
            font-size: 10pt;
            color: #555;
        }
        
        .contact-info span {
            margin: 0 10px;
        }
        
        .section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-size: 11pt;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid #999;
            padding-bottom: 5px;
            margin-bottom: 12px;
        }
        
        .item {
            margin-bottom: 12px;
        }
        
        .item-header {
            display: table;
            width: 100%;
        }
        
        .item-title {
            font-weight: bold;
            font-size: 11pt;
        }
        
        .item-subtitle {
            font-style: italic;
            color: #555;
            font-size: 10pt;
        }
        
        .item-date {
            font-size: 10pt;
            color: #666;
            float: right;
        }
        
        .item-description {
            font-size: 10pt;
            color: #444;
            margin-top: 5px;
            white-space: pre-line;
        }
        
        .objective {
            font-style: italic;
            font-size: 10pt;
            color: #444;
            line-height: 1.6;
        }
        
        .two-columns {
            display: table;
            width: 100%;
        }
        
        .column {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding-right: 20px;
        }
        
        .list-item {
            font-size: 10pt;
            margin-bottom: 5px;
        }
        
        .list-item:before {
            content: "• ";
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <h1>{{ $resume->full_name ?: 'Seu Nome' }}</h1>
        <div class="contact-info">
            @if($resume->email)
                <span>{{ $resume->email }}</span>
            @endif
            @if($resume->phone)
                <span>• {{ $resume->phone }}</span>
            @endif
            @if($resume->city)
                <span>• {{ $resume->city }}@if($resume->state), {{ $resume->state }}@endif</span>
            @endif
        </div>
    </div>

    <!-- Objetivo -->
    @if($resume->objective)
    <div class="section">
        <h2 class="section-title">Objetivo</h2>
        <p class="objective">{{ $resume->objective }}</p>
    </div>
    @endif

    <!-- Experiência -->
    @if(count($resume->experiences) > 0)
    <div class="section">
        <h2 class="section-title">Experiência Profissional</h2>
        @foreach($resume->experiences as $exp)
        <div class="item">
            <div class="item-header">
                <span class="item-title">{{ $exp->position }}</span>
                <span class="item-date">
                    {{ $exp->start_date ? $exp->start_date->format('m/Y') : '' }} - 
                    {{ $exp->current ? 'Presente' : ($exp->end_date ? $exp->end_date->format('m/Y') : '') }}
                </span>
            </div>
            <div class="item-subtitle">{{ $exp->company }}</div>
            @if($exp->description)
            <div class="item-description">{{ $exp->description }}</div>
            @endif
        </div>
        @endforeach
    </div>
    @endif

    <!-- Formação -->
    @if(count($resume->educations) > 0)
    <div class="section">
        <h2 class="section-title">Formação Acadêmica</h2>
        @foreach($resume->educations as $edu)
        <div class="item">
            <div class="item-header">
                <span class="item-title">{{ $edu->degree }} - {{ $edu->field }}</span>
                <span class="item-date">{{ $edu->end_date ? $edu->end_date->format('Y') : 'Em andamento' }}</span>
            </div>
            <div class="item-subtitle">{{ $edu->institution }}</div>
        </div>
        @endforeach
    </div>
    @endif

    <!-- Habilidades e Idiomas -->
    <div class="two-columns">
        @if(count($resume->skills) > 0)
        <div class="column">
            <div class="section">
                <h2 class="section-title">Habilidades</h2>
                @foreach($resume->skills as $skill)
                <div class="list-item">{{ $skill->name }}</div>
                @endforeach
            </div>
        </div>
        @endif

        @if(count($resume->languages) > 0)
        <div class="column">
            <div class="section">
                <h2 class="section-title">Idiomas</h2>
                @foreach($resume->languages as $lang)
                <div class="list-item">{{ $lang->name }} - {{ $lang->level }}</div>
                @endforeach
            </div>
        </div>
        @endif
    </div>

    <!-- Certificações -->
    @if(count($resume->certifications) > 0)
    <div class="section">
        <h2 class="section-title">Certificações</h2>
        @foreach($resume->certifications as $cert)
        <div class="list-item">
            {{ $cert->name }} - {{ $cert->issuer }}
            @if($cert->date)
                ({{ $cert->date->format('m/Y') }})
            @endif
        </div>
        @endforeach
    </div>
    @endif
</body>
</html>
