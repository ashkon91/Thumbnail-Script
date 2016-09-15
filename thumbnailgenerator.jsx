#target photoshop

var doc = app.activeDocument;
var layer = doc.activeLayer;
var charlay1 = doc.activeLayer;
var charlay2 = doc.activeLayer;
var group = layer.parent.layers;
var count = 1;
var name1;
var name2;
function savePNG(player1,player2,char1,char2){
	var pngOptions = new PNGSaveOptions();
	var path = File(count + ".png");
	count++;
	doc.saveAs(path, pngOptions, true, Extension.LOWERCASE);
	name1="GAMERTAG #1";
	name2 = "GAMERTAG #2";
}

function switchChar1(char1, color1){
	//if(layer.kind != LayerKind.TEXT)layer.visible = false;
	var charFolder = doc.layerSets.getByName("Characters_Left");
	var layerSetRef = charFolder.layerSets.getByName(char1);	
	group = layerSetRef.layers;
	for(var i = 0; i < group.length; i++)
	{
		if(group[i].name == color1)
		{
			doc.activeLayer = group[i];
			charlay1 = doc.activeLayer;
			charlay1.visible = true;
		}
	}
}

function switchChar2(char2, color2){
	//if(layer.kind != LayerKind.TEXT)layer.visible = false;
	var charFolder = doc.layerSets.getByName("Characters_Right");
	var layerSetRef = charFolder.layerSets.getByName(char2);
	group = layerSetRef.layers;
	for(var i = 0; i < group.length; i++)
	{
		if(group[i].name == color2)
		{
			doc.activeLayer = group[i];
			charlay2 = doc.activeLayer;
			charlay2.visible = true;
		}
	}
}

function changePlayerName(layerName, newText){
	var layerSetRef = doc.layerSets.getByName("Text");
	var text = layerSetRef.layers.getByName(layerName);
	if(text.kind == LayerKind.TEXT) text.textItem.contents = newText;
	text.visible = true;
	if(layerName == "GAMERTAG #1") 
		name1 = text;
	else 
		name2 = text;
}

//CSV 
var csvFile = File.openDialog("Open Comma-delimited File","comma-delimited(*.csv):*.csv;"); 
csvFile.open('r') ; 
var csvString = csvFile.read(); 
csvFile.close(); 
csvString = csvString.split('\n');

//Parses entire CSV
for(var s = 1;s<csvString.length;s++){
var lineData = csvString[s].split(",");

//Process each line of data.
var player1 = lineData[0];
var char1 = lineData[1];
var color1 = lineData[2];
var player2 = lineData[3];
var char2 = lineData[4];
var color2 = lineData[5];

//Switch Characters
switchChar1(char1,color1);
switchChar2(char2,color2);

//Change player names
changePlayerName("GAMERTAG #1",player1);
changePlayerName("GAMERTAG #2",player2);

//Save photo
savePNG(player1,player2,char1,char2);

//Reset the layers
charlay1.visible = false;
charlay2.visible = false;
}


alert("Completed");