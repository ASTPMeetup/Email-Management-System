'use strict'

document.addEventListener("DOMContentLoaded", function() {
  var checkBoxes = document.getElementsByClassName('checkBox');


  for (var i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener('change', function (event) {
      var targetRow = event.target.parentNode.parentNode;
      var rowSelectBox = targetRow.lastChild.firstChild;
      console.log('row ' + targetRow);
      //toggle row view and select box functionality based on check box event
      rowSelectBox.disabled = !rowSelectBox.disabled;
      targetRow.classList.toggle('disabled_row');
    });
  }
});
