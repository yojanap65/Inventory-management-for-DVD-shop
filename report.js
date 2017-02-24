var proj4_data;
var sumOfSales = 0;
var totalProfit = 0;
var sumQuantity = 0;

	  
$(document).ready(function() {
    proj4_data = new Array();
    $.get('/perl/jadrn040/proj1/report.cgi', storeData);
    
    });    
 
 function storeData(response) {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        var innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;
        }
		
	 var tmpString = "<table>";
	 tmpString += "<tr><td>SKU</td><td>Cost</td><td>Retail</td></tr>" ;
	for(var i=0; i < proj4_data.length-1; i++) {
		
		tmpString += "<tr><td>" + proj4_data[i][0]  + "</td>"; // sku
		tmpString += "<td>" + proj4_data[i][1] + "</td>"; //cost
		tmpString += "<td>" + proj4_data[i][2] + "</td></tr>"; //retail	
    }
	
	tmpString += "</table>"
    var handle = document.getElementById('report');
    handle.innerHTML = tmpString;
}   
    
// from http://www.webmasterworld.com/forum91/3262.htm            
function explodeArray(item,delimiter) {
var tempArray=new Array(1);
var Count=0;
var tempString=new String(item);

while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1
}

tempArray[Count]=tempString;
return tempArray;
} 

 