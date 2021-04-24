<?php

    require_once 'config.php';
    require_once 'classes/Converter.php';

    Converter::aws_to_jw_playlist(PLAYLIST_BASE_URL . 'testrss-dvh.xml');

?>