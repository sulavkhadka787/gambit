var names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

var countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    console.log("NAME", name);
    allNames[name]++;
  } else {
    allNames[name] = 1;
  }
  console.log("names=>", allNames);
  return allNames;
}, {});
