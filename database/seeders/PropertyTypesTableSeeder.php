<?php

namespace Database\Seeders;

use App\Models\PropertyType;
use Illuminate\Database\Seeder;

class PropertyTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(PropertyType::count()){
            PropertyType::truncate();
        }

        $types = [
            'checkbox-group' => true,
            'date' => false,
            'file' => false,
            'header' => false,
            'number' => false,
            'paragraph' => false,
            'radio-group' => true,
            'select' => true,
            'text' => false,
            'textarea' => false,
        ];

        foreach($types as $type => $has_answer){
            PropertyType::create([
                'type' => $type,
                'has_answer' => $has_answer,
            ]);
            $this->command->info('add ' . $type . ' type question');
        }
    }
}
