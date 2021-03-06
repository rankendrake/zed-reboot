﻿/*
 * Holds both the visuals and functionality of the High Scores screen (but not the High Scores database).
 * Interacts with HighScoreManager.
 */

#pragma strict

import System.Collections.Generic;

var zedFont : Font;
var flavourText : String;
var flavourTextFontSize : int;
var labelFontSize : int;
var headerFontSize : int;
var numberFontSize : int;

var defaultScreenWidth : int = 1400; // for font size calculation
private var screenToDefaultScreenRatio : float; // for scaling across different resolutions

var boxWidth : float;  // fraction of Screen.width
var boxHeight : float; // fraction of Screen.width
var boxYScreenFraction : float;

var clearButtonHeight : float;
var newGameButtonHeight : float;

private var highscore : List.<Scores>;
private var centeredStyle : GUIStyle;

function Awake() {
   highscore = HighScoreManager._instance.GetHighScore();
   screenToDefaultScreenRatio = parseFloat(Screen.width)/defaultScreenWidth;
}

function OnGUI() {
	GUI.skin = null;
	GUI.skin.font = zedFont;
	GUI.skin.button.fontSize = labelFontSize;

	// Create general high score box
	changeFontSize(flavourTextFontSize, GUI.skin.box);
	GUI.Box(
		Rect((0.5 - (boxWidth/2))*Screen.width,
		boxYScreenFraction*Screen.height,
		boxWidth*Screen.width,
		boxHeight*Screen.width), 
		flavourText);

	GUILayout.BeginArea(
		Rect((0.5 - (boxWidth/2))*Screen.width,
		boxYScreenFraction*Screen.height,
		boxWidth*Screen.width,
		boxHeight*Screen.width));

	GUILayout.Space(40);

	changeFontSize(headerFontSize, GUI.skin.label);

	// Column headers
	GUILayout.BeginHorizontal();
	GUILayout.Label("Fallen one", centeredStyle, GUILayout.Width(boxWidth*Screen.width/4));
	GUILayout.Label("Result", centeredStyle, GUILayout.Width(boxWidth*Screen.width/6));
	GUILayout.Label("Duration", centeredStyle, GUILayout.Width(boxWidth*Screen.width/9));
	GUILayout.Label("Hit", centeredStyle, GUILayout.Width(boxWidth*Screen.width/9));
	GUILayout.Label("Run", centeredStyle, GUILayout.Width(boxWidth*Screen.width/9));
	GUILayout.Label("Time", centeredStyle, GUILayout.Width(boxWidth*Screen.width/4));
	GUILayout.EndHorizontal();

	GUILayout.Space(10);

	// High score results
	for(var _score : Scores in highscore) {
		GUILayout.BeginHorizontal();
	    changeFontSize(labelFontSize, GUI.skin.label);
		GUILayout.Label(_score.name, centeredStyle, GUILayout.Width(boxWidth*Screen.width/4), GUILayout.Height(labelFontSize*1.8*screenToDefaultScreenRatio));
		changeFontSize(numberFontSize, GUI.skin.label);
		GUILayout.Label(String.Format("{0:D}", _score.score), centeredStyle, GUILayout.Width(boxWidth*Screen.width/6), GUILayout.Height(labelFontSize*1.8*screenToDefaultScreenRatio));
		changeFontSize(labelFontSize, GUI.skin.label);
		GUILayout.Label(_score.duration, centeredStyle, GUILayout.Width(boxWidth*Screen.width/9), GUILayout.Height(labelFontSize*1.8*screenToDefaultScreenRatio));
		GUILayout.Label(String.Format("{0:F2}%", _score.hit), centeredStyle, GUILayout.Width(boxWidth*Screen.width/9), GUILayout.Height(labelFontSize*1.8*screenToDefaultScreenRatio));
		GUILayout.Label(String.Format("{0:F0}m", _score.run), centeredStyle, GUILayout.Width(boxWidth*Screen.width/9), GUILayout.Height(labelFontSize*1.8*screenToDefaultScreenRatio));
		GUILayout.Label(_score.time, centeredStyle, GUILayout.Width(boxWidth*Screen.width/4), GUILayout.Height(labelFontSize*1.8*screenToDefaultScreenRatio));
		GUILayout.EndHorizontal();
	}

	GUILayout.EndArea();

	// Area for buttons
	GUILayout.BeginArea(
		Rect((0.5 - (boxWidth/2))*Screen.width,
		boxYScreenFraction*Screen.height + boxHeight*Screen.width,
		boxWidth*Screen.width,
		(clearButtonHeight+4*2+newGameButtonHeight)*Screen.width));

	GUILayout.Space(4);

	if (GUILayout.Button("Clear Leaderboard", GUILayout.Width(boxWidth*Screen.width - 3), GUILayout.Height(clearButtonHeight))) {
		HighScoreManager._instance.ClearLeaderBoard();
		highscore = HighScoreManager._instance.GetHighScore(); 
	}

	GUILayout.BeginHorizontal();
	if (GUILayout.Button("To Main Menu", GUILayout.Width(boxWidth*Screen.width/2 - 3), GUILayout.Height(newGameButtonHeight))) {
		Application.LoadLevel("MainMenu");     
	}
	if (GUILayout.Button("New Game", GUILayout.Width(boxWidth*Screen.width/2 - 3), GUILayout.Height(newGameButtonHeight))) {
		Time.timeScale = 1;
		Application.LoadLevel("scene");     
	}
	GUILayout.EndHorizontal();

	GUILayout.EndArea();

	GUI.skin = null;
}

function changeFontSize(newsize : int, element : GUIStyle) {
	element.fontSize = newsize*screenToDefaultScreenRatio;
	centeredStyle = GUIStyle(element);
    centeredStyle.alignment = TextAnchor.MiddleCenter;
}