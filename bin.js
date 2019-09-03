"use strict";

function modifyBin(bin,graphics)
{

	// bezier stuff
	//{{{

	function bezier(ax,ay,bx,by,cx,cy,x)
	{
		// takes three points and an x value, returns corresponding y

		// midpoint between a and c
		var mx = 2*bx-(cx+ax)/2;
		var my = 2*by-(cy+ay)/2;

		// determine quadratic a,b,c values
		var a = cx+ax-2*mx;
		if(a==0) var t = (x-ax)/(2*mx-2*ax);
		else
		{
			var b = 2*mx-2*ax;
			var c = ax-x;
			var t = (Math.sqrt(b*b-4*a*c)-b)/(2*a);
		}

		// Return y
		return (cy+ay-2*my)*t*t + (2*my-2*ay)*t + ay;

	}

	function calcHP(lev)
	{
		// returns ratio of hp at level "lev" to hp at level 30
		return bezier(10,0.2, 30,1.0, 50,2.5, lev);
	}

	function calcMP(lev)
	{
		// returns ratio of mp at level "lev" to mp at level 30
		return bezier(10,0.3, 30,1.0, 50,1.7, lev);
	}

	function calcStr(lev)
	{
		// returns ratio of str at level "lev" to str at level 30
		return bezier(10,0.5, 30,1.0, 50,1.75, lev);
	}

	function calcStat(lev)
	{
		// returns ratio of stat at level "lev" to stat at level 30
		return bezier(10,0.5, 30,1.0, 50,1.6, lev);
	}

	function calcWap(lev)
	{
		// returns expected weapon attack power (for a melee char) at level "lev"
		return bezier(10,10, 30,70, 53,200, lev);
	}

	function calcAdp(lev)
	{
		// returns expected armor defense power (for a well armored char) at level "lev"
		return bezier(10,10, 34,40, 53,54, lev);
	}

	// TODO note: calcStat kind of highballs low level stats, which'll make lower enemies harder


	//}}}

	// Permanent level that party is at throughout the game
	var partyLevel = 30;

	// Default value for a char's high stat at lvl 30
	var defHighStat = 30; //  i.e. Cecil's vitality, Rydia's Wisdom, Rosa's Int, etc

	// Default stat table
	//{{{
	var baseStatTable = function()
	{
		// Based on char stats at level 30

		var t = [];

		var c = {};
		c.name = "Cecil"; // Dark Knight version; pally Cecil is listed below
		c.hp   = 1263;
		c.mp   = 0;
		c.str  = 29;
		c.agi  = 20;
		c.vit  = 20;
		c.wis  = 12;
		c.wil  =  5;
		t.push(c);

		var c = {};
		c.name = "Kain";
		c.hp   = 1159;
		c.mp   = 0;
		c.str  = 29;
		c.agi  = 23;
		c.vit  = 27;
		c.wis  =  8;
		c.wil  = 20;
		t.push(c);

		var c = {};
		c.name = "Rydia";
		c.hp   = 690;
		c.mp   = 228;
		c.str  = 16;
		c.agi  = 17;
		c.vit  = 15;
		c.wis  = 31;
		c.wil  = 27;
		t.push(c);

		var c = {};
		c.name = "Tellah";
		c.hp   = 1073;
		c.mp   = 90;
		c.str  = 5;
		c.agi  = 11;
		c.vit  = 5;
		c.wis  = 23;
		c.wil  = 23;
		t.push(c);

		var c = {};
		c.name = "Edward";
		c.hp   = 710;
		c.mp   = 0;
		c.str  = 21;
		c.agi  = 22;
		c.vit  = 12;
		c.wis  = 15;
		c.wil  = 15;
		t.push(c);

		var c = {};
		c.name = "Rosa";
		c.hp   = 949;
		c.mp   = 251;
		c.str  = 24;
		c.agi  = 17;
		c.vit  = 18;
		c.wis  = 14;
		c.wil  = 37;
		t.push(c);

		var c = {};
		c.name = "Yang";
		c.hp   = 1787;
		c.mp   = 0;
		c.str  = 36;
		c.agi  = 18;
		c.vit  = 36;
		c.wis  = 5;
		c.wil  = 7;
		t.push(c);

		var c = {};
		c.name = "Palom";
		c.hp   = 703;
		c.mp   = 220;
		c.str  = 20;
		c.agi  = 14;
		c.vit  = 17;
		c.wis  = 33;
		c.wil  = 14;
		t.push(c);

		var c = {};
		c.name = "Porom";
		c.hp   = 637;
		c.mp   = 220;
		c.str  = 15;
		c.agi  = 17;
		c.vit  = 14;
		c.wis  = 14;
		c.wil  = 33;
		t.push(c);

		var c = {};
		c.name = "Pal Cecil";
		c.hp   = 1356;
		c.mp   = 126;
		c.str  = 32;
		c.agi  = 21;
		c.vit  = 30;
		c.wis  = 17;
		c.wil  = 21;
		t.push(c);

		var c = {};
		c.name = "Cid";
		c.hp   = 1587;
		c.mp   = 0;
		c.str  = 33;
		c.agi  = 13;
		c.vit  = 35;
		c.wis  = 5;
		c.wil  = 5;
		t.push(c);

		var c = {};
		c.name = "Edge";
		c.hp   = 1080;
		c.mp   = 80;
		c.str  = 25;
		c.agi  = 27;
		c.vit  = 21;
		c.wis  = 14;
		c.wil  = 13;
		t.push(c);

		var c = {};
		c.name = "FuSoYa";
		c.hp   = 1300;
		c.mp   = 190;
		c.str  = 10;
		c.agi  = 20;
		c.vit  = 10;
		c.wis  = 30;
		c.wil  = 30;
		t.push(c);

		return t;

	}();
	//}}}

	// char/byte conversion
	//{{{

	function byteToChar(b)
	{
		var a = 32; // ascii for "space"

		// upper case
		if(b>=0x42 && b<=0x5b)
		{
			a = b - 0x42 + 65
		}

		// lower case
		if(b>=0x5c && b<=0x75)
		{
			a = b - 0x5c + 97
		}

		return String.fromCharCode(a);

	}

	function charToByte(s)
	{
		var b = 0xff;

		if(     s=="claw")   b=0x29;
		else if(s=="sword")  b=0xd2;
		else if(s.length==1)
		{
			var a = parseInt(s.charCodeAt(0));

			// upper case
			if(a>=65 && a<65+26)
			{
				b = a-65 + 0x42;
			}

			// lower case
			if(a>=97 && a<97+26)
			{
				b = a-97 + 0x5c;
			}

		}

		return b;

	}

	//}}}

	// Hacking docs
	// http://rb.thundaga.com/


	// Enemies
	//{{{
	(function()
	{
		var ec = 0xdf; // enemy count (excludes egg)
		var em = {};   // Exception monster dict (see below)
		var earr = new Array(ec); // Array to store enemy stats that need a table

		// Populate Exception Monster dict
		//{{{

		// Some monsters have no xp, or their xp is way off for their level;
		//  this dictionary stores the index of a monster with comparable xp
		em[168] = 167;  // Baigan's arms -> Baigain
		em[169] = 167;
		em[171] = 195;  // Dark Elf first forms -> Second form
		em[172] = 195;
		em[176] = 177;  // Golbez (vs Tellah in Zot?) -> Valvalis
		em[185] = 187;  // K/Q Eblan -> Rubicant
		em[186] = 187;
		em[199] = 152;  // Zemus/Zeromus forms -> Wyvern
		em[200] = 152;
		em[201] = 152;
		em[216] = 152;
		em[202] = 164;  // Kain at Fabul -> MomBomb
		em[203] = 163;  // Edward (vs Tellah) -> Antlion
		em[204] = 166;  // Yang in Baron -> Milon
		em[205] = 166;  // Cecil at Mt Ordeals -> Milon
		em[206] = 161;  // Rydia at Mist -> Mist Dragon
		em[207] = 161;  // Titan at Mist -> Mist Dragon
		em[208] = 161;  // Floateye in intro -> Mist Dragon
		em[209] = 161;  // Raven in intro -> Mist Dragon
		em[126] = 79;   // Mantcore -> Hugenaga (boss level xp without boss bit)
		em[178] = 23;   // Cal & Brena -> RocLarve (low xp)
		em[182] = 184;  // Dr Lugae first form -> Lugae second form
		em[183] = 184;  // Balnab              -> Lugae second form
		em[212] = 184;  // Balnab Z            -> Lugae second form
		em[194] = 193;  // "Elements" -> other "Elements" (194's xp is high)
		em[197] = 193;  // CPU        -> "Elements"
		em[198] = 193;  // Defender   -> "Elements"
		em[213] = 193;  // Attacker   -> "Elements"
		em[223] = 93;   // Egg -> Lilith
		em[214] = 152;  // Dummy -> Wyvern (so EPL isn't NaN... not sure
		em[215] = 152;  // Dummy -> Wyvern      if/when these dummies are used)

		//}}}

		function getStats(mi)
		//{{{
		{
			// Returns object with monster stats
			// mi: monster index

			var stats = {};

			// Name
			var s = "";
			var mna = 8*mi+0x71a00-512; // Address in monster name table
			for(var i=0;i<8;i++)
			{
				s+= byteToChar(bin[mna+i]);
			}
			stats.name = s;

			// XP 
			var xpa = 2*mi + 0x723c0-512;
			stats.xp = bin[xpa] + 256*bin[xpa+1];

			// Address in monster stat array (msa)
			var msa;
			var pta = 2*mi + 0x728a0-512; // Address in monster pointer table
			msa = bin[pta] + 256*bin[pta+1] + 0x72a60-0xa860-512;

			// Level and Hp
			stats.lev = bin[msa];
			stats.hp = bin[msa+1] + 256*bin[msa+2];

			// Attack
			var ata = 3*bin[msa+3] + 0x72580-512; // Address in attack table
			stats.am = bin[ata+0]; // attack multiplier
			stats.ah = bin[ata+1]; // hit percentage
			stats.ap = bin[ata+2]; // attack power

			// Spell Power
			var extra = bin[msa+9];
			if(extra&0x10) // Spell power byte used
			{
				var os = 10; // offset for location of spell power byte
				if(extra&0x80) os+= 3;
				if(extra&0x40) os+= 3;
				if(extra&0x20) os+= 1;
				stats.sp = bin[msa+os];
			}
			else stats.sp = 0;

			// Defense
			var dta = 3*bin[msa+4] + 0x72580-512; // Defense table address
			stats.dp = bin[dta+2];
			// NOTE: monsters have no evade or defense multiplier (despite entries, not used)

			// Magic Defense
			var mta = 3*bin[msa+5] + 0x72580-512; // Magic defense table address
			stats.md = bin[mta+2]; // magic defense
			// NOTE: monsters have no mag evade or mdef multiplier (despite entries, not used)

			// Speed range
			var sta = 2*bin[msa+6] + 0x72820-512; // Speed table address
			stats.sl = bin[sta+0];
			stats.sh = bin[sta+1];

			return stats;

		}
		//}}}

		function printStats(ob)
		//{{{
		{
			function ls(chars,decimalPlaces,label,stat)
			//{{{
			{
				var s = "";
				s+=label;
				var n = "";
				for(var i=0;i<chars;i++) n+= " ";
				if(decimalPlaces>=0)
				{
					n+= stat.toFixed(decimalPlaces).substr(0,chars);
				}
				else
				{
					n+= stat;
				}
				s+= n.slice(-chars);
				return s;
			}
			//}}}

			var s = "";
			s+= ls(9,2,"HP",ob.hp)+"  ";
			s+= ls(6,0,"xp",ob.xp)+"  ";
			s+= ls(7,2,"Ap",ob.ap)+"  ";
			s+= ls(7,2,"Am",ob.am)+"  ";
			s+= ls(7,2,"Ah",ob.ah)+"  ";
			s+= ls(7,2,"Sp",ob.sp)+"  ";
			s+= ls(7,2,"Dp",ob.dp)+"  ";
			s+= ls(7,2,"Md",ob.md)+"  ";
			s+= ls(7,2,"Sl",ob.sl)+"  ";
			s+= ls(7,2,"Sh",ob.sh);
			return s;
		}
		//}}}

		// Determine new ideal stats
		//{{{
		for(var i=0;i<ec;i++)
		{
			var stats = getStats(i);

			// Enemy stats
			var ehpo; // old max hit points
			var eapo; // old attack power
			var eamo; // old attack multiplier
			var eaho; // old attack hit percentage
			var espo; // old spell power
			var edpo; // old defense
			var emdo; // old magic defense
			var eslo; // old speed (low)
			var esho; // old speed (high)
			var ehpn; // new max hit points
			var eapn; // new attack power
			var eamn; // new attack multiplier
			var eahn; // new attack hit percentage
			var espn; // new spell power
			var edpn; // new defense
			var emdn; // new magic defense
			var esln; // new speed (low)
			var eshn; // new speed (high)

			// Expected party stats
			var papo; // old party attack power (strong attacker, like cecil)
			var papn; // new party attack power
			var pdpo; // old party defense power (strong defender, like cecil)
			var pdpn; // new party defense power
			var phpr; // Ratio of new party hp to expected hp
			var psr;  // Ratio of new party stats to old party stats (non-str)

			// Determine XP (using exception list when necessary)
			var xp;
			if(i in em) xp = getStats(em[i]).xp;
			else        xp = stats.xp;

			// Determine EPL, using modified formula if boss bit on (lvl&0x80)
			var log = Math.log(xp)/Math.log(2);
			var epl;
			if(stats.lev>=128) epl = bezier(9.5,11, 12.2,21, 16,53, log);
			else               epl = bezier(  4,10,   10,23, 15,50, log);

			// Determine enemy stats
			eapo = stats.ap;
			pdpo = calcAdp(epl) + defHighStat*calcStat(epl)/2; // armor def + vit/2
			pdpn = calcAdp(epl) + defHighStat*calcStat(partyLevel)/2;
			eapn = eapo*(pdpn/pdpo);
			if(eapn>255) eapn = 255;

			eamo = stats.am;
			phpr = calcHP(partyLevel)/calcHP(epl);
			eamn = eamo*phpr*(eapo-pdpo)/(eapn-pdpn);
			if(eamn>255) eamn = 255;

			eaho = stats.ah;
			eahn = eaho;

			espo = stats.sp;
			espn = espo*phpr;
			if(espn>255) espn = 255;

			edpo = stats.dp;
			papo = calcWap(epl) + calcStr(epl)*defHighStat/4 + epl/4; // wap + str/4 + lvl/4
			papn = calcWap(epl) + calcStr(partyLevel)*defHighStat/4 + partyLevel/4;
			edpn = edpo*papn/papo;
			if(edpo==255) edpn = 255;
			else if(edpn>254) edpn = 254;

			emdo = stats.md;
			emdn = emdo;

			ehpo = stats.hp;
			psr = calcStat(partyLevel)/calcStat(epl);
			ehpn = ehpo*psr*((papn-edpn)/(papo-edpo));
			if(ehpn>65000) ehpn = 65000;

			eslo = stats.sl;
			esln = eslo*psr;
			if(esln>255) esln = 255;

			esho = stats.sh;
			eshn = esho*psr;
			if(eshn>255) eshn = 255;

			earr[i] = {};
			earr[i].hp = ehpn;
			earr[i].xp = 0;
			earr[i].sp = espn;
			earr[i].ap = eapn;
			earr[i].am = eamn;
			earr[i].ah = eahn;
			earr[i].dp = edpn;
			earr[i].md = emdn;
			earr[i].sl = esln;
			earr[i].sh = eshn;
			earr[i].string = i+" "+stats.name+"   Epl:"+epl+"\n";
			earr[i].string+= printStats(stats)+"\n";
			earr[i].string+= printStats(earr[i])+"\n";

		}
		//}}}

		// Determine values for tables and reassign
		//{{{
		(function()
		{
			// Calculate out how to populate attack/defense/magdef table via k-means clustering

			// prand
			//{{{
			var prand;
			(function()
			{
				// Seedable pseudorandom number generator

				// init
				var state = new Uint32Array(1);
				state[0] = 0xdeadbeef; // Constant seed, so results always the same for vanilla rom
				//state[0] = Math.floor(Math.random()*(1<<30));

				// func definition
				prand = function()
				{
					// xorshift32 algo
					state[0]^= state[0]<<13;
					state[0]^= state[0]>>17;
					state[0]^= state[0]<<5;
					return state[0];
				}

			})();
			//}}}

			var bw = 10;   // weight of boss observations
			var aw = 1;    // weight of attack power in "distance" equation
			var sw = 0.6;  // weight of accuracy,multiplier( 1,1) vector
			var iw = 0.2;  // weight of accuracy,multiplier(-1,1) vector
			var s2 = Math.sqrt(2);

			var obs = [];
			var cls = [];

			function initialize()
			//{{{
			{
				// Populate list of observations
				function addob(a,m,h,lev,justa)
				{
					var ob = {};
					ob.a = Math.log(Math.round(a)+1)/Math.log(256);
					ob.m = Math.log(Math.round(m)+1)/Math.log(256);
					ob.h = Math.log(Math.round(h)+1)/Math.log(100);
					ob.isboss = (lev>=128); // Bosses weigh more
					ob.justa = justa; // Only dimension "a" matters; ignore m/h dimensions
					ob.ci = -1; // cluster index
					obs.push(ob);
				}
				for(var i=0;i<ec;i++)
				{
					// Add 3 observations: one for attack, one for defense, one for magdef
					addob(earr[i].ap, earr[i].am, earr[i].ah, earr[i].lev, false);
					addob(earr[i].dp,          0,          0, earr[i].lev, true);
					addob(earr[i].md,          0,          0, earr[i].lev, true);
				}

				// Initialize clusters
				for(var i=0;i<0xe0;i++)
				{
					var cl = {};
					cl.a = (prand()%32000)/32000;
					cl.m = (prand()%32000)/32000;
					cl.h = (prand()%32000)/32000;
					cls.push(cl)
				}

			}
			//}}}

			function assign()
			//{{{
			{
				// Find the cluster closest to each obervation
				var flipped = false; // true if any observations change to a new cluster
				var nds = 0;         // sum of squared differences

				function getds(o, c)
				//{{{
				{
					// Returns distance between observation and cluster centroid, squared
					// o: observation index
					// c: cluster index

					var da = obs[o].a-cls[c].a; // delta a
					var dm = obs[o].m-cls[c].m; // delta m
					var dh = obs[o].h-cls[c].h; // delta h
					var dts; // distance, squared

					if(obs[o].justa)  dts = aw*aw*da*da;
					else
					{
						var ds = s2*dm+s2*dh;
						var di = s2*dm-s2*dh;
						dts = aw*aw*da*da + sw*sw*ds*ds + iw*iw*di*di;
					}

					if(obs[o].isboss) dts*= bw*bw;

					return dts;
				}
				//}}}

				for(var o=0;o<obs.length;o++)
				{
					var lci = 0;   // index of cluster with lowest squared distance
					var lds = 2.0; // lowest squared distance

					for(var c=0;c<cls.length;c++)
					{
						var ds = getds(o,c);
						if(ds<lds)
						{
							lds = ds;
							lci = c;
							flipped = true;
						}
					}

					obs[o].ci = lci;
					nds+= lds;
				}

				return {"flipped":flipped,"deviation":Math.sqrt(nds)};
			}
			//}}}

			function update()
			//{{{
			{
				// Determine new centroid of each cluster

				var sum = [];    // list of net distances in each direction
				var count = [];  // number of objects in cluster
				var countf = []; // number of objects in cluster with "justa" false
				for(var c=0;c<cls.length;c++)
				{
					sum.push({"a":0,"m":0,"h":0});
					count.push(0);
					countf.push(0);
				}

				// Tally 
				for(var o=0;o<obs.length;o++)
				{
					// TODO have summing do vector weight properly
					var c = obs[o].ci;
					sum[c].a+= obs[o].a;
					count[c]++;
					if(!obs[o].justa)
					{
						sum[c].m+= obs[o].m;
						sum[c].h+= obs[o].h;
						countf[c]++;
					}
					/* TODO
					var c = obs[o].ci;
					var w = (obs[o].isboss)?bw:1;
					sum[c].a+= w*obs[o].a;
					count[c]+= w;
					if(!obs[o].justa)
					{
						sum[c].m+= w*obs[o].m;
						sum[c].h+= w*obs[o].h;
						countf[c]+= w;
					}
					*/
				}

				// Divide tally by members for centroid
				for(var c=0;c<cls.length;c++)
				{
					if(count[c]>0)
					{
						cls[c].a = sum[c].a/count[c];
						if(countf[c]>0)
						{
							cls[c].m = sum[c].m/countf[c];
							cls[c].h = sum[c].h/countf[c];
						}
					}
					else
					{
						// cluster has no members; move to random spot
						var oi = prand()%obs.length;
						cls[c].a = obs[oi].a;
						cls[c].m = obs[oi].m;
						cls[c].h = obs[oi].h;
					}
				}
	
			}
			//}}}

			var cols = []; // TODO for visualize
			function visualize() // TODO delete?
			//{{{
			{
				if(graphics!=undefined)
				{
					var ctx1 = graphics.canv1.getContext("2d");
					var ctx2 = graphics.canv2.getContext("2d");
					ctx1.clearRect(0,0,graphics.canv1.width,graphics.canv1.height);
					ctx1.fillStyle = "#000";
					ctx1.fillRect(50,50,graphics.canv1.width-100,graphics.canv1.height-100);
					ctx2.clearRect(0,0,graphics.canv2.width,graphics.canv2.height);
					ctx2.fillStyle = "#000";
					ctx2.fillRect(50,50,graphics.canv2.width-100,graphics.canv2.height-100);

					// Draw centroids
					for(var c=0;c<cls.length;c++)
					{
						ctx1.strokeStyle = cols[c];
						var rad = 2;
						ctx1.beginPath();
						ctx1.arc(50+cls[c].m*400,500-50-(cls[c].a*400),rad,0,2*Math.PI);
						ctx1.stroke();

						ctx2.strokeStyle = cols[c];
						var rad = 2;
						ctx2.beginPath();
						ctx2.arc(50+cls[c].h*400,500-50-(cls[c].a*400),rad,0,2*Math.PI);
						ctx2.stroke();
					}

					// Draw observations
					for(var i=0;i<obs.length;i++)
					{
						ctx1.fillStyle = cols[obs[i].ci];
						var rad = 2+obs[i].isboss*1;
						ctx1.beginPath();
						ctx1.arc(50+obs[i].m*400,500-50-(obs[i].a*400),rad,0,2*Math.PI);
						ctx1.fill();
					}
					for(var i=0;i<obs.length;i++)
					{
						ctx2.fillStyle = cols[obs[i].ci];
						var rad = 2+obs[i].isboss*1;
						ctx2.beginPath();
						ctx2.arc(50+obs[i].h*400,500-50-(obs[i].a*400),rad,0,2*Math.PI);
						ctx2.fill();
					}
				}
			}
			//}}}

			function kmeans()
			//{{{
			{
				var i = 0; // number of iterations
				initialize();
				while(1)
				{
					var a = assign();
					update();
					if(!a.flipped) break;
					if(i++>100) break;
					//console.log(a.deviation); TODO use deviation to determine stop?
				}

				/*
				// For visualizer TODO
				for(var c=0;c<cls.length;c++)
				{
					cols.push("#"+(prand()%239+17).toString(16)+(prand()%239+17).toString(16)+(prand()%239+17).toString(16)+"20");
				}

				function derp()
				{
					var a = assign();
					update();
					console.log(a.deviation);
					visualize();
					if(a.flipped && i++<100) setTimeout(derp,100);
				}
				derp();
				//*/
			}
			//}}}

			// Perform kmeans
			kmeans();

			// Speed table
			//{{{
			var sobs = [];
			var scls = [];
			(function()
			{
				// forgot about the speed table until after I had the attack/def/mdef table code
				//  written... so this is just a hacky modified copy of all that.  Derp

				var obs = sobs;
				var cls = scls;

				function initialize()
				//{{{
				{
					// Populate list of observations
					function addob(l,h)
					{
						var ob = {};
						ob.l = Math.log(Math.round(l)+1)/Math.log(256);
						ob.h = Math.log(Math.round(h)+1)/Math.log(256);
						ob.ci = -1; // cluster index
						obs.push(ob);
					}
					for(var i=0;i<ec;i++)
					{
						addob(earr[i].sl, earr[i].sh);
					}

					// Initialize clusters
					for(var i=0;i<0x40;i++)
					{
						var cl = {};
						cl.l = (prand()%32000)/32000;
						cl.h = (prand()%32000)/32000;
						cls.push(cl)
					}

				}
				//}}}

				function assign()
				//{{{
				{
					// Find the cluster closest to each obervation
					var flipped = false; // true if any observations change to a new cluster
					var nds = 0;         // sum of squared differences

					function getds(o, c)
					//{{{
					{
						// Returns distance between observation and cluster centroid, squared
						// o: observation index
						// c: cluster index

						var dl = obs[o].l-cls[c].l; // delta l
						var dh = obs[o].h-cls[c].h; // delta h
						var dts; // distance, squared

						dts = dl*dl + dh*dh;

						return dts;
					}
					//}}}

					for(var o=0;o<obs.length;o++)
					{
						var lci = 0;   // index of cluster with lowest squared distance
						var lds = 2.0; // lowest squared distance

						for(var c=0;c<cls.length;c++)
						{
							var ds = getds(o,c);
							if(ds<lds)
							{
								lds = ds;
								lci = c;
								flipped = true;
							}
						}

						obs[o].ci = lci;
						nds+= lds;
					}

					return {"flipped":flipped,"deviation":Math.sqrt(nds)};
				}
				//}}}

				function update()
				//{{{
				{
					// Determine new centroid of each cluster

					var sum = [];    // list of net distances in each direction
					var count = [];  // number of objects in cluster
					for(var c=0;c<cls.length;c++)
					{
						sum.push({"l":0,"h":0});
						count.push(0);
					}

					// Tally 
					for(var o=0;o<obs.length;o++)
					{
						var c = obs[o].ci;
						sum[c].l+= obs[o].l;
						sum[c].h+= obs[o].h;
						count[c]++;
					}

					// Divide tally by members for centroid
					for(var c=0;c<cls.length;c++)
					{
						if(count[c]>0)
						{
							cls[c].l = sum[c].l/count[c];
							cls[c].h = sum[c].h/count[c];
						}
						else
						{
							// cluster has no members; move to random spot
							var oi = prand()%obs.length;
							cls[c].l = obs[oi].l;
							cls[c].h = obs[oi].h;
						}
					}
		
				}
				//}}}

				function kmeans()
				//{{{
				{
					var i = 0; // number of iterations
					initialize();
					while(1)
					{
						var a = assign();
						update();
						if(!a.flipped) break;
						if(i++>100) break;
						//console.log(a.deviation); TODO use deviation to determine stop
					}

				}
				//}}}

				kmeans();

			})();
			//}}}

			// Write new table
			for(var i=0;i<cls.length;i++)
			{
				// New stats (unlogarithmed)
				var nm = Math.round(Math.pow(256,cls[i].m)-1);
				if(nm>255) nm = 255; if(nm<0) nm = 0; if(isNaN(nm)) nm=0;
				var nh = Math.round(Math.pow(100,cls[i].h)-1);
				if(nh>255) nh = 255; if(nh<0) nh = 0; if(isNaN(nh)) nh=0;
				var na = Math.round(Math.pow(256,cls[i].a)-1);
				if(na>255) na = 255; if(na<0) na = 0; if(isNaN(na)) na=0;

				// Assign new stats to table
				var ta = 3*i + 0x72580-512; // table address
				bin[ta+0] = nm;
				bin[ta+1] = nh;
				bin[ta+2] = na;
			}
			for(var i=0;i<scls.length;i++)
			{
				// New stats (unlogarithmed)
				var nl = Math.round(Math.pow(256,scls[i].l)-1);
				if(nl>255) nl = 255; if(nl<0) nl = 0; if(isNaN(nl)) nl=0;
				var nh = Math.round(Math.pow(256,scls[i].h)-1);
				if(nh>255) nh = 255; if(nh<0) nh = 0; if(isNaN(nh)) nh=0;

				// Assign new stats to speed table
				var ta = 2*i + 0x72820-512; // table address
				bin[ta+0] = nl;
				bin[ta+1] = nh;
			}

			// Write monster data
			var d = {};
			for(var i=0;i<ec;i++)
			{
				var pta = 2*i + 0x728a0-512; // address in monster pointer table
				var msa = bin[pta] + 256*bin[pta+1] + 0x72a60-0xa860-512; // monster table address

				// Record table indices
				bin[msa+3] = obs[3*i+0].ci; // Assign attack index
				bin[msa+4] = obs[3*i+1].ci; // Assign defense index
				bin[msa+5] = obs[3*i+2].ci; // Assign magdef index
				bin[msa+6] = sobs[i].ci;

				// Save other stats
				var hp = Math.floor(earr[i].hp);
				bin[msa+1] =  hp&0x00ff;
				bin[msa+2] = (hp&0xff00)>>8;
				var sp = Math.floor(earr[i].sp);
				var extra = bin[msa+9];
				if(extra&0x10) // Spell power byte used
				{
					var os = 10; // offset for location of spell power byte
					if(extra&0x80) os+= 3;
					if(extra&0x40) os+= 3;
					if(extra&0x20) os+= 1;
					bin[msa+os] = sp;
				}
				
				// Zero out xp
				var xpa = 2*i + 0x723c0-512;
				bin[xpa] = 0;
				bin[xpa+1] = 0;


			}

		})();
		//}}}

		// Print log
		//{{{
		(function()
		{
			var log = "";
			for(var i=0;i<ec;i++)
			{
				log+= earr[i].string;
				log+= printStats(getStats(i))+"\n\n";
			}
			console.log("\n"+log);

			// TODO XXX but use me before doing so!!
			//*
			for(var i=0;i<ec;i++)
			{
				var s = getStats(i);
				if(Math.round(earr[i].ap)!=s.ap||Math.round(earr[i].ah)!=s.ah||Math.round(earr[i].am)!=s.am)
				console.log(i+" ap "+earr[i].ap+" "+s.ap+"  ah "+earr[i].ah+" "+s.ah+"  am "+earr[i].am+" "+s.am);

				var dl = Math.round(earr[i].sl)-s.sl;
				var dh = Math.round(earr[i].sh)-s.sh;
				if(dl*dl+dh*dh>10)
				console.log(i.toString(16)+" sl "+earr[i].sl+" "+s.sl+"  sh "+earr[i].sh+" "+s.sh);
			}
			//*/

		})();
		//}}}



	})();
	//}}}

	// Characters
	//{{{

	// Set Stats
	//{{{
	function setStats(bst, lev)
	{
		// bst: base stat table
		// lev: baseline level to adjust game to

		function tohigh(n)
		{
			return (n&0xff00)>>8;
		}


		// Generate modified stat table
		//var st = bst; // TODO
		var st = []
		for(var i=0;i<13;i++)
		{
			var c = {};
			c.name = bst[i].name
			c.hp   = bst[i].hp*calcHP(lev);
			c.mp   = bst[i].mp*calcMP(lev);
			c.str  = bst[i].str*calcStr(lev);
			c.agi  = bst[i].agi*calcStat(lev);
			c.vit  = bst[i].vit*calcStat(lev);
			c.wis  = bst[i].wis*calcStat(lev);
			c.wil  = bst[i].wil*calcStat(lev);
			st.push(c);
		}

		// Change character start data
		for(var i=0;i<13;i++)
		{
			var sa = 0x7ab00-512 + i*32;  // start address
			bin[sa+2]  = lev;              // level
			bin[sa+7]  = (st[i].hp-1)&0xff;  // curhp low byte
			bin[sa+8]  = tohigh(st[i].hp); // curhp high byte
			bin[sa+9]  = st[i].hp&0xff;    // maxhp low byte
			bin[sa+10] = tohigh(st[i].hp); // maxhp high byte
			bin[sa+11] = st[i].mp&0xff;    // curmp low byte
			bin[sa+12] = tohigh(st[i].mp); // curmp high byte
			bin[sa+13] = st[i].mp&0xff;    // maxmp low byte
			bin[sa+14] = tohigh(st[i].mp); // maxmp high byte
			bin[sa+15] = st[i].str;  // strength
			bin[sa+16] = st[i].agi;  // agility
			bin[sa+17] = st[i].vit;  // vitality
			bin[sa+18] = st[i].wis;  // wisdom
			bin[sa+19] = st[i].wil;  // will
			bin[sa+23] = 0;     // xp low byte
			bin[sa+24] = 0;     // xp high byte
			bin[sa+29] = i;     // tnl low byte
			bin[sa+30] = 100;   // tnl mid byte
			bin[sa+31] = 0;     // tnl high byte
		}

	}
	setStats(baseStatTable, 30);
	//}}}

	// log
	//{{{

	/*
	// Print stat chart
	for(var i=0;i<13;i++)
	{
		console.log(baseStatTable[i].name);
		for(var j=10;j<=70;j+=1)
		{
			setStats(baseStatTable,j)
			var sa = 0x7ab00-512 + i*32;
			console.log("lev: "+bin[sa+2]+"  hp: "+(bin[sa+9]+256*bin[sa+10])+"  mp: "+(bin[sa+13]+256*bin[sa+14])+"  str: "+bin[sa+15]+"  agi: "+bin[sa+16]+"  vit: "+bin[sa+17]+"  wis: "+bin[sa+18]+"  wil: "+bin[sa+19]);
		}
		console.log("");
		console.log("");
	}
	//*/

	//}}}


	//}}}


}





