// JavaScript Document
function addOption (oListbox, text, value)
{
  var oOption = document.createElement("option");
  oOption.appendChild(document.createTextNode(text));
  oOption.setAttribute("value", value);

  oListbox.appendChild(oOption);
}

window.onload = function (){
	var objSel = document.getElementById("csv_select_list");
	var t;
	for (var i = 0; i < csv_list.length; i++){
		t= csv_list[i].name.substr(0, 18)+"json";
		addOption(objSel, t, csv_list[i].id);
	}
}

var conv_csv;	
document.getElementById('csv').onclick = function () {
  		//alert(csv_select_list.options[csv_select_list.selectedIndex].text);
		//conv_csv = "C:\\Users\\Костя\\Homeworks\\4 курс\\Диплом\\Test servers\\csv\\" 
		//+ csv_select_list.options[csv_select_list.selectedIndex].text;
		//var temp = conv_csv.toObjects();
		//var tt = JSON.stringify(temp);
		conv_csv = csv_select_list.options[csv_select_list.selectedIndex].text.substr(0, 18)+"json";
	
//document.getElementById('m').removeChild(document.getElementById('m').getElementsByTagName('div')[document.getElementById('m').getElementsByTagName('div').length-1])	
	
var margin = {top: 40, right: 10, bottom: 10, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.size; });

var div = d3.select("body").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

d3.json(conv_csv, function(error, root) {
  var node = div.datum(root).selectAll(".node")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "node")
      .call(position)
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .text(function(d) { return d.children ? null : d.name; });

  d3.selectAll("input").on("change", function change() {
    var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };

    node
        .data(treemap.value(value).nodes)
      .transition()
        .duration(1500)
        .call(position);
  });
});

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}

}
