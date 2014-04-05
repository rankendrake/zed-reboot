#pragma strict
import System.Collections.Generic;

var boxWidth : float;  // fraction of Screen.width
var boxHeight : float; // fraction of Screen.width
var screenYFraction : float;

var nameInsertOffsetX : int;
var nameInsertOffsetY : int;

var highScoreName : String;

var aname : String = "";
var score : String = "";
var highscore : List.<Scores>;

function Start() {
   //EventManager._instance._buttonClick += ButtonClicked;

   highscore = HighScoreManager._instance.GetHighScore();
}

function OnGUI() {
	// Create general high score box
	GUI.Box(
		Rect((0.5 - (boxWidth/2))*Screen.width,
		screenYFraction*Screen.height,
		boxWidth*Screen.width,
		boxHeight*Screen.width), 
		"YOU WERE NOT MEANT TO SURVIVE ANYWAY");

	GUI.BeginGroup(
		Rect((0.5 - (boxWidth/2))*Screen.width,
		screenYFraction*Screen.height,
		boxWidth*Screen.width,
		boxHeight*Screen.width));

	GUILayout.Space(60);

	// GUILayout.BeginHorizontal();
	// GUILayout.Label("What is your name, mortal one?", GUILayout.Width(192));
	// aname = GUILayout.TextField(aname, GUILayout.Width(192));
	// GUILayout.EndHorizontal();

	// GUILayout.BeginHorizontal();
	// GUILayout.Label("Score :", GUILayout.Width(46));
	// score = GUILayout.TextField(score, GUILayout.Width(128));
	// GUILayout.EndHorizontal();
	// GUILayout.Space(10);

	// if (GUILayout.Button("Add Score", GUILayout.Width(boxWidth*Screen.width), GUILayout.Height(16))) {
	// 	HighScoreManager._instance.SaveHighScore(aname, System.Int32.Parse(score), System.DateTime.Now.ToString());
	// 	highscore = HighScoreManager._instance.GetHighScore();   
	// }

	if (GUILayout.Button("Get LeaderBoard", GUILayout.Width(boxWidth*Screen.width - 5), GUILayout.Height(16))) {
		highscore = HighScoreManager._instance.GetHighScore();      
	}

	if (GUILayout.Button("Clear Leaderboard", GUILayout.Width(boxWidth*Screen.width - 5), GUILayout.Height(16))) {
		HighScoreManager._instance.ClearLeaderBoard();      
	}

	GUILayout.Space(20);

	GUILayout.BeginHorizontal();
	GUILayout.Space(20);
	GUILayout.Label("~~~Time~~~", GUILayout.Width(boxWidth*Screen.width/3));
	GUILayout.Label("~~~Fallen ones~~~", GUILayout.Width(boxWidth*Screen.width/3));
	GUILayout.Label("~~~Result~~~", GUILayout.Width(boxWidth*Screen.width/3));
	GUILayout.EndHorizontal();

	GUILayout.Space(10);

	for(var _score : Scores in highscore) {
		GUILayout.BeginHorizontal();
		GUILayout.Space(20);
		GUILayout.Label(_score.time, GUILayout.Width(boxWidth*Screen.width/3), GUILayout.Height(25));
		GUILayout.Label(_score.name, GUILayout.Width(boxWidth*Screen.width/3), GUILayout.Height(25));
		GUILayout.Label(""+_score.score, GUILayout.Width(boxWidth*Screen.width/3), GUILayout.Height(25));
		GUILayout.EndHorizontal();
	}

	GUILayout.Space(boxHeight*Screen.height + 64 - highscore.Count*28);

	GUILayout.BeginHorizontal();
	if (GUILayout.Button("To Main Menu", GUILayout.Width(boxWidth*Screen.width/2 - 5), GUILayout.Height(64))) {
		Application.LoadLevel("MainMenu");     
	}
	if (GUILayout.Button("New Game", GUILayout.Width(boxWidth*Screen.width/2 - 5), GUILayout.Height(64))) {
		Time.timeScale = 1;
		Application.LoadLevel("scene");     
	}
	GUILayout.EndHorizontal();

	GUI.EndGroup();

}