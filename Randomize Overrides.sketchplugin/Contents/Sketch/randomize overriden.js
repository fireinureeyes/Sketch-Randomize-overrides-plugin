//prerequisites:
//selected symbol instance(s) with applied overrides everywhere, where they should be randomized
//the new overrides will be selected randomly from the applied ones

//does not work with nested symbols

var onRun = function(context) {
  var sketch = require('sketch');
  const currentPage = sketch.getSelectedDocument().selectedPage.sketchObject;
  var app = [NSApplication sharedApplication];

  var selection = context.selection;

  //if at least one one element is selected and it is a symbol instance...
  if (selection.length > 0){

    //create two lists to note existing override options
    var possibleOverrides = []
    var possibleOverridesKeys = []

    for (let i = 0; i < selection.length; i++) {
      if(selection[i].class() == "MSSymbolInstance"){
        var symbolInstance = selection[i]
        var symbolOverrides = symbolInstance.overrides()

        //create a new Override construct used to replace the existing one at the end
        var newSymbolOverrides = NSMutableDictionary.dictionaryWithDictionary(symbolOverrides)

        //loop through all active overrides and save the unique ones
        if(Object.keys(newSymbolOverrides).length > 0){
          for (var key in newSymbolOverrides){
            if (!possibleOverridesKeys.includes(newSymbolOverrides[key]["symbolID"])) {
            possibleOverridesKeys.push(newSymbolOverrides[key]["symbolID"])
            possibleOverrides.push(newSymbolOverrides[key])
            }
          }

          //and save them to the created construct in a randomized way and apply it
          for (var key in newSymbolOverrides){
            random = Math.floor(Math.random() * possibleOverrides.length)
            newSymbolOverrides[key] = possibleOverrides[random]
          }
          symbolInstance.overrides = newSymbolOverrides;
        }
      }
    }
  } else {
    context.document.showMessage("Select one or more symbol instances");
  }
};
