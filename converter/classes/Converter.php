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

            $item = [
                'file'      => self::aws_to_jw_url($attributes['url'])
            ];

            if(!empty($attributes['start'])){
                [$startMin, $startSec] = explode(':', $attributes['start']);

                $item['starttime'] = $startMin * 60 + $startSec;

            }

            if(!empty($attributes['duration'])){
                [$endMin, $endSec] = explode(':', $attributes['duration']);

                $item['end'] = $endMin * 60 + $endSec;
            }

            array_push($playlist, $item);
            
        }


        return $playlist;
    }
}


