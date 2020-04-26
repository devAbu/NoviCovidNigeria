<?php
$url = 'https://covid19.ncdc.gov.ng/';
$html = new DOMDocument();
@$html->loadHTMLFile($url);
$xpath = new DOMXPath($html);


// example 3: same as above with wildcard
$elements = $xpath->query("//*[@id='custom3']/tbody");

if (!is_null($elements)) {
    foreach ($elements as $element) {
        $nodes = $element->childNodes;
        foreach ($nodes as $node) {
            echo $node->nodeValue . "\n";
        }
    }
}
