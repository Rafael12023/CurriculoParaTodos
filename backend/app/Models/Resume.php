<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Resume extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'user_id',
        'template',
        'full_name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'linkedin',
        'website',
        'objective',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($resume) {
            if (empty($resume->uuid)) {
                $resume->uuid = Str::uuid();
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class)->orderBy('order');
    }

    public function educations(): HasMany
    {
        return $this->hasMany(Education::class)->orderBy('order');
    }

    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class)->orderBy('order');
    }

    public function languages(): HasMany
    {
        return $this->hasMany(Language::class)->orderBy('order');
    }

    public function certifications(): HasMany
    {
        return $this->hasMany(Certification::class)->orderBy('order');
    }

    public function toFullArray(): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'template' => $this->template,
            'personal' => [
                'fullName' => $this->full_name,
                'email' => $this->email,
                'phone' => $this->phone,
                'address' => $this->address,
                'city' => $this->city,
                'state' => $this->state,
                'linkedin' => $this->linkedin,
                'website' => $this->website,
                'objective' => $this->objective,
            ],
            'experiences' => $this->experiences->map(fn($e) => [
                'id' => $e->id,
                'company' => $e->company,
                'position' => $e->position,
                'startDate' => $e->start_date?->format('Y-m'),
                'endDate' => $e->end_date?->format('Y-m'),
                'current' => $e->current,
                'description' => $e->description,
            ])->toArray(),
            'education' => $this->educations->map(fn($e) => [
                'id' => $e->id,
                'institution' => $e->institution,
                'degree' => $e->degree,
                'field' => $e->field,
                'startDate' => $e->start_date?->format('Y-m'),
                'endDate' => $e->end_date?->format('Y-m'),
                'current' => $e->current,
            ])->toArray(),
            'skills' => $this->skills->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->name,
                'level' => $s->level,
            ])->toArray(),
            'languages' => $this->languages->map(fn($l) => [
                'id' => $l->id,
                'name' => $l->name,
                'level' => $l->level,
            ])->toArray(),
            'certifications' => $this->certifications->map(fn($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'issuer' => $c->issuer,
                'date' => $c->date?->format('Y-m'),
                'url' => $c->url,
            ])->toArray(),
        ];
    }
}
