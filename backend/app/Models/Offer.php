<?php

namespace App\Models;

use App\Models\Like;
use App\Models\User;
use App\Models\Rental;
use App\Models\Report;
use App\Models\Review;
use App\Models\Category;
use App\Models\Location;
use App\Models\OfferSubscription;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'location_id',
        'thumbnail',
        'title',
        'description',
        'price',
        'available'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function rental()
    {
        return $this->hasOne(Rental::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(OfferSubscription::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
