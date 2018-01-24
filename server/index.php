<?php 

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(array('status' => false));
  exit;
}

$path = './uploads/';

if (isset($_FILES)) {
	if (!is_writable($path)) {
		echo json_encode(array(
		  'status' => false,
		  'msg'    => 'Destination directory not writable.'
		));
		exit;
	}

	$responce = array();

	foreach ($_FILES as $key => $file) {
		$originalName = $file['name'];
		$ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
		$generatedName = md5($file['tmp_name']).$ext;
		$filePath = $path.$generatedName;

		if (move_uploaded_file($file['tmp_name'], $filePath)) {
			array_push($responce, array(
			  'status'        => true,
			  'originalName'  => $originalName,
			  'generatedName' => $generatedName
			));
		}
	}

	echo json_encode($responce);
}
else {
  echo json_encode(
    array('status' => false, 'msg' => 'No file uploaded.')
  );
  exit;
}
