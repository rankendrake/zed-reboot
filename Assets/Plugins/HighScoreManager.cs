// http://answers.unity3d.com/questions/20773/how-do-i-make-a-highscores-board.html
// (edited)


using UnityEngine;
using System.Collections;
using System.Collections.Generic;
 
 
/// <summary>
/// High score manager.
/// Local highScore manager for LeaderboardLength number of entries
/// 
/// this is a singleton class.  to access these functions, use HighScoreManager._instance object.
/// eg: HighScoreManager._instance.SaveHighScore("meh",1232);
/// No need to attach this to any game object, thought it would create errors attaching.
/// </summary>
 
public class HighScoreManager : MonoBehaviour
{
 
    private static HighScoreManager m_instance;
    private const int LeaderboardLength = 10;
 
    public static HighScoreManager _instance {
       get {
         if (m_instance == null) {
          m_instance = new GameObject ("HighScoreManager").AddComponent<HighScoreManager> ();          
         }
         return m_instance;
       }
    }
 
    void Awake ()
    {
       if (m_instance == null) {
         m_instance = this;      
       } else if (m_instance != this)       
         Destroy (gameObject);    
 
       DontDestroyOnLoad (gameObject);
    }
 
    public void SaveHighScore (string name, int score, string time, float hit, float run, string duration)
    {
       List<Scores> HighScores = new List<Scores> ();
 
       int i = 1;
       while (i<=LeaderboardLength && PlayerPrefs.HasKey("HighScore"+i+"score")) {
         Scores temp = new Scores ();
         temp.score = PlayerPrefs.GetInt ("HighScore" + i + "score");
         temp.name = PlayerPrefs.GetString ("HighScore" + i + "name");
         temp.time = PlayerPrefs.GetString ("HighScore" + i + "time");
         temp.hit = PlayerPrefs.GetFloat ("HighScore" + i + "hit");
         temp.run = PlayerPrefs.GetFloat ("HighScore" + i + "run");
         temp.duration = PlayerPrefs.GetString ("HighScore" + i + "duration");
         HighScores.Add (temp);
         i++;
       }
       if (HighScores.Count == 0) {       
         Scores _temp = new Scores ();
         _temp.name = name;
         _temp.score = score;
         _temp.time = time;
         _temp.hit = hit;
         _temp.run = run;
         _temp.duration = duration;
         HighScores.Add (_temp);
       } else {
         for (i=1; i<=HighScores.Count && i<=LeaderboardLength; i++) {
          if (score > HighScores [i - 1].score) {
              Scores _temp = new Scores ();
              _temp.name = name;
              _temp.score = score;
              _temp.time = time;
              _temp.hit = hit;
              _temp.run = run;
              _temp.duration = duration;
              HighScores.Insert (i - 1, _temp);
              break;
          }      
          if (i == HighScores.Count && i < LeaderboardLength) {
              Scores _temp = new Scores ();
              _temp.name = name;
              _temp.score = score;
              _temp.time = time;
              _temp.hit = hit;
              _temp.run = run;
              _temp.duration = duration;
              HighScores.Add (_temp);
              break;
          }
         }
       }
 
       i = 1;
       while (i<=LeaderboardLength && i<=HighScores.Count) {
         PlayerPrefs.SetString ("HighScore" + i + "name", HighScores [i - 1].name);
         PlayerPrefs.SetInt ("HighScore" + i + "score", HighScores [i - 1].score);
         PlayerPrefs.SetString ("HighScore" + i + "time", HighScores [i - 1].time);
         PlayerPrefs.SetFloat ("HighScore" + i + "hit", HighScores [i - 1].hit);
         PlayerPrefs.SetFloat ("HighScore" + i + "run", HighScores [i - 1].run);
         PlayerPrefs.SetString ("HighScore" + i + "duration", HighScores [i - 1].duration);
         i++;
       }
 
    }
 
    public List<Scores>  GetHighScore ()
    {
       List<Scores> HighScores = new List<Scores> ();
 
       int i = 1;
       while (i<=LeaderboardLength && PlayerPrefs.HasKey("HighScore"+i+"score")) {
         Scores temp = new Scores ();
         temp.score = PlayerPrefs.GetInt ("HighScore" + i + "score");
         temp.name = PlayerPrefs.GetString ("HighScore" + i + "name");
         temp.time = PlayerPrefs.GetString ("HighScore" + i + "time");
         temp.hit = PlayerPrefs.GetFloat ("HighScore" + i + "hit");
         temp.run = PlayerPrefs.GetFloat ("HighScore" + i + "run");
         temp.duration = PlayerPrefs.GetString ("HighScore" + i + "duration");
         HighScores.Add (temp);
         i++;
       }
 
       return HighScores;
    }
 
    public void ClearLeaderBoard ()
    {
       //for(int i=0;i<HighScores.
       List<Scores> HighScores = GetHighScore();
 
       for(int i=1; i<=HighScores.Count; i++)
       {
         PlayerPrefs.DeleteKey("HighScore" + i + "name");
         PlayerPrefs.DeleteKey("HighScore" + i + "score");
         PlayerPrefs.DeleteKey("HighScore" + i + "time");
         PlayerPrefs.DeleteKey("HighScore" + i + "hit");
         PlayerPrefs.DeleteKey("HighScore" + i + "run");
         PlayerPrefs.DeleteKey("HighScore" + i + "duration");
       }
    }
 
    void OnApplicationQuit()
    {
       PlayerPrefs.Save();
    }
}
 
