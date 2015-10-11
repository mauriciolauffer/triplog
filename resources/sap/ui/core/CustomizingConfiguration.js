/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Core','./Component'],function(q,C,a){"use strict";var b="sap.ui.viewReplacements",c="sap.ui.viewExtensions",d="sap.ui.viewModifications",e="sap.ui.controllerExtensions";var m={};function f(t,o,h){var s=o&&typeof o==="string"?o:a.getOwnerIdFor(o);if(s){var i=sap.ui.component(s);var j=i&&i.getMetadata().getComponentName();var k=m[j];if(k&&k[t]&&h(k[t])){return false}}else{q.each(m,function(j,k){if(k&&k[t]&&h(k[t])){return false}})}}var g={log:function(){if(window.console){window.console.log(m)}},activateForComponent:function(s){q.sap.log.info("CustomizingConfiguration: activateForComponent('"+s+"')");var F=s+".Component";q.sap.require(F);var o=q.sap.getObject(F).getMetadata().getCustomizing();m[s]=o;q.sap.log.debug("CustomizingConfiguration: customizing configuration for component '"+s+"' loaded: "+JSON.stringify(o))},deactivateForComponent:function(s){q.sap.log.info("CustomizingConfiguration: deactivateForComponent('"+s+"')");delete m[s]},getViewReplacement:function(v,o){var r;f(b,o,function(h){r=h[v];return!!r});return r},getViewExtension:function(v,E,o){var r;f(c,o,function(h){r=h[v]&&h[v][E];return!!r});return r},getControllerExtension:function(s,o){var r;f(e,o,function(h){r=h[s];return!!r});return r},getCustomProperties:function(v,s,o){var S;f(d,o,function(h){var i=h[v]&&h[v][s];var u={};var V=false;if(i){q.each(i,function(n,j){if(n==="visible"){V=true;u[n]=j;q.sap.log.info("Customizing: custom value for property '"+n+"' of control '"+s+"' in View '"+v+"' applied: "+j)}else{q.sap.log.warning("Customizing: custom value for property '"+n+"' of control '"+s+"' in View '"+v+"' ignored: only the 'visible' property can be customized.")}});if(V){S=S||{};q.extend(S,u)}}});return S},hasCustomProperties:function(v,o){var s={};f(d,o,function(h){if(!!h[v]){s=h[v]}});return(!q.isEmptyObject(s))}};if(sap.ui.getCore().getConfiguration().getDisableCustomizing()){q.sap.log.info("CustomizingConfiguration: disabling Customizing now");q.each(g,function(n,A){if(typeof A==="function"){g[n]=function(){}}})}return g},true);
