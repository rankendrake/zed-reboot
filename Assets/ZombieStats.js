#pragma strict

var HPMax : float;
var HP : float;
var speed : float;
var meleeDamage : float;
var meleeRate : float;
var timeElapsed : float;

function Start () {
	timeElapsed = GameObject.Find("zed").GetComponent(ZedStats).timePassed;
	HPMax = HealthAlgo(timeElapsed);
	HP = HPMax;
}

function HealthAlgo(timeElapsed){
	return 100 + (timeElapsed / 60.0);
}

function Update () {

}