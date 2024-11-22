;
(function () {
    'use strict';

    $(window).on('load', function () {
        $('.loader').delay(300).fadeOut('slow');
        requestAnimationFrame(function () {
            setTimeout(function () {
                $('.cover .display-tc').addClass('fadeInUp');
            }, 500);
        });
    });

    // Offcanvas
    var offcanvasMenu = function () {
        $('.main').prepend('<div id="offcanvas" />');
        $('.main').prepend('<a href="#" class="js-nav-toggle nav-toggle nav-white"><i></i></a>');
        var clone1 = $('.menu-1 > ul').clone();
        $('#offcanvas').append(clone1);
        var clone2 = $('.menu-2 > ul').clone();
        $('#offcanvas').append(clone2);

        $('#offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
        $('#offcanvas')
            .find('li')
            .removeClass('has-dropdown');

        $(window).on('resize', function () {
            if ($('body').hasClass('offcanvas-active')) {
                $('body').removeClass('offcanvas-active');
                $('.js-nav-toggle').removeClass('active');
            }
        });
    };

    // Page Scroll and Mobile Menu Toggle
    var pageScroll = function () {
        $('body').on('click', '.page-scroll', function (event) {
            var $anchor = $(this);
            $('.js-nav-toggle').removeClass('active');
            $('body').removeClass('overflow offcanvas-active');
            $('html, body').animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 300, 'easeInOutExpo');
            event.preventDefault();
        });

        // Affix navigation when scrolling
        $('nav').affix({
            offset: {
                top: $('#header').height()
            }
        });
    };

    // Mobile Menu Outside Click
    var mobileMenuOutsideClick = function () {
        $(document).on('click', function (e) {
            var container = $("#offcanvas, .js-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas-active')) {
                    $('body').removeClass('offcanvas-active');
                    $('.js-nav-toggle').removeClass('active');
                }
            }
        });
    };

    // Burger Menu Toggle
    var burgerMenu = function () {
        $('body').on('click', '.js-nav-toggle', function (event) {
            var $this = $(this);
            $this.toggleClass('active');
            $('body').toggleClass('overflow offcanvas-active');
            event.preventDefault();
        });
    };

    // Countdown
    var countdown = function () {
        var countdown = document.querySelector('.countdown');

        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function initializeClock(id, endtime) {
            var clock = document.getElementById(id);
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');
            var newChild;

            function updateClock() {
                var t = getTimeRemaining(endtime);
                var daysArr = String(t.days).split('');
                daysSpan.innerHTML = '';
                for (var i = 0; i < daysArr.length; i++) {
                    newChild = document.createElement('span');
                    newChild.innerHTML = daysArr[i];
                    daysSpan.appendChild(newChild);
                }
                var hoursArr = String(('0' + t.hours).slice(-2)).split('');
                hoursSpan.innerHTML = '';
                for (var i = 0; i < hoursArr.length; i++) {
                    newChild = document.createElement('span');
                    newChild.innerHTML = hoursArr[i];
                    hoursSpan.appendChild(newChild);
                }
                var minuteArr = String(('0' + t.minutes).slice(-2)).split('');
                minutesSpan.innerHTML = '';
                for (var i = 0; i < minuteArr.length; i++) {
                    newChild = document.createElement('span');
                    newChild.innerHTML = minuteArr[i];
                    minutesSpan.appendChild(newChild);
                }
                var secondArr = String(('0' + t.seconds).slice(-2)).split('');
                secondsSpan.innerHTML = '';
                for (var i = 0; i < secondArr.length; i++) {
                    newChild = document.createElement('span');
                    newChild.innerHTML = secondArr[i];
                    secondsSpan.appendChild(newChild);
                }
                if (t.total <= 0) {
                    clearInterval(timeinterval);
                }
            }
            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }
        // set your wedding date here
        var deadline = 'December 10 2024 11:00:00 GMT+0700';
        if (countdown) {
            initializeClock('timer', deadline);
        }
    }

    var isotope = function () {
        var $container = $('.grid');

        $container.imagesLoaded(function () {
            $container.isotope({
                // options
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    // use element for option
                    columnWidth: '.grid-sizer',
                },
                getSortData: {
                    moments: '.moments', // text from querySelector
                    category: '[data-category]',
                    weight: function (itemElem) { // function
                        var weight = $(itemElem).find('.weight').text();
                        return parseFloat(weight.replace(/[\(\)]/g, ''));
                    }
                }
            });
        })
    }

    var donateModal = function () {
        if ($("#donate-modal").length && $(".buttonDonate").length && $(".donate-modal-close").length) {
            $(document).on('click', '.buttonDonate', function () {
                $("#donate-modal").show();
            });
            $(document).on('click', '.donate-modal-close', function () {
                $("#donate-modal").hide();
            });
            $(document).on('click', 'body', function (e) {
                if (e.target.id == $("#donate-modal").attr('id')) {
                    $("#donate-modal").hide();
                }
            });
        }
    }

    $.fn.backgroundSlider = function (options) {
        var settings = $.extend({
            images: [
                "images/slider/slider_1.jpg",
                "images/slider/slider_2.jpg",
                "images/slider/slider_3.jpg",
                "images/slider/slider_4.jpg",
                "images/slider/slider_5.jpg",
                "images/slider/slider_6.jpg",
                "images/slider/slider_7.jpg",
                "images/slider/slider_8.jpg",
                "images/slider/slider_9.jpg",
                "images/slider/slider_10.jpg",
            ],
            interval: 5000,
        }, options);

        function preloadImages(images) {
            images.forEach(image => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = image;
                document.head.appendChild(link);
            });
        }

        return this.each(function () {
            var $this = $(this);
            var currentIndex = 0;
            preloadImages(settings.images);

            function changeBackgroundImage() {
                // Apply the Ken Burns effect by changing background image
                $this.css({
                    'background-image': 'url(' + settings.images[currentIndex] + ')',
                });

                $this.css('animation', 'none');
                setTimeout(function () {
                    $this.css('animation', 'kenBurnsZoom 10s infinite alternate');
                }, 100);

                currentIndex = (currentIndex + 1) % settings.images.length;
            }

            changeBackgroundImage();
            setInterval(changeBackgroundImage, settings.interval);
        });
    };

    function initAudioPlayer() {
        // Insert necessary HTML and styles for the player controls
        var playerHTML = `
            <style type="text/css">
                .bii-player { position: fixed; bottom: 70px; left: 50px; width: 40px; height: 40px; z-index: 99999; display: none; }
                .playerIcon { cursor: pointer; width: 40px; height: 40px; border-radius: 50%; background-color: #df4758; padding: 7px 9px; position: absolute; }
                #playerVolumeOff, #playerVolumeOn { display: none; }
                #playerVolumeOn { display: block; }
                .bii-player audio { display: none; }
            </style>
            <div class="bii-player">
                <audio id="audioPlayer" controls></audio>
                <div class="playerIcon">
                    <span id="playerVolumeOff">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="#fff" viewBox="0 0 16 16">
                            <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </span>
                    <span id="playerVolumeOn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="#fff" viewBox="0 0 16 16">
                            <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                            <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
                        </svg>
                    </span>
                </div>
            </div>
        `;

        // Append the player HTML to the body
        $('body').append(playerHTML);

        function getRandomTrackIndex() {
            return Math.floor(Math.random() * audioSources.length);
        }

        var audioPlayer = document.getElementById('audioPlayer');
        var audioSources = [
            'https://cdn.biihappy.com/ziiweb/wedding-musics/BeautifulInWhite-ShaneFilan-524801.mp3',
            'https://cdn.biihappy.com/ziiweb/website/66d92eaf3b20bda60a0071dc/66d932bac9603ef7a70372b9.mp3',
            'https://cdn.biihappy.com/ziiweb/wedding-musics/AThousandYears-christinaperri-6430911.mp3',
            'https://cdn.biihappy.com/ziiweb/wedding-musics/MarryYou-BrunoMars-6450059.mp3',
            'https://cdn.biihappy.com/ziiweb/website/66d12da73b1d667fd80021d9/66d485236c1871959509467e.mp3',
            'https://cdn.biihappy.com/ziiweb/wedding-musics/TaLaCuaNhau-DongNhiOngCaoThang.mp3'
        ];
        var currentTrackIndex = 0;

        audioPlayer.src = audioSources[currentTrackIndex];
        audioPlayer.volume = 0.3;
        audioPlayer.autoplay = true;
        audioPlayer.play();

        audioPlayer.addEventListener('ended', function () {
            currentTrackIndex++;
            if (currentTrackIndex >= audioSources.length) {
                currentTrackIndex = 0;
            }
            audioPlayer.src = audioSources[currentTrackIndex];
            audioPlayer.play();
        });

        $('.bii-player').show();

        function playPause() {
            var playIcon = document.getElementById("playerVolumeOn");
            var pauseIcon = document.getElementById("playerVolumeOff");

            if (audioPlayer.paused) {
                audioPlayer.play();
                playIcon.style.display = "block";
                pauseIcon.style.display = "none";
            } else {
                audioPlayer.pause();
                playIcon.style.display = "none";
                pauseIcon.style.display = "block";
            }
        }

        document.querySelector(".playerIcon").addEventListener("click", playPause);
    };

    function disableDeveloperMode() {
        const restrictedKeys = [
            { ctrl: true, shift: true, keyCode: 'I'.charCodeAt(0) },  // Ctrl+Shift+I (Inspect)
            { ctrl: true, shift: true, keyCode: 'C'.charCodeAt(0) },  // Ctrl+Shift+C (Console)
            { ctrl: true, shift: true, keyCode: 'J'.charCodeAt(0) },  // Ctrl+Shift+J (Debugger)
            { ctrl: true, keyCode: 'U'.charCodeAt(0) },               // Ctrl+U (View Source)
            { keyCode: 123 }                                          // F12 (Dev Tools)
        ];

        function isRestrictedKey(e) {
            return restrictedKeys.some(function (combination) {
                return (
                    (combination.ctrl === undefined || combination.ctrl === e.ctrlKey) &&
                    (combination.shift === undefined || combination.shift === e.shiftKey) &&
                    combination.keyCode === e.keyCode
                );
            });
        }

        // Disable Developer tools
        $(document).keydown(function (e) {
            if (isRestrictedKey(e)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });

        // Disable right-click
        $(document).on('contextmenu', function (e) {
            e.preventDefault();
            return false;
        });

        // Disable touch and swipe gestures for developer tools on mobile devices
        $(document).on('touchstart', function (e) {
            if (e.touches.length > 2) { // More than two fingers
                e.preventDefault();
                return false;
            }
        });
    }

    $(function () {
        pageScroll();
        mobileMenuOutsideClick();
        offcanvasMenu();
        burgerMenu();
        countdown();
        isotope();
        donateModal();
        $('#header').backgroundSlider();
        initAudioPlayer();
        disableDeveloperMode();
    });

}());
