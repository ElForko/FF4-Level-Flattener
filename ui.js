
function injectUi(outerDiv)
{
	var textDiv = document.createElement("div");
	textDiv.style.height = "50px";
	outerDiv.appendChild(textDiv);

	// File loader
	var loadBut = document.createElement("input");
	loadBut.type = "file";
	loadBut.style.display = "block";
	outerDiv.appendChild(loadBut);
	loadBut.addEventListener("change", function(e)
	{
		// Get file
		var file = e.target.files[0];
		if (!file) return;

		// Get extension; error if not .smc, .sfc, or .zip
		var ext = loadBut.value.split(".").pop();
		if(ext!="smc")
		{
			textDiv.innerHTML = "File must have a .smc extension";
			return;
		}

		// Load file
		var reader = new FileReader();
		reader.onload = function(e)
		{
			// Get smc content, check version, and activate the apply button
			var bin = new Uint8Array(e.target.result);

			var graphics = {}; // derp rename
			graphics.canv1 = canv1;
			graphics.canv2 = canv2;

			modifyBin(bin,graphics);

			genSaveBut(new Blob([bin.buffer]));


		};
		reader.readAsArrayBuffer(file);

	});

	// Save Button
	var saveDiv = document.createElement("div");
	saveDiv.className = "generatorSaveAncDiv";
	outerDiv.appendChild(saveDiv)
	function genSaveBut(blob)
	{
		saveDiv.innerHTML = "";
		var saveAnc = document.createElement("a");
		saveAnc.className = "generatorSaveAnchor";
		saveAnc.innerHTML = "Click here to save";
		saveAnc.download = "file.smc";
		saveAnc.href = URL.createObjectURL(blob);
		saveDiv.appendChild(saveAnc);

	}

	// temp canvases
	//{{{
var canv1 = document.createElement("canvas");
outerDiv.appendChild(canv1);
var canv2 = document.createElement("canvas");
outerDiv.appendChild(canv2);
var ctx1 = canv1.getContext("2d");
var ctx2 = canv2.getContext("2d");

canv1.width = 500;
canv1.height = 500;
canv2.width = 500;
canv2.height = 500;

ctx1.fillStyle = "#000000";
ctx1.fillRect(50, 50, canv1.width-100, canv1.height-100);
ctx2.fillStyle = "#000000";
ctx2.fillRect(50, 50, canv2.width-100, canv2.height-100);

	//}}}

}
