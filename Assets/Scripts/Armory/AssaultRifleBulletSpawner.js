#pragma strict

var bulletPrefab : GameObject;
var attr : WeaponAttributes;
var acc : WeaponAccuracyCalculator;
var sounds : WeaponAudioController;
var actualDeviation : float;
private var clip : WeaponClip;
private var reloadTime : float;


@HideInInspector
var timeOfLastShot : float;

function Start() {
	attr = transform.GetComponent(WeaponAttributes);
	acc = transform.GetComponent(WeaponAccuracyCalculator);
	clip = transform.GetComponent(WeaponClip);
	sounds = transform.GetComponent(WeaponAudioController);
	reloadTime = transform.parent.GetComponent(ZedAttributes).getReloadTime();
}

function Update () {
	if(clip.getReloadStartTime() + reloadTime > Time.time)
	{
		sounds.reloadSound();
	}
		if (Input.GetMouseButton(0) && 
			((Time.time - timeOfLastShot)*attr.getFrequency()) > 1 && 
			(clip.getReloadStartTime() + reloadTime < Time.time)) {
		if (clip.wasteBullet()) {
			actualDeviation = Random.Range(-1.0,1.0) * acc.deviation;
			for (var i = 0; i < attr.getNumberPellets(); i++) {
				FireRound(actualDeviation);
			}
			sounds.fireSound();
		    timeOfLastShot = Time.time;
			acc.deviation += attr.getAccuracyDrop();
		}
	}
}
function FireRound(deviation : float){
	var newBullet : GameObject = Instantiate(bulletPrefab, transform.position, transform.rotation);
	newBullet.transform.rotation.eulerAngles.z += deviation;
	newBullet.transform.rotation.eulerAngles.z += (Random.value - 0.5)*attr.getSpread();
	newBullet.tag = "bullet";
	newBullet.GetComponent(EnemyImpact).Dmg = attr.getDamage();
	newBullet.GetComponent(bulletMover).speed = attr.getSpeed();
}