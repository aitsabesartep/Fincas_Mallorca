function loadPropiedad(codi){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            $("#cos").html(xhttp.responseText);
            actualitzarMenu(1);
            initPropiedad(codi);
        }
    };
    var str = 'php/propiedad.php?codi='+codi;
	xhttp.open("GET", str, true);
	xhttp.send();
}

function filtrar(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            processar(xhttp);
        }
    };
    xhttp.open("GET", "xml/fincas.xml", true);
    xhttp.send();
    return false;
}

function processar(xml){

    var xmlDoc = xml.responseXML;
    var fincas = xmlDoc.getElementsByTagName("finca");
    var tots = [];
    var eliminar = [];

    var i;
    for (i = 0; i < fincas.length; i++) {
        var codi = fincas[i].getElementsByTagName('codi')[0].textContent;
        tots.push(codi);
        var servicios = fincas[i].getElementsByTagName('servicios');
        for (var j = 0; j < servicios.length; j++) {
            if (eliminar.indexOf(codi) == -1 && document.getElementById('wifi_f').checked && servicios[j].getElementsByTagName('internet')[0] == null) {
                eliminar.push(codi);
                break;
            }
            //Si hi es dins eliminar, llavors vol dir que ja no compleix alguna condicio 
            if (eliminar.indexOf(codi) == -1 && document.getElementById('piscina_f').checked && servicios[j].getElementsByTagName('piscina')[0] == null) {
                eliminar.push(codi);
                break;   
            }
            if (eliminar.indexOf(codi) == -1 && document.getElementById('tv_f').checked && servicios[j].getElementsByTagName('television')[0] == null) {
                eliminar.push(codi);
                break;   
            }
            if (eliminar.indexOf(codi) == -1 && document.getElementById('yacuzzi_f').checked && servicios[j].getElementsByTagName('yacuzzi')[0] == null) {
                eliminar.push(codi);
                break;   
            }
            if (eliminar.indexOf(codi) == -1 && document.getElementById('mar_f').checked && servicios[j].getElementsByTagName('mar')[0] == null) {
                eliminar.push(codi);
                break;   
            }
            if (eliminar.indexOf(codi) == -1 && document.getElementById('aire_f').checked && servicios[j].getElementsByTagName('climatizacion')[0] == null) {
                eliminar.push(codi);
                break;   
            }
            if (eliminar.indexOf(codi) == -1 && document.getElementById('barbacoa_f').checked && servicios[j].getElementsByTagName('barbacoa')[0] == null) {
                eliminar.push(codi);
                break;   
            }
            if (eliminar.indexOf(codi) == -1 && document.getElementById('perros_f').checked && servicios[j].getElementsByTagName('perros')[0] == null) {
                eliminar.push(codi);
                break;   
            }
        }
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
        if (eliminar.indexOf(codi) == -1 && document.getElementById('val_f').selectedIndex != '0' && mediaVal(fincas[i]) < parseInt(document.getElementById('val_f').value)) {
                eliminar.push(codi);
        }
        if (eliminar.indexOf(codi) == -1 && document.getElementById('precio_f').selectedIndex != '0') {
            if (document.getElementById("precio_f").selectedIndex == '1' && parseInt(fincas[i].getElementsByTagName('enero')[0].textContent) > 150) {
                eliminar.push(codi);
            }else if (document.getElementById("precio_f").selectedIndex == '2' && (parseInt(fincas[i].getElementsByTagName('enero')[0].textContent) < 150 || parseInt(fincas[i].getElementsByTagName('enero')[0].textContent) > 200)) {
                eliminar.push(codi);
            }else if (document.getElementById("precio_f").selectedIndex == '3' && (parseInt(fincas[i].getElementsByTagName('enero')[0].textContent) < 201 || parseInt(fincas[i].getElementsByTagName('enero')[0].textContent) > 250)) {
                eliminar.push(codi);
            }else if (document.getElementById("precio_f").selectedIndex == '4' && parseInt(fincas[i].getElementsByTagName('enero')[0].textContent) < 251) {
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


    if (str == null) {
        $("#cont_finques").html('<h3>No se han encontrado fincas con estas caracter&#237;sticas<h3>');
        document.getElementById("cont_finques").style.minHeight = (window.innerHeight-200)+"px";
    }else{
        loadFiltros(str);
    }
}

function loadFiltros(st){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            $("#cont_finques").html(xhttp.responseText);
        }
    };
    var str = 'php/fincas_filtros.php?doc='+st;
    xhttp.open("GET", str, true);
    xhttp.send();
}

function mediaVal(finca){
    var comentarios = (finca.getElementsByTagName('comentarios')[0]);
    var comentario = comentarios.getElementsByTagName('comentario');

    var mitja = 0;
    var contador = 0;

    for (i = 0; i < comentario.length; i++) {
        var val = parseInt(comentario[i].getElementsByTagName('valoracion')[0].textContent);
        mitja = mitja + val;
        contador = contador + 1;
    }

    if (mitja == 0) {return 0;}

    mitja = mitja / contador;
    return mitja;
}