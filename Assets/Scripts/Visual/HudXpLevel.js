#pragma strict
private var zedExperience : ZedExperience;


function Start() {
	var zed : GameObject = GameObject.Find("zed");
	zedExperience = zed.GetComponent(ZedExperience);
}

function OnGUI() {
    GUI.Label(
    		Rect(Screen.width - 100, Screen.height - 70, Screen.width,Screen.height), 
    		"Experience: " + zedExperience.xp.ToString() + "\n" + "Level: " + zedExperience.level.ToString());
}