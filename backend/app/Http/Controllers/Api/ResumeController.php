<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ResumeController extends Controller
{
    /**
     * Lista todos os currículos do usuário
     */
    public function index(Request $request)
    {
        $resumes = Resume::with(['experiences', 'educations', 'skills', 'languages', 'certifications'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $resumes->map(fn($r) => $r->toFullArray())
        ]);
    }

    /**
     * Cria um novo currículo
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'template' => 'nullable|string|in:modern,classic,creative,minimal,executive,academic',
            'personal.fullName' => 'nullable|string|max:255',
            'personal.email' => 'nullable|email|max:255',
            'personal.phone' => 'nullable|string|max:20',
            'personal.address' => 'nullable|string|max:255',
            'personal.city' => 'nullable|string|max:100',
            'personal.state' => 'nullable|string|max:2',
            'personal.linkedin' => 'nullable|string|max:255',
            'personal.website' => 'nullable|string|max:255',
            'personal.objective' => 'nullable|string|max:1000',
            'experiences' => 'nullable|array',
            'education' => 'nullable|array',
            'skills' => 'nullable|array',
            'languages' => 'nullable|array',
            'certifications' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $personal = $request->input('personal', []);
            
            $resume = Resume::create([
                'template' => $request->input('template', 'modern'),
                'full_name' => $personal['fullName'] ?? null,
                'email' => $personal['email'] ?? null,
                'phone' => $personal['phone'] ?? null,
                'address' => $personal['address'] ?? null,
                'city' => $personal['city'] ?? null,
                'state' => $personal['state'] ?? null,
                'linkedin' => $personal['linkedin'] ?? null,
                'website' => $personal['website'] ?? null,
                'objective' => $personal['objective'] ?? null,
            ]);

            // Experiências
            if ($request->has('experiences')) {
                foreach ($request->input('experiences') as $index => $exp) {
                    $resume->experiences()->create([
                        'company' => $exp['company'] ?? '',
                        'position' => $exp['position'] ?? '',
                        'start_date' => isset($exp['startDate']) ? $exp['startDate'] . '-01' : null,
                        'end_date' => isset($exp['endDate']) ? $exp['endDate'] . '-01' : null,
                        'current' => $exp['current'] ?? false,
                        'description' => $exp['description'] ?? null,
                        'order' => $index,
                    ]);
                }
            }

            // Educação
            if ($request->has('education')) {
                foreach ($request->input('education') as $index => $edu) {
                    $resume->educations()->create([
                        'institution' => $edu['institution'] ?? '',
                        'degree' => $edu['degree'] ?? '',
                        'field' => $edu['field'] ?? '',
                        'start_date' => isset($edu['startDate']) ? $edu['startDate'] . '-01' : null,
                        'end_date' => isset($edu['endDate']) ? $edu['endDate'] . '-01' : null,
                        'current' => $edu['current'] ?? false,
                        'order' => $index,
                    ]);
                }
            }

            // Habilidades
            if ($request->has('skills')) {
                foreach ($request->input('skills') as $index => $skill) {
                    $resume->skills()->create([
                        'name' => $skill['name'] ?? '',
                        'level' => $skill['level'] ?? 3,
                        'order' => $index,
                    ]);
                }
            }

            // Idiomas
            if ($request->has('languages')) {
                foreach ($request->input('languages') as $index => $lang) {
                    $resume->languages()->create([
                        'name' => $lang['name'] ?? '',
                        'level' => $lang['level'] ?? 'Intermediário',
                        'order' => $index,
                    ]);
                }
            }

            // Certificações
            if ($request->has('certifications')) {
                foreach ($request->input('certifications') as $index => $cert) {
                    $resume->certifications()->create([
                        'name' => $cert['name'] ?? '',
                        'issuer' => $cert['issuer'] ?? '',
                        'date' => isset($cert['date']) ? $cert['date'] . '-01' : null,
                        'url' => $cert['url'] ?? null,
                        'order' => $index,
                    ]);
                }
            }

            DB::commit();

            $resume->load(['experiences', 'educations', 'skills', 'languages', 'certifications']);

            return response()->json([
                'success' => true,
                'message' => 'Currículo criado com sucesso!',
                'data' => $resume->toFullArray()
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar currículo: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Exibe um currículo específico
     */
    public function show(string $uuid)
    {
        $resume = Resume::where('uuid', $uuid)
            ->with(['experiences', 'educations', 'skills', 'languages', 'certifications'])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $resume->toFullArray()
        ]);
    }

    /**
     * Atualiza um currículo existente
     */
    public function update(Request $request, string $uuid)
    {
        $resume = Resume::where('uuid', $uuid)->firstOrFail();

        try {
            DB::beginTransaction();

            $personal = $request->input('personal', []);
            
            $resume->update([
                'template' => $request->input('template', $resume->template),
                'full_name' => $personal['fullName'] ?? $resume->full_name,
                'email' => $personal['email'] ?? $resume->email,
                'phone' => $personal['phone'] ?? $resume->phone,
                'address' => $personal['address'] ?? $resume->address,
                'city' => $personal['city'] ?? $resume->city,
                'state' => $personal['state'] ?? $resume->state,
                'linkedin' => $personal['linkedin'] ?? $resume->linkedin,
                'website' => $personal['website'] ?? $resume->website,
                'objective' => $personal['objective'] ?? $resume->objective,
            ]);

            // Atualiza experiências
            if ($request->has('experiences')) {
                $resume->experiences()->delete();
                foreach ($request->input('experiences') as $index => $exp) {
                    $resume->experiences()->create([
                        'company' => $exp['company'] ?? '',
                        'position' => $exp['position'] ?? '',
                        'start_date' => isset($exp['startDate']) ? $exp['startDate'] . '-01' : null,
                        'end_date' => isset($exp['endDate']) ? $exp['endDate'] . '-01' : null,
                        'current' => $exp['current'] ?? false,
                        'description' => $exp['description'] ?? null,
                        'order' => $index,
                    ]);
                }
            }

            // Atualiza educação
            if ($request->has('education')) {
                $resume->educations()->delete();
                foreach ($request->input('education') as $index => $edu) {
                    $resume->educations()->create([
                        'institution' => $edu['institution'] ?? '',
                        'degree' => $edu['degree'] ?? '',
                        'field' => $edu['field'] ?? '',
                        'start_date' => isset($edu['startDate']) ? $edu['startDate'] . '-01' : null,
                        'end_date' => isset($edu['endDate']) ? $edu['endDate'] . '-01' : null,
                        'current' => $edu['current'] ?? false,
                        'order' => $index,
                    ]);
                }
            }

            // Atualiza habilidades
            if ($request->has('skills')) {
                $resume->skills()->delete();
                foreach ($request->input('skills') as $index => $skill) {
                    $resume->skills()->create([
                        'name' => $skill['name'] ?? '',
                        'level' => $skill['level'] ?? 3,
                        'order' => $index,
                    ]);
                }
            }

            // Atualiza idiomas
            if ($request->has('languages')) {
                $resume->languages()->delete();
                foreach ($request->input('languages') as $index => $lang) {
                    $resume->languages()->create([
                        'name' => $lang['name'] ?? '',
                        'level' => $lang['level'] ?? 'Intermediário',
                        'order' => $index,
                    ]);
                }
            }

            // Atualiza certificações
            if ($request->has('certifications')) {
                $resume->certifications()->delete();
                foreach ($request->input('certifications') as $index => $cert) {
                    $resume->certifications()->create([
                        'name' => $cert['name'] ?? '',
                        'issuer' => $cert['issuer'] ?? '',
                        'date' => isset($cert['date']) ? $cert['date'] . '-01' : null,
                        'url' => $cert['url'] ?? null,
                        'order' => $index,
                    ]);
                }
            }

            DB::commit();

            $resume->load(['experiences', 'educations', 'skills', 'languages', 'certifications']);

            return response()->json([
                'success' => true,
                'message' => 'Currículo atualizado com sucesso!',
                'data' => $resume->toFullArray()
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar currículo: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove um currículo
     */
    public function destroy(string $uuid)
    {
        $resume = Resume::where('uuid', $uuid)->firstOrFail();
        $resume->delete();

        return response()->json([
            'success' => true,
            'message' => 'Currículo removido com sucesso!'
        ]);
    }
}
