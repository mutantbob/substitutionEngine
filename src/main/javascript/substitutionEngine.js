/*
Copyright 2014
Robert Forsman <github@thoth.purplefrog.com>


*/


function SubstitutionEngine(template)
{
    this.templateContainer = template;
    this.template = template.cloneNode(true);
}


SubstitutionEngine.prototype.getSubstitutionGroups = function(elt)
{
//    console.log(elt)
    var val = elt.getAttribute("substitutionGroup")
    if (val !=null) {
        return [ elt ]
    }

    var rval = []
    var children = elt.children
    for (var i=0; i<children.length; i++) {
        var a = this.getSubstitutionGroups(children[i])
        rval = rval.concat(a)
    }
    return rval
}

SubstitutionEngine.prototype.replaceChildren = function(replacements)
{
    this.replaceChildren2(this.templateContainer, replacements)
}

SubstitutionEngine.prototype.replaceChildren2 = function(container, replacements)
{
    var copy = []
    for (var i=0; i<replacements.length; i++) {
	copy.push(replacements[i]) // because appendChild will remove them from the NodeList
    }
    while (container.childNodes.length>0) {
        container.removeChild(container.childNodes[0])
    }

    for (var i=0; i<copy.length; i++) {
	container.appendChild(copy[i])
    }
    //console.log(container.childNodes.length+" children; should be "+copy.length)
}

SubstitutionEngine.prototype.evalPath = function(data, pathSpec)
{
    if (""==pathSpec)
	return data

    i = pathSpec.indexOf(".")
    if (i<0) {
	return data[pathSpec]
    } else {
	var sub = data[pathSpec.substring(0,i)]
	if (null==sub)
	    return null;
	return this.evalPath(sub, pathSpec.substring(i+1))
    }
}

SubstitutionEngine.prototype.processReplacementsExtra = function(elt, data)
{
    // replace this function with customizations
}

SubstitutionEngine.prototype.processReplacements = function(elt, data)
{
    this.processReplacementsExtra(elt, data)

    if (null == data) {
	// nothing we can do will work
	return
    }
	
    //console.log("processReplacements "+elt)
    var sp = elt.getAttribute("substitutionPath")
    if (sp!=null) {
	//console.log("replacing @substitutionPath of "+sp)
	elt.innerHTML = this.evalPath(data, sp)
	//console.log("with "+elt.innerHTML)
        return
    } 

    var sa = elt.getAttribute("substitutionArrayPath")
    if (sa != null) {
	//console.log("substitution array for "+sa)
	var children = []
	var ar = this.evalPath(data, sa)
	debugVar = [data, sa, ar, elt.cloneNode(true)]
	if (null !=ar) {
	    for (var i=0; i<ar.length; i++) {
		var template = elt.cloneNode(true)
		template.removeAttribute("substitutionArrayPath")
		this.processReplacements(template, ar[i])
		for (var j=0; j<template.childNodes.length; j++) {
		    //console.log(j+" "+template.childNodes[j])
		    children.push(template.childNodes[j])
		}
            }
	    //debugVar = children
	    //console.log("replaced with ["+children.length+"]")
	    this.replaceChildren2(elt, children)
	    //console.log("now has ["+elt.childNodes.length+"] "+elt)
	    for (var i=0; i<elt.childNodes.length; i++) {
		//console.log("["+i+"] = "+elt.childNodes[i])
	    }
	} else {
	    //console.log(sa+" is null")
	}
	return
    }

    //console.log("recursing["+elt.children.length+"]")
    for (var i=0; i<elt.children.length; i++) {
	this.processReplacements(elt.children[i], data)
	//console.log(i+"/"+elt.children.length)
    }
}


SubstitutionEngine.prototype.substituteForData = function(data)
{
    var replacement = this.template.cloneNode(true)
    this.processReplacements(replacement, data)

    //console.log("final result "+replacement.childNodes.length)
	
    this.replaceChildren(replacement.childNodes)
}
