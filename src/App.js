import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	
//	const bosses = ["ridley", "mb"];
	const bosses = [{
		"name" : "Ridley",
		"id" : "ridley",
		"img" : "ridley.jpg",
		"hp" : 18000,
		"index" : 0,
	}, {
		"name" : "Mother Brain",
		"id" : "mb",
		"img" : "mb1.jpg",
		"hp" : 3000,
		"index" : 1
	}];
	
	const [boss, setBoss] = useState(bosses[0]);

	const [qs, setQs] = useState([false, false]);
	
	const [verdict, setVerdict] = useState(false);

	const [inventory, setInventory] = useState({
		"ammo" : {
			"m" : 0,
			"s" : 0,
			"pb" : 0
		},
		"beams" : {
			"C" : false,
			"I" : false,
			"S" : false,
			"W" : false,
			"P" : false
			
		}
	});
	
	const [sliders, setSliders] = useState({
		"ammo_charge" : {
			"value" : 0,
			"min" : 0,
			"max" : 0
		},
		"s_m" : {
			"value" : 0,
			"min" : 0,
			"max" : 0
		},
		"pb" : {
			"value" : 0,
			"min" : 0,
			"max" : Number(inventory.ammo.pb)
		},
		"x" : {
			"value" : 0,
			"min" : 0,
			"max" : Number(inventory.ammo.pb)
		}
	});
	
	const [results, setResults] = useState({
		"kill_ammo" : {
			"m" : null,
			"s" : null,
			"pb" : null,
			"x" : null
		},
		"miss_ammo" : {
			"m" : null,
			"s" : null,
			"pb" : null,
			"x" : null
		},
		"need_ammo" : {
			"m" : null,
			"s" : null,
			"pb" : null
		},
		"charged_shots" : null
	});
	
	const handleQs = e => {
		var orig_0 = qs[0];
		var orig_1 = qs[1];
		
		
		if(e.target.value==="0"){
			orig_0 = e.target.checked;
		} else if(e.target.value==="1"){
			orig_1 = e.target.checked;
		}
		setQs([orig_0, orig_1]);
//		console.log(qs);
		var x = sliders.x.value;
		var pb = sliders.pb.value;
		console.log(e.target.id);
		if(!e.target.checked && e.target.id==="q_pbs"){
			pb = 0;
		}
		if(!e.target.checked && e.target.id==="q_x"){
			x = 0;
		}
		setSliders({
			"ammo_charge" : {
				"value" : sliders.ammo_charge.value,
				"min" : sliders.ammo_charge.min,
				"max" : sliders.ammo_charge.max
			},
			"s_m" : {
				"value" : sliders.s_m.value,
				"min" : sliders.s_m.min,
				"max" : sliders.s_m.max
			},
			"pb" : {
				"value" : pb,
				"min" : sliders.pb.min,
				"max" : sliders.pb.max
			},
			"x" : {
				"value" : x,
				"min" : sliders.x.min,
				"max" : sliders.x.max
			}
		});
	};
	
	const resetQs = e => {
		// This whole thing is jank as hell. if we add mroe bosses it will break
		if(boss.id==="ridley"){
			// we will switch to MB
			qs[0] = true;
			qs[1] = false;
		} else if(boss.id==="mb"){
			// we will switch to Ridley
			qs[0] = false;
			qs[1] = false;
		}
//		console.log(qs);
	};
	
	const handleResults = e => {
		var obj = {
			"kill_ammo" : {
				"m" : null,
				"s" : null,
				"pb" : null,
				"x" : null
			},
			"miss_ammo" : {
				"m" : null,
				"s" : null,
				"pb" : null,
				"x" : null
			},
			"need_ammo" : {
				"m" : null,
				"s" : null,
				"pb" : null
			},
			"charged_shots" : null
		};
		setResults(obj);
	};

	const handleBoss = e => {
		resetQs();
		setBoss(bosses[e.target.dataset.index]);
/*
		var allbutts = document.getElementsByClassName("boss_button");
		for(var i=0; i<allbutts.length; i++){
			allbutts[i].classList.remove("active");
		}
		e.target.classList.add("active");	
*/
	};

	const handleVerdict = e => {
		setVerdict(e);
	};
	
	const handleAmmoInput = e => {
		var m = inventory.ammo.m;
		var s = inventory.ammo.s;
		var pb = inventory.ammo.pb;
		const beams = inventory.beams;
		
		if(e.target.id === "m"){
			m = e.target.value;
		} else if(e.target.id === "s"){
			s = e.target.value;
		} else if(e.target.id === "pb"){
			pb = e.target.value;
			setSliders({
				"ammo_charge" : {
					"value" : sliders.ammo_charge.value,
					"min" : sliders.ammo_charge.min,
					"max" : sliders.ammo_charge.max
				},
				"s_m" : {
					"value" : sliders.s_m.value,
					"min" : sliders.s_m.min,
					"max" : sliders.s_m.max
				},
				"pb" : {
					"value" : sliders.pb.value,
					"min" : sliders.pb.min,
					"max" : pb
				},
				"x" : {
					"value" : sliders.x.value,
					"min" : sliders.x.min,
					"max" : pb
				}
			});
		}
		
		const obj = {
			"ammo" : {
				"m" : m,
				"s" : s,
				"pb" : pb
			},
			"beams" : beams
		}
		
		setInventory(obj);
 	};
 	
 	const handleBeamInput = e => {
	 	e.preventDefault();
	 	var C = inventory.beams.C;
	 	var I = inventory.beams.I;
	 	var S = inventory.beams.S;
	 	var W = inventory.beams.W;
	 	var P = inventory.beams.P;
	 	const ammo = inventory.ammo;
	 	
	 	switch(e.target.id){
		 	case "C":
		 		C = !C;
		 		break;
		 	case "I":
		 		I = !I;
		 		break;
		 	case "S":
		 		if(!S && P){
			 		P = false;
		 		}
		 		S = !S;
		 		break;
		 	case "W":
		 		W = !W;
		 		break;
		 	case "P":
		 		if(!P && S){
			 		S = false;
		 		}
		 		P = !P;
		 		break;
		 	default:
		 		break;
	 	}
	 	
	 	const obj = {
			"ammo" : ammo,
			"beams" : {
				"C" : C,
				"I" : I,
				"S" : S,				
				"W" : W,
				"P" : P
			}
		}
		
		setInventory(obj);
 	};

	const handleSliders = e => {
		var obj = {
			"ammo_charge" : {
				"value" : sliders.ammo_charge.value,
				"min" : sliders.ammo_charge.min,
				"max" : sliders.ammo_charge.max
			},
			"s_m" : {
				"value" : sliders.s_m.value,
				"min" : sliders.s_m.min,
				"max" : sliders.s_m.max
			},
			"pb" : {
				"value" : sliders.pb.value,
				"min" : sliders.pb.min,
				"max" : sliders.pb.max
			},
			"x" : {
				"value" : sliders.x.value,
				"min" : sliders.x.min,
				"max" : sliders.x.max
			}
		}
		if(e.target.id == "slider_ammo_charge"){
			obj.ammo_charge.value = e.target.value;
		} else if(e.target.id == "slider_s_m"){
			obj.s_m.value = e.target.value;
		} else if(e.target.id == "slider_pb"){
			obj.pb.value = e.target.value;
			obj.pb.max = inventory.ammo.pb-sliders.x.value;
			obj.x.max = inventory.ammo.pb-e.target.value;
			console.log("ppebn");
		} else if(e.target.id == "slider_x"){
			obj.x.value = e.target.value;
			obj.x.max = inventory.ammo.pb-sliders.pb.value;
			obj.pb.max = inventory.ammo.pb-e.target.value;
		}
		setSliders(obj);
	};
	
