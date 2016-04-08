<?php

$xml = new DOMDocument;
$xml->load('../xml/fincas.xml');

$xsl = new DOMDocument;
$xsl->load('../propiedad.xsl');

$proc = new XSLTProcessor;
$proc->setParameter ( '' , 'code' , $_GET['codi'] );
$proc->importStyleSheet($xsl);

echo $proc->transformToXML($xml);

?>