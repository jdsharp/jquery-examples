<?php

// This is magic

session_start();

function getStates() {
	$states = array(
		"AL" => "Alabama",
		"AK" => "Alaska",
		"AZ" => "Arizona",
		"AR" => "Arkansas",
		"CA" => "California",
		"CO" => "Colorado",
		"CT" => "Connecticut",
		"DE" => "Delaware",
		"DC" => "District Of Columbia",
		"FL" => "Florida",
		"GA" => "Georgia",
		"HI" => "Hawaii",
		"ID" => "Idaho",
		"IL" => "Illinois",
		"IN" => "Indiana",
		"IA" => "Iowa",
		"KS" => "Kansas",
		"KY" => "Kentucky",
		"LA" => "Louisiana",
		"ME" => "Maine",
		"MD" => "Maryland",
		"MA" => "Massachusetts",
		"MI" => "Michigan",
		"MN" => "Minnesota",
		"MS" => "Mississippi",
		"MO" => "Missouri",
		"MT" => "Montana",
		"NE" => "Nebraska",
		"NV" => "Nevada ",
		"NH" => "New Hampshire",
		"NJ" => "New Jersey",
		"NM" => "New Mexico",
		"NY" => "New York",
		"NC" => "North Carolina",
		"ND" => "North Dakota",
		"OH" => "Ohio",
		"OK" => "Oklahoma ",
		"OR" => "Oregon",
		"PA" => "Pennsylvania",
		"RI" => "Rhode Island",
		"SC" => "South Carolina",
		"SD" => "South Dakota",
		"TN" => "Tennessee",
		"TX" => "Texas",
		"UT" => "Utah",
		"VT" => "Vermont",
		"VA" => "Virginia",
		"WA" => "Washington",
		"WV" => "West Virginia",
		"WI" => "Wisconsin",
		"WY" => "Wyoming"
	);
	return $states;
}
header('Content-type: text/plain');

if ( isset($_GET['delay']) ) {
	sleep((int)$_GET['delay']);
}

if ( !isset($_SESSION['states']) || isset($_GET['reset']) ) {
	$_SESSION['states'] = getStates();
}

if ( isset($_GET['remove']) ) {
	unset( $_SESSION['states'][ $_GET['remove'] ] );
	echo json_encode( array('status' => 'success') );
	exit;
}
if ( isset($_GET['update']) ) {
	if ( isset($_SESSION['states'][ $_GET['update'] ]) ) {
		$value = $_SESSION['states'][ $_GET['update'] ];
		if ( preg_match('/[^a-z]/i', $value) ) {
			echo json_encode( array('status' => 'error', 'message' =>
			'Invalid characters'
			) );
			exit;
		}
		$_SESSION['states'][ $_GET['update'] ] = $_GET['value'];
		echo json_encode( array('status' => 'success') );
	} else {
		echo json_encode( array('status' => 'error', 'message' =>
		'Key did not exist'
		) );
	}
	exit;
}

$states = array();
if ( isset($_GET['search']) ) {
	foreach ( $_SESSION['states'] AS $k => $v ) {
		if ( strtolower($_GET['search']) == substr(strtolower($v), 0, strlen($_GET['search']) ) ) {
			$states[] = array('abbr' => $k, 'name' => $v);
		}
	}
} else {
	foreach ( $_SESSION['states'] AS $k => $v ) {
		$states[] = array('abbr' => $k, 'name' => $v);
	}
}
echo json_encode( array('states' => $states) );