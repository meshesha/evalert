<?php
/*
;@version: 1.0
;@author: Tadle Meshesha 
;@license GPL2 
*/

if (isset($_POST["data"])) {
	$data = $_POST["data"];
	
	$json_str = read_json_file();
	echo $json_str;		

}
function read_json_file(){
	if (file_exists("events_php.json")) {
		/*
		if (substr(sprintf('%o', fileperms('events_php.json')), -4) == 1777) {
			chmod('events_php.json', 777)
		}
		*/
		$file = fopen("events_php.json", "r") or die("Unable to open file!");
		$read_file =  fread($file,filesize("events_php.json"));
		return $read_file;
		
	}else{
		return "File don't exists...";
	}
}