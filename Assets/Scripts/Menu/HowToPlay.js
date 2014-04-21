/*
 * Holds both the visuals and functionality of the How To Play screen accessed from Main Menu.
 */

#pragma strict
import System.Collections.Generic;

var zedFont : Font;
var buttonFontSize : int;
var flavourTextFontSize : int;
var boxTexture : Texture2D;

var defaultScreenWidth : int = 1400; // for font size calculation
private var screenToDefaultScreenRatio : float; // for scaling across different resolutions

var boxWidth : float;  // fraction of Screen.width
var boxHeight : float; // fraction of Screen.width
var boxYScreenFraction : float;

var newGameButtonHeight : float;

private var centeredStyle : GUIStyle;

function Awake() {
   screenToDefaultScreenRatio = parseFloat(Screen.width)/defaultScreenWidth;
}

function OnGUI() {
	GUI.skin = null;
	GUI.skin.font = zedFont;
	GUI.skin.button.fontSize = buttonFontSize;

	// Create general high score box
	var defaultBackground : Texture2D = GUI.skin.box.normal.background;
	GUI.skin.box.normal.background = boxTexture;
	changeFontSize(flavourTextFontSize, GUI.skin.box);
	GUI.Box(
		Rect((0.5 - (boxWidth/2))*Screen.width,
		boxYScreenFraction*Screen.height,
		boxWidth*Screen.width,
		boxHeight*Screen.width), 
		"How To Play");

	// Area for buttons
	GUILayout.BeginArea(
		Rect((0.5 - (boxWidth/2))*Screen.width,
		boxYScreenFraction*Screen.height + boxHeight*Screen.width,
		boxWidth*Screen.width,
		(4*2+newGameButtonHeight)*Screen.width));

	GUILayout.Space(4);

	GUILayout.BeginHorizontal();
	if (GUILayout.Button("To Main Menu", GUILayout.Width(boxWidth*Screen.width/2 - 3), GUILayout.Height(newGameButtonHeight))) {
		Application.LoadLevel("MainMenu");     
	}
	if (GUILayout.Button("Start Game", GUILayout.Width(boxWidth*Screen.width/2 - 3), GUILayout.Height(newGameButtonHeight))) {
		Time.timeScale = 1;
		Application.LoadLevel("scene");     
	}
	GUILayout.EndHorizontal();

	GUILayout.EndArea();

	GUI.skin.box.normal.background = defaultBackground;
	GUI.skin = null;
}

function changeFontSize(newsize : int, element : GUIStyle) {
	element.fontSize = newsize*screenToDefaultScreenRatio;
	centeredStyle = GUIStyle(element);
    centeredStyle.alignment = TextAnchor.MiddleCenter;
}