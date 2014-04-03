#pragma strict

/*
 * Simulates reaction time for AI characters on a 
 * single (changing) floating point variable.
 *
 */
 
import System.Collections.Generic;

class ReactionTimer extends UnityEngine.Object {
	var reactionTime : float;
	var timeStepLength : float;
	
	// number of stored values of that variable from
	// the past
	var timeStepCount : int;
	

	// stores relevant information about the past
	var values : List.<float>;
	var timeStamps : List.<float>;
	
	
	// initValue is the value which will be returned 
	//immediately after creation
	function ReactionTimer(reactionTime : float, timeStepCount : int, initValue : float) {
		this.reactionTime = reactionTime;
		this.timeStepCount = timeStepCount;
		timeStepLength = reactionTime / timeStepCount;
		
		values = new List.<float>();
		values.Add(initValue);
		
		timeStamps = new List.<float>();
		timeStamps.Add(Time.time);
	}
	
	function putValue(currentValue : float) {
		if ((Time.time - timeStamps[values.Count - 1]) > timeStepLength) {
			
			 timeStamps.Add(Time.time);
			 values.Add(currentValue);
		}		
		// optional smoothing implementation for in-between values
		// ...
		// ...
	}
	
	function getValue() : float {
		if ((timeStamps.Count == 0) || (values.Count == 0)){
			Debug.Log("error in ReactionTimer.getValue(): no values recorded.");
			return 0;
		} else if (values.Count == 1) {
			return values[0];
		}
		
		var i : int = 0;		
		while ((i < values.Count) && 
				((Time.time - timeStamps[i]) > reactionTime)) {
			i++;
		}
		if (i == 0) return values[0];
		else {
			for (var j : int = 0; j < i-1; j++) {
				timeStamps.RemoveAt(0);
				values.RemoveAt(0);
			}		 
			
			if (values.Count == 0) Debug.Log("NULL????????????????????????");
			return values[0];
		}
	}
}