#pragma strict

var buttonWidth : float;  // fraction of Screen.width
var buttonHeight : float; // fraction of Screen.width
var startButtonY : float; // fraction of Screen.height
var quitButtonY : float;

function OnGUI() {

	var buttonRect : Rect = new Rect((0.5 - (buttonWidth/2))*Screen.width,
			(startButtonY)*Screen.height, 
			buttonWidth*Screen.width,
			buttonHeight*Screen.width);
	if (GUI.Button (buttonRect,	GUIContent("Start Survival"))) {	
		Time.timeScale = 1;						
		Application.LoadLevel("scene");
	}
	
	
	buttonRect = new Rect((0.5 - (buttonWidth/2))*Screen.width,
			(quitButtonY)*Screen.height, 
			buttonWidth*Screen.width,
			buttonHeight*Screen.width);
	if (GUI.Button (buttonRect,	GUIContent("Quit Game"))) {							
		Application.Quit();
	}
}