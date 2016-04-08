<?php
    $fincas = simplexml_load_file("../xml/fincas.xml");
    $var = (int) $_GET['codigo'];
    $finca = $fincas->finca[$var]->calendario->addChild('registre');
    $finca->addChild('dia', $_GET['d']);
    $finca->addChild('mes', $_GET['m']);
    $finca->addChild('any', $_GET['a']);
    $finca->addChild('ndias', $_GET['nd']);
    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    $dom->loadXML($fincas->asXML());
    $dom->saveXML();
    $dom->save('../xml/fincas.xml');
?>
