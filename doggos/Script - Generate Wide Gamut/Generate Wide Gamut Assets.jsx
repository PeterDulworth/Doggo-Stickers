﻿#target photoshop// Created for Photoshop CC 2017// Andrew Hock// Generate Wide Gamut Assets v1.3 (Exports PNGs only using Adobe Generator markup. Will embed the color profile and bit depth.)doc = activeDocument;docName = activeDocument.name.split('.')[0];docPath = activeDocument.path;// Output folder name is below. Change [docName + " Assets"]  to name the output folder differently.outFolder = new Folder (docPath +"/"+ docName +" Assets/");if (!outFolder.exists) {    outFolder.create();}function main() {    var pngOpts = new PNGSaveOptions;    pngOpts.embedColorProfile = true;    pngOpts.format = SaveDocumentType.PNG    pngOpts.PNG8 = false;     pngOpts.transparency = true;     pngOpts.interlaced = false;     pngOpts.quality = 100;    scanLayerSets(doc);runMenuItem(app.charIDToTypeID("ActP")) function scanLayerSets(activeDocument) {    for(var a=0;a<activeDocument.layerSets.length;a++) {        var lname = activeDocument.layerSets[a].name;        if (lname.substr(-4) == ".png") {            saveLayer(activeDocument.layers.getByName(lname), lname, outFolder, true);        } else {            scanLayerSets(activeDocument.layerSets[a]);        }    }    for(var j=0; j<activeDocument.artLayers.length; j++) {        var lname = activeDocument.artLayers[j].name;        if (lname.substr(-4) == ".png") {            saveLayer(activeDocument.layers.getByName(lname), lname, outFolder, false);        }    }}function saveLayer(layer, lname, path, shouldMerge) {    activeDocument.activeLayer = layer;    dupLayers();    if (shouldMerge === undefined || shouldMerge === true) {        activeDocument.mergeVisibleLayers();        }    activeDocument.trim(TrimType.TRANSPARENT, true, true, true, true);    var saveFile= File(outFolder +"/"+ lname);    activeDocument.saveAs(saveFile, pngOpts, true, Extension.LOWERCASE);     app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);}function dupLayers() {     var desc143 = new ActionDescriptor();    var ref73 = new ActionReference();    ref73.putClass(charIDToTypeID('Dcmn'));    desc143.putReference(charIDToTypeID('null'), ref73);    desc143.putString(charIDToTypeID('Nm  '), activeDocument.activeLayer.name);    var ref74 = new ActionReference();    ref74.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));    desc143.putReference(charIDToTypeID('Usng'), ref74);    executeAction(charIDToTypeID('Mk  '), desc143, DialogModes.NO);    }} main();