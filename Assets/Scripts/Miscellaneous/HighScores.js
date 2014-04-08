#pragma strict
import System.Collections.Generic;

var zedFont : Font;
var flavourText : String;
var flavourTextFontSize : int;
var labelFontSize : int;
var headerFontSize : int;
var numberFontSize : int;

var defaultScreenWidth : int = 1400; // for font size calculation
private var screenToDefaultScreenRatio : float;

var boxWidth : float;  // fraction of Screen.width
var boxHeight : float; // fraction of Screen.width
var boxYScreenFraction : float;

var clearButtonHeight : float;
var newGameButtonHeight : float;

// var highScoreName : String;
// var aname : String = "";
// var score : String = "";
private var highscore : List.<Scores>;
private var centeredStyle : GUIStyle;

function Awake() {
   highscore = HighScoreManager._instance.GetHighScore();
   screenToDefaultScreenRatio = parseFloat(Screen.width)/defaultScreenWidth;
}

function OnGUI() {
	GUI.skin.font = zedFont;
	GUI.skin.button.fontSize = labelFontSize; // temporary

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
	GUILayout.Label("Time", centeredStyle, GUILayout.Width(boxWidth*Screen.width/3));
	GUILayout.Label("Fallen one", centeredStyle, GUILayout.Width(boxWidth*Screen.width/3));
	GUILayout.Label("Result", centeredStyle, GUILayout.Width(boxWidth*Screen.width/3));
	GUILayout.EndHorizontal();

	GUILayout.Space(10);

	// High score results
	for(var _score : Scores in highscore) {
		GUILayout.BeginHorizontal();
	    changeFontSize(labelFontSize, GUI.skin.label);
		GUILayout.Label(_score.time, centeredStyle, GUILayout.Width(boxWidth*Screen.width/3), GUILayout.Height(labelFontSize*1.8*screenToDefaultScreenRatio));
		GUILayout.Label(_score.name, centeredStyle, GUILayout.Width(boxWidth*Screen.width/3), GUILayout.Height(labelFontSize*1.8*screenToDefaultScreenRatio));
	    changeFontSize(numberFontSize, GUI.skin.label);
		GUILayout.Label(""+_score.score, centeredStyle, GUILayout.Width(boxWidth*Screen.width/3), GUILayout.Height(labelFontSize*1.8*screenToDefaultScreenRatio));
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
}

function changeFontSize(newsize : int, element : GUIStyle) {
	element.fontSize = newsize*screenToDefaultScreenRatio;
	centeredStyle = GUIStyle(element);
    centeredStyle.alignment = TextAnchor.MiddleCenter;
}