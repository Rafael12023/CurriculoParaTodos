<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ResumeController;
use App\Http\Controllers\Api\PdfController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // Rotas de Currículo
    Route::apiResource('resumes', ResumeController::class)->parameters([
        'resumes' => 'uuid'
    ]);

    // Rotas de PDF
    Route::post('pdf/generate', [PdfController::class, 'generateFromData']);
    Route::get('resumes/{uuid}/pdf', [PdfController::class, 'generate']);
    Route::get('resumes/{uuid}/pdf/preview', [PdfController::class, 'preview']);
});

// Rota de healthcheck
Route::get('health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString()
    ]);
});
