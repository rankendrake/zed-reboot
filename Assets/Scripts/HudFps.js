#pragma strict

function OnGUI(){
    GUI.Label(
    		Rect(0,0,Screen.width,Screen.height), 
    		(Mathf.RoundToInt((1/Time.deltaTime))).ToString());
}