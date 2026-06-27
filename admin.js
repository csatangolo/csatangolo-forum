<!DOCTYPE html>
<html lang="hu" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no"> <title>Csatangoló - Prémium Lovas Élmény</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Manrope:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        sand: '#E6CCB2',      // Háttér bézs
                        gold: '#DDB892',      // Kiemelő arany/barna
                        choco: '#5E3C26',     // Sötét szöveg
                        cream: '#FFFCF9',     // Világos alap
                        white: '#FFFFFF',
                        darkbrown: '#3E2723', // Mélybarna
                    },
                    fontFamily: {
                        serif: ['"Playfair Display"', 'serif'],
                        sans: ['"Manrope"', 'sans-serif'],
                    },
                    boxShadow: {
                        'soft': '0 20px 40px -15px rgba(94, 60, 38, 0.1)',
                        'gold-glow': '0 0 40px rgba(221, 184, 146, 0.5)',
                        'premium': '0 30px 60px -10px rgba(94, 60, 38, 0.25)',
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'float-gift': 'floatGift 5s ease-in-out infinite',
                        'shimmer': 'shimmer 3s linear infinite',
                        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-15px)' },
                        },
                        floatGift: {
                            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                            '50%': { transform: 'translateY(-15px) rotate(5deg)' },
                        },
                        shimmer: {
                            '0%': { backgroundPosition: '-200% center' },
                            '100%': { backgroundPosition: '200% center' },
                        }
                    }
                }
            }
        }
    </script>

    <style>
        body { background-color: #FFFCF9; overflow-x: hidden; }

        /* Luxus háttér átmenet */
        .bg-luxury { background: linear-gradient(180deg, #FFFCF9 0%, #E6CCB2 100%); }
        .bg-dark-luxury { background: linear-gradient(135deg, #5E3C26 0%, #3E2723 100%); }

        /* KERETEZETT KÉP STÍLUS */
        .framed-image {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 35px;
            border: 8px solid white; /* VASTAG FEHÉR KERET */
            box-shadow: 0 25px 60px rgba(94, 60, 38, 0.25); /* ERŐS ÁRNYÉK */
            transition: transform 0.5s ease;
        }
        .framed-image:hover { transform: scale(1.02); }

        /* NÉGYZETES KÉP */
        .square-framed {
            width: 100%;
            aspect-ratio: 1/1; /* Tökéletes négyzet */
            object-fit: cover;
            border-radius: 35px;
            border: 6px solid white;
            box-shadow: 0 15px 40px rgba(94, 60, 38, 0.2);
            transition: transform 0.5s ease;
        }
        .group:hover .square-framed { transform: scale(1.05); }

        /* FÜGGŐLEGES KÁRTYA PAKLI */
        .vertical-stack {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding: 20px 0;
        }
        .v-card {
            width: 320px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            border: 4px solid white;
            transition: transform 0.4s ease;
            position: relative;
        }
        @media (min-width: 768px) {
            .v-card { width: 380px; }
            .vertical-stack { gap: 30px; }
        }
        .v-card:hover { transform: scale(1.05); z-index: 10; }

        /* Arany szöveg */
        .text-gold-gradient {
            background: linear-gradient(to right, #5E3C26, #DDB892, #5E3C26);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: shimmer 5s linear infinite;
        }

    </style>
</head>
<body class="text-choco selection:bg-gold selection:text-white">

    <nav class="fixed w-full z-50 py-4 bg-white/95 backdrop-blur-lg border-b border-sand/40 shadow-sm transition-all duration-300">
        <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <a href="#" class="flex items-center gap-3 group">
                <img src="logo.png" class="h-14 w-auto group-hover:rotate-12 transition duration-300" alt="Logo">
                <span class="font-serif font-bold text-2xl tracking-widest text-choco hidden sm:block">CSATANGOLÓ</span>
            </a>

            <div class="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-choco">
                <a href="#game" class="hover:text-gold hover:scale-110 transition duration-300">Játék</a>
                <a href="#rewards" class="hover:text-gold hover:scale-110 transition duration-300">Jutalmak</a>
                <a href="#camp" class="hover:text-gold hover:scale-110 transition duration-300">Tábor</a>
                <a href="#gallery" class="hover:text-gold hover:scale-110 transition duration-300">Galéria</a>
            </div>

            <a href="#download" class="bg-choco text-sand px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gold hover:text-choco transition shadow-lg flex items-center gap-2">
                <i class="fas fa-download"></i> App Letöltése
            </a>
        </div>
    </nav>

    <header class="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-luxury">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/20 rounded-full blur-[120px] animate-float"></div>
        <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sand/30 rounded-full blur-[100px]"></div>

        <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            
            <div data-aos="fade-right" data-aos-duration="1200">
                <div class="inline-flex items-center gap-2 bg-white border border-gold px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm text-choco">
                    <i class="fas fa-crown text-gold"></i> Hivatalos Applikáció
                </div>
                <h1 class="text-6xl lg:text-8xl font-serif font-black mb-6 leading-tight text-choco">
                    <span class="font-serif">Csatangoló</span> <br>
                    <span class="text-gold italic text-4xl lg:text-6xl font-medium">már a zsebedben is</span>
                </h1>
                <p class="text-xl text-choco-600 mb-10 leading-relaxed font-light">
                    Légy része a több mint <strong>44 000 fős</strong> közösségünknek! 
                    Tapasztald meg a Csatangoló élményt digitálisan is: játékok, fejlődés és gondoskodás egy helyen.
                    Ez nem csak egy app, ez a lovarda szíve a telefonodon.
                </p>
                
                <div class="flex flex-wrap items-center gap-6 mb-12 bg-white/60 p-6 rounded-3xl backdrop-blur-sm border border-white shadow-soft">
                    <div class="text-center">
                        <p class="text-3xl font-black text-choco">44.000+</p>
                        <p class="text-xs uppercase tracking-wide text-choco-500 font-bold">TikTok Követő</p>
                    </div>
                    <div class="h-10 w-[1px] bg-gold hidden sm:block"></div>
                    <div class="text-center">
                        <p class="text-3xl font-black text-choco">700.000+</p>
                        <p class="text-xs uppercase tracking-wide text-choco-500 font-bold">Like a videókon</p>
                    </div>
                    <div class="h-10 w-[1px] bg-gold hidden sm:block"></div>
                    <div class="text-center">
                        <p class="text-3xl font-black text-choco">120+</p>
                        <p class="text-xs uppercase tracking-wide text-choco-500 font-bold"> Táborozó évente</p>
                    </div>
                </div>
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="https://csatangolo.online" target="_blank" class="bg-choco text-sand px-8 py-4 rounded-2xl flex items-center justify-center gap-4 hover:bg-gold hover:text-choco transition shadow-xl group hover:-translate-y-1 duration-300">
                        <i class="fab fa-apple text-3xl"></i>
                        <div class="text-left">
                            <div class="text-[10px] uppercase font-bold opacity-80">Telepítsd</div>
                            <div class="font-bold font-serif text-lg">iPhone-ra</div>
                        </div>
                    </a>
                    <button class="bg-white border-2 border-sand text-choco px-8 py-4 rounded-2xl flex items-center justify-center gap-4 hover:border-gold transition shadow-lg group hover:-translate-y-1 duration-300">
                        <i class="fab fa-google-play text-3xl text-choco"></i>
                        <div class="text-left">
                            <div class="text-[10px] uppercase font-bold opacity-80">Android</div>
                            <div class="font-bold font-serif text-lg">Play Áruház</div>
                        </div>
                    </button>
                </div>
            </div>

            <div class="relative flex flex-col lg:block justify-center h-auto lg:h-[600px] items-center" data-aos="zoom-in" data-aos-duration="1500">
                <div class="relative z-10 w-[280px] lg:w-[340px] transform rotate-[-2deg] mx-auto">
                    <img src="hero.jpg" class="framed-image">
                </div>
                
                <div class="relative lg:absolute mt-8 lg:mt-0 lg:top-24 lg:-right-4 w-56 animate-float-gift z-20 cursor-pointer mx-auto">
                    <div class="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-premium border-2 border-gold flex flex-col items-center gap-2 text-center transform lg:rotate-6 hover:rotate-0 transition duration-500">
                        <div class="bg-choco p-3 rounded-full text-sand shadow-md -mt-10">
                            <i class="fas fa-gift text-3xl animate-pulse"></i>
                        </div>
                        <div>
                            <p class="font-bold text-choco text-sm leading-tight">Jelentkezz be <br> minden nap,</p>
                            <p class="text-[10px] text-choco-500 mt-1 uppercase">hogy szuper ajándékokat zsebelj be!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <section id="game" class="py-32 bg-sand/20">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-24">
                <span class="text-gold font-bold tracking-[0.3em] uppercase text-xs">Motiváció</span>
                <h2 class="text-5xl md:text-6xl font-serif font-bold text-choco mt-4">Fejlődés és Játék</h2>
            </div>

            <div class="grid lg:grid-cols-2 gap-20 items-center mb-32">
                <div class="relative flex justify-center" data-aos="fade-right">
                    <div class="w-72 lg:w-80 relative z-10">
                        <img src="feat-level.jpg" class="framed-image">
                    </div>
                    <div class="absolute inset-0 bg-gold/20 rounded-full blur-[80px] z-0"></div>
                </div>
                
                <div data-aos="fade-left">
                    <h3 class="text-4xl font-serif font-bold mb-6 text-choco border-l-4 border-gold pl-6">Mesterré Válni</h3>
                    <p class="text-lg text-choco-600 mb-8 leading-relaxed">
                        Minden edzés egy lépés a cél felé. Az applikáció nem csak számolja az órákat, hanem 
                        jutalmaz is érte. Gyűjts XP pontokat minden alkalommal, amikor lóra ülsz! 
                        Ahogy gyűlnek a pontok, úgy lépsz egyre magasabb rangokba.
                        Kezdd <strong>Újoncként</strong>, és küzdd fel magad a tiszteletreméltó <strong>Mester</strong> fokozatig. 
                        A profilod büszkén hirdeti majd a kitartásodat.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-white p-6 rounded-3xl shadow-sm border border-white">
                            <i class="fas fa-trophy text-3xl text-gold mb-3"></i>
                            <h4 class="font-bold text-choco">Rangok</h4>
                            <p class="text-sm text-choco-600">Újonctól a Mesterig! Minden szint új elismerés.</p>
                        </div>
                        <div class="bg-white p-6 rounded-3xl shadow-sm border border-white">
                            <i class="fas fa-pen-fancy text-3xl text-gold mb-3"></i>
                            <h4 class="font-bold text-choco">Jegyzetek</h4>
                            <p class="text-sm text-choco-600">Saját lovas napló az emlékeidnek.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-dark-luxury rounded-[50px] p-10 lg:p-20 text-cream shadow-2xl relative overflow-hidden mb-32">
                <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px]"></div>
                
                <div class="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <h3 class="text-4xl font-serif font-bold mb-6 text-white">Okos Edzésnapló</h3>
                        <p class="text-lg text-white/80 mb-8 font-light leading-relaxed">
                            A profi sportolók is vezetnek naplót. Mostantól te is megteheted!
                            Ez az eszköz segít abban, hogy tudatosabban lovagolj és lásd, honnan hová jutottál el.
                        </p>
                        <ul class="space-y-6 text-white/90">
                            <li class="flex items-start gap-4">
                                <i class="fas fa-horse-head text-2xl text-gold mt-1"></i>
                                <div>
                                    <strong class="text-gold block text-lg">Melyik lovon ültél?</strong>
                                    Jegyezd fel minden edzésen, hogy melyik lovon lovagoltál, hogy nyomon tudd követni lovaglásaid!
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <i class="fas fa-running text-2xl text-gold mt-1"></i>
                                <div>
                                    <strong class="text-gold block text-lg">Munka típusa</strong>
                                    Futószár, osztálylovaglás, ugrás vagy terep? Rögzítsd pontosan a az edzésed típusát.
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <i class="fas fa-pen-fancy text-2xl text-gold mt-1"></i>
                                <div>
                                    <strong class="text-gold block text-lg">Jegyzetek & Érzések</strong>
                                    Írd le, mi sikerült jól, és mit kell gyakorolni. Skálázd, hogyan érezted magad az órán!
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="relative flex justify-center">
                        <div class="w-72 lg:w-80">
                            <img src="feat-training.gif" class="framed-image">
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-20 items-center">
                 <div class="order-2 lg:order-1" data-aos="fade-right">
                    <h3 class="text-4xl font-serif font-bold mb-6 text-choco border-l-4 border-gold pl-6">Matrica Gyűjtemény</h3>
                    <p class="text-lg text-choco-600 mb-8 leading-relaxed">
                        Ez a te digitális kincsesládád! A matricák nem csak képek, hanem emlékek és trófeák.
                        Lehet <strong>különleges matricákat</strong> gyűjteni a napi kihívás teljesítésével, 
                        vagy ha megjutalmazod a lovakat egy kis finomsággal.
                        Vannak olyan ritka darabok, amiket csak ünnepnapokon lehet megszerezni!
                    </p>
                    
                    <div class="space-y-6">
                        <div class="bg-white p-5 rounded-2xl shadow-sm border border-sand/30 flex items-start gap-4">
                            <div class="bg-gold/20 p-3 rounded-full text-choco"><i class="fas fa-folder-open text-xl"></i></div>
                            <div>
                                <h4 class="font-bold text-choco">Exkluzív Album</h4>
                                <p class="text-sm text-choco-600">Nyisd ki, lapozgasd és mutasd meg a barátaidnak, mid van!</p>
                            </div>
                        </div>
                        <div class="bg-white p-5 rounded-2xl shadow-sm border border-sand/30 flex items-start gap-4">
                            <div class="bg-gold/20 p-3 rounded-full text-choco"><i class="fas fa-exchange-alt text-xl"></i></div>
                            <div>
                                <h4 class="font-bold text-choco">Cserélgess kedvedre</h4>
                                <p class="text-sm text-choco-600">Ha duplád van, cseréld el a barátaiddal a hiányzó darabokra.</p>
                            </div>
                        </div>
                        <div class="bg-white p-5 rounded-2xl shadow-sm border border-sand/30 flex items-start gap-4">
                            <div class="bg-gold/20 p-3 rounded-full text-choco"><i class="fas fa-star text-xl"></i></div>
                            <div>
                                <h4 class="font-bold text-choco">Váltsd be őket</h4>
                                <p class="text-sm text-choco-600">A matricákat később értékes dolgokra válthatod be a lovardában.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="relative flex justify-center order-1 lg:order-2" data-aos="fade-left">
                    <div class="w-72 lg:w-80">
                        <img src="feat-stickers.jpg" class="framed-image">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="rewards" class="py-32 bg-dark-luxury text-cream relative overflow-hidden">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px]"></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="text-center mb-20">
                <h2 class="text-5xl font-serif font-bold text-white mb-6">Napi Kihívás & Jutalmak</h2>
                <p class="text-gold text-lg font-light tracking-wide">Minden nap egy új esély a nyerésre!</p>
            </div>

            <div class="grid lg:grid-cols-2 gap-24 items-center">
                
                <div data-aos="fade-right" class="relative flex justify-center">
                    <div class="w-72 lg:w-80 transform rotate-[-3deg] hover:rotate-0 transition duration-500">
                        <img src="feat-daily.gif" class="framed-image">
                    </div>
                    <div class="absolute -top-6 -left-6 bg-white p-5 rounded-full shadow-xl animate-float z-20 border-4 border-gold">
                        <i class="fas fa-gift text-4xl text-choco"></i>
                    </div>
                </div>

                <div data-aos="fade-left">
                    <h3 class="text-3xl font-serif font-bold mb-4 text-gold border-b border-white/10 pb-4 inline-block">Mit nyerhetsz?</h3>
                    <p class="text-white/80 mb-10 font-medium text-lg leading-relaxed">
                        Időről időre minden nap nyithatsz ki új ablakot a Napi Kihívásban, és egyre több 
                        kupon vagy matrica vár rátok – nem csak a szerencsésekre! 
                        A kuponokat a lovardában válthatod be egy egyszerű <strong>QR-kód</strong> segítségével.
                        Megéheztél? Váltsd be a büfében! Spórolnál? Használd fel edzésre!
                    </p>

                    <div class="vertical-stack">
                        <img src="coupon-1.jpg" class="v-card hover:translate-x-4">
                        <img src="coupon-2.jpg" class="v-card hover:translate-x-4">
                        <img src="coupon-3.jpg" class="v-card hover:translate-x-4">
                    </div>
                </div>
            </div>
            
            <div class="mt-32 pt-16 border-t border-white/20 grid lg:grid-cols-2 gap-16 items-center">
                 <div class="order-2 lg:order-1 flex justify-center">
                    <div class="vertical-stack">
                        <img src="pass-1.jpg" class="v-card hover:translate-x-4">
                        <img src="pass-2.jpg" class="v-card hover:translate-x-4">
                        <img src="pass-3.jpg" class="v-card hover:translate-x-4">
                    </div>
                 </div>
                 <div class="order-1 lg:order-2 text-right">
                    <h3 class="text-3xl font-serif font-bold mb-4 text-white">Digitális Bérletek</h3>
                    <p class="text-white/80 font-medium text-lg mb-6 leading-relaxed">
                        Felejtsd el a papírfecniket és az elveszett kártyákat! Vásárolj bérletet az appban. 
                        Mindig látod, hány alkalom van még hátra, és mikor jár le a bérleted. 
                        A beváltás itt is villámgyors <strong>QR-kóddal</strong> történik az oktatónál.
                        Kényelmes, modern és környezetbarát megoldás.
                    </p>
                 </div>
            </div>
        </div>
    </section>

    <section id="camp" class="py-32 bg-white relative">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-20">
                <span class="text-gold font-bold tracking-[0.3em] uppercase text-xs">Vakáció</span>
                <h2 class="text-5xl md:text-6xl font-serif font-bold text-choco mt-4">Csatangoló Lovastáborok</h2>
            </div>

            <div class="bg-luxury rounded-[50px] p-8 lg:p-16 shadow-soft border border-sand/30">
                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <div data-aos="fade-right">
                        <h3 class="text-4xl font-serif font-bold text-choco mb-6">Életed legszebb nyara vár!</h3>
                        <p class="text-lg text-choco-600 mb-8 leading-relaxed">
                            Lovaglás, játék, barátok és felejthetetlen élmények. 
                            Az összes aktuális táborunk és rendezvényünk időpontját és plakátját megtalálod az applikációban.
                            Ne maradj le a helyekről, mert gyorsan fogynak!
                        </p>
                        <ul class="space-y-4 mb-10 text-choco font-bold">
                            <li class="flex items-center gap-3"><i class="fas fa-check-circle text-gold"></i> Közvetlen jelentkezés az appból</li>
                            <li class="flex items-center gap-3"><i class="fas fa-check-circle text-gold"></i> Részletes programleírás és árak</li>
                            <li class="flex items-center gap-3"><i class="fas fa-check-circle text-gold"></i> Azonnali helyfoglalás</li>
                        </ul>
                        <a href="tel:+36306548617" class="bg-choco text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gold hover:text-choco transition shadow-lg inline-block text-center">
                            Jelentkezz most! <br> <span class="text-sm opacity-80">+36 30 654 8617</span>
                        </a>
                    </div>
                    <div class="relative" data-aos="fade-left">
                        <div class="w-full rotate-2 hover:rotate-0 transition duration-500">
                            <img src="camp-poster.jpg" class="framed-image z-10">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-sand/20">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-32">
                <i class="fas fa-heart text-6xl text-red-500/80 mb-6 block animate-pulse"></i> <h2 class="text-5xl md:text-6xl font-serif font-bold text-choco">Szeretet Távolról is</h2>
                <p class="text-lg text-choco/80 mt-6 max-w-3xl mx-auto font-bold">
                    Ha még nem ismersz minden lovat, itt közelebb kerülhetsz hozzájuk! 
                    Ismerd meg őket a meséken keresztül, játssz velük, és gondoskodj róluk otthonról is.
                </p>
            </div>

            <div class="flex flex-col md:flex-row items-center gap-16 mb-40" data-aos="fade-up">
                <div class="w-full md:w-1/2 flex justify-center">
                    <div class="w-72 lg:w-80 relative">
                        <img src="feat-hug.gif" class="framed-image">
                    </div>
                </div>
                <div class="w-full md:w-1/2">
                    <h3 class="text-4xl font-serif font-bold text-choco mb-6">Öleld meg Bolerót!</h3>
                    <p class="text-choco/90 text-lg leading-loose font-medium">
                        Ez több, mint egy egyszerű kattintás. Ez egy valódi kapcsolat a kedvenceddel!
                        A lovak nagyon boldogok, ha megöleled őket az applikáción keresztül.
                        Válaszd ki a kedvenc csemegéjüket – almát, répát vagy dinnyét –, és küldd el nekik.
                        Nézd meg a reakciójukat: az animációban boldogan felnyerítenek és megeszik a jutalmat.
                        Ez a legjobb módja annak, hogy "jóéjt" kívánj nekik, amikor nem lehetsz az istállóban. Szerezz cserébe különleges matricákat!
                    </p>
                </div>
            </div>

            <div class="flex flex-col md:flex-row-reverse items-center gap-16 mb-40" data-aos="fade-up">
                <div class="w-full md:w-1/2 flex justify-center">
                    <div class="w-72 lg:w-80 relative">
                        <img src="feat-game.gif" class="framed-image">
                    </div>
                </div>
                <div class="w-full md:w-1/2">
                    <h3 class="text-4xl font-serif font-bold text-choco mb-6">Animált Lovas Játékok</h3>
                    <p class="text-choco/90 text-lg leading-loose font-medium">
                        Unatkozol? Akkor irány a virtuális istálló! Legyél te a legügyesebb lovas stylist.
                        Meríts ötletet, hogy legközelebb ha a lovardában jársz, milyen technikát próbálhatsz ki, így gyönyörű frizurákat készíthetsz majd a lovaknak.
                        Minden sikeresen elkészített fonatért csillagokat kapsz.
                        Ha összegyűjtesz 10 csillagot, a jutalmad egy gyönyörű matrica lesz az albumodba!
                    </p>
                </div>
            </div>

            <div class="flex flex-col md:flex-row items-center gap-16" data-aos="fade-up">
                <div class="w-full md:w-1/2 flex justify-center">
                    <div class="w-72 lg:w-80 relative">
                        <img src="feat-tales.gif" class="framed-image">
                    </div>
                </div>
                <div class="w-full md:w-1/2">
                    <h3 class="text-4xl font-serif font-bold text-choco mb-6">Esti Mesék</h3>
                    <p class="text-choco/90 text-lg leading-loose font-medium">
                        Tudtad, hogy Csinos fél a pillangóktól? Vagy hogy LaciLó egyszer meg akart enni egy lovagló pálcát??
                        A lovardánk minden lakója egy külön egyéniség, tele vicces és tanulságos történetekkel.
                        Az Esti Mesék szekcióban exkluzív, aranyos történeteket olvashattok róluk.
                        Tökéletes közös program lefekvés előtt, hogy a gyerekek lovas álmokkal térjenek nyugovóra. Folyamtosan bővülő mesetárral, sok kedves saját készítésű grafikával.
                    </p>
                </div>
            </div>

        </div>
    </section>

    <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-24">
                <h2 class="text-5xl font-serif font-bold text-choco mb-4">Ismerj meg minket!</h2>
                <p class="text-choco-500 font-bold uppercase tracking-widest text-sm">A Csatangoló Csapat</p>
            </div>

            <div class="mb-32">
                <h3 class="text-3xl font-serif font-bold text-gold mb-10 border-b border-sand pb-4">Négylábú Barátaink</h3>
                <div class="grid lg:grid-cols-3 gap-10">
                    <div class="bg-cream rounded-[40px] overflow-hidden shadow-soft group hover:shadow-premium transition duration-500 border border-sand/20">
                        <div class="p-6">
                            <img src="horse-1.jpg" class="square-framed">
                        </div>
                        <div class="px-8 pb-8">
                            <h4 class="font-bold text-2xl text-choco mb-1">Bolero</h4>
                            <p class="text-xs text-gold font-bold uppercase mb-4">A Szeretet Bomba</p>
                            <p class="text-choco-600 text-sm leading-relaxed italic">
                                "Az én nevem Bolero, és egy shagya arab fajtájú lovacska vagyok. Tudjátok mit jelent ez? Azt, hogy nagyon elegáns és gyors vagyok, mint a szél! Imádom amikor megsimogatjátok a homlokom, ilyenkor dörgölőzni kezdek a kezetekbe mint egy kiscica. Nagyon szeretek veletek játszani és együtt tölteni az időt."
                            </p>
                        </div>
                    </div>
                    <div class="bg-cream rounded-[40px] overflow-hidden shadow-soft group hover:shadow-premium transition duration-500 border border-sand/20">
                        <div class="p-6">
                            <img src="horse-2.jpg" class="square-framed">
                        </div>
                        <div class="px-8 pb-8">
                            <h4 class="font-bold text-2xl text-choco mb-1">Csinos</h4>
                            <p class="text-xs text-gold font-bold uppercase mb-4">A Vezér Kanca</p>
                            <p class="text-choco-600 text-sm leading-relaxed italic">
                                "Az én nevem Szürke Csinos, egy lipicai fajtájú nagyon jó származású tenyészkanca vagyok. Bár a Csatangoló Lovardában még nem volt csikóm, a régi Lovardában többet felneveltem. Nagyon kecses és szép megjelenésű kanca vagyok, és ezt tudom is magamról, ezért úgy billegtem a kis testemet a legelőn, hogy ezt a többiek is lássák."
                            </p>
                        </div>
                    </div>
                    <div class="bg-cream rounded-[40px] overflow-hidden shadow-soft group hover:shadow-premium transition duration-500 border border-sand/20">
                        <div class="p-6">
                            <img src="horse-3.jpg" class="square-framed">
                        </div>
                        <div class="px-8 pb-8">
                            <h4 class="font-bold text-2xl text-choco mb-1">Pálma</h4>
                            <p class="text-xs text-gold font-bold uppercase mb-4">A Tüzes Kanca</p>
                            <p class="text-choco-600 text-sm leading-relaxed italic">
                                "Engem Pálmának hívnak, egy Furioso North Star fajtájú csoda vagyok, és büszkén mondhatom: Én vagyok a legtüzesebb kanca lány a ménesben! Néha még a saját árnyékomtól is képes vagyok megijedni, ekkor óriásiakat ugrándozok mindenki nagy örömére…"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 class="text-3xl font-serif font-bold text-gold mb-10 border-b border-sand pb-4">Csapatunk</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    <div class="text-center group">
                        <div class="mb-4">
                            <img src="team-1.jpg" class="square-framed">
                        </div>
                        <h4 class="font-bold text-choco text-lg">Csilla Lilla</h4>
                        <p class="text-xs text-choco-500 font-bold mb-1">Tulajdonos</p>
                        <p class="text-xs text-choco-400 italic">Lovas sportoktató, Lovastúta-vezető</p>
                    </div>
                    <div class="text-center group">
                        <div class="mb-4">
                            <img src="team-2.jpg" class="square-framed">
                        </div>
                        <h4 class="font-bold text-choco text-lg">Réka</h4>
                        <p class="text-xs text-choco-500 font-bold mb-1">Gyógypedagógus</p>
                        <p class="text-xs text-choco-400 italic">Kommunikációs szakember</p>
                    </div>
                    <div class="text-center group">
                        <div class="mb-4">
                            <img src="team-3.jpg" class="square-framed">
                        </div>
                        <h4 class="font-bold text-choco text-lg">Szamira</h4>
                        <p class="text-xs text-choco-500 font-bold mb-1">A Megbízható</p>
                        <p class="text-xs text-choco-400 italic">Akire mindig lehet számítani</p>
                    </div>
                    <div class="text-center group">
                        <div class="mb-4">
                            <img src="team-4.jpg" class="square-framed">
                        </div>
                        <h4 class="font-bold text-choco text-lg">Flóra</h4>
                        <p class="text-xs text-choco-500 font-bold mb-1">A Segítőkész</p>
                        <p class="text-xs text-choco-400 italic">Rugalmas és kedves</p>
                    </div>
                    <div class="text-center group">
                        <div class="mb-4">
                            <img src="team-5.jpg" class="square-framed">
                        </div>
                        <h4 class="font-bold text-choco text-lg">Leila</h4>
                        <p class="text-xs text-choco-500 font-bold mb-1">A Biztos Pont</p>
                        <p class="text-xs text-choco-400 italic">A legrégebbi csapattag</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-32 bg-dark-luxury text-cream relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="text-center mb-24">
                <h2 class="text-5xl font-serif font-bold text-white mb-6">Amíg a gyerkőc lovagol, a szülő pihen</h2>
                <div class="w-32 h-1 bg-gold mx-auto"></div>
            </div>

            <div class="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[50px] mb-20 hover:bg-white/10 transition duration-500" data-aos="fade-up">
                <div class="flex flex-col lg:flex-row gap-12 items-center">
                    <div class="w-full lg:w-3/5 grid grid-cols-2 gap-6">
                        <div class="mt-8"><img src="room-1.jpg" class="framed-image"></div>
                        <div><img src="room-2.jpg" class="framed-image"></div>
                        <div class="mt-8"><img src="room-3.jpg" class="framed-image"></div>
                        <div><img src="room-4.jpg" class="framed-image"></div>
                    </div>
                    <div class="w-full lg:w-2/5">
                        <div class="flex items-center gap-4 mb-6">
                            <i class="fas fa-home text-4xl text-gold"></i>
                            <h3 class="text-4xl font-serif font-bold text-white">Csatangoló Apartmanok</h3>
                        </div>
                        <p class="text-lg text-white/70 mb-8 leading-relaxed font-light">
                            80 nm - 6 férőhelyes, csaladi ház, saját udvarral. Luxus körülmények között pihenhet, amíg a gyerekek táboroznak.
                            Teljesen felszerelt, otthonos és kényelmes.
                        </p>
                        <ul class="grid grid-cols-2 gap-y-4 gap-x-2 text-gold text-sm font-bold uppercase tracking-wider mb-8">
                            <li><i class="fas fa-check mr-2"></i> Wifi & Okos TV</li>
                            <li><i class="fas fa-check mr-2"></i> Teljesen felszerelt konyha</li>
                            <li><i class="fas fa-check mr-2"></i> Bőséges reggeli</li>
                            <li><i class="fas fa-check mr-2"></i> Garázs, elektromos autó töltési lehetőség</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[50px] hover:bg-white/10 transition duration-500" data-aos="fade-up">
                <div class="flex flex-col lg:flex-row-reverse gap-12 items-center">
                     <div class="w-full lg:w-3/5">
                        <img src="food.jpg" class="framed-image">
                    </div>
                    <div class="w-full lg:w-2/5">
                        <div class="flex items-center gap-4 mb-6">
                            <i class="fas fa-coffee text-4xl text-gold"></i>
                            <h3 class="text-4xl font-serif font-bold text-white">Csatangoló Lovas Büfé</h3>
                        </div>
                        <p class="text-lg text-white/70 mb-8 leading-relaxed font-light">
                            Friss kávé, forró csoki, melegszendvics, hot-dog, hamburger, gofri és rengeteg nasi. Tökéletes hely a feltöltődésre edzés előtt vagy után.
                        </p>
                        <div class="inline-block bg-gold/20 text-gold px-6 py-3 rounded-full font-bold border border-gold/50">
                            <i class="fas fa-utensils mr-2"></i> Az Étlap az applikációban érhető el!
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div class="relative flex justify-center" data-aos="fade-right">
                <div class="w-80">
                    <img src="feat-video.gif" class="framed-image">
                </div>
            </div>

            <div data-aos="fade-left">
                <h2 class="text-5xl font-serif font-bold text-choco mb-6">
                    Csatangoló <span class="text-gold">Videók</span>
                </h2>
                <p class="text-xl text-choco-600 mb-8 leading-relaxed font-medium">
                    Pont úgy pörgetheted, mint a TikTok-on, de itt <strong>csak a mi lovardánk</strong> videóit látod!
                    Miért jó ez a gyerkőcnek?
                </p>
                <ul class="space-y-6 mb-12">
                    <li class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-choco text-3xl mt-1"></i>
                        <div>
                            <strong class="text-choco text-xl block mb-1">Biztonságos & Reklámmentes</strong>
                            Garantáltan 100%-ban gyerekbarát tartalom, idegen videók és hirdetések nélkül.
                        </div>
                    </li>
                    <li class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-choco text-3xl mt-1"></i>
                        <div>
                            <strong class="text-choco text-xl block mb-1">Motiváló & Oktató</strong>
                            Vicces pillanatok mellett rengeteg hasznos lovas tudást is átadunk a videókban.
                        </div>
                    </li>
                    <li class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-choco text-3xl mt-1"></i>
                        <div>
                            <strong class="text-choco text-xl block mb-1">Közösségépítő</strong>
                            Láthatják a többi lovast, a táborokat, és ők is a csapat részének érezhetik magukat.
                        </div>
                    </li>
                </ul>
                
                <h4 class="font-bold text-choco mb-6 uppercase tracking-widest text-lg">Kövess minket itt is:</h4>
                <div class="flex flex-wrap gap-8 text-5xl text-choco/80">
                    <a href="https://youtube.com/@csatangolo_lovarda?si=Yk3iO8QUXKrZiM--" target="_blank" class="hover:text-gold transition hover:scale-110 transform"><i class="fab fa-youtube"></i></a>
                    <a href="https://www.tiktok.com/@csatangolo_lovarda?_r=1&_t=ZN-93qQDpaeCKk" target="_blank" class="hover:text-gold transition hover:scale-110 transform"><i class="fab fa-tiktok"></i></a>
                    <a href="https://www.facebook.com/csatangololovarda?" target="_blank" class="hover:text-gold transition hover:scale-110 transform"><i class="fab fa-facebook"></i></a>
                    <a href="https://www.instagram.com/csatangolo_lovarda?igsh=YWZweDcxM2NicjFo" target="_blank" class="hover:text-gold transition hover:scale-110 transform"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </section>

    <section id="gallery" class="py-32 bg-sand/20">
        <div class="max-w-7xl mx-auto px-6 mb-12 text-center">
             <h2 class="text-5xl font-serif font-bold text-choco">Pillanatok</h2>
        </div>
        <div class="columns-2 md:columns-3 gap-6 px-4 space-y-6">
             <img src="gal-1.jpg" class="framed-image hover:scale-105 transition duration-500">
             <img src="gal-2.jpg" class="framed-image hover:scale-105 transition duration-500">
             <img src="gal-3.jpg" class="framed-image hover:scale-105 transition duration-500">
             <img src="gal-4.jpg" class="framed-image hover:scale-105 transition duration-500">
             <img src="gal-5.jpg" class="framed-image hover:scale-105 transition duration-500">
             <img src="gal-6.jpg" class="framed-image hover:scale-105 transition duration-500">
        </div>
    </section>

    <section id="download" class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 relative z-10 text-center">
            <h2 class="text-6xl md:text-8xl font-serif font-black text-choco mb-8">Csatlakozz!</h2>
            <p class="text-2xl text-choco-500 mb-20 max-w-2xl mx-auto italic font-serif">
                "Ahol a lovaglás nem csak sport, hanem örök szerelem. Éld át velünk!"
            </p>

            <div class="grid md:grid-cols-2 gap-12">
                <div class="bg-dark-luxury p-12 rounded-[50px] shadow-2xl border-4 border-gold hover:scale-105 transition duration-500 text-left relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-[50px]"></div>
                    <div class="flex items-center gap-6 mb-8 relative z-10">
                        <i class="fab fa-apple text-6xl text-white"></i>
                        <div>
                            <h3 class="text-4xl font-bold text-white font-serif">iPhone</h3>
                            <p class="text-gold font-bold uppercase tracking-widest text-sm">Web Applikáció</p>
                        </div>
                    </div>
                    <div class="space-y-4 mb-12 text-white/80 font-medium relative z-10 text-lg">
                        <p>1. Nyisd meg: <strong class="text-gold">csatangolo.online</strong></p>
                        <p>2. Kattints a <strong class="text-gold">Megosztás</strong> gombra</p>
                        <p>3. <strong class="text-gold">"Főképernyőhöz adás"</strong></p>
                    </div>
                    <a href="https://csatangolo.online" class="block w-full bg-gold text-choco py-5 rounded-2xl text-center font-bold text-xl shadow-lg hover:bg-white hover:text-choco transition relative z-10">
                        Telepítsd iPhone-ra
                    </a>
                </div>

                <div class="bg-sand/30 p-12 rounded-[50px] shadow-2xl border-4 border-choco hover:scale-105 transition duration-500 text-left relative overflow-hidden">
                     <div class="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-[50px]"></div>
                     <div class="flex items-center gap-6 mb-8 relative z-10">
                        <i class="fab fa-google-play text-6xl text-choco"></i>
                        <div>
                            <h3 class="text-4xl font-bold text-choco font-serif">Android</h3>
                            <p class="text-choco/70 font-bold uppercase tracking-widest text-sm">Play Áruház</p>
                        </div>
                    </div>
                    <p class="text-choco/80 mb-12 leading-relaxed font-medium text-lg relative z-10">
                        Töltsd le a hivatalos alkalmazást a Google Play áruházból a legjobb élményért és az azonnali frissítésekért.
                    </p>
                    <button class="block w-full bg-choco text-white py-5 rounded-2xl text-center font-bold text-xl shadow-lg hover:bg-gold hover:text-choco transition relative z-10">
                        Letöltés
                    </button>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-choco text-sand py-8">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-4">
                <img src="logo.png" class="h-16 w-auto filter brightness-0 invert opacity-90">
                <div class="text-left">
                    <h4 class="font-serif font-bold text-2xl tracking-widest text-gold">CSATANGOLÓ</h4>
                    <p class="text-xs uppercase tracking-[0.3em] opacity-50">Öregcsertő</p>
                </div>
            </div>
            
            <div class="text-center">
                <p class="text-lg italic font-serif text-gold">"Gyere hozzánk táborozni, és lovagolj velünk egész évben!"</p>
            </div>

            <div class="text-center md:text-right text-cream">
                <p class="text-xl font-bold">Kis Csilla Lilla</p>
                <a href="tel:+36306548617" class="text-lg hover:text-gold transition block">+36 30 654 8617</a>
            </div>
        </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({ duration: 1000, once: true });
    </script>
</body>
</html>