/*
	const setMinMax = e => {
		if(e.target.id==="pb"){
			
		}
	}
*/

	return (
		<div className="App">
			<Header verdict={verdict} />
			<PlayerInput inventory={inventory} boss={boss} sliders={sliders} qs={qs} handleVerdict={handleVerdict} handleQs={handleQs} resetQs={resetQs} handleAmmoInput={handleAmmoInput} handleBeamInput={handleBeamInput} handleSliders={handleSliders} />
			<BossFrame verdict={verdict} inventory={inventory} results={results} qs={qs} boss={boss} allbosses={bosses} resetQs={resetQs} sliders={sliders} handleResults={handleResults} handleVerdict={handleVerdict} handleBoss={handleBoss} handleSliders={handleSliders} />
		</div>
  );
}


function Header(props){
	var actives = ["inactive", "active"];
	if(props.verdict){
		actives = ["active","inactive"]
	}
	
	
	return (
		<header className="header">
			<a className="home" href="https://supermetroid.xyz">supermetroid.xyz</a>
			<HeaderWord active={actives[0]} value="Kill" /> or <HeaderWord className={actives[1]} active={actives[1]} value="Be Killed" />
		</header>
	);
}
function HeaderWord(props){
	return (
		<div className={props.active}>
			<span className="text">{props.value}</span>
		</div>
	);
}

function PlayerInput(props){
	var active_class_C = "";
	var active_class_I = "";
	var active_class_S = "";
	var active_class_W = "";
	var active_class_P = "";
	
	var boss_qs, boss_q1, boss_q2 = null;
	
	if(props.boss.id==="ridley"){
		if(props.inventory.ammo.pb>0){
			boss_q1 = (
				<div className="q_pbs">
					<label htmlFor="q_pbs">Use Power Bombs?</label>
					<input type="checkbox" value="0" id="q_pbs" onChange={props.handleQs} />
				</div>
			);
		}
		if(props.inventory.ammo.pb>0 && props.inventory.beams.W && props.inventory.beams.C){
//			console.log("has pbs and wave");
			boss_q2 = (
			<div className="q_x">
				<label htmlFor="q_x">Use X-factors?</label>
				<input type="checkbox" value="1" id="q_x" onChange={props.handleQs} />
			</div>
			);
		}
		boss_qs = (		
			<div className="bossqs">
				{boss_q1}
				{boss_q2}
				<ResultsControls inventory={props.inventory} boss={props.boss} sliders={props.sliders} handleVerdict={props.handleVerdict} handleSliders={props.handleSliders} qs={props.qs} />
			</div>
		);
	} else if(props.boss.id==="mb" && false){
		boss_qs = (
			<div className="bossqs">
				<label htmlFor="q_zeb">Zeb skip?</label>
				<input type="checkbox" value="0" id="q_zeb" onChange={props.handleQs} defaultChecked />
				<label htmlFor="q_refill">Refill missiles?</label>
				<input type="checkbox" value="1" id="q_refill" onChange={props.handleQs} />
				<ResultsControls inventory={props.inventory} boss={props.boss} sliders={props.sliders} handleVerdict={props.handleVerdict} handleSliders={props.handleSliders} qs={props.qs} />
			</div>
		);
	}

	return (
		<form className="playerinput group">
			<div className="input_headline"><h2>Input your BEAMS/AMMO</h2></div>
			<div className="beams">
				<BeamInput inventory={props.inventory} type="Charge" classText="C" handleBeamInput={props.handleBeamInput} />
				<BeamInput inventory={props.inventory} type="Ice" classText="I" handleBeamInput={props.handleBeamInput} />
				<BeamInput inventory={props.inventory} type="Spazer" classText="S" handleBeamInput={props.handleBeamInput} />
				<BeamInput inventory={props.inventory} type="Wave" classText="W" handleBeamInput={props.handleBeamInput} />
				<BeamInput inventory={props.inventory} type="Plasma" classText="P" handleBeamInput={props.handleBeamInput} />
			</div>
			<div className="ammo">
				<AmmoInput type="Missiles" classText="m" handleAmmoInput={props.handleAmmoInput} />
				<AmmoInput type="Supers" classText="s" handleAmmoInput={props.handleAmmoInput} />
				<AmmoInput type="PBs" classText="pb" handleAmmoInput={props.handleAmmoInput} />
			</div>
			{boss_qs}
		</form>
	);
}
function AmmoInput(props){

	return (
		<div className={"ammo_input "+props.classText}>
			<input
				id={props.classText}
				type="number"
				min="0"
				max="500"
				onChange={props.handleAmmoInput}
				value={props.value}
				placeholder="0"
				step="5"
			/>
			<label htmlFor={props.classText}>{props.type}</label>
		</div>
	);
}
function BeamInput(props){
	
	var active_class = "";
	
	if(props.classText === "C" && props.inventory.beams.C){
		active_class = " active";
	}
	if(props.classText === "I" && props.inventory.beams.I){
		active_class = " active";
	}
	if(props.classText === "S" && props.inventory.beams.S){
		active_class = " active";
	}
	if(props.classText === "W" && props.inventory.beams.W){
		active_class = " active";
	}
	if(props.classText === "P" && props.inventory.beams.P){
		active_class = " active";
	}

	return (
		<div className={"beam_input "+props.classText}>
			<button onClick={props.handleBeamInput} className={"beam"+active_class} id={props.classText}>{props.type}</button>
		</div>
	);
}

