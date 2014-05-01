#pragma strict

/*
*  Weapon Perk class to influence weapon properties.
*/

class WeaponPerk extends Perk {
	private var rateOfFireMultiplier : float;
	private var firePowerMultiplier : float;
	private var scatterMultiplier : float;
	
	function WeaponPerk(name : String,
			skillPointCost : int, 
			perkIcon : Texture2D,
			rateOfFireMultiplier : float,
			firePowerMultiplier : float,
			scatterMultiplier : float){
		
		super(name, skillPointCost, perkIcon);
		this.rateOfFireMultiplier = rateOfFireMultiplier;
		this.firePowerMultiplier = firePowerMultiplier;
		this.scatterMultiplier = scatterMultiplier;
	}
	
	function getRateOfFireMultiplier() : float {
		return rateOfFireMultiplier;
	}
	
	function getFirePowerMultiplier() : float {
		return firePowerMultiplier;
	}	
	
	function getScatterMultiplier() : float {
		return scatterMultiplier;
	}
	
	class Builder {
		private var _name : String;
		private var _skillPointCost : int = 0;
		private var _perkIcon : Texture2D;
		private var _rateOfFireMultiplier : float = 1;
		private var _firePowerMultiplier : float = 1;		
		private var _scatterMultiplier : float = 1;

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
		
		function rateOfFireMultiplier(val : float) : Builder {
			this._rateOfFireMultiplier = val;
			return this;
		}
		
		function firePowerMultiplier(val : float) : Builder {
			this._firePowerMultiplier = val;
			return this;
		}
		
		function scatterMultiplier(val : float) : Builder {
			this._scatterMultiplier = val;
			return this;
		}
		
		function build() : WeaponPerk {
			return new WeaponPerk(_name, _skillPointCost, _perkIcon, 
					_rateOfFireMultiplier, _firePowerMultiplier,
					_scatterMultiplier);
		}
	}
}