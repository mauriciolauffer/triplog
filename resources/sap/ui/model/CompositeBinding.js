/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./PropertyBinding','./SimpleType'],function(q,P,S){"use strict";var C=P.extend("sap.ui.model.CompositeBinding",{constructor:function(b,r){P.apply(this,[null,""]);this.aBindings=b;this.bRawValues=r},metadata:{publicMethods:["getBindings","attachChange","detachChange"]}});C.prototype.getPath=function(){return null};C.prototype.getModel=function(){return null};C.prototype.getContext=function(){return null};C.prototype.getType=function(){return null};C.prototype.setContext=function(c){q.each(this.aBindings,function(i,b){if(!c||b.updateRequired(c.getModel())){b.setContext(c)}})};C.prototype.setValue=function(v){throw new sap.ui.base.Exception("Composite Binding does not support setValue because it contains multiple property bindings!")};C.prototype.getValue=function(){var v=[],V;q.each(this.aBindings,function(i,b){V=b.getValue();v.push(V)});return v};C.prototype.getExternalValue=function(){var v=[],V;if(this.bRawValues){v=this.getValue()}else{q.each(this.aBindings,function(i,b){V=b.getExternalValue();v.push(V)})}if(this.fnFormatter){V=this.fnFormatter.apply(this,v)}else{if(v.length>1){V=v.join(" ")}else{V=v[0]}}return V};C.prototype.setExternalValue=function(v){throw new sap.ui.base.Exception("Composite Binding does not support setExternalValue because it contains multiple property bindings!")};C.prototype.getBindings=function(){return this.aBindings};C.prototype.attachChange=function(f,l){this.attachEvent("change",f,l);if(this.aBindings){var t=this;q.each(this.aBindings,function(i,b){b.attachChange(t.checkUpdate,t)})}};C.prototype.detachChange=function(f,l){this.detachEvent("change",f,l);if(this.aBindings){var t=this;q.each(this.aBindings,function(i,b){b.detachChange(t.checkUpdate,t)})}};C.prototype.updateRequired=function(m){var u=false;q.each(this.aBindings,function(i,b){u=u||b.updateRequired(m)});return u};C.prototype.checkUpdate=function(f){var v=this.getExternalValue();if(!q.sap.equal(v,this.oValue)||f){this.oValue=v;this._fireChange({reason:sap.ui.model.ChangeReason.Change})}};return C},true);
