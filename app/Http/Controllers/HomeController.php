<?php

namespace App\Http\Controllers;

use App\Models\Advert;
use App\Models\Category;
use App\Models\City;
use Illuminate\Http\Request;
use Elastic\Elasticsearch\ClientBuilder;
use Exception;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    public function index()
    {
        $hosts = [
            env("ELASTICSEARCH_HOST", "http://elasticsearch:9200"),
        ];

        $client = ClientBuilder::create()
            ->setHosts($hosts)
            ->build();
        $params = [];
        // $params['body'] = [
        //     'name' => 'alireza',
        //     'lastname' => 'dadvar',
        //     'age' => '12'
        // ];
        // $params['index'] = 'myindex';
        // $params['type'] = 'mytype';
        // $result = $client->index($params);
        // dd($result);

        $params['index'] = '_all';
        $params['type'] = 'mytype';

        $params['body']['query'][['match']['lastname']] = 'dadvar';
        dd($params);
        $result = $client->search([
            'body' =>
            [
                'query' =>
                [
                    'bool' =>
                    [
                        'should' =>
                        [
                            'match' =>
                            [
                                'name' => 'alireza'
                            ],
                            'match' =>
                            [
                                'lastname' => 'dadvar'
                            ],
                        ]
                    ]
                ]
            ]
        ]);

        dd($result['hits']['hits']);
    }

    public function homeData(Request $r)
    {
        try {
            $pageData = [];
            $pageData['title'] = 'صفحه اصلی';
            $pageData['description'] = 'اینجا صفحه اصلی برنامه است.';

            // Specify a pagination size, for example 10 items per page
            $perPage = $r->per_page ?? 21;
            $query = Advert::query();
            $conditions = [];
            $conditions['state'] = ['accepted'];
            $query->orderBy('id', 'desc');
            $query->where($conditions);
            $query->with(['user', 'category']);
            $pageData['adverts'] = $query->paginate($perPage);

            $pageData['categories'] = Category::with('child')->get();

            return response()->json(
                $pageData,
                200
            );
        } catch (Exception $e) {
            Log::error($e);
            return response([
                'message' => 'خطایی رخ داده است.'
            ], 500);
        }
    }

    public function cities()
    {
        $cities = City::where('parent_id', 1)->with('child')->get();
        return $cities;
    }
}
