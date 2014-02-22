#pragma strict

var mover : ZombieMover;
var t : float;

function Start () {
t = Time.time;
mover = GetComponent(ZombieMover);
}

function Update () {
if(Time.time > t + 2.5)
	{
		mover.speed = 0.5 * mover.speed; 
	}
}