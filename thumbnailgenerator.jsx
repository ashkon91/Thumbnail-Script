#target photoshop

var doc = app.activeDocument;
var layer = doc.activeLayer;
var charlay1 = doc.activeLayer;
var charlay2 = doc.activeLayer;
var group = layer.parent.layers;
var count = 1;

function savePNG(player1,player2,char1,char2){
	var pngOptions = new PNGSaveOptions();
	var path = File(count + ".png");
	count++;
	doc.saveAs(path, pngOptions, true, Extension.LOWERCASE);
	alert(path);
}

function switchChar1(char1){
	//if(layer.kind != LayerKind.TEXT)layer.visible = false;
	var layerSetRef = doc.layerSets.getByName("Characters_Left");
	group = layerSetRef.layers;
	for(var i = 0; i < group.length; i++)
	{
		if(group[i].name == char1)
		{
			doc.activeLayer = group[i];
			charlay1 = doc.activeLayer;
			charlay1.visible = true;
		}
	}
}

function switchChar2(char2){
	//if(layer.kind != LayerKind.TEXT)layer.visible = false;
	var layerSetRef = doc.layerSets.getByName("Characters_Right");
	group = layerSetRef.layers;
	for(var i = 0; i < group.length; i++)
	{
		if(group[i].name == char2)
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
var player2 = lineData[2];
var char2 = lineData[3];

//Switch Characters
switchChar1(char1);
switchChar2(char2);

//Change player names
changePlayerName("name1",player1);
changePlayerName("name2",player2);

//Save photo
savePNG(player1,player2,char1,char2);

//Reset the layers
charlay1.visible = false;
charlay2.visible = false;
}


alert("Completed");