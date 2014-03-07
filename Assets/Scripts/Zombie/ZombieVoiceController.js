#pragma strict

var spawnSound : AudioSource;
var spawnSoundRate : float;


function Start () {
if(Random.value < spawnSoundRate)
	spawnSound.Play();
}

function Update () {
}