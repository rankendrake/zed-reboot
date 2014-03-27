#pragma strict

var zed : GameObject;
var skillPointsLeft : int = 2;

function Start () {
zed = GameObject.Find("zed");
gameObject.AddComponent(PerkAddMoveSpeed1);
gameObject.AddComponent(PerkIncreaseDamage1);
}

function Update () {
	if(Input.GetKey("m")) {
		if(zed.GetComponent(PerkAddMoveSpeed1) == null &&
				gameObject.GetComponent(PerkAddMoveSpeed1).skillPointCost <= skillPointsLeft) {
			zed.AddComponent(PerkAddMoveSpeed1);
			skillPointsLeft -= zed.GetComponent(PerkAddMoveSpeed1).skillPointCost;
			}
	}
	if(Input.GetKey("k")) {
		if(zed.GetComponent(PerkAddMoveSpeed1) == null &&
				gameObject.GetComponent(PerkIncreaseDamage1).skillPointCost <= skillPointsLeft) {
			zed.AddComponent(PerkIncreaseDamage1);
			skillPointsLeft -= zed.GetComponent(PerkIncreaseDamage1).skillPointCost;
				}
	}
}