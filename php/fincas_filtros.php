<?php
	$xml = new DOMDocument;
	$xml->load('../xml/fincas.xml');
	$xsl = new DOMDocument;
	$xsl->load('../fincas_filtros.xsl');
	$proc = new XSLTProcessor;
	$proc->setParameter ( '' , 'array' , $_GET['doc'] );
	$proc->importStyleSheet($xsl);
	echo $proc->transformToXML($xml);
?>