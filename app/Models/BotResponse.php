<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BotResponse extends Model
{
    protected $fillable = [
        'sender_name',
        'message',
        'response',
    ];
}
