//prerequisites:
//selected symbol instance with applied overrides everywhere, where they should be randomized
//the new overrides will be selected randomly from the applied ones

//probably works only with not-nested symbols

var onRun = function(context) {
  var sketch = require('sketch');
  const currentPage = sketch.getSelectedDocument().selectedPage.sketchObject;
  var app = [NSApplication sharedApplication];

  var selection = context.selection;

  //if exactly one element is selected and it is a symbol instance...
  if (selection.length == 1){
    if(selection[0].class() == "MSSymbolInstance"){
      var symbolInstance = selection[0]
      var symbolOverrides = symbolInstance.overrides()

      //create a new Override construct and two lists to note existing override options
      var newSymbolOverrides = NSMutableDictionary.dictionaryWithDictionary(symbolOverrides)
      var possibleOverrides = []
      var possibleOverridesKeys = []

      //then loop through all active overrides and save the unique ones
      if(Object.keys(newSymbolOverrides).length > 0){
        for (var key in newSymbolOverrides){
          if (!possibleOverridesKeys.includes(newSymbolOverrides[key]["symbolID"])) {
          possibleOverridesKeys.push(newSymbolOverrides[key]["symbolID"])
          possibleOverrides.push(newSymbolOverrides[key])
          }
        }
        //and eventually save them to the created construct randomized and apply it
        for (var key in newSymbolOverrides){
          random = Math.floor(Math.random() * possibleOverrides.length)
          newSymbolOverrides[key] = possibleOverrides[random]
        }
        symbolInstance.overrides = newSymbolOverrides;
      }
    }
  } else {
    context.document.showMessage("Select ONE symbol instance");
  }
};
