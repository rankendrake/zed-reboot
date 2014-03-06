#pragma strict

var bulletPrefab : GameObject;
var attr : WepAttributes;
var acc : WepAccCalculator;
var actualDeviation : float;
var FireSound : AudioSource;

@HideInInspector
var timeOfLastShot : float;

function Start(){
attr = GetComponent("WepAttributes") as WepAttributes;
acc = GetComponent("WepAccCalculator") as WepAccCalculator;
}

function Update () {
	if (Input.GetMouseButton(0) && (Time.time - timeOfLastShot) * attr.GetFreq() > 1) {
		actualDeviation = Random.Range(-1.0,1.0) * acc.deviation;
		for (var i = 0; i < attr.GetNumPellets(); i++) {
			FireRound(actualDeviation);
		}
		FireSound.Play();
	    timeOfLastShot = Time.time;
		acc.deviation += attr.GetAccDrop();
	}
}

function FireRound(deviation : float){
	var newBullet : GameObject = Instantiate(bulletPrefab, transform.position, transform.rotation);
	newBullet.transform.rotation.eulerAngles.z += deviation;
	newBullet.transform.rotation.eulerAngles.z += (Random.value - 0.5)*attr.GetSpread();
	newBullet.tag = "bullet";
	newBullet.transform.localScale.x = 0.5;
	newBullet.transform.localScale.y = 0.5;
	newBullet.transform.localScale.z = 0.5;
	newBullet.GetComponent(EnemyImpact).Dmg = attr.GetDmg();
	newBullet.GetComponent(bulletMover).speed = attr.GetSpd();
}