var currentBackground = 0;
var backgrounds = [];
backgrounds[0] = 'url(img/fondo1.jpg) no-repeat center center fixed';
backgrounds[1] = 'url(img/fondo2.jpg) no-repeat center center fixed';
backgrounds[2] = 'url(img/fondo3.jpg) no-repeat center center fixed';
var canvi_fons;

function changeBackground() {
    currentBackground++;
    if(currentBackground > 2) currentBackground = 0;
    $('.full').css('background', backgrounds[currentBackground]);
    $('.full').css('-webkit-background-size', 'cover');
    $('.full').css('-moz-background-size', 'cover');
    $('.full').css('background-size', 'cover');
    $('.full').css('-o-background-size', 'cover');
    canvi_fons = setTimeout(changeBackground, 4000);
}

$(document).ready(function() {
    loadHome();
});

function loadFincas(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            $("#cos").html(xhttp.responseText);
            removeIndex();
            actualitzarMenu(1);
            initCalendaris();
        }
    };
  xhttp.open("GET", "php/fincas.php", true);
  xhttp.send();
}

function loadContacto(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            $("#cos").html(xhttp.responseText);
            removeIndex();
            actualitzarMenu(3);
        }
    };
  xhttp.open("GET", "contacto.html", true);
  xhttp.send();
}

function loadMapa(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            $("#cos").html(xhttp.responseText);
            document.getElementById("map").style.height = screen.height * 0.68 + "px";
            document.getElementById("map").style.height = screen.height * 0.68 + "px";
            document.getElementById("map").style.borderStyle = "solid";
            document.getElementById("map").style.borderWidth = "3px";
            document.getElementById("map").style.borderRadius = "15px";
            document.getElementById("map").style.borderColor = "#337AB7";
            document.getElementById("cos_mapa").style.marginTop = "75px";
            removeIndex();
            actualitzarMenu(2);
            initMap();
        }   
    };
    xhttp.open("GET", "mapa.html", true);
    xhttp.send();
}

function loadHome(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            removeIndex();
            $("#cos").html(xhttp.responseText);
            actualitzarMenu(0);
            setIndex();
            initCalendaris();
        }   
    };
    xhttp.open("GET", "inici.html", true);
    xhttp.send();
}

function removeIndex(){
    clearTimeout(canvi_fons);
    currentBackground = 0;
    document.getElementById("htm").removeAttribute("style");
    document.getElementById("htm").className = "normal";
}

function setIndex(){
    document.getElementById("htm").removeAttribute("style");
    document.getElementById("htm").className = "full";
    canvi_fons = setTimeout(changeBackground, 4000);
}

function actualitzarMenu(element){
    document.getElementById("index_m").removeAttribute("class");
    document.getElementById("mapa_m").removeAttribute("class");
    document.getElementById("fincas_m").removeAttribute("class");
    document.getElementById("contacto_m").removeAttribute("class");
    if (element == 1) {
        document.getElementById("fincas_m").className = "menu_active";
    } else if (element == 2) {
        document.getElementById("mapa_m").className = "menu_active";
    }else if (element == 0) {
        document.getElementById("index_m").className = "menu_active";
    }else if (element == 3) {
        document.getElementById("contacto_m").className = "menu_active";
    }
    $('.navbar-collapse').collapse('hide');
}

/*
//Funcio per calendaris JQuery
function initCalendaris() {
    $( "#from" ).datepicker({
        minDate:0,
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function( selectedDate ) {
            $( "#to" ).datepicker( "option", "minDate", selectedDate );
        }
    });
    $( "#to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function( selectedDate ) {
            $( "#from" ).datepicker( "option", "maxDate", selectedDate );
        }
    });
}
*/
var entrada;
function initCalendaris(){
    var from_$input = $('#from').pickadate({
        format: 'dd/mm/yyyy'
    }),
        from_picker = from_$input.pickadate('picker')

    var to_$input = $('#to').pickadate({
        format: 'dd/mm/yyyy'
    }),
        to_picker = to_$input.pickadate('picker')


    // Check if there’s a “from” or “to” date to start with.
    if ( from_picker.get('value') ) {
      to_picker.set('min', from_picker.get('select'))
    }
    if ( to_picker.get('value') ) {
      from_picker.set('max', to_picker.get('select'))
    }

    // When something is selected, update the “from” and “to” limits.
    from_picker.on('set', function(event) {
      if ( event.select ) {
        to_picker.set('min', from_picker.get('select'))    
      }
      else if ( 'clear' in event ) {
        to_picker.set('min', false)
      }
    })
    to_picker.on('set', function(event) {
      if ( event.select ) {
        from_picker.set('max', to_picker.get('select'))
      }
      else if ( 'clear' in event ) {
        from_picker.set('max', false)
      }
    })
}