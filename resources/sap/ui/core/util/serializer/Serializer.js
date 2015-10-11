/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider'],function(q,E){"use strict";var S=E.extend("sap.ui.core.util.serializer.Serializer",{constructor:function(r,s,b,w,f){E.apply(this);this._oRootControl=r;this._delegate=s;this._bSkipRoot=!!b;this._oWindow=w||window;this._fnSkipAggregations=f}});S.prototype.serialize=function(){return this._serializeRecursive(this._oRootControl,0)};S.prototype._serializeRecursive=function(c,l,a,b){var C=[];var w=(!this._bSkipRoot||l!==0);if(w){c.getMetadata().getJSONKeys();var s=this._delegate.start(c,a,b);var m=this._delegate.middle(c,a,b);C.push(s+m)}if(l===0||!(this._fnSkipAggregations&&this._fnSkipAggregations(c))){var A=c.getMetadata().getAllAggregations();if(A){for(var n in A){var e=[];var o=A[n];var v=c[o._sGetter]();if(c.getBindingPath(n)&&c.getBindingInfo(n).template){e.push(c.getBindingInfo(n).template)}else if(v&&v.length){for(var i=0;i<v.length;i++){var O=v[i];if(O instanceof this._oWindow.sap.ui.core.Element){e.push(O)}}}else if(v instanceof this._oWindow.sap.ui.core.Element){e.push(v)}if(e.length>0){if(w){C.push(this._delegate.startAggregation(c,n))}var d=this._isDefaultAggregation(c,n);for(var i=0;i<e.length;i++){C.push(this._serializeRecursive(e[i],l+1,n,d))}if(w){C.push(this._delegate.endAggregation(c,n))}}}}}if(w){var f=this._delegate.end(c,a,b);C.push(f)}return C.join("")};S.prototype._isDefaultAggregation=function(c,a){return c.getMetadata().getDefaultAggregationName()===a};return S},true);
