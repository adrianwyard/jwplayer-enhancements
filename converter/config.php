<?php
    define('CNDCE_CONFIG_LOADED', true);

    define('AWS_BASE_URL', 'https://s3.amazonaws.com/counterbalance-video/');

    define('JW_BASE_URL', 'https://cdn.jwplayer.com/manifests/');

    define('VIDEO_MAP_URL', '../playlists/video-map.tsv');

    define('PLAYLIST_BASE_URL', '../playlists');

    function pretty_var_dump($var){
        echo '<pre>';

        var_dump($var);

        echo '</pre>';
    }

?>