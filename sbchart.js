// cx : x coordinate of the chart
// cy : y coordinate of the chart
// lvlRadius: the thickness of each level of the chart
var SBChart = function(cx, cy, lvlRadius){
	this.cx = cx;
	this.cy = cy;
	this.lvlRadius = lvlRadius;
	this.arcs = [];
	
	this.bind = function (model) {
		this.generateArcs(0, 2*Math.PI, 0, model.children, "root");
	}
	
	// simply a tree traversing for drawing
	this.generateArcs = function(startAngle, spanning, r, children, parentName){
		if (children != null){
			let total = 0;
			for	(let i=0; i < children.length; i++){
				total += children[i].value * 1; 			
			}
		
			let curAngle = startAngle;
			for	(let i = 0; i < children.length; i++){
				children[i].startAngle = curAngle;
				children[i].span = children[i].value * spanning / total; 
				
				let arc = d3.arc() 
					.outerRadius(r + this.lvlRadius - 3) 
					.innerRadius(r + 3) 
					.startAngle(curAngle) 
					.endAngle(curAngle + children[i].span)
					.padAngle(0.05)
					// Use of cornerRadius Function 
					.cornerRadius(0); 
				
				this.arcs.push({"parent":parentName, "name":children[i].name, "item":arc});
				
				this.generateArcs(curAngle, children[i].span, r + this.lvlRadius, children[i].children, children[i].name);
				curAngle += children[i].span;
			}
		}
	}
	this.findSector = function(x,y,r){
		deltax = x - cx;
		deltay = y - cy;
		distance = Math.sqrt(deltax*deltax + deltay*deltay)
		level = Math.floor(distance/r)
			
	}
}