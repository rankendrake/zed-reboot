#pragma strict

var HP : float;
var speed : float;
var timePassed : float;
var timeStart : float;

function Start () {
	timeStart = Time.time;
}

function Update () {
	timePassed = Time.time - timeStart;
}