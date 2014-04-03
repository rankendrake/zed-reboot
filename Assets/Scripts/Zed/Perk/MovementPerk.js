#pragma strict

class MovementPerk extends Perk {
	private var speedMultiplier : float;
	private var accelerationMultiplier : float;
	
	function MovementPerk(name : String,
			skillPointCost : int, 
			perkIcon : Texture2D,
			speedMultiplier : float,
			accelerationMultiplier : float){
		
		super(name, skillPointCost, perkIcon);
		this.speedMultiplier = speedMultiplier;
		this.accelerationMultiplier = accelerationMultiplier;		
	}
	
	function getSpeedMultiplier() : float {
		return speedMultiplier;
	}	
	
	function getAccelerationMultiplier() : float {
		return accelerationMultiplier;
	}
	
	class Builder {
		private var _name : String;
		private var _skillPointCost : int = 0;
		private var _perkIcon : Texture2D;
		private var _speedMultiplier : float = 1;
		private var _accelerationMultiplier : float = 1;
				
		
		function name(val : String) : Builder {
			this._name = val;
			return this;
		}
		
		function skillPointCost(val : int) : Builder {
			this._skillPointCost = val;
			return this;
		}
		
		function perkIcon(val : Texture2D) {
			this._perkIcon = val;
			return this;
		}
		
		function speedMultiplier(val : float) : Builder {
			this._speedMultiplier = val;
			return this;
		}
		
		function accelerationMultiplier(val : float) : Builder {
			this._accelerationMultiplier = val;
			return this;
		}
		
		function build() : MovementPerk {
			return new MovementPerk(_name, _skillPointCost, _perkIcon, 
					_speedMultiplier, _accelerationMultiplier);
		}
	}
}