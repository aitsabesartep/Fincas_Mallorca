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

function initCos(xml){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            $("#cos").html(xhttp.responseText);
            $("#cont_finques").html(xml);
            removeIndex();
            actualitzarMenu(1);
            initCalendaris();
        }   
    };
    xhttp.open("GET", "cos.html", true);
    xhttp.send();
}

function loadFincasBuscar(st){
    console.log(st);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            initCos(xhttp.responseText);
        }
    };
    var str = 'php/fincas_filtros.php?doc='+st;
    xhttp.open("GET", str, true);
    xhttp.send();
}

function processarHome(xml){
    var xmlDoc = xml.responseXML;
    var fincas = xmlDoc.getElementsByTagName("finca");
    var tots = [];
    var eliminar = [];

    var i;
    for (i = 0; i < fincas.length; i++) {
        var codi = fincas[i].getElementsByTagName('codi')[0].textContent;
        tots.push(codi);
        if (eliminar.indexOf(codi) == -1 && document.getElementById('personas_f').selectedIndex != '0') {
            if (parseInt(fincas[i].getElementsByTagName('capacidad_personas')[0].textContent) < parseInt(document.getElementById("personas_f").value)) {
                eliminar.push(codi);
            }
        }
        if (eliminar.indexOf(codi) == -1 && document.getElementById('tipo_f').selectedIndex != '0') {
            var carac = document.getElementById("tipo_f").value;
            if (document.getElementById("tipo_f").value == 'Finca' && fincas[i].getElementsByTagName('finc')[0] == null) {
                eliminar.push(codi);
            }else if (document.getElementById("tipo_f").value == 'Casa' && fincas[i].getElementsByTagName('casa')[0] == null) {
                eliminar.push(codi);
            }else if (document.getElementById("tipo_f").value == 'Apartamento' && fincas[i].getElementsByTagName('apartamento')[0] == null) {
                eliminar.push(codi);
            }
        }
        var calendario = (fincas[i].getElementsByTagName('calendario')[0]);
        if (eliminar.indexOf(codi) == -1 && calendario.getElementsByTagName('registre').length > 0 && $('#from').val() != '' && $('#to').val() == '') {
            var registres = calendario.getElementsByTagName('registre');
            var m;
            for (m = 0; m < registres.length; m++) {
                var dia = parseInt(registres[m].getElementsByTagName('dia')[0].textContent);
                var mes = parseInt(registres[m].getElementsByTagName('mes')[0].textContent);
                //Restam -1 xq es més comença a 0
                mes = mes - 1;
                var any = parseInt(registres[m].getElementsByTagName('any')[0].textContent);
                var cuants = parseInt(registres[m].getElementsByTagName('ndias')[0].textContent);
                var d_from = new Date(any, mes, dia);
                var d_to = new Date(d_from.getTime());
                var d_check = new Date(d_from.getTime());
                d_to.setDate(d_to.getDate() + cuants - 1);
                var check = $('#from').val();
                var check1 = check.split("/");
                d_check.setDate(check1[0]);
                d_check.setMonth(check1[1]-1);
                d_check.setFullYear(check1[2]);
                if (d_from <= d_check && d_check <= d_to) {
                    eliminar.push(codi);
                }
            }
        }else if (eliminar.indexOf(codi) == -1 && calendario.getElementsByTagName('registre').length > 0 && $('#from').val() != '' && $('#to').val() != '') {
            var registres = calendario.getElementsByTagName('registre');
            var m;
            for (m = 0; m < registres.length; m++) {
                var dia = parseInt(registres[m].getElementsByTagName('dia')[0].textContent);
                var mes = parseInt(registres[m].getElementsByTagName('mes')[0].textContent);
                //Restam -1 xq es més comença a 0
                mes = mes - 1;
                var any = parseInt(registres[m].getElementsByTagName('any')[0].textContent);
                var cuants = parseInt(registres[m].getElementsByTagName('ndias')[0].textContent);
                var d_from = new Date(any, mes, dia);
                var d_to = new Date(d_from.getTime());
                var d_check = new Date(d_from.getTime());
                var d_check2 = new Date(d_from.getTime());
                d_to.setDate(d_to.getDate() + cuants - 1);
                var check = $('#from').val();
                var check1 = check.split("/");
                d_check.setDate(check1[0]);
                d_check.setMonth(check1[1]-1);
                d_check.setFullYear(check1[2]);
                check = $('#to').val();
                check1 = check.split("/");
                d_check2.setDate(check1[0]);
                d_check2.setMonth(check1[1]-1);
                d_check2.setFullYear(check1[2]);
                if ((d_check <= d_from && d_from <= d_check2) || (d_check <= d_to && d_to <= d_check2)) {
                    eliminar.push(codi);
                }
            }
        }else if (eliminar.indexOf(codi) == -1 && calendario.getElementsByTagName('registre').length > 0 && $('#from').val() == '' && $('#to').val() != '') {
            var registres = calendario.getElementsByTagName('registre');
            var m;
            for (m = 0; m < registres.length; m++) {
                var dia = parseInt(registres[m].getElementsByTagName('dia')[0].textContent);
                var mes = parseInt(registres[m].getElementsByTagName('mes')[0].textContent);
                //Restam -1 xq es més comença a 0
                mes = mes - 1;
                var any = parseInt(registres[m].getElementsByTagName('any')[0].textContent);
                var cuants = parseInt(registres[m].getElementsByTagName('ndias')[0].textContent);
                var d_from = new Date(any, mes, dia);
                var d_to = new Date(d_from.getTime());
                var d_check = new Date(d_from.getTime());
                d_to.setDate(d_to.getDate() + cuants - 1);
                var check = $('#to').val();
                var check1 = check.split("/");
                d_check.setDate(check1[0]);
                d_check.setMonth(check1[1]-1);
                d_check.setFullYear(check1[2]);
                if (d_from <= d_check && d_check <= d_to) {
                    eliminar.push(codi);
                }
            }
        }
    }

    //Seleccionam els que no estan dins eliminar
    var str = null;
    for (i = 0; i < tots.length; i++) {
        if (eliminar.indexOf(tots[i]) == -1) {
            if (str == null) {
                str = tots[i];
            }else{
                str = str + '-' +tots[i];    
            }
        }
    }

    loadFincasBuscar(str);
}


function filtrarHome(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            processarHome(xhttp);
        }
    };
    xhttp.open("GET", "xml/fincas.xml", true);
    xhttp.send();
    return false;
}