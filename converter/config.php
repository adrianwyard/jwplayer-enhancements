<?php
    define('CNDCE_CONFIG_LOADED', true);

    define('AWS_BASE_URL', 'https://s3.amazonaws.com/counterbalance-video/');

    define('JW_BASE_URL', 'https://cdn.jwplayer.com/manifests/');

    define('VIDEO_MAP_URL', 'https://counterbalance.net/converter/video-map.tsv');

    define('PLAYLIST_BASE_URL', '../');

    ini_set('allow_url_fopen', 1);

    function pretty_var_dump($var){
        echo '<pre>';

        var_dump($var);

        echo '</pre>';
    }

?>