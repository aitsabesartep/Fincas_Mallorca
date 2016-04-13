<?php

	$rss = new DOMDocument();
	$rss->load('http://xml.tutiempo.net/xml/7250.xml?lan=es');
	echo $rss->saveXML();

?>