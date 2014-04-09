#pragma strict

var zedFont : Font;
var labelFontSize : int;

function OnGUI(){
	GUI.skin.font = zedFont;
	GUI.skin.label.fontSize = labelFontSize;

    GUI.Label(
    		Rect(Screen.width - 200,Screen.height - 60, Screen.width, Screen.height), 
    		"FPS: " + (Mathf.RoundToInt((Time.timeScale/Time.smoothDeltaTime))).ToString() 
    		+ "\nΔTime = " + Time.deltaTime);
}				