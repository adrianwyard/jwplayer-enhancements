<?php

    require_once 'config.php';
    require_once 'classes/Converter.php';

    // echo PLAYLIST_BASE_URL;

    echo json_encode(Converter::convert_xml(PLAYLIST_BASE_URL . '/testrss-dvh.xml'));

?>