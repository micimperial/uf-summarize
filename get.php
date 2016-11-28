<?php
header("Content-Type:text/xml");
    $key     = $_GET['APIKey'];
    $sig     = $_GET['Signature'];
    $meth     = $_GET['Method'];
    $titleId     = $_GET['TitleId'];
    $page     = $_GET['Page'];
    $hubId = $_GET['HubId'];
    $HubStreamId = $_GET['HubStreamId'];

    $file = file_get_contents('https://api.uberflip.com/?limit=50&APIKey='.$key.'&Signature='.$sig.'&Version=0.1&Method='.$meth.'&ResponseType=XML&TitleId='.$titleId.'&Page='.$page.'&HubId='.$hubId.'&HubStreamId='.$HubStreamId );
    //$file = file_get_contents('https://api.uberflip.com/?APIKey=NjhkNDAxNzEyZDE2NDc1NDdiZjkyZTQ5NTVkMzkxNWI=&Signature=NTM5MWU5NzE3OWU4MGFiY2U1YWNjZjZiYzFhOWI5ODY3ODAwZjcwNg==&Version=0.1&Method=GetTitles&ResponseType=XML');
    echo $file;
?>