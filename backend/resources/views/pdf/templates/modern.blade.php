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
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #333;
        }
        
        .container {
            padding: 0;
        }
        
        .header {
            background-color: #2563eb;
            color: white;
            padding: 25px 30px;
            margin: -20px -20px 0 -20px;
        }
        
        .header h1 {
            font-size: 24pt;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .contact-info {
            font-size: 9pt;
        }
        
        .contact-info span {
            margin-right: 15px;
        }
        
        .content {
            padding: 25px 30px;
        }
        
        .section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-size: 12pt;
            font-weight: bold;
            color: #2563eb;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 5px;
            margin-bottom: 12px;
            text-transform: uppercase;
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
            color: #2563eb;
            font-size: 10pt;
        }
        
        .item-date {
            font-size: 9pt;
            color: #666;
            float: right;
        }
        
        .item-description {
            font-size: 10pt;
            color: #555;
            margin-top: 5px;
            white-space: pre-line;
        }
        
        .skills-list, .languages-list {
            display: table;
            width: 100%;
        }
        
        .skill-item, .language-item {
            display: inline-block;
            width: 48%;
            margin-bottom: 8px;
            font-size: 10pt;
        }
        
        .skill-dots {
            display: inline-block;
            margin-left: 5px;
        }
        
        .dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 2px;
        }
        
        .dot-filled {
            background-color: #2563eb;
        }
        
        .dot-empty {
            background-color: #ddd;
        }
        
        .language-level {
            background-color: #dbeafe;
            color: #1e40af;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 8pt;
            margin-left: 5px;
        }
        
        .certification-item {
            margin-bottom: 8px;
            font-size: 10pt;
        }
        
        .two-columns {
            display: table;
            width: 100%;
        }
        
        .column {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding-right: 15px;
        }
        
        .objective {
            font-size: 10pt;
            color: #555;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>{{ $resume->full_name ?: 'Seu Nome' }}</h1>
            <div class="contact-info">
                @if($resume->email)
                    <span>{{ $resume->email }}</span>
                @endif
                @if($resume->phone)
                    <span>{{ $resume->phone }}</span>
                @endif
                @if($resume->city)
                    <span>{{ $resume->city }}@if($resume->state), {{ $resume->state }}@endif</span>
                @endif
                @if($resume->linkedin)
                    <span>{{ $resume->linkedin }}</span>
                @endif
            </div>
        </div>

        <div class="content">
            <!-- Objetivo -->
            @if($resume->objective)
            <div class="section">
                <h2 class="section-title">Objetivo Profissional</h2>
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
                            {{ $exp->current ? 'Atual' : ($exp->end_date ? $exp->end_date->format('m/Y') : '') }}
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
                        <span class="item-title">{{ $edu->degree }} em {{ $edu->field }}</span>
                        <span class="item-date">
                            {{ $edu->start_date ? $edu->start_date->format('m/Y') : '' }} - 
                            {{ $edu->current ? 'Cursando' : ($edu->end_date ? $edu->end_date->format('m/Y') : '') }}
                        </span>
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
                        <div class="skills-list">
                            @foreach($resume->skills as $skill)
                            <div class="skill-item">
                                {{ $skill->name }}
                                <span class="skill-dots">
                                    @for($i = 1; $i <= 5; $i++)
                                        <span class="dot {{ $i <= $skill->level ? 'dot-filled' : 'dot-empty' }}"></span>
                                    @endfor
                                </span>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                @endif

                @if(count($resume->languages) > 0)
                <div class="column">
                    <div class="section">
                        <h2 class="section-title">Idiomas</h2>
                        <div class="languages-list">
                            @foreach($resume->languages as $lang)
                            <div class="language-item">
                                {{ $lang->name }}
                                <span class="language-level">{{ $lang->level }}</span>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                @endif
            </div>

            <!-- Certificações -->
            @if(count($resume->certifications) > 0)
            <div class="section">
                <h2 class="section-title">Certificações</h2>
                @foreach($resume->certifications as $cert)
                <div class="certification-item">
                    <strong>{{ $cert->name }}</strong> - {{ $cert->issuer }}
                    @if($cert->date)
                        ({{ $cert->date->format('m/Y') }})
                    @endif
                </div>
                @endforeach
            </div>
            @endif
        </div>
    </div>
</body>
</html>
