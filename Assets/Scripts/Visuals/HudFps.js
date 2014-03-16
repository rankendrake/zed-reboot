#pragma strict

function OnGUI(){
    GUI.Label(
    		Rect(Screen.width - 100,Screen.height - 30,Screen.width,Screen.height), 
    		"FPS: " + (Mathf.RoundToInt((1/Time.deltaTime))).ToString());
}				