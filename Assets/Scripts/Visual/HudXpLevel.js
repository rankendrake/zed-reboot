#pragma strict
private var zedExperience : ZedExperience;


function Start() {
	var zed : GameObject = GameObject.Find("zed");
	zedExperience = zed.GetComponent(ZedExperience);
}

function OnGUI() {
    GUI.Label(
    		Rect(0, 30, Screen.width,Screen.height), 
    		"Experience: " + zedExperience.xp.ToString() + "\n" + "Level: " + zedExperience.level.ToString());
}