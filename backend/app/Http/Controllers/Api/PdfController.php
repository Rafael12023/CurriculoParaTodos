<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PdfController extends Controller
{
    /**
     * Gera o PDF do currículo
     */
    public function generate(Request $request, string $uuid)
    {
        $resume = Resume::where('uuid', $uuid)
            ->with(['experiences', 'educations', 'skills', 'languages', 'certifications'])
            ->firstOrFail();

        $template = $resume->template ?? 'modern';
        $viewName = 'pdf.templates.' . $template;

        // Verifica se o template existe, senão usa o modern
        if (!view()->exists($viewName)) {
            $viewName = 'pdf.templates.modern';
        }

        $pdf = Pdf::loadView($viewName, [
            'resume' => $resume
        ]);

        $pdf->setPaper('A4', 'portrait');
        $pdf->setOptions([
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
            'defaultFont' => 'sans-serif',
        ]);

        $filename = 'curriculo-' . ($resume->full_name ? str_replace(' ', '-', strtolower($resume->full_name)) : $resume->uuid) . '.pdf';

        return $pdf->download($filename);
    }

    /**
     * Visualiza o PDF no navegador
     */
    public function preview(Request $request, string $uuid)
    {
        $resume = Resume::where('uuid', $uuid)
            ->with(['experiences', 'educations', 'skills', 'languages', 'certifications'])
            ->firstOrFail();

        $template = $resume->template ?? 'modern';
        $viewName = 'pdf.templates.' . $template;

        if (!view()->exists($viewName)) {
            $viewName = 'pdf.templates.modern';
        }

        $pdf = Pdf::loadView($viewName, [
            'resume' => $resume
        ]);

        $pdf->setPaper('A4', 'portrait');
        $pdf->setOptions([
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
            'defaultFont' => 'sans-serif',
        ]);

        return $pdf->stream('curriculo.pdf');
    }

    /**
     * Gera PDF a partir de dados enviados diretamente (sem salvar)
     */
    public function generateFromData(Request $request)
    {
        $data = $request->all();
        $template = $data['template'] ?? 'modern';
        $viewName = 'pdf.templates.' . $template;

        if (!view()->exists($viewName)) {
            $viewName = 'pdf.templates.modern';
        }

        // Cria um objeto para passar para o template
        $resume = (object) [
            'template' => $template,
            'full_name' => $data['personal']['fullName'] ?? '',
            'email' => $data['personal']['email'] ?? '',
            'phone' => $data['personal']['phone'] ?? '',
            'address' => $data['personal']['address'] ?? '',
            'city' => $data['personal']['city'] ?? '',
            'state' => $data['personal']['state'] ?? '',
            'linkedin' => $data['personal']['linkedin'] ?? '',
            'website' => $data['personal']['website'] ?? '',
            'objective' => $data['personal']['objective'] ?? '',
            'experiences' => collect($data['experiences'] ?? [])->map(fn($e) => (object) [
                'company' => $e['company'] ?? '',
                'position' => $e['position'] ?? '',
                'start_date' => isset($e['startDate']) ? \Carbon\Carbon::parse($e['startDate'] . '-01') : null,
                'end_date' => isset($e['endDate']) ? \Carbon\Carbon::parse($e['endDate'] . '-01') : null,
                'current' => $e['current'] ?? false,
                'description' => $e['description'] ?? '',
            ]),
            'educations' => collect($data['education'] ?? [])->map(fn($e) => (object) [
                'institution' => $e['institution'] ?? '',
                'degree' => $e['degree'] ?? '',
                'field' => $e['field'] ?? '',
                'start_date' => isset($e['startDate']) ? \Carbon\Carbon::parse($e['startDate'] . '-01') : null,
                'end_date' => isset($e['endDate']) ? \Carbon\Carbon::parse($e['endDate'] . '-01') : null,
                'current' => $e['current'] ?? false,
            ]),
            'skills' => collect($data['skills'] ?? [])->map(fn($s) => (object) [
                'name' => $s['name'] ?? '',
                'level' => $s['level'] ?? 3,
            ]),
            'languages' => collect($data['languages'] ?? [])->map(fn($l) => (object) [
                'name' => $l['name'] ?? '',
                'level' => $l['level'] ?? 'Intermediário',
            ]),
            'certifications' => collect($data['certifications'] ?? [])->map(fn($c) => (object) [
                'name' => $c['name'] ?? '',
                'issuer' => $c['issuer'] ?? '',
                'date' => isset($c['date']) ? \Carbon\Carbon::parse($c['date'] . '-01') : null,
                'url' => $c['url'] ?? '',
            ]),
        ];

        $pdf = Pdf::loadView($viewName, [
            'resume' => $resume
        ]);

        $pdf->setPaper('A4', 'portrait');
        $pdf->setOptions([
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
            'defaultFont' => 'sans-serif',
        ]);

        $filename = 'curriculo-' . ($resume->full_name ? str_replace(' ', '-', strtolower($resume->full_name)) : 'novo') . '.pdf';

        return $pdf->download($filename);
    }
}
