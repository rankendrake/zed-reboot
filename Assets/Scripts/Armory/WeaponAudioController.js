#pragma strict

var fire : AudioClip;
var reloadBegin : AudioClip;
var reloadEnd : AudioClip;

var reloadTime : float;
var lastReloadTime : float;

var reloadPlaying : boolean;
var reloadTimeChanged : boolean;

function Start()
{
reloadPlaying = false;
reloadTime = transform.parent.GetComponent(ZedAttributes).getReloadTime();
lastReloadTime = 0;
}

function fireSound()
{
audio.PlayOneShot(fire,1.0);
}

function reloadSound()
{
	if(!reloadPlaying)
	{
		reloadPlaying = true;
		yield WaitForSeconds(0.05);
		audio.PlayOneShot(reloadBegin,1.0);
		yield WaitForSeconds(reloadTime - reloadEnd.length - 0.05);
		audio.PlayOneShot(reloadEnd,1.0);
	}
}

function Update()
{
	if(reloadPlaying && !reloadTimeChanged)
	{
		lastReloadTime = Time.time;
		reloadTimeChanged = true;
	}
	if(Time.time > lastReloadTime+reloadTime)
	{
		reloadPlaying = false;
		reloadTimeChanged = false;
	}
}