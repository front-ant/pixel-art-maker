$("document").ready(function() {

  const table = $("#pixel_canvas");

  //How to make the Pixel Canvas
  function makeGrid(h, w) {
    table.children().remove(); //clears table

    for (let r = 0; r < h; r++) {
      table.append("<tr>");
      for (let c = 0; c < w; c++) {
        table
          .children()
          .last()
          .append("<td></td>");
      }
    }
  }

  //event listeners for buttons
  //Submit-Button
  $("form").submit(function(event) {
    const pickedHeight = $("#input_height").val();
    const pickedWidth = $("#input_width").val();
    event.preventDefault();
    makeGrid(pickedHeight, pickedWidth);
  });

  //Clear Grid
  $("#clear").on("click", function() {
    $("td").css("background-color", "");
  });

  //Start Over
  $("#reload").click(function() {
    table.children().remove();
  });

  //Event Listeners for painting the canvas

  //color single cell when clicked
  table.on("click", "td", function() {
    const pickedColor = $("#colorPicker").val();
    $(this).css("background-color", pickedColor);
  });
  //remove color from single cell on right-click
  table.on("contextmenu", "td", function(e) {
    e.preventDefault();
    $(this).css("background-color", "");
  });
  //color multiple cells when mouse is clicked and moving
  let clicked = false;
  let rightclicked = false;
  table.on("mousedown", function(e) {
    if (e.which === 1) {
    clicked = true;
    }
    else if (e.which === 3) {
      clicked = false;
      rightclicked = true;
    }
  });
  table.on("mouseup", function() {
    clicked = false;
    rightclicked = false;
  });
  table.on("mouseleave", function() {
    clicked = false;
    rightclicked = false;
  });
  table.on("mousemove", "td", function(e) {
    const pickedColor = $("#colorPicker").val();
    if (clicked){
      $(this).css("background-color", pickedColor);
    }
    else if (rightclicked) {
      $(this).css("background-color", "");
    }
  });
}); //end document ready
