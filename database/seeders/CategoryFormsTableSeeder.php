<?php

namespace Database\Seeders;

use App\Models\CategoryForm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryFormsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (CategoryForm::count()) {
            CategoryForm::truncate();
        }
        /*
UPDATE `category_forms` SET `content`='[{"id":"7305","type":"TextField","extraAttributes":{"label":"\u0645\u062a\u0631\u0627\u0698","placeholder":null,"helperText":null,"required":false}},{"id":"7636","type":"SelectField","extraAttributes":{"label":"\u062a\u0639\u062f\u0627\u062f \u0627\u062a\u0627\u0642","placeholder":null,"helperText":null,"required":false,"options":["\u0628\u062f\u0648\u0646 \u0627\u062a\u0627\u0642","\u06cc\u06a9","\u062f\u0648","\u0633\u0647","\u0686\u0647\u0627\u0631","\u067e\u0646\u0686","\u0628\u06cc\u0634\u062a\u0631 \u0627\u0632 \u067e\u0646\u062c"]}},{"id":"9884","type":"TextField","extraAttributes":{"label":"\u0633\u0627\u0644 \u0633\u0627\u062e\u062a","placeholder":null,"helperText":null,"required":false}},{"id":"3137","type":"SelectField","extraAttributes":{"label":"\u0637\u0628\u0642\u0647","placeholder":null,"helperText":null,"required":false,"options":["\u0647\u0645\u06a9\u0641","\u06f1","\u06f2","\u0628\u06cc\u0634\u062a\u0631 \u0627\u0632 \u06f2"]}},{"id":"7998","type":"SelectField","extraAttributes":{"label":"\u0622\u0633\u0627\u0646\u0633\u0648\u0631","placeholder":null,"helperText":null,"required":false,"options":["\u062f\u0627\u0631\u062f","\u0646\u062f\u0627\u0631\u062f"]}},{"id":"9908","type":"SelectField","extraAttributes":{"label":"\u067e\u0627\u0631\u06a9\u06cc\u0646\u06af","placeholder":null,"helperText":null,"required":false,"options":["\u062f\u0627\u0631\u062f","\u0646\u062f\u0627\u0631\u062f"]}},{"id":"7433","type":"SelectField","extraAttributes":{"label":"\u0627\u0646\u0628\u0627\u0631\u06cc","placeholder":null,"helperText":null,"required":false,"options":["\u062f\u0627\u0631\u062f","\u0646\u062f\u0627\u0631\u062f"]}}]'
 WHERE id IN (1, 2,3,4,5,6);

UPDATE `category_forms` SET `content`='[{"id":"998","type":"TextField","extraAttributes":{"label":"\u0628\u0631\u0646\u062f  \u0648 \u062a\u06cc\u067e","placeholder":null,"helperText":null,"required":false}},{"id":"8010","type":"TextField","extraAttributes":{"label":"\u0645\u062f\u0644","placeholder":null,"helperText":null,"required":false}},{"id":"3930","type":"TextField","extraAttributes":{"label":"\u0631\u0646\u06af","placeholder":null,"helperText":null,"required":false}},{"id":"4921","type":"TextField","extraAttributes":{"label":"\u06a9\u0627\u0631\u06a9\u0631\u062f","placeholder":null,"helperText":null,"required":false}},{"id":"3754","type":"TextField","extraAttributes":{"label":"\u0648\u0636\u0639\u06cc\u062a \u0628\u062f\u0646\u0647","placeholder":null,"helperText":null,"required":false}}]'
 WHERE id IN (7,8,9,10);

UPDATE `category_forms` SET `content`='[{"id":"1120","type":"TextField","extraAttributes":{"label":"\u0628\u0631\u0646\u062f \u0648 \u0645\u062f\u0644","placeholder":null,"helperText":null,"required":false}},{"id":"5637","type":"SelectField","extraAttributes":{"label":"\u0648\u0636\u0639\u06cc\u062a","placeholder":null,"helperText":null,"required":false,"options":["\u0646\u0648","\u06a9\u0627\u0631\u06a9\u0631\u062f\u0647"]}},{"id":"5398","type":"CheckboxField","extraAttributes":{"label":"\u0627\u0635\u0627\u0644\u062a \u062f\u0627\u0631\u062f","helperText":null,"required":false}}]'
 WHERE id IN (11,12,13,14,15);

UPDATE `category_forms` SET `content`='[{"id":"7621","type":"TextField","extraAttributes":{"label":"\u0628\u0631\u0646\u062f","placeholder":null,"helperText":null,"required":false}},{"id":"5018","type":"SelectField","extraAttributes":{"label":"\u0648\u0636\u0639\u06cc\u062a","placeholder":null,"helperText":null,"required":false,"options":["\u0646\u0648","\u06a9\u0627\u0631\u06a9\u0631\u062f\u0647"]}}]'
 WHERE id IN (16,17,18,19,20,21,22,23,24,25);
*/
        $form1 = '[{"id":"7305","type":"TextField","extraAttributes":{"label":"\u0645\u062a\u0631\u0627\u0698","placeholder":null,"helperText":null,"required":false}},{"id":"7636","type":"SelectField","extraAttributes":{"label":"\u062a\u0639\u062f\u0627\u062f \u0627\u062a\u0627\u0642","placeholder":null,"helperText":null,"required":false,"options":["\u0628\u062f\u0648\u0646 \u0627\u062a\u0627\u0642","\u06cc\u06a9","\u062f\u0648","\u0633\u0647","\u0686\u0647\u0627\u0631","\u067e\u0646\u0686","\u0628\u06cc\u0634\u062a\u0631 \u0627\u0632 \u067e\u0646\u062c"]}},{"id":"9884","type":"TextField","extraAttributes":{"label":"\u0633\u0627\u0644 \u0633\u0627\u062e\u062a","placeholder":null,"helperText":null,"required":false}},{"id":"3137","type":"SelectField","extraAttributes":{"label":"\u0637\u0628\u0642\u0647","placeholder":null,"helperText":null,"required":false,"options":["\u0647\u0645\u06a9\u0641","\u06f1","\u06f2","\u0628\u06cc\u0634\u062a\u0631 \u0627\u0632 \u06f2"]}},{"id":"7998","type":"SelectField","extraAttributes":{"label":"\u0622\u0633\u0627\u0646\u0633\u0648\u0631","placeholder":null,"helperText":null,"required":false,"options":["\u062f\u0627\u0631\u062f","\u0646\u062f\u0627\u0631\u062f"]}},{"id":"9908","type":"SelectField","extraAttributes":{"label":"\u067e\u0627\u0631\u06a9\u06cc\u0646\u06af","placeholder":null,"helperText":null,"required":false,"options":["\u062f\u0627\u0631\u062f","\u0646\u062f\u0627\u0631\u062f"]}},{"id":"7433","type":"SelectField","extraAttributes":{"label":"\u0627\u0646\u0628\u0627\u0631\u06cc","placeholder":null,"helperText":null,"required":false,"options":["\u062f\u0627\u0631\u062f","\u0646\u062f\u0627\u0631\u062f"]}}]';
        $form2 = '[{"id":"998","type":"TextField","extraAttributes":{"label":"\u0628\u0631\u0646\u062f  \u0648 \u062a\u06cc\u067e","placeholder":null,"helperText":null,"required":false}},{"id":"8010","type":"TextField","extraAttributes":{"label":"\u0645\u062f\u0644","placeholder":null,"helperText":null,"required":false}},{"id":"3930","type":"TextField","extraAttributes":{"label":"\u0631\u0646\u06af","placeholder":null,"helperText":null,"required":false}},{"id":"4921","type":"TextField","extraAttributes":{"label":"\u06a9\u0627\u0631\u06a9\u0631\u062f","placeholder":null,"helperText":null,"required":false}},{"id":"3754","type":"TextField","extraAttributes":{"label":"\u0648\u0636\u0639\u06cc\u062a \u0628\u062f\u0646\u0647","placeholder":null,"helperText":null,"required":false}}]';
        $form3 = '[{"id":"1120","type":"TextField","extraAttributes":{"label":"\u0628\u0631\u0646\u062f \u0648 \u0645\u062f\u0644","placeholder":null,"helperText":null,"required":false}},{"id":"5637","type":"SelectField","extraAttributes":{"label":"\u0648\u0636\u0639\u06cc\u062a","placeholder":null,"helperText":null,"required":false,"options":["\u0646\u0648","\u06a9\u0627\u0631\u06a9\u0631\u062f\u0647"]}},{"id":"5398","type":"CheckboxField","extraAttributes":{"label":"\u0627\u0635\u0627\u0644\u062a \u062f\u0627\u0631\u062f","helperText":null,"required":false}}]';
        $form4 = '[{"id":"7621","type":"TextField","extraAttributes":{"label":"\u0628\u0631\u0646\u062f","placeholder":null,"helperText":null,"required":false}},{"id":"5018","type":"SelectField","extraAttributes":{"label":"\u0648\u0636\u0639\u06cc\u062a","placeholder":null,"helperText":null,"required":false,"options":["\u0646\u0648","\u06a9\u0627\u0631\u06a9\u0631\u062f\u0647"]}}]';
        $forms = array($form1, $form2, $form3, $form4);
        for ($i = 5; $i <= 31; $i++) {
            if ($i >= 5 && $i <= 10) {
                $formIndex = 0; // Use the first form configuration
            } elseif ($i >= 11 && $i <= 14) {
                $formIndex = 1; // Use the second form configuration
            } elseif ($i >= 15 && $i <= 19) {
                $formIndex = 2; // Use the third form configuration
            } elseif ($i >= 20 && $i <= 31) {
                $formIndex = 3; // Use the fourth form configuration
            }

            CategoryForm::create([
                'user_id' => 1,
                'category_id' => $i,
                // 'content' => ($forms[$formIndex]), // Assuming you need to store the form as JSON
                'published' => true,
            ]);
        }
    }
}
