#pragma strict

var zed : GameObject;
var skillPointsLeft : int = 2;

function Start () {
zed = GameObject.Find("zed");
}

function Update () {
	if(Input.GetKey("m")) {
		if(zed.GetComponent(PerkAddMoveSpeed1) == null) {
			zed.AddComponent(PerkAddMoveSpeed1);
			skillPointsLeft -= zed.GetComponent(PerkAddMoveSpeed1).skillPointCost;
			}
	}
}