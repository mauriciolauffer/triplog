/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./AnalyticalBinding',"./TreeBindingAdapter",'sap/ui/model/odata/ODataModel','./odata4analytics'],function(q,A,T,O,o){"use strict";var a=function(){if(!(this instanceof O&&this.getAnalyticalExtensions===undefined)){return}for(var f in a.prototype){if(a.prototype.hasOwnProperty(f)){this[f]=a.prototype[f]}}if(this.isCountSupported()){q.sap.log.info("ODataModelAdapter: switched ODataModel to use inlinecount (mandatory for analytical bindings)");this.setCountSupported(false)}};a.prototype.bindList=function(p,c,s,f,P){if(P&&P.analyticalInfo){var b=new A(this,p,c,s,f,P);T.apply(b);return b}else{return O.prototype.bindList.apply(this,arguments)}};a.prototype.bindTree=function(p,c,f,P){if(P&&P.analyticalInfo){var b=new A(this,p,c,[],f,P);return b}else{return O.prototype.bindTree.apply(this,arguments)}};a.prototype.getAnalyticalExtensions=function(){if(this.oOData4SAPAnalyticsModel!=undefined&&this.oOData4SAPAnalyticsModel!=null){return this.oOData4SAPAnalyticsModel}var s=null;if(arguments.length==1){var b=arguments[0];var r=q.sap.syncGetText(b);if(r.success){s=r.data}}try{this.oOData4SAPAnalyticsModel=new o.Model(new o.Model.ReferenceByModel(this),{sAnnotationJSONDoc:s})}catch(e){throw"Failed to instantiate analytical extensions for given OData model: "+e.message}return this.oOData4SAPAnalyticsModel};return a},true);
