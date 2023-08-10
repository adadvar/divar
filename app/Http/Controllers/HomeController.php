<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Elastic\Elasticsearch\ClientBuilder;

class HomeController extends Controller
{
    public function index()
    {
        $hosts = [
            env("ELASTICSEARCH_HOST","http://elasticsearch:9200"),
        ];

        $client = ClientBuilder::create()
            ->setHosts($hosts)
            ->build();
        $params=[];
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
}
