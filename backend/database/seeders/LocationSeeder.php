<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->dolnoslaskie();
        $this->kujawskoPomorskie();
        $this->lubelskie();
        $this->lubuskie();
        $this->lodzkie();
        $this->malopolskie();
        $this->mazowieckie();
        $this->opolskie();
        $this->podkarpackie();
        $this->podlaskie();
        $this->pomorskie();
        $this->slaskie();
        $this->swietokrzyskie();
        $this->warminskoMazurskie();
        $this->wielkopolskie();
        $this->zachodniopomorskie();
    }

    private function dolnoslaskie()
    {
        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Bielawa',
            'latitude' => 50.675,
            'longitude' => 16.607
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Bogatynia',
            'latitude' => 50.907,
            'longitude' => 14.953
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Boguszów-Gorce',
            'latitude' => 50.755,
            'longitude' => 16.196
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Bolesławiec',
            'latitude' => 51.262,
            'longitude' => 15.555
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Dzierżoniów',
            'latitude' => 50.729,
            'longitude' => 16.656
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Głogów',
            'latitude' => 51.670,
            'longitude' => 16.061
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Jawor',
            'latitude' => 51.067,
            'longitude' => 16.197
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Jelcz-Laskowice',
            'latitude' => 51.039,
            'longitude' => 17.349
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Jelenia Góra',
            'latitude' => 50.903,
            'longitude' => 15.734
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Kamienna Góra',
            'latitude' => 50.784,
            'longitude' => 16.022
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Kłodzko',
            'latitude' => 50.433,
            'longitude' => 16.642
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Legnica',
            'latitude' => 51.204,
            'longitude' => 16.174
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Lubań',
            'latitude' => 51.118,
            'longitude' => 15.289
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Lubin',
            'latitude' => 51.399,
            'longitude' => 16.199
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Nowa Ruda',
            'latitude' => 50.573,
            'longitude' => 16.511
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Oława',
            'latitude' => 50.957,
            'longitude' => 17.290
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Oleśnica',
            'latitude' => 51.210,
            'longitude' => 17.382
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Polkowice',
            'latitude' => 51.503,
            'longitude' => 16.071
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Strzegom',
            'latitude' => 50.960,
            'longitude' => 16.346
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Świdnica',
            'latitude' => 50.842,
            'longitude' => 16.487
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Świebodzice',
            'latitude' => 50.872,
            'longitude' => 16.322
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Wałbrzych',
            'latitude' => 50.765,
            'longitude' => 16.282
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Wrocław',
            'latitude' => 51.108,
            'longitude' => 17.032
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Ząbkowice Śląskie',
            'latitude' => 50.589,
            'longitude' => 16.811
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Zgorzelec',
            'latitude' => 51.151,
            'longitude' => 15.014
        ]);

        Location::create([
            'voivodeship' => 'Dolnośląskie',
            'city' => 'Złotoryja',
            'latitude' => 51.122,
            'longitude' => 15.919
        ]);
    }

    private function kujawskoPomorskie()
    {
        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Brodnica',
            'latitude' => 53.258,
            'longitude' => 19.405
        ]);

        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Bydgoszcz',
            'latitude' => 53.121,
            'longitude' => 18.000
        ]);

        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Chełmno',
            'latitude' => 53.352,
            'longitude' => 18.440
        ]);

        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Grudziądz',
            'latitude' => 53.472,
            'longitude' => 18.761
        ]);

        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Inowrocław',
            'latitude' => 52.781,
            'longitude' => 18.246
        ]);

        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Nakło nad Notecią',
            'latitude' => 53.138,
            'longitude' => 17.599
        ]);

        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Rypin',
            'latitude' => 53.062,
            'longitude' => 19.419
        ]);

        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Solec Kujawski',
            'latitude' => 53.079,
            'longitude' => 18.224
        ]);

        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Świecie',
            'latitude' => 53.407,
            'longitude' => 18.445
        ]);

        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Toruń',
            'latitude' => 53.010,
            'longitude' => 18.604
        ]);

        Location::create([
            'voivodeship' => 'Kujawsko-pomorskie',
            'city' => 'Włocławek',
            'latitude' => 52.660,
            'longitude' => 19.072
        ]);
    }

    private function lubelskie()
    {
        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Biała Podlaska',
            'latitude' => 52.029,
            'longitude' => 23.149
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Biłgoraj',
            'latitude' => 50.542,
            'longitude' => 22.720
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Chełm',
            'latitude' => 51.135,
            'longitude' => 23.493
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Dęblin',
            'latitude' => 51.567,
            'longitude' => 21.856
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Hrubieszów',
            'latitude' => 50.806,
            'longitude' => 23.886
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Kraśnik',
            'latitude' => 50.943,
            'longitude' => 22.208
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Krasnystaw',
            'latitude' => 50.991,
            'longitude' => 23.165
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Łęczna',
            'latitude' => 51.300,
            'longitude' => 22.886
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Lubartów',
            'latitude' => 51.458,
            'longitude' => 22.611
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Lublin',
            'latitude' => 51.250,
            'longitude' => 22.570
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Łuków',
            'latitude' => 51.925,
            'longitude' => 22.372
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Międzyrzec Podlaski',
            'latitude' => 51.981,
            'longitude' => 22.786
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Puławy',
            'latitude' => 51.426,
            'longitude' => 21.985
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Radzyń Podlaski',
            'latitude' => 51.775,
            'longitude' => 22.624
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Świdnik',
            'latitude' => 51.216,
            'longitude' => 22.690
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Tomaszów Lubelski',
            'latitude' => 50.447,
            'longitude' => 23.429
        ]);

        Location::create([
            'voivodeship' => 'Lubelskie',
            'city' => 'Zamość',
            'latitude' => 50.721,
            'longitude' => 23.259
        ]);
    }

    private function lubuskie()
    {
        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Gorzów Wielkopolski',
            'latitude' => 52.730,
            'longitude' => 15.240
        ]);

        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Gubin',
            'latitude' => 51.957,
            'longitude' => 14.737
        ]);

        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Kostrzyn nad Odrą',
            'latitude' => 52.616,
            'longitude' => 14.627
        ]);

        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Międzyrzecz',
            'latitude' => 52.444,
            'longitude' => 15.578
        ]);

        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Nowa Sól',
            'latitude' => 51.803,
            'longitude' => 15.706
        ]);

        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Słubice',
            'latitude' => 52.355,
            'longitude' => 14.566
        ]);

        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Sulechów',
            'latitude' => 52.085,
            'longitude' => 15.625
        ]);

        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Świebodzin',
            'latitude' => 52.249,
            'longitude' => 15.532
        ]);

        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Żagań',
            'latitude' => 51.615,
            'longitude' => 15.300
        ]);

        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Żary',
            'latitude' => 51.624,
            'longitude' => 15.148
        ]);

        Location::create([
            'voivodeship' => 'Lubuskie',
            'city' => 'Zielona Góra',
            'latitude' => 51.938,
            'longitude' => 15.505
        ]);
    }

    private function lodzkie()
    {
        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Aleksandrów Łódzki',
            'latitude' => 51.819,
            'longitude' => 19.303
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Bełchatów',
            'latitude' => 51.354,
            'longitude' => 19.376
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Głowno',
            'latitude' => 51.962,
            'longitude' => 19.711
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Konstantynów Łódzki',
            'latitude' => 51.757,
            'longitude' => 19.308
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Kutno',
            'latitude' => 52.222,
            'longitude' => 19.387
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Łask',
            'latitude' => 51.592,
            'longitude' => 19.133
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Łęczyca',
            'latitude' => 52.054,
            'longitude' => 19.198
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Łódź',
            'latitude' => 51.768,
            'longitude' => 19.456
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Łowicz',
            'latitude' => 52.101,
            'longitude' => 19.947
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Opoczno',
            'latitude' => 51.378,
            'longitude' => 20.293
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Ozorków',
            'latitude' => 51.958,
            'longitude' => 19.289
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Pabianice',
            'latitude' => 51.666,
            'longitude' => 19.359
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Piotrków Trybunalski',
            'latitude' => 51.412,
            'longitude' => 19.688
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Radomsko',
            'latitude' => 51.071,
            'longitude' => 19.449
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Rawa Mazowiecka',
            'latitude' => 51.758,
            'longitude' => 20.250
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Sieradz',
            'latitude' => 51.601,
            'longitude' => 18.739
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Skierniewice',
            'latitude' => 51.958,
            'longitude' => 20.144
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Tomaszów Mazowiecki',
            'latitude' => 51.519,
            'longitude' => 20.033
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Wieluń',
            'latitude' => 51.220,
            'longitude' => 18.570
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Zduńska Wola',
            'latitude' => 51.594,
            'longitude' => 18.950
        ]);

        Location::create([
            'voivodeship' => 'Łódzkie',
            'city' => 'Zgierz',
            'latitude' => 51.855,
            'longitude' => 19.390
        ]);
    }

    private function malopolskie()
    {
        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Andrychów',
            'latitude' => 49.855,
            'longitude' => 19.343
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Bochnia',
            'latitude' => 49.974,
            'longitude' => 20.425
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Brzesko',
            'latitude' => 49.967,
            'longitude' => 20.606
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Chrzanów',
            'latitude' => 50.141,
            'longitude' => 19.402
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Gorlice',
            'latitude' => 49.666,
            'longitude' => 21.163
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Kęty',
            'latitude' => 49.881,
            'longitude' => 19.230
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Kraków',
            'latitude' => 50.061,
            'longitude' => 19.936
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Libiąż',
            'latitude' => 50.103,
            'longitude' => 19.314
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Limanowa',
            'latitude' => 49.714,
            'longitude' => 20.423
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Nowy Sącz',
            'latitude' => 49.610,
            'longitude' => 20.714
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Nowy Targ',
            'latitude' => 49.489,
            'longitude' => 20.026
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Olkusz',
            'latitude' => 50.278,
            'longitude' => 19.559
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Oświęcim',
            'latitude' => 50.033,
            'longitude' => 19.260
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Skawina',
            'latitude' => 49.974,
            'longitude' => 19.826
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Tarnów',
            'latitude' => 50.025,
            'longitude' => 20.964
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Trzebinia',
            'latitude' => 50.159,
            'longitude' => 19.470
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Wadowice',
            'latitude' => 49.883,
            'longitude' => 19.492
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Wieliczka',
            'latitude' => 49.982,
            'longitude' => 20.060
        ]);

        Location::create([
            'voivodeship' => 'Małopolskie',
            'city' => 'Zakopane',
            'latitude' => 49.296,
            'longitude' => 19.950
        ]);
    }

    private function mazowieckie()
    {
        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Ciechanów',
            'latitude' => 52.871,
            'longitude' => 20.606
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Garwolin',
            'latitude' => 51.895,
            'longitude' => 21.621
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Gostynin',
            'latitude' => 52.424,
            'longitude' => 19.463
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Grodzisk Mazowiecki',
            'latitude' => 52.106,
            'longitude' => 20.631
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Grójec',
            'latitude' => 51.865,
            'longitude' => 20.867
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Józefów',
            'latitude' => 50.480,
            'longitude' => 23.054
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Kobyłka',
            'latitude' => 52.339,
            'longitude' => 21.190
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Konstancin-Jeziorna',
            'latitude' => 52.083,
            'longitude' => 21.120
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Kozienice',
            'latitude' => 51.584,
            'longitude' => 21.549
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Legionowo',
            'latitude' => 52.404,
            'longitude' => 20.933
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Łomianki',
            'latitude' => 52.335,
            'longitude' => 20.895
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Marki',
            'latitude' => 52.336,
            'longitude' => 21.120
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Milanówek',
            'latitude' => 52.124,
            'longitude' => 20.669
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Mińsk Mazowiecki',
            'latitude' => 52.179,
            'longitude' => 21.569
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Mława',
            'latitude' => 53.134,
            'longitude' => 20.362
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Nowy Dwór Mazowiecki',
            'latitude' => 52.434,
            'longitude' => 20.706
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Ostrołęka',
            'latitude' => 53.078,
            'longitude' => 21.574
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Ostrów Mazowiecka',
            'latitude' => 52.807,
            'longitude' => 21.879
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Otwock',
            'latitude' => 52.116,
            'longitude' => 21.293
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Piaseczno',
            'latitude' => 52.074,
            'longitude' => 21.027
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Piastów',
            'latitude' => 52.185,
            'longitude' => 20.847
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Pionki',
            'latitude' => 51.471,
            'longitude' => 21.452
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Płock',
            'latitude' => 52.546,
            'longitude' => 19.700
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Płońsk',
            'latitude' => 52.626,
            'longitude' => 20.364
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Pruszków',
            'latitude' => 52.171,
            'longitude' => 20.802
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Przasnysz',
            'latitude' => 53.018,
            'longitude' => 20.884
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Pułtusk',
            'latitude' => 52.705,
            'longitude' => 21.084
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Radom',
            'latitude' => 51.402,
            'longitude' => 21.154
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Siedlce',
            'latitude' => 52.161,
            'longitude' => 22.281
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Sierpc',
            'latitude' => 52.853,
            'longitude' => 19.661
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Sochaczew',
            'latitude' => 52.236,
            'longitude' => 20.257
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Sokołow Podlaski',
            'latitude' => 52.414,
            'longitude' => 22.239
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Sulejówek',
            'latitude' => 52.244,
            'longitude' => 21.278
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Warszawa',
            'latitude' => 52.231,
            'longitude' => 21.006
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Wołomin',
            'latitude' => 52.346,
            'longitude' => 21.242
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Wyszków',
            'latitude' => 52.592,
            'longitude' => 21.458
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Ząbki',
            'latitude' => 52.292,
            'longitude' => 21.114
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Zielonka',
            'latitude' => 52.310,
            'longitude' => 21.152
        ]);

        Location::create([
            'voivodeship' => 'Mazowieckie',
            'city' => 'Żyrardów',
            'latitude' => 52.055,
            'longitude' => 20.444
        ]);
    }

    private function opolskie()
    {
        Location::create([
            'voivodeship' => 'Opolskie',
            'city' => 'Brzeg',
            'latitude' => 50.858,
            'longitude' => 17.464
        ]);

        Location::create([
            'voivodeship' => 'Opolskie',
            'city' => 'Kędzierzyn-Koźle',
            'latitude' => 50.344,
            'longitude' => 18.210
        ]);

        Location::create([
            'voivodeship' => 'Opolskie',
            'city' => 'Kluczbork',
            'latitude' => 50.973,
            'longitude' => 18.214
        ]);

        Location::create([
            'voivodeship' => 'Opolskie',
            'city' => 'Krapkowice',
            'latitude' => 50.474,
            'longitude' => 17.967
        ]);

        Location::create([
            'voivodeship' => 'Opolskie',
            'city' => 'Namysłów',
            'latitude' => 51.076,
            'longitude' => 17.718
        ]);

        Location::create([
            'voivodeship' => 'Opolskie',
            'city' => 'Nysa',
            'latitude' => 50.473,
            'longitude' => 17.332
        ]);

        Location::create([
            'voivodeship' => 'Opolskie',
            'city' => 'Opole',
            'latitude' => 50.666,
            'longitude' => 17.923
        ]);

        Location::create([
            'voivodeship' => 'Opolskie',
            'city' => 'Prudnik',
            'latitude' => 50.321,
            'longitude' => 17.580
        ]);

        Location::create([
            'voivodeship' => 'Opolskie',
            'city' => 'Strzelce Opolskie',
            'latitude' => 50.510,
            'longitude' => 18.300
        ]);
    }

    private function podkarpackie()
    {
        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Dębica',
            'latitude' => 50.046,
            'longitude' => 21.412
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Jarosław',
            'latitude' => 57.626,
            'longitude' => 39.893
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Jasło',
            'latitude' => 49.746,
            'longitude' => 21.493
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Krosno',
            'latitude' => 49.688,
            'longitude' => 21.753
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Łańcut',
            'latitude' => 50.069,
            'longitude' => 22.233
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Mielec',
            'latitude' => 50.280,
            'longitude' => 21.463
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Nisko',
            'latitude' => 50.519,
            'longitude' => 22.139
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Przemyśl',
            'latitude' => 49.783,
            'longitude' => 22.788
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Przeworsk',
            'latitude' => 50.054,
            'longitude' => 22.501
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Ropczyce',
            'latitude' => 50.052,
            'longitude' => 21.611
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Rzeszów',
            'latitude' => 50.037,
            'longitude' => 22.004
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Sanok',
            'latitude' => 49.558,
            'longitude' => 22.211
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Stalowa Wola',
            'latitude' => 50.565,
            'longitude' => 22.064
        ]);

        Location::create([
            'voivodeship' => 'Podkarpackie',
            'city' => 'Tarnobrzeg',
            'latitude' => 50.592,
            'longitude' => 21.696
        ]);
    }

    private function podlaskie()
    {
        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Augustów',
            'latitude' => 53.843,
            'longitude' => 22.980
        ]);

        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Białystok',
            'latitude' => 53.127,
            'longitude' => 23.147
        ]);

        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Bielsk Podlaski',
            'latitude' => 52.764,
            'longitude' => 23.188
        ]);

        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Grajewo',
            'latitude' => 53.639,
            'longitude' => 22.457
        ]);

        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Hajnówka',
            'latitude' => 52.731,
            'longitude' => 23.571
        ]);

        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Łapy',
            'latitude' => 52.990,
            'longitude' => 22.883
        ]);

        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Łomża',
            'latitude' => 53.182,
            'longitude' => 22.052
        ]);

        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Siemiatycze',
            'latitude' => 52.420,
            'longitude' => 22.875
        ]);

        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Sokółka',
            'latitude' => 53.404,
            'longitude' => 23.499
        ]);

        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Suwałki',
            'latitude' => 54.102,
            'longitude' => 22.931
        ]);

        Location::create([
            'voivodeship' => 'Podlaskie',
            'city' => 'Zambrów',
            'latitude' => 52.975,
            'longitude' => 22.237
        ]);
    }

    private function pomorskie()
    {
        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Bytów',
            'latitude' => 54.169,
            'longitude' => 17.489
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Chojnice',
            'latitude' => 53.699,
            'longitude' => 17.570
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Gdańsk',
            'latitude' => 54.370,
            'longitude' => 18.612
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Gdynia',
            'latitude' => 54.516,
            'longitude' => 18.540
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Kartuzy',
            'latitude' => 54.334,
            'longitude' => 18.197
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Kościerzyna',
            'latitude' => 54.121,
            'longitude' => 17.978
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Kwidzyn',
            'latitude' => 53.720,
            'longitude' => 18.937
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Lębork',
            'latitude' => 54.533,
            'longitude' => 17.744
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Malbork',
            'latitude' => 54.028,
            'longitude' => 19.039
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Pruszcz Gdański',
            'latitude' => 54.257,
            'longitude' => 18.650
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Reda',
            'latitude' => 54.621,
            'longitude' => 18.321
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Rumia',
            'latitude' => 54.570,
            'longitude' => 18.384
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Słupsk',
            'latitude' => 54.463,
            'longitude' => 17.020
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Sopot',
            'latitude' => 54.443,
            'longitude' => 18.561
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Starogard Gdański',
            'latitude' => 53.965,
            'longitude' => 18.526
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Tczew',
            'latitude' => 54.090,
            'longitude' => 18.777
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Ustka',
            'latitude' => 54.573,
            'longitude' => 16.859
        ]);

        Location::create([
            'voivodeship' => 'Pomorskie',
            'city' => 'Wejherowo',
            'latitude' => 54.606,
            'longitude' => 18.231
        ]);
    }

    private function slaskie()
    {
        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Będzin',
            'latitude' => 50.335,
            'longitude' => 19.117
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Bielsko-Biała',
            'latitude' => 49.822,
            'longitude' => 19.044
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Bieruń',
            'latitude' => 50.084,
            'longitude' => 19.125
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Bytom',
            'latitude' => 50.365,
            'longitude' => 18.871
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Chorzów',
            'latitude' => 50.288,
            'longitude' => 18.970
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Cieszyn',
            'latitude' => 49.755,
            'longitude' => 18.656
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Czechowice-Dziedzice',
            'latitude' => 49.911,
            'longitude' => 19.007
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Czeladź',
            'latitude' => 50.319,
            'longitude' => 19.078
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Czerwionka-Leszczyny',
            'latitude' => 50.144,
            'longitude' => 18.653
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Częstochowa',
            'latitude' => 50.812,
            'longitude' => 19.113
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Dąbrowa Górnicza',
            'latitude' => 50.330,
            'longitude' => 19.207
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Gliwice',
            'latitude' => 50.294,
            'longitude' => 18.665
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Jastrzębie-Zdrój',
            'latitude' => 49.951,
            'longitude' => 18.602
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Jaworzno',
            'latitude' => 50.189,
            'longitude' => 19.272
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Katowice',
            'latitude' => 50.259,
            'longitude' => 19.021
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Knurów',
            'latitude' => 50.207,
            'longitude' => 18.663
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Łaziska Górne',
            'latitude' => 50.150,
            'longitude' => 18.839
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Lędziny',
            'latitude' => 50.128,
            'longitude' => 19.116
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Lubliniec',
            'latitude' => 50.669,
            'longitude' => 18.682
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Mikołów',
            'latitude' => 50.196,
            'longitude' => 18.853
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Mysłowice',
            'latitude' => 50.209,
            'longitude' => 19.132
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Myszków',
            'latitude' => 50.564,
            'longitude' => 19.324
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Orzesze',
            'latitude' => 50.143,
            'longitude' => 18.775
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Piekary Śląskie',
            'latitude' => 50.375,
            'longitude' => 18.937
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Pszczyna',
            'latitude' => 49.977,
            'longitude' => 18.942
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Pyskowice',
            'latitude' => 50.398,
            'longitude' => 18.627
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Racibórz',
            'latitude' => 50.090,
            'longitude' => 18.215
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Radlin',
            'latitude' => 50.041,
            'longitude' => 18.464
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Radzionków',
            'latitude' => 50.401,
            'longitude' => 18.903
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Ruda Śląska',
            'latitude' => 50.270,
            'longitude' => 18.864
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Rybnik',
            'latitude' => 50.095,
            'longitude' => 18.541
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Rydułtowy',
            'latitude' => 50.066,
            'longitude' => 18.424
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Siemianowice Śląskie',
            'latitude' => 50.312,
            'longitude' => 19.017
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Sosnowiec',
            'latitude' => 50.278,
            'longitude' => 19.134
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Świętochłowice',
            'latitude' => 50.298,
            'longitude' => 18.907
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Tarnowskie Góry',
            'latitude' => 50.444,
            'longitude' => 18.855
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Tychy',
            'latitude' => 50.114,
            'longitude' => 18.996
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Ustroń',
            'latitude' => 49.718,
            'longitude' => 18.825
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Wodzisław Śląski',
            'latitude' => 50.002,
            'longitude' => 18.448
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Zabrze',
            'latitude' => 50.308,
            'longitude' => 18.786
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Zawiercie',
            'latitude' => 50.484,
            'longitude' => 19.433
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Żory',
            'latitude' => 50.038,
            'longitude' => 18.680
        ]);

        Location::create([
            'voivodeship' => 'Śląskie',
            'city' => 'Żywiec',
            'latitude' => 49.706,
            'longitude' => 19.219
        ]);
    }

    private function swietokrzyskie()
    {
        Location::create([
            'voivodeship' => 'Świętokrzyskie',
            'city' => 'Busko-Zdrój',
            'latitude' => 50.467,
            'longitude' => 20.719
        ]);

        Location::create([
            'voivodeship' => 'Świętokrzyskie',
            'city' => 'Jędrzejów',
            'latitude' => 50.639,
            'longitude' => 20.304
        ]);

        Location::create([
            'voivodeship' => 'Świętokrzyskie',
            'city' => 'Kielce',
            'latitude' => 50.854,
            'longitude' => 20.609
        ]);

        Location::create([
            'voivodeship' => 'Świętokrzyskie',
            'city' => 'Końskie',
            'latitude' => 51.191,
            'longitude' => 20.407
        ]);

        Location::create([
            'voivodeship' => 'Świętokrzyskie',
            'city' => 'Ostrowiec Świętokrzyski',
            'latitude' => 50.950,
            'longitude' => 21.411
        ]);

        Location::create([
            'voivodeship' => 'Świętokrzyskie',
            'city' => 'Sandomierz',
            'latitude' => 50.679,
            'longitude' => 21.749
        ]);

        Location::create([
            'voivodeship' => 'Świętokrzyskie',
            'city' => 'Skarżysko-Kamienna',
            'latitude' => 51.122,
            'longitude' => 20.877
        ]);

        Location::create([
            'voivodeship' => 'Świętokrzyskie',
            'city' => 'Starachowice',
            'latitude' => 51.038,
            'longitude' => 21.082
        ]);

        Location::create([
            'voivodeship' => 'Świętokrzyskie',
            'city' => 'Staszów',
            'latitude' => 50.561,
            'longitude' => 21.167
        ]);
    }

    private function warminskoMazurskie()
    {
        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Bartoszyce',
            'latitude' => 54.253,
            'longitude' => 20.808
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Braniewo',
            'latitude' => 54.379,
            'longitude' => 19.822
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Działdowo',
            'latitude' => 53.240,
            'longitude' => 20.184
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Elbląg',
            'latitude' => 54.155,
            'longitude' => 19.404
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Ełk',
            'latitude' => 53.823,
            'longitude' => 22.361
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Giżycko',
            'latitude' => 54.036,
            'longitude' => 21.766
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Iława',
            'latitude' => 53.596,
            'longitude' => 19.576
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Kętrzyn',
            'latitude' => 54.081,
            'longitude' => 21.376
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Lidzbark Warmiński',
            'latitude' => 54.130,
            'longitude' => 20.564
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Mrągowo',
            'latitude' => 53.868,
            'longitude' => 21.305
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Olecko',
            'latitude' => 54.039,
            'longitude' => 22.493
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Olsztyn',
            'latitude' => 53.776,
            'longitude' => 20.477
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Ostróda',
            'latitude' => 53.702,
            'longitude' => 19.962
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Pisz',
            'latitude' => 53.629,
            'longitude' => 21.809
        ]);

        Location::create([
            'voivodeship' => 'Warmińsko-mazurskie',
            'city' => 'Szczytno',
            'latitude' => 53.563,
            'longitude' => 20.996
        ]);
    }

    private function wielkopolskie()
    {
        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Chodzież',
            'latitude' => 52.994,
            'longitude' => 16.919
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Gniezno',
            'latitude' => 52.524,
            'longitude' => 17.598
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Gostyń',
            'latitude' => 51.877,
            'longitude' => 17.016
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Jarocin',
            'latitude' => 51.973,
            'longitude' => 17.501
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Kalisz',
            'latitude' => 51.747,
            'longitude' => 18.079
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Koło',
            'latitude' => 52.201,
            'longitude' => 18.635
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Konin',
            'latitude' => 52.230,
            'longitude' => 18.252
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Kościan',
            'latitude' => 52.083,
            'longitude' => 16.646
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Krotoszyn',
            'latitude' => 51.695,
            'longitude' => 17.437
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Leszno',
            'latitude' => 51.843,
            'longitude' => 16.580
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Luboń',
            'latitude' => 52.336,
            'longitude' => 16.871
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Nowy Tomyśl',
            'latitude' => 52.317,
            'longitude' => 16.129
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Oborniki',
            'latitude' => 52.645,
            'longitude' => 16.809
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Ostrów Wielkopolski',
            'latitude' => 51.647,
            'longitude' => 17.803
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Piła',
            'latitude' => 53.151,
            'longitude' => 16.738
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Pleszew',
            'latitude' => 51.896,
            'longitude' => 17.786
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Poznań',
            'latitude' => 52.400,
            'longitude' => 16.919
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Rawicz',
            'latitude' => 51.610,
            'longitude' => 16.858
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Śrem',
            'latitude' => 51.644,
            'longitude' => 15.926
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Środa Wielkopolska',
            'latitude' => 52.228,
            'longitude' => 17.277
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Swarzędz',
            'latitude' => 52.410,
            'longitude' => 17.077
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Szamotuły',
            'latitude' => 52.612,
            'longitude' => 16.583
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Trzcianka',
            'latitude' => 53.041,
            'longitude' => 16.461
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Turek',
            'latitude' => 52.016,
            'longitude' => 18.511
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Wągrowiec',
            'latitude' => 52.812,
            'longitude' => 17.201
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Września',
            'latitude' => 52.325,
            'longitude' => 17.565
        ]);

        Location::create([
            'voivodeship' => 'Wielkopolskie',
            'city' => 'Złotów',
            'latitude' => 53.359,
            'longitude' => 17.043
        ]);
    }

    private function zachodniopomorskie()
    {
        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Białogard',
            'latitude' => 54.014,
            'longitude' => 15.969
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Choszczno',
            'latitude' => 53.170,
            'longitude' => 15.416
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Goleniów',
            'latitude' => 53.565,
            'longitude' => 14.829
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Gryfice',
            'latitude' => 53.914,
            'longitude' => 15.198
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Gryfino',
            'latitude' => 53.253,
            'longitude' => 14.492
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Kamień Pomorski',
            'latitude' => 53.965,
            'longitude' => 14.772
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Kołobrzeg',
            'latitude' => 54.176,
            'longitude' => 15.576
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Koszalin',
            'latitude' => 54.190,
            'longitude' => 16.177
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Nowogard',
            'latitude' => 53.668,
            'longitude' => 15.122
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Police',
            'latitude' => 53.548,
            'longitude' => 14.565
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Stargard',
            'latitude' => 53.308,
            'longitude' => 15.031
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Świdwin',
            'latitude' => 53.774,
            'longitude' => 15.782
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Świnoujście',
            'latitude' => 53.909,
            'longitude' => 14.251
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Szczecin',
            'latitude' => 53.430,
            'longitude' => 14.550
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Szczecinek',
            'latitude' => 53.702,
            'longitude' => 16.707
        ]);

        Location::create([
            'voivodeship' => 'Zachodniopomorskie',
            'city' => 'Wałcz',
            'latitude' => 53.272,
            'longitude' => 16.476
        ]);
    }
}
