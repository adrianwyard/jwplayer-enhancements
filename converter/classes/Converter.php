<?php

    if(!constant('CNDCE_CONFIG_LOADED'))
        die('Invalid Access');


class Converter{
    
    private static $VIDEO_MAP;

    private static function __init_video_map(){
        /**
         * Do not do anything if $VIDEO_MAP has already
         * been initializied
         */
        if(!is_null(self::$VIDEO_MAP))
            return;

        if(!($file = fopen(VIDEO_MAP_URL, 'r'))){
            die('Invalid Video Map URL');
        }

        self::$VIDEO_MAP = [];

        while($line = fgetcsv($file, 0, "\t")){
            self::$VIDEO_MAP[$line[0]] = [
                'jw'    => $line[1],
                'test'  => $line[3]
            ];
        }        
    }

    /**
     * Converts string `hh:mm:ss` or `mm:ss` to seconds
     * 
     * @return number
     */
    private static function __hour_to_seconds(string $hour){
        [$time1, $time2, $time3] = explode(':', $hour);

        if(isset($time3)){
            return $time1 * 3600 + $time2 * 60 + $time3;
        }

        return $time1 * 60 + $time2;
    }

    private static function aws_to_jw_filename(string $xmlFilename){
        return preg_replace('/(.*)\.xml$/', '$1.json', $xmlFilename);
    }

    

    public static function aws_to_jw_url(string $awsUrl){
        self::__init_video_map();

        [, $filename] = explode(AWS_BASE_URL, $awsUrl);


        if(!isset(self::$VIDEO_MAP[$filename]['jw'])){
            return $awsUrl;
        }

        return JW_BASE_URL . self::$VIDEO_MAP[$filename]['jw'] . '.m3u8';
    }

    public static function aws_to_jw_data(string $playlistUrl){

        if(!file_exists($playlistUrl)){
            echo $playlistUrl . ' - ';
            die('Invalid XML File');
        }

        $playlist = [];
            
        $playlistXML = simplexml_load_file($playlistUrl);

        foreach ($playlistXML->channel->item as $playlistItem) {
            $attributes = $playlistItem->children('media', true)->attributes();

            $item = array_merge(
                json_decode(json_encode($playlistItem), true),
                [
                    'file'  => self::aws_to_jw_url($attributes['url'])
                ]
            );

            if(!empty($attributes['start'])){
                $item['starttime'] = self::__hour_to_seconds($attributes['start']);

            }

            if(!empty($attributes['duration'])){
                $item['end'] = self::__hour_to_seconds($attributes['duration']);
            }

            array_push($playlist, $item);
            
        }


        return $playlist;
    }

    public static function aws_to_jw_playlist(string $awsUrl){

        /**
         * Get playlist filename
         */
        [,$playlistFilenameXML] = explode(PLAYLIST_BASE_URL, $awsUrl);



        $playlistFilenameJson = self::aws_to_jw_filename($playlistFilenameXML);



        $jsonUrl = PLAYLIST_BASE_URL. $playlistFilenameJson;

        
        
        /**
         * Look for existing JSON file.
         * If none exists, create one
         */
         if(!file_exists($jsonUrl)){
            file_put_contents(
                $jsonUrl,
                json_encode(self::aws_to_jw_data($awsUrl))
            );
         }


         /**
         * Respond with json file
         */
        header('Content-Type: application/json');
        die(file_get_contents($jsonUrl));



    }

    

    
}


