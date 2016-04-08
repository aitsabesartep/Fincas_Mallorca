<?php
    $fincas = simplexml_load_file("../xml/fincas.xml");
    $var = (int) $_GET['codigo'];
    $finca = $fincas->finca[$var]->comentarios->addChild('comentario');
    $finca->addChild('name', $_GET['nom']);
    $finca->addChild('opinion', $_GET['opinio']);
    $finca->addChild('valoracion', $_GET['valor']);
    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    $dom->loadXML($fincas->asXML());
    $dom->saveXML();
    $dom->save('../xml/fincas.xml');

    //Falta refrescar pagina
?>



