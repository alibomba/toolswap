<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Elektronarzędzia'
        ]);

        Category::create([
            'name' => 'Ogrodnicze narzędzia'
        ]);

        Category::create([
            'name' => 'Narzędzia budowlane'
        ]);

        Category::create([
            'name' => 'Narzędzia gastronomiczne'
        ]);

        Category::create([
            'name' => 'Sprzęt eventowy'
        ]);

        Category::create([
            'name' => 'Narzędzia ręczne'
        ]);

        Category::create([
            'name' => 'Sprzęt do ogrodu'
        ]);

        Category::create([
            'name' => 'Narzędzia do remontu i wykończenia'
        ]);

        Category::create([
            'name' => 'Sprzęt sportowy i rekreacyjny'
        ]);

        Category::create([
            'name' => 'Narzędzia do obróbki drewna'
        ]);

        Category::create([
            'name' => 'Sprzęt do fotografii i wideofilmowania'
        ]);

        Category::create([
            'name' => 'Narzędzia do elektroniki'
        ]);

        Category::create([
            'name' => 'Sprzęt do pielęgnacji ogrodu'
        ]);

        Category::create([
            'name' => 'Narzędzia do tapicerstwa i krawiectwa'
        ]);

        Category::create([
            'name' => 'Sprzęt do konserwacji samochodów'
        ]);

        Category::create([
            'name' => 'Narzędzia ogrodowe dla dzieci'
        ]);

        Category::create([
            'name' => 'Sprzęt do sztuki i rzemiosła'
        ]);

        Category::create([
            'name' => 'Narzędzia do czyszczenia i konserwacji'
        ]);
    }
}
