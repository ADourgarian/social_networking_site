// will create an item list of played items given the list of possible items and their 'plays' value
function newPlayedList(listOf){
  var played = [];
  for (var i in listOf){
    if (listOf[i].plays === true) {
      played.push(listOf[i].name);
    }
  }
  return played
};
