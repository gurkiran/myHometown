  $(document).ready(function(){
    $('#link1').addClass('hovering');
    $("#link1").hover(function(){
        $("#first").show(100);
        $("#second").hide(100);
        $("#third").hide(100);
        $("#link1").addClass("hovering");
         $("#link2").removeClass("hovering");
        $("#link3").removeClass("hovering");
    });
    $("#link2").hover(function(){
        $("#second").show(100);
        $("#first").hide(100);
        $("#third").hide(100);
        $("#link2").addClass("hovering");
        $("#link1").removeClass("hovering");
        $("#link3").removeClass("hovering");
    });

    $("#link3").hover(function(){
        $("#third").show(100);
        $("#first").hide(100);
        $("#second").hide(100);
        $("#link3").addClass("hovering");
        $("#link2").removeClass("hovering");
        $("#link1").removeClass("hovering");

    });
        $("#guru").click(function(){
        $("#hello").attr('title','Significance').dialog({
            modal:false,
            show: {
            effect: "blind",
            duration: 200
                },
            hide: {
            effect: "explode",
            duration: 1000
                },
            width:500,
            height:500,
            buttons: {
                "OK": function() {
                    $(this).dialog('close');
            }
        },
            draggable:true,
            resizable:true

        });

        });


        $("#googlemaps").click(function(){

       $("#completemap").attr('title','Location of Batala').dialog({

            modal:false,
            width:500,
           height:500,
           show: {
           effect: "blind",
           duration: 200
               },
           hide: {
           effect: "explode",
           duration: 1000
               },
            buttons: {
                "OK": function() {
                    $(this).dialog('close');
                }
            },
            draggable:true,
        });


        var mapOptions = {
        center: new google.maps.LatLng(31.818324,75.207064),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map=new google.maps.Map(document.getElementById('letc'), mapOptions);

          var acOptions = {
            types : ['establishment']
          }
          var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), acOptions);
          autocomplete.bindTo('bounds',map);
          var infoWindow = new google.maps.InfoWindow();
          var marker = new google.maps.Marker({
            map: map
          });
          google.maps.event.addListener(autocomplete, 'place_changed', function() {
          infoWindow.close();
          var place = autocomplete.getPlace();
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
          marker.setPosition(place.geometry.location);
          infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
          infoWindow.open(map, marker);
          google.maps.event.addListener(marker,'click',function(e){
            infoWindow.open(map, marker);
          });
        });
        var markerOptions={
            position:new google.maps.LatLng(31.818324,75.207064)
        };
        var marker = new google.maps.Marker(markerOptions);
        marker.setMap(map);
        var infoWindowOptions= {
            content: "Batala is here !"
        }
        var infoWindow=new google.maps.InfoWindow(infoWindowOptions);
            google.maps.event.addListener(marker,'click',function(e){

                        infoWindow.open(map,marker);
                        });
        });



    $(function() {


        var width = 550;
        var animationSpeed = 2000;
        var pause = 3000;
        var currentSlide = 1;


        var $slider = $('#slider');
        var $slideContainer = $('.slides', $slider);
        var $slides = $('.slide', $slider);

        var interval;

        function startSlider() {
            interval = setInterval(function() {
                $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() {
                    if (++currentSlide === $slides.length) {
                        currentSlide = 1;
                        $slideContainer.css('margin-left', -20);
                    }
                });
            }, pause);
        }
        function pauseSlider() {
            clearInterval(interval);
        }

        $slideContainer
            .on('mouseenter', pauseSlider)
            .on('mouseleave', startSlider);

        startSlider();


    });

        function displayTime(){

            var newDate=new Date();
            var h=newDate.getHours();
            var m=newDate.getMinutes();
            var s=newDate.getSeconds();

            var amorpm=h>12 ? 'PM' : 'AM';

             h=h%12;
             h=h!=0 ? h:12;

            m= m >= 10 ? m : '0'+m;
            s= s >= 10 ? s : '0'+s;

            var time=h+' :'+m+' :'+s+' '+amorpm;
            document.getElementById("date").innerHTML=time;
            var t=setTimeout(displayTime,500);
        }

        displayTime();

  $('#ehvi').accordion({
    collapsible : true,
    heightStyle : 'content'
  });

    });

    var APPID="fbb610483c3d585d1a34e96d64ef926b";

    var temp;
    var loc;
    var icon;
    var humidity;
    var wind;
    var direction;
    var description;

    function updateByCityName(cityName){
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" +
         cityName +
        "&APPID=" + APPID;
        sendRequest(url);
    }

    function updateByGeo(lat, lon){
        var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat +
        "&lon=" + lon +
        "&APPID=" + APPID;
        sendRequest(url);
    }

    function sendRequest(url){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var weather = JSON.parse(xmlhttp.responseText);
               update(weather);
        }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    function kelvinToCelsius(k){
        return Math.round(k - 273.15);
    }


    function update(weather) {
        description.innerHTML=weather.weather[0].description;
        temp.innerHTML =kelvinToCelsius(weather.main.temp);
    }


    window.onload = function () {
        temp = document.getElementById("temperature");
        description= document.getElementById("description");

        temp.innerHTML = "25";
        description.innerHTML= "";

        if(navigator.geolocation){
        var showPosition = function(position){
            updateByGeo(position.coords.latitude, position.coords.longitude);
        }
        navigator.geolocation.getCurrentPosition(showPosition);
        } else {
        var cityName = window.prompt("Could not discover your location. What is your city name?");
        updateByCityName(cityName);
        }

    }
