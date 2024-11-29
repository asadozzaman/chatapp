/*=== Javascript function indexing hear===========

1.counterUp ----------(Its use for counting number)
2.stickyHeader -------(header class sticky)
3.wowActive ----------( Waw js plugins activation)
4.swiperJs -----------(All swiper in this website hear)
5.salActive ----------(Sal animation for card and all text)
6.textChanger --------(Text flip for banner section)
7.timeLine -----------(History Time line)
8.datePicker ---------(On click date calender)
9.timePicker ---------(On click time picker)
10.timeLineStory -----(History page time line)
11.vedioActivation----(Vedio activation)
12.searchOption ------(search open)
13.cartBarshow -------(Cart sode bar)
14.sideMenu ----------(Open side menu for desktop)
15.Back to top -------(back to top)
16.filterPrice -------(Price filtering)

==================================================*/

(function ($) {
    'use strict';
  
    var rtsJs = {
        m: function (e) {
            rtsJs.d();
            rtsJs.methods();
        },
        d: function (e) {
            this._window = $(window),
            this._document = $(document),
            this._body = $('body'),
            this._html = $('html')
        },
        methods: function (e) {
            rtsJs.sideCollups();
            rtsJs.mp3Audio();
            rtsJs.niceSelect();
            rtsJs.newTab();
            rtsJs.darkLightSwitcher();
            rtsJs.stickySearch();
        },
        
        sideCollups: function () {
            // Toggle classes on button click
            $('#collups-left').on('click', function (e) {
              $('#collups-left').toggleClass('collapsed');
              $('.left-side-bar').toggleClass('collapsed');
              $('.main-center-content-m-left').toggleClass('collapsed');
            });
            // Popup Toggle
            $(".single_action__haeader svg, .avatar").click(function(e) {
                e.preventDefault();
                var $popup = $(this).siblings('.slide-down__click');
            
                $popup.slideToggle();
                $(".slide-down__click").not($popup).slideUp(0);
            });
            // Popup Toggle
            $(".single_action__haeader").click(function(e) {
                $(this).toggleClass('active');
            });

            $(".right-side-open-clouse").click(function(e) {
                $(this).parent().toggleClass('close-right');
                $('.main-center-content-m-left').toggleClass('close-right-sidebar');
            });



        },

        mp3Audio:function (){
            let audioplay = document.querySelectorAll('.audio-player');
            if(audioplay.length){
                $(document).ready(function(){
                    const audioPlayer = document.querySelector(".audio-player");
                    const audio = new Audio(
                    "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
                    );
                    //credit for song: Adrian kreativaweb@gmail.com
    
                    console.dir(audio);
    
                    audio.addEventListener(
                    "loadeddata",
                    () => {
                        audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
                        audio.duration
                        );
                        audio.volume = .75;
                    },
                    false
                    );
    
                    //click on timeline to skip around
                    const timeline = audioPlayer.querySelector(".timeline");
                    timeline.addEventListener("click", e => {
                    const timelineWidth = window.getComputedStyle(timeline).width;
                    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
                    audio.currentTime = timeToSeek;
                    }, false);
    
                    //click volume slider to change volume
                    const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
                    volumeSlider.addEventListener('click', e => {
                    const sliderWidth = window.getComputedStyle(volumeSlider).width;
                    const newVolume = e.offsetX / parseInt(sliderWidth);
                    audio.volume = newVolume;
                    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
                    }, false)
    
                    //check audio percentage and update time accordingly
                    setInterval(() => {
                    const progressBar = audioPlayer.querySelector(".progress");
                    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
                    audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
                        audio.currentTime
                    );
                    }, 500);
    
                    //toggle between playing and pausing on button click
                    const playBtn = audioPlayer.querySelector(".controls .toggle-play");
                    playBtn.addEventListener(
                    "click",
                    () => {
                        if (audio.paused) {
                        playBtn.classList.remove("play");
                        playBtn.classList.add("pause");
                        audio.play();
                        } else {
                        playBtn.classList.remove("pause");
                        playBtn.classList.add("play");
                        audio.pause();
                        }
                    },
                    false
                    );
    
                    audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
                    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
                    audio.muted = !audio.muted;
                    if (audio.muted) {
                        volumeEl.classList.remove("icono-volumeMedium");
                        volumeEl.classList.add("icono-volumeMute");
                    } else {
                        volumeEl.classList.add("icono-volumeMedium");
                        volumeEl.classList.remove("icono-volumeMute");
                    }
                    });
    
                    //turn 128 seconds into 2:08
                    function getTimeCodeFromNum(num) {
                    let seconds = parseInt(num);
                    let minutes = parseInt(seconds / 60);
                    seconds -= minutes * 60;
                    const hours = parseInt(minutes / 60);
                    minutes -= hours * 60;
    
                    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
                    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
                        seconds % 60
                    ).padStart(2, 0)}`;
                    }
                });
                $(document).ready(function(){
                    const audioPlayer = document.querySelector(".audio-players");
                    const audio = new Audio(
                    "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
                    );
                    //credit for song: Adrian kreativaweb@gmail.com
    
                    console.dir(audio);
    
                    audio.addEventListener(
                    "loadeddata",
                    () => {
                        audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
                        audio.duration
                        );
                        audio.volume = .75;
                    },
                    false
                    );
    
                    //click on timeline to skip around
                    const timeline = audioPlayer.querySelector(".timeline");
                    timeline.addEventListener("click", e => {
                    const timelineWidth = window.getComputedStyle(timeline).width;
                    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
                    audio.currentTime = timeToSeek;
                    }, false);
    
                    //click volume slider to change volume
                    const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
                    volumeSlider.addEventListener('click', e => {
                    const sliderWidth = window.getComputedStyle(volumeSlider).width;
                    const newVolume = e.offsetX / parseInt(sliderWidth);
                    audio.volume = newVolume;
                    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
                    }, false)
    
                    //check audio percentage and update time accordingly
                    setInterval(() => {
                    const progressBar = audioPlayer.querySelector(".progress");
                    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
                    audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
                        audio.currentTime
                    );
                    }, 500);
    
                    //toggle between playing and pausing on button click
                    const playBtn = audioPlayer.querySelector(".controls .toggle-play");
                    playBtn.addEventListener(
                    "click",
                    () => {
                        if (audio.paused) {
                        playBtn.classList.remove("play");
                        playBtn.classList.add("pause");
                        audio.play();
                        } else {
                        playBtn.classList.remove("pause");
                        playBtn.classList.add("play");
                        audio.pause();
                        }
                    },
                    false
                    );
    
                    audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
                    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
                    audio.muted = !audio.muted;
                    if (audio.muted) {
                        volumeEl.classList.remove("icono-volumeMedium");
                        volumeEl.classList.add("icono-volumeMute");
                    } else {
                        volumeEl.classList.add("icono-volumeMedium");
                        volumeEl.classList.remove("icono-volumeMute");
                    }
                    });
    
                    //turn 128 seconds into 2:08
                    function getTimeCodeFromNum(num) {
                    let seconds = parseInt(num);
                    let minutes = parseInt(seconds / 60);
                    seconds -= minutes * 60;
                    const hours = parseInt(minutes / 60);
                    minutes -= hours * 60;
    
                    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
                    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
                        seconds % 60
                    ).padStart(2, 0)}`;
                    }
                });
                $(document).ready(function(){
                    const audioPlayer = document.querySelector(".audio-playerer");
                    const audio = new Audio(
                    "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
                    );
    
                    console.dir(audio);
    
                    audio.addEventListener(
                    "loadeddata",
                    () => {
                        audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
                        audio.duration
                        );
                        audio.volume = .75;
                    },
                    false
                    );
    
                    const timeline = audioPlayer.querySelector(".timeline");
                    timeline.addEventListener("click", e => {
                    const timelineWidth = window.getComputedStyle(timeline).width;
                    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
                    audio.currentTime = timeToSeek;
                    }, false);
    
                    const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
                    volumeSlider.addEventListener('click', e => {
                    const sliderWidth = window.getComputedStyle(volumeSlider).width;
                    const newVolume = e.offsetX / parseInt(sliderWidth);
                    audio.volume = newVolume;
                    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
                    }, false)
    
                    setInterval(() => {
                    const progressBar = audioPlayer.querySelector(".progress");
                    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
                    audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
                        audio.currentTime
                    );
                    }, 500);
    
                    const playBtn = audioPlayer.querySelector(".controls .toggle-play");
                    playBtn.addEventListener(
                    "click",
                    () => {
                        if (audio.paused) {
                        playBtn.classList.remove("play");
                        playBtn.classList.add("pause");
                        audio.play();
                        } else {
                        playBtn.classList.remove("pause");
                        playBtn.classList.add("play");
                        audio.pause();
                        }
                    },
                    false
                    );
    
                    audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
                    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
                    audio.muted = !audio.muted;
                    if (audio.muted) {
                        volumeEl.classList.remove("icono-volumeMedium");
                        volumeEl.classList.add("icono-volumeMute");
                    } else {
                        volumeEl.classList.add("icono-volumeMedium");
                        volumeEl.classList.remove("icono-volumeMute");
                    }
                    });
    
                    //turn 128 seconds into 2:08
                    function getTimeCodeFromNum(num) {
                    let seconds = parseInt(num);
                    let minutes = parseInt(seconds / 60);
                    seconds -= minutes * 60;
                    const hours = parseInt(minutes / 60);
                    minutes -= hours * 60;
    
                    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
                    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
                        seconds % 60
                    ).padStart(2, 0)}`;
                    }
                });
            }


        },


        niceSelect: function(){
            $('.nice-select').each(function() {
  
                var select = $(this),
                    name = select.attr('name');
                
                select.hide();
                
                select.wrap('<div class="nice-select-wrap"></div>');
                
                var parent = select.parent('.nice-select-wrap');
                
                parent.append('<ul id=' + name + ' style="display:none"></ul>');
                
                select.find('option').each(function() {
              
                  var option = $(this),
                      value = option.attr('value'),
                      label = option.text();
                  
                  if (option.is(":first-child")) {
                    
                    $('<a href="#" class="drop">' + label + '</a>').insertBefore(parent.find('ul'));
                    
                  } else {
                    
                    parent.find('ul').append('<li><a href="#" id="' + value + '">' + label + '</a></li>');
                    
                  }
                  
                });
                
                parent.find('a').on('click', function(e) {
                  
                  parent.toggleClass('down').find('ul').slideToggle(300);
                  
                  e.preventDefault();
                
                });
                
                parent.find('ul a').on('click', function(e) {
                  
                  var niceOption = $(this),
                          value = niceOption.attr('id'),
                      text = niceOption.text();
                  
                  select.val(value);
                  
                  parent.find('.drop').text(text);
                  
                  e.preventDefault();
                
                });
                
            });
        },

        newTab: function(){
            $(document).ready(function(){
                $('.new-chat-option').on('click', function(){
                    $('.question_answer__wrapper__chatbot').hide(5);
                });
                $('.chat-history-area-start .single-history').on('click', function(){
                    $('.question_answer__wrapper__chatbot').hide(5).show(5);
                });
            });
        },

        darkLightSwitcher: function(e){
            $(document).ready(function() {

              // THEME MODE SWITCHER JS
                var rts_light = $('.rts-dark-light');
                if(rts_light.length){
                var toggle = document.getElementById("rts-data-toggle");
                var storedTheme = localStorage.getItem('fluxi-theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                if (storedTheme)
                    document.documentElement.setAttribute('data-theme', storedTheme)
                    toggle.onclick = function() {
                    var currentTheme = document.documentElement.getAttribute("data-theme");
                    var targetTheme = "light";
            
                    if (currentTheme === "light") {
                        targetTheme = "dark";
                    }
                    document.documentElement.setAttribute('data-theme', targetTheme)
                    localStorage.setItem('fluxi-theme', targetTheme);
                };
                }
            });
        },

        stickySearch: function (e) {
            $(document).ready(function(){
                $(window).scroll(function(){
                    // Calculate the distance between the bottom of the page and the bottom of the viewport
                    var distanceFromBottom = $(document).height() - $(window).height() - $(window).scrollTop();
        
                    // Define a threshold for when to add the 'active' class
                    var threshold = 200; // You can adjust this value according to your requirement
        
                    // If the distance from the bottom is less than the threshold, add the 'active' class
                    if(distanceFromBottom < threshold) {
                        $('.chatbot .search-form').addClass('active');
                    } else {
                        $('.chatbot .search-form').removeClass('active');
                    }
                });
            });
 
          },

        
    }

    rtsJs.m();
  })(jQuery, window) 







