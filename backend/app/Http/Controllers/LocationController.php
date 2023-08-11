<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getAutocomplete(Request $request)
    {
        return Location::where('city', 'like', $request['phrase'].'%')->get('city');
    }

    public function show(Location $location)
    {
        return $location;
    }
}