function BossFrame(props){
	console.log(props);
//	var classname = "";
	var currboss = props.boss.id;
	console.log("FRAME");
	console.log(currboss);
	return (
		<div className="bossframe group">
			<div className="boss_buttons">
			{props.allbosses.map(data => (
				<button key={data.index} name={data.name} className={"boss_button"+((currboss===data.id) ? " active" : "")} id={data.id+"_button"} data-index={data.index} img={data.img} onClick={props.handleBoss}>{data.name}</button>
			))}
			</div>
			{props.allbosses.map(data => (
				<BossPage key={data.index} name={data.name} id={data.id} img={data.img} verdict={props.verdict} inventory={props.inventory} qs={props.qs} results={props.results} boss={props.boss} sliders={props.sliders} handleResults={props.handleResults} handleVerdict={props.handleVerdict} handleSliders={props.handleSliders} />
			))}
		</div>
	);
}

function BossPage(props){
	var hidden_class = "off";
	if(props.id===props.boss.id){
		hidden_class = "";
	}
	var mb = null;
	if(props.boss.id==="mb"){
		mb = (
			<div className="boss_pic_name_hp mb2">
				<img src={"mb2.jpg"} />
				<span className="boss_name">Mother Brain <span className="finalform">(Final Form)</span></span>
				<span className="boss_hp_text">HP: <span className="boss_hp">18000</span></span>
			</div>
		);
	}
	console.log(props.boss);
	
	return (
		<div className={"bosspage"+" "+props.id+" "+hidden_class}>
			<div className={"boss_pic_name_hp "+props.boss.id}>
				<img src={props.img} />
				<span className="boss_name">{props.name}</span>
				<span className="boss_hp_text">HP: <span className="boss_hp">{props.boss.hp}</span></span>
			</div>
			{mb}
			<ResultsContainer verdict={props.verdict} inventory={props.inventory} qs={props.qs} results={props.results} boss={props.boss} sliders={props.sliders} handleResults={props.handleResults} handleVerdict={props.handleVerdict} handleSliders={props.handleSliders} />

		</div>
	);
}
function ResultsControls(props){
	var slider_html = null;
	var slider_ridley, slider_ridley1, slider_ridley2 = null;
	
	if(props.boss.id==="ridley"){
		if(props.qs[0]){
			// PBs
			slider_ridley1 = (
				<ResultsSlider idName="slider_pb" handleSliders={props.handleSliders} min={props.sliders.pb.min} max={props.sliders.pb.max} value={props.sliders.pb.value} label={props.sliders.pb.max} />
			);
		}
		if(props.qs[1]){
			// Xfactors
			slider_ridley2 = (
				<ResultsSlider idName="slider_x" handleSliders={props.handleSliders} min={props.sliders.x.min} max={props.sliders.x.max} value={props.sliders.x.value} label={props.sliders.x.max} />
			);
		}
		slider_ridley = (
			<div className="ridley_sliders">
				{slider_ridley1}
				{slider_ridley2}
			</div>
		);
	}

// 				<ResultsSlider idName="slider_ammo_charge" handleSliders={props.handleSliders} min={props.sliders.ammo_charge.min} max={props.sliders.ammo_charge.max} value={props.sliders.ammo_charge.value} />
// 				<ResultsSlider idName="slider_s_m" label="SUPERS or MISSILES" handleSliders={props.handleSliders} min={props.sliders.s_m.min} max={props.sliders.s_m.max} value={props.sliders.s_m.value} />


	return(
		<div className="resultscontrols">
			{slider_ridley}
		</div>
	);
}
function ResultsSlider(props){
	return(
		<div className={"results_slider "+props.idName}>
			<input id={props.idName} className="slider" type="range" min={props.min} max={props.max} value={props.value} step="1" onChange={props.handleSliders} />
			<label htmlFor={props.idName}>{props.max-props.value}PBs left</label>
		</div>
	);
}

