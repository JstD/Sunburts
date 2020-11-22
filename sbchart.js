// cx : x coordinate of the chart
// cy : y coordinate of the chart
// lvlRadius: the thickness of each level of the chart
r0 =3
var SBChart = function(cx, cy, lvlRadius){
	this.cx = cx;
	this.cy = cy;
	this.lvlRadius = lvlRadius;
	this.arcs = [];
	this.level = -1;
	this.bind = function (model) {
		this.generateArcs(0, 2*Math.PI, 0, model.children, "root",0);
	}
	
	// simply a tree traversing for drawing
	this.generateArcs = function(startAngle, spanning, r, children, parentName){
		this.level ++;
		if (children != null){
			let total = 0;
			for	(let i=0; i < children.length; i++){
				total += children[i].value * 1; 			
			}
		
			let curAngle = startAngle;
			for	(let i = 0; i < children.length; i++){
				children[i].startAngle = curAngle;
				children[i].span = children[i].value * spanning / total; 
				endAngle = curAngle + children[i].span
				let arc = d3.arc() 
					.outerRadius(r + this.lvlRadius - r0) 
					.innerRadius(r + r0) 
					.startAngle(curAngle) 
					.endAngle(endAngle)
					.padAngle(0.05)
					// Use of cornerRadius Function 
					.cornerRadius(0); 
				// console.log(curAngle, endAngle,children[i].name)

				this.arcs.push({"parent":parentName, 
								"name":children[i].name, 
								"item":arc,
								"startAngle":curAngle,
								"endAngle":endAngle,
								"level": Math.floor((r+ this.lvlRadius)/(this.lvlRadius))-1,
								"innerRadius": r + r0,
								"outerRadius":r + this.lvlRadius - r0,
								"value": children[i].value
							});
				this.generateArcs(curAngle, children[i].span, r + this.lvlRadius, children[i].children, children[i].name);
				curAngle += children[i].span;
			}
		}
	}
}