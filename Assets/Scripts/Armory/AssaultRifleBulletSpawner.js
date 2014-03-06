#pragma strict

var bulletPrefab : GameObject;
var attr : WepAttributes;
var acc : WepAccCalculator;
var actualDeviation : float;

@HideInInspector
var timeOfLastShot : float;

function Start(){
attr = GetComponent("WepAttributes") as WepAttributes;
acc = GetComponent("WepAccCalculator") as WepAccCalculator;
}

function Update () {
	if (Input.GetMouseButton(0) && (Time.time - timeOfLastShot) * attr.GetFreq() > 1) {
		actualDeviation = Random.Range(-1.0,1.0)*acc.deviation;
		acc.deviation += attr.GetAccDrop();
		FireRound(actualDeviation);
	    timeOfLastShot = Time.time;
		}
}
function FireRound(deviation : float){
	var newBullet : GameObject = Instantiate(bulletPrefab, transform.position, transform.rotation);
	newBullet.transform.rotation.eulerAngles.z += deviation;
	newBullet.tag = "bullet";
	newBullet.GetComponent(EnemyImpact).Dmg = attr.GetDmg();
	newBullet.GetComponent(bulletMover).speed = attr.GetSpd();
}