function ResultsHeadline(props){
	if(props.verdict){
		return (
			<h3 className="verdict_headline yes">YOU CAN DO IT</h3>
		);
	} else {
		return (
			<h3 className="verdict_headline no">YOU WILL DIE</h3>
		);
	}
}
function ResultsContainer(props){
	var numC = -1;
	var numC2 = -1;
		// bools
	var usePbs = props.qs[0];
	var useX = props.qs[1];
	var hasCharge = props.inventory.beams.C;
	var hasSpazer = props.inventory.beams.S;
	var hasIce = props.inventory.beams.I;
	var hasWave = props.inventory.beams.W;
	var hasPlasma = props.inventory.beams.P;
	// nums
	var numPbs = Number(props.sliders.pb.value);
	var numM = Number(props.inventory.ammo.m);
	var numS = Number(props.inventory.ammo.s);
	var numX = Number(props.sliders.x.value);
	var allPBs = Number(props.inventory.ammo.pb);
	var hp = Number(props.boss.hp);
	var beam_damage = 0;
	var s_damage = numS*600;
	var m_damage = numM*100;
	var pb_damage = numPbs*400;
	var x_damage = numX*1200;
	
	var mb1 = false;
	var mb2 = false;

	var sKillWith = -1;
	var mKillWith = -1;
	var pbKillWith = -1;
	var xKillWith = -1;
	var cKillWith = -1;
	var sKillWithMB1 = -1;
	var mKillWithMB1 = -1;
	var sKillWithMB2 = -1;
	var mKillWithMB2 = -1;
	var cKillWithMB2 = -1;
	var mGlass = -1;
	var sGlass = -1;
	
	var m_left = 0;
	var s_left = 0;
	var pb_left = 0;
	var x_left = 0;
	var currM = 0;
	var currS = 0;
	var m_left2 = 0;
	var s_left2 = 0;
	
	var numS_MB2 = null;
	var numM_MB2 = null;
	
	var mAfterGlass = -1;
	var sAfterGlass = -1;
	
//	console.log(sKillWithMB1);
	if(hasCharge){
//			console.log("has charge");
		var beam_damage_table = {
			"C": 60,
			"CI": 90,
			"CS": 120,
			"CW": 150,
			"CP": 450,
			"CIS": 180,
			"CIW": 180,
			"CIP": 600,
			"CISW": 300,
			"CIWP": 900,
			"CSW": 210,
			"CWP": 750
		}
		var beam_string = "C";
		if(hasIce){
//				console.log("has ice");
			beam_string += "I";
		}
		if(hasSpazer){
//				console.log("has S");
			beam_string += "S";
		}
		if(hasWave){
//				console.log("has W");
			beam_string += "W";
		}
		if(hasPlasma){
//				console.log("has P");
			beam_string += "P";
		}
		
//			console.log(beam_damage);
		
		beam_damage = beam_damage_table[beam_string];
		numC = Math.ceil((hp/beam_damage));
		numC2 = Math.ceil((18000/beam_damage));
	}

	if(props.boss.id==="ridley"){
//		console.log("ridley");
		var current_hp = hp;
		var calculate_hp = hp;
		calculate_hp -= x_damage;
		if(calculate_hp>0){
			// alive after all X factors
			current_hp -= x_damage;
			xKillWith = numX;
			calculate_hp = current_hp;
			calculate_hp -= pb_damage;
			if(calculate_hp>0){
				// alive after x-factors & pbs
				current_hp -= pb_damage;
				pbKillWith = numPbs;
				calculate_hp = current_hp;
				calculate_hp -= s_damage;
//				console.log(pbKillWith);
				if(calculate_hp>0){
					// alive after x, pb, and supers
					current_hp -= s_damage;
					sKillWith = numS;
					calculate_hp = current_hp;
					calculate_hp -= m_damage;
					if(calculate_hp>0){
						// alive after x, pb, supers, and missiles
						current_hp -= m_damage;
						mKillWith = numM;
						if(beam_damage>0){
							// charge remainder damage
							cKillWith = Math.ceil(current_hp/beam_damage);
							console.log(m_left);
						} else {
							console.log("no results - resultscontainer, ridley");
						}
					} else {
						// after x, pb, s, missiles kill
						mKillWith = Math.ceil((current_hp/100));
						if(mKillWith>0 && numM-mKillWith>0){
							m_left = numM-mKillWith;
						}
						if(sKillWith>0 && numS-sKillWith>0){
							s_left = numS-sKillWith;
						}
						if(numM-mKillWith>0){
							s_left += Math.floor(((numM-mKillWith)/6));
						}

						var pbsUsed = pbKillWith+xKillWith;
						console.log("HEHEHEH");
						console.log(pbsUsed);
						if(pbsUsed<=allPBs){
							if(pbKillWith>0){
								pb_left = allPBs-pbsUsed;
							}
							if(xKillWith>0){
								x_left = (allPBs-pbsUsed)*4;
							}
						}
						
						if (mKillWith===numM && numS>0){
							m_left += Math.floor(((numS-sKillWith)*6));
						}
						if (mKillWith===numM && numPbs>0){
							m_left += Math.floor(((numPbs-pbKillWith)*2));
						}
						if (mKillWith===numM && numX>0){
							m_left += Math.floor(((numX-xKillWith)*4));
						}
						
						
					}
				} else {
					// after x, pb, supers kill
					console.log(current_hp);
					sKillWith = Math.ceil((current_hp/600));
					console.log(sKillWith);
					if(sKillWith===30){
						pbKillWith = 0;
						mKillWith = 0;
					}
					m_left = numM-mKillWith;
					
/*
					console.log("super death");
					console.log(numS);
*/
//					if(sKillWith>0 && numS-sKillWith===0){
// 					console.log("no supers left");
					s_left = numS-sKillWith;
// 					console.log(s_left);
					if (sKillWith===numS && numM>0){
						console.log("have missiles left");
						s_left += Math.floor((numM/6));
					}
					if (sKillWith===numS && numPbs>0){
						s_left += Math.floor(((2*numPbs)/3));
					}
					if (sKillWith===numS && numX>0){
						s_left += Math.floor((numX/2));
					}
//					}  

					var pbsUsed = pbKillWith+xKillWith;
					if(pbsUsed<=allPBs){
						if(pbKillWith>0){
							pb_left = allPBs-pbsUsed;
						}
						if(xKillWith>0){
							x_left = (allPBs-pbsUsed)*4;
						}
					}
				}
			} else {
				// after x, pbs kill
				pbKillWith = Math.ceil((current_hp/400));
				var pbsUsed = pbKillWith+xKillWith;
				if(pbsUsed<=allPBs){
					if(pbKillWith>0){
						pb_left = allPBs-pbsUsed;
					}
					if(xKillWith>0){
						x_left = (allPBs-pbsUsed)*4;
					}
				}
			}
		} else {
			// killed by only xfactors
			xKillWith = Math.ceil((hp/1200));
			x_left = (allPBs-numX)*4;
		}
		console.log(m_left);
		console.log(s_left);
		console.log(pb_left);
		console.log(x_left);
	} else {
//		console.log("mb");

		var hp1 = hp;
		var hp2 = 18000;
		
		// MB1 logic
		currM = numM;
		currS = numS;
		
//				console.log('sKillWithMB1');
//		console.log(currM);

//		console.log(hp1);
		// break the glass, needs 6 of whatever, pref M
		if(currM<6 && currS>=(6-currM)){
			mGlass = currM;
			sGlass = (6-currM);
			currM = 0;
			currS -= sGlass;		
//			console.log("loop1");
//			console.log(mGlass+" "+sGlass);
		} else if(currM>=6) {
			currM -= 6;
			mGlass = 6;
			sGlass = 0;
//			console.log("loop2");
//			console.log(mGlass+" "+sGlass);
		} else {
			console.log("no ammo to break glass");
			mGlass = currM;
			sGlass = currS;
			currM = 0;
			currS = 0;
		}
		
		mAfterGlass = currM;
		sAfterGlass = currS;
		m_left2 = currM;
		s_left2 = currS;
		
		// remaining ammo must be at least 12 hits (after breaking the glass) and at least 3000 damage
		if((currM+currS)>=12 && ((currM*100)+(currS*300))>=3000){
			if(currS>8 && currM>2){
				sKillWithMB1 = 9;
				mKillWithMB1 = 3;
//				console.log(currM+" "+currS);
				currS -= 9;
				currM -= 3;
//				console.log("wjwjwjwj");
//				console.log(mKillWithMB1+" "+sKillWithMB1);
				mb1 = true;
//				console.log("loop1");
			} else if (currS>8 && currM<=2){
//				console.log(currS);
//				console.log(currM);
				mKillWithMB1 = currM;
//				console.log(mKillWithMB1);
				hp1 -= (currM*100);
//				console.log(hp1);
				currM = 0;
				sKillWithMB1 = Math.ceil((hp1/300));
				while(sKillWithMB1+mKillWithMB1<12){
					sKillWithMB1++;
				}
				currS -= sKillWithMB1;
//				console.log(sKillWithMB1);		

				mb1 = true;
//				console.log("loop2");
			} else if (currS<=8 && currM>=(12-currS)){
				sKillWithMB1 = currS;
				hp1 -= (currS*300);
				currS -= sKillWithMB1;
				mKillWithMB1 = Math.ceil((hp1/100));
				currM -= mKillWithMB1;
				mb1 = true;
//				console.log("loop3");
			} else {
				mb1 = false;
				console.log("mb1 damage calc error.")
			}
			numS_MB2 = currS;
			numM_MB2 = currM;
			m_left2 = numM_MB2;
			s_left2 = numS_MB2;
		}
		
		// mb2 logic calculations
		
		if(((currM*100)+(currS*300)>=hp2) || hasCharge){
			mb2 = true;
			
			if((currS*300)>=hp2){
				// only supers
				sKillWithMB2 = (Math.ceil((hp2/300))<=currS) ? Math.ceil((hp2/300)) : -2;
				s_left2 = (currS-sKillWithMB2>=0) ? currS-sKillWithMB2 : 0;
				m_left2 = currM;
			} else {
				var calc_hp = hp2;
				calc_hp -= (currS*300);
				sKillWithMB2 = currS;
				s_left2 = 0;
				if(((currS*300)+(currM*100))>=hp2){
					// only supers and missiles
					mKillWithMB2 = (Math.ceil((calc_hp/100))<=currM) ? Math.ceil((calc_hp/100)) : -2;
					m_left2 = (currM-mKillWithMB2>=0) ? currM-mKillWithMB2 : 0;
				} else {
					// supers, missiles, and charge
					calc_hp -= (currM*100);
					mKillWithMB2 = currM;
					cKillWithMB2 = Math.ceil((calc_hp/beam_damage));
					m_left2 = 0;
				}
			}
		}
		console.log("LEFTS!!!!");
		console.log(s_left2);
		console.log(m_left2);
//	console.log(currM + " " + currS);	
	}
	useEffect(() => {
		if(props.boss.id==="ridley"){
			if(s_damage+m_damage+pb_damage+x_damage>=hp || hasCharge){
				props.handleVerdict(true);
			} else {
				props.handleVerdict(false);
			}
		} else {
			if(mb1 && mb2){
				props.handleVerdict(true);		
			} else {
				props.handleVerdict(false);
			}
		}
	});
	var firepower_obj_r = {
		m: mKillWith,
		s: sKillWith,
		pb: pbKillWith,
		x: xKillWith,
		c: cKillWith,
		glassM: -1,
		glassS: -1
	};
	
	
	
	var firepower_obj_mb1 = {
		m: mKillWithMB1,
		s: sKillWithMB1,
		pb: -1,
		x: -1,
		c: -1,
		glassM: mGlass,
		glassS: sGlass
	};
	
//	console.log(firepower_obj_mb1);
	
	var firepower_obj_mb2 = {
		m: mKillWithMB2,
		s: sKillWithMB2,
		pb: -1,
		x: -1,
		c: cKillWithMB2,
		glassM: -1,
		glassS: -1
	};
	
	var miss_obj = {
		m : m_left,
		s : s_left,
		pb : pb_left,
		x : x_left
	};
	
	var miss_obj2 = {
		m : m_left2,
		s : s_left2,
		pb : 0,
		x : 0
	};
	
	console.log(miss_obj);
	
	var verdict_class = " no";
	if(props.verdict){
		verdict_class = " yes";
	}
	
	if(props.boss.id==="ridley"){
		return (
			<div className={"results_container group"+verdict_class}>
				<ResultsHeadline verdict={props.verdict} />
				<KillWith verdict={props.verdict} boss={props.boss} firepower={firepower_obj_r} />
				<CanMiss hasCharge={hasCharge} beam={beam_damage} verdict={props.verdict} firepower={firepower_obj_r} miss={miss_obj} boss={props.boss} brain={0} />
				<StillNeed inventory={props.inventory} boss={props.boss} verdict={props.verdict} beam={beam_damage} mb1={mb1} mb2={mb2} sliders={props.sliders} currM={currM} currS={currS} glass={[mGlass, sGlass, mAfterGlass, sAfterGlass]} />
				<ChargeShots boss={props.boss} verdict={props.verdict} charge={hasCharge} numC={numC} />
			</div>
		);
	} else if (props.boss.id==="mb"){
		return (
			<div className={"results_container"+verdict_class}>
				<ResultsHeadline verdict={props.verdict} />
				<StillNeed inventory={props.inventory} boss={props.boss} verdict={props.verdict} beam={beam_damage} mb1={mb1} mb2={mb2} sliders={props.sliders} currM={numM_MB2} currS={numS_MB2} glass={[mGlass, sGlass, mAfterGlass, sAfterGlass]} />
				<div className="mb1">
					<KillWith verdict={props.verdict} boss={props.boss} firepower={firepower_obj_mb1} brainid="1" />
					<CanMiss verdict={props.verdict} hasCharge={false} beam={beam_damage} firepower={firepower_obj_mb1} miss={miss_obj2} boss={props.boss} brain={1} />
				</div>
				<div className="mb2">
					<KillWith verdict={props.verdict} boss={props.boss} firepower={firepower_obj_mb2} brainid="2" />
					<CanMiss verdict={props.verdict} hasCharge={hasCharge} beam={beam_damage} firepower={firepower_obj_mb2} miss={miss_obj2} boss={props.boss} brain={2} />
					<ChargeShots boss={props.boss} verdict={props.verdict} charge={hasCharge} numC={numC2} />
				</div>
				
			</div>
		);
	} else {
		return (<div className="omg, look behind you!"></div>);
	}
}

function KillWith(props){
	
	var m,s,pb,x,c = null;

	var m_val = props.firepower.m;
	var s_val = props.firepower.s;
	var pb_val = props.firepower.pb;
	var x_val = props.firepower.x;
	var c_val = props.firepower.c
	
	if(m_val>0){
		m = (
			<p className="killwith_m"><span className="m_value">{m_val}</span> <span className="item m">Missiles</span></p>
		);
	}
	if(s_val>0){
		s = (
			<p className="killwith_s"><span className="s_value">{s_val}</span> <span className="item s">Supers</span></p>
		);
	}
	if(pb_val>0){
		pb = (
			<p className="killwith_pb"><span className="pb_value">{pb_val}</span> <span className="item pb">PBs</span></p>
		);
	}
	if(x_val>0){
		x = (
			<p className="killwith_x"><span className="x_value">{x_val}</span> <span className="item x">X-Factors</span></p>
		);
	}
	if(c_val>0){
		c = (
			<p className="killwith_c"><span className="c_value">{c_val}</span> <span className="item c">Charge Shots</span></p>
		);
	}
	
	var bossname = props.boss.name;
	var glass, glass1, glass2 = null;
//	console.log(props.firepower.glassM);
//	console.log(props.firepower);
	if(props.firepower.glassM>0){
		glass1 = (
			<span className="glass_break_m"><span className="value">{props.firepower.glassM}</span> <span className="item m">Missiles</span></span>
		);
		glass = (
			<div className="glass_break_message">
				<span className="message_text">After breaking the glass with </span>
				{glass1}
				{glass2}
			</div>
		);
	}
	if(props.firepower.glassS>0){
		var yesand = null;
		glass2 = (
			<span className="glass_break_s"><span className="value">{props.firepower.glassS}</span> <span className="item s">Supers</span></span>
		);
		if(props.firepower.glassM>0){
			yesand = " and ";
		}
		glass = (
			<div className="glass_break_message">
				<span className="message_text">After breaking the glass with </span>
				{glass1}
				{yesand}
				{glass2}
			</div>
		);
	}

	if(props.boss.id==="mb"){
		bossname = bossname+" "+props.brainid;
	}
	

	if(props.verdict){
		var bossname = (props.boss.id==="ridley") ? props.boss.name : props.boss.name+" "+props.brainid;
		return(
			<div className="killwith">
				<h3 className="youcankillBoss">You can kill {bossname} with:</h3>
				{m}
				{s}
				{pb}
				{x}
				{c}
				{glass}
			</div>
		);
	}

}
function StillNeed(props){
	var numM = props.inventory.ammo.m;
	var numS = props.inventory.ammo.s;
	var numPbs = props.sliders.pb.value;
	var numX = props.sliders.x.value;
	var beam = props.beam;
	var bossname = props.boss.name;
	var ridley = null;
	var mb = null;
	var mb1  = null;
	var mb2 = null;
	var mbboth = null;
	var mb1Survived = props.mb1;
	var mb2Survived = props.mb2;
	var hp = props.boss.hp;
	
	var mb1leftM = 0;
	var mb1leftS = 0;
	
	var currM = props.currM;
	var currS = props.currS;
//	console.log(numX);
	if(!props.verdict){
		if(props.boss.id==="ridley"){
			var hp_left = hp-((numM*100)+(numS*600)+(numPbs*400)+(numX*1200));
			console.log((numM*100)+(numS*600)+(numPbs*400)+(numX*1200));
			var needM = 0;
			var needS = 0;
			var needPb = 0;
			var needX = 0;
			var m = (
					<p className="stillneed_items stillneed_m"><span className="value">180</span> <span className="item m">Missiles</span><span className="stillneed_or"> OR </span></p>
				);
			var s = (
					<p className="stillneed_items stillneed_s"><span className="value">30</span> <span className="item s">Supers</span><span className="stillneed_or"> OR </span></p>
				);
			var pb = (
					<p className="stillneed_items stillneed_pb"><span className="value">45</span> <span className="item pb">Power Bombs</span><span className="stillneed_or"> OR </span></p>
				);
			var x = (
					<p className="stillneed_items stillneed_x"><span className="value">15</span> <span className="item x">X-Factors</span><span className="stillneed_or"> OR </span></p>
				);
			
			if(numM>0){
				needM = Math.ceil((hp_left/100));
				m = (
					<p className="stillneed_items stillneed_m"><span className="value">{needM}</span> <span className="item m">Missiles</span><span className="stillneed_or"> OR </span></p>
				);
			}
			if(numS>0){
				needS = Math.ceil((hp_left/600));
				s = (
					<p className="stillneed_items stillneed_s"><span className="value">{needS}</span> <span className="item s">Supers</span><span className="stillneed_or"> OR </span></p>
				);
			}
			if(numPbs>0){
				needPb = Math.ceil((hp_left/400));
				pb = (
					<p className="stillneed_items stillneed_pb"><span className="value">{needPb}</span> <span className="item pb">Power Bombs</span><span className="stillneed_or"> OR </span></p>
				);
			}
			if(numX>0){
				needX = Math.ceil((hp_left/1200));
				x = (
					<p className="stillneed_items stillneed_x"><span className="value">{needX}</span> <span className="item x">X-Factors</span><span className="stillneed_or"> OR </span></p>
				);
			}
	
			ridley = (
				<div className="stillneed_ridley">
					<h3>You would still need: </h3>
					{m}
					{s}
					{pb}
					{x}
					<p className="stillneed_items stillneed_c">Charge beam</p>
				</div>
			);
		} else if (props.boss.id==="mb"){
			// need current ammo levels here to do this correctly
			var hp1 = hp;
			var hp2 = 18000;
			
			var glassM = (props.glass[0]<0) ? 0 : props.glass[0];
			var glassS = (props.glass[1]<0) ? 0 : props.glass[1];
			
			var afterGlassM = props.glass[2];
			var afterGlassS = props.glass[3];
			
			var hp_left1 = hp1-((afterGlassM*100)+(afterGlassS*300));
			var hp_left2 = hp2-((currM*100)+(currS*300));
			
			var needM = 0;
			var needS = 0;
			
			var m = null;
			var s = null;
			var g1 = null;
			var g2 = null;
			var needsOr = null;

			var glassText = null;


			if(!mb1Survived){
				
				if(afterGlassM>0){
					needM = Math.ceil((hp_left1/100));
					m = (
						<p className="stillneed_items stillneed_m"><span className="value">{needM}</span> <span className="item m">Missiles</span> </p>
					);
				}
				if(afterGlassS>0){
					needS = Math.ceil((hp_left1/300));
					if(m!==null){
						needsOr = (
							<span className="stillneed_or"> OR </span>
						);
					}
					s = (
						<p className="stillneed_items stillneed_s"><span className="value">{needS}</span> <span className="item s">Supers</span> </p>
					);
				}
				
				if(glassM+glassS<6 || (afterGlassM+afterGlassS)<18){
					if(glassM+glassS<6){
						console.log(6-(glassM+glassS));
						g1 = (
							<div className="glass_ex">
								<p className="glassText">{6-(glassM+glassS)} more <span className="item m">Missiles</span> or <span className="item s">Supers</span> to break a hole in the glass before you can damage Mother Brain.</p>
								<p>PLUS</p>
							</div>
						);
					}
					if((afterGlassM+afterGlassS)<18){
						g2 = (
							<div className="glass_ex">
								<p>You must have a combination of at least <span className="value">18</span> <span className="item m">Missiles</span> and <span className="item s">Supers</span> that deal a minimum of <span className="value">{hp1}</span> damage. </p>
								<p className="shotCountText">In addition to her HP, you must also hit her a minimum of <span className="value">18</span> times before she will die.</p>
								<p><span className="value">6</span> to break a hole in the glass, and <span className="value">12</span> more hits to fully break the glass.</p>
								<p>Hits on the brain itself count as a hit on the glass as well as doing damage.</p>
							</div>
						);
					}
				}
				
				var explan = null;
				if(props.verdict){
					explan = (
						<span className="explanation">MB1 has 3000HP, but you need <span className="value">6</span> <span className="item m">Missiles</span> or <span className="item s">Supers</span> to break through the tank. This does no damage. After that, you have to hit her a minimum of <span className="value">12</span> more times, no matter how much damage each hit does, in order to finish breaking the glass. Any <span className="item m">Missile</span> or <span className="item s">Super</span> that hits the glass and not the brain will deliver <span className="value">0</span> damage, but still count as one of the <span className="value">12</span> hits needed to finish the boss.</span>
					);
				}
				mb1 = (
					<div className="stillneed_mb1">
						<h3>To kill Mother Brain 1, you would still need: </h3>
						{m}
						{needsOr}
						{s}
						{g1}
						{g2}
						{explan}
					</div>
				);
			}
			if(mb1Survived && !mb2Survived){
				
				if(numM>0){
					needM = Math.ceil((hp_left2/100));
					m = (
						<p className="stillneed_items stillneed_m"><span className="value">{needM}</span> <span className="item m">Missiles</span></p>
					);
				}
				if(numS>0){
					needS = Math.ceil((hp_left2/300));	
					s = (
						<p className="stillneed_items stillneed_s"><span className="value">{needS}</span> <span className="item s">Supers</span></p>
					);
				}
				mb2 = (
					<div className="stillneed_mb2">
						<h3>To kill Mother Brain 2, you would still need: </h3>
						{m}
						{s}
						<p>OR <span className="item c">Charge beam</span>.</p>
					</div>
				);
			}

			mb = (
				<div className="stillneed_mb">
					{mb1}
					{mb2}
				</div>
			);

		}
		return(
			<div className="stillneed">
				{ridley}
				{mb}
			</div>
		);
	}
}
function CanMiss(props){
	var m = null;
	var s = null;
	var pb = null;
	var x = null;
	var hasCharge = props.hasCharge;
	var beam = props.beam;
	var miss = null;

	if(!hasCharge){
		// don't have charge
		miss = 	(
			<div className="canmiss none">
				<h3>You can&apost miss any ammo at all.</h3>
			</div>
		);	
		if(props.firepower.m>0){
			m = (
				<p className="miss_m"><span className="value">{props.miss.m}</span> <span className="item m">Missiles</span></p>
			);
		}
		if(props.firepower.s>0){
			s = (
				<p className="miss_s"><span className="value">{props.miss.s}</span> <span className="item s">Supers</span></p>
			);
		}
		if(props.boss.id==="ridley"){
			if(props.firepower.pb>0){
				pb = (
					<p className="miss_pb"><span className="value">{props.miss.pb}</span> <span className="item pb">PB</span> hit</p>
				);
			}
			if(props.firepower.x>0){
				x = (
					<p className="miss_x"><span className="value">{props.miss.x}</span> <span className="item x">X-factor</span> particles</p>
				);
			}
		}

		
		if(m!==null || s!==null || pb!==null || x!==null){
			miss = (
				<div className="canmiss ammo">
					<h3>You can miss:</h3>
					{m}
					{s}
					{pb}
					{x}
				</div>
			);	
		}


	} else {
		// have charge
		console.log("have charge bitch");
		console.log(beam);
		if(beam>0){
			var numShots_m = Math.ceil((100/beam));
			var numShots_sx = Math.ceil((300/beam));
			var numShots_pb = Math.ceil((200/beam));
			
			var perShot_m = Math.floor((beam/100));
			var perShot_sx = Math.floor((beam/300));
			var perShot_pb = Math.floor((beam/100));
			
			var lowM = (
				<p className="miss_m_lowc"><span className="value">{numShots_m}</span> MORE <span className="item c">charge shots</span> per <span className="item m">Missile</span> you missed.</p>
			);
			var lowS = (
				<p className="miss_s_lowc"><span className="value">{numShots_sx}</span> MORE <span className="item c">charge shots</span> per <span className="item s">Super</span> you missed.</p>
			);
			
			var lowPb = null;
			if(props.firepower.x>0){
				lowPb = (
					<p className="miss_pb_lowc"><span className="value">{numShots_pb}</span> MORE <span className="item c">charge shots</span> per <span className="item pb">Power Bomb</span> you missed.</p>
				);
			}
			var lowX = null;
			
			if(props.firepower.x>0){
				lowX = (
					<p className="miss_x_lowc"><span className="value">{numShots_sx}</span> MORE <span className="item c">charge shots</span> per <span className="item x">X-Factor</span> particle you missed.</p>
				);
			}
			
			var highM = (
				<p className="miss_m_lowc"><span className="value">{perShot_m}</span> <span className="item m">Missiles</span></p>
			);
			var highS = (
				<p className="miss_s_lowc"><span className="value">{perShot_sx}</span> <span className="item s">Supers</span></p>
			);
			var highPb = null;
			if(props.firepower.pb>0){
				highPb = (
					<p className="miss_pb_lowc"><span className="value">{perShot_pb}</span> <span className="item pb">Power Bomb</span> hits</p>
				);
			}
			var highX = null;
			if(props.firepower.x>0){
				highX = (
					<p className="miss_x_lowc"><span className="value">{perShot_sx}</span> <span className="item x">X-Factor</span> particles</p>
				);
			}
	
			if(beam<100){
				miss = (
					<div className="canmiss charge">
						<h3>If you miss any ammo, you will need: </h3>
						{lowM}
						{lowS}
						{lowPb}
						{lowX}
					</div>
				);
			} else if (beam<200){
				miss = (
					<div className="canmiss charge">
						<h3>For every extra <span className="item c">charge shot</span>, you can miss: </h3>
						{highM}
						<h3>But if you miss any ammo, you will need: </h3>
						{lowS}
						{lowPb}
						{lowX}
					</div>
				);
			} else if (beam<300){
				miss = (
					<div className="canmiss charge">
						<h3>For every extra charge shot, you can miss: </h3>
						{highM}
						{highPb}
						<h3>But if you miss any ammo, you will need: </h3>
						{lowS}
						{lowX}
					</div>
				);
			} else {
				miss = (
					<div className="canmiss charge">
						<h3>For every extra charge shot, you can miss: </h3>
						{highM}
						{highS}
						{highPb}
						{highX}
					</div>
				);
			}	
		}
	}
	
	if(props.brain===2 && !hasCharge){
		
	} else {
		if(props.verdict){
			return miss;
		}
	}
	

}
function ChargeShots(props){
	var bossname = (props.boss.id==="mb") ? (props.boss.name+" 2") : props.boss.name;
	if(props.verdict && props.charge){
		return(
			<div className="chargeshots">
				<h3>If you only used <span className="item c">Charge Shots</span>:</h3>
				<p className="chargeshots_c">You can kill {bossname} with <span className="c_value">{props.numC}</span> hits</p>
			</div>
		);
	}
}



export default App;
