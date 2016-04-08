<?php
	$xml = new DOMDocument;
	$xml->load('../xml/fincas.xml');
	$xsl = new DOMDocument;
	$xsl->load('../fincas.xsl');
	$proc = new XSLTProcessor;
	$proc->importStyleSheet($xsl);
	echo $proc->transformToXML($xml);
?>