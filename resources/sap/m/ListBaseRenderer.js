/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/theming/Parameters'],function(q,P){"use strict";var L={};L.render=function(r,c){r.write("<div");r.addClass("sapMList");r.writeControlData(c);r.writeAttribute("tabindex","-1");if(c.getInset()){r.addClass("sapMListInsetBG")}if(c.getWidth()){r.addStyle("width",c.getWidth())}if(c.getBackgroundDesign){r.addClass("sapMListBG"+c.getBackgroundDesign())}var t=c.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}this.renderContainerAttributes(r,c);r.writeStyles();r.writeClasses();r.write(">");var h=c.getHeaderText();var H=c.getHeaderToolbar();if(H){H.setDesign(sap.m.ToolbarDesign.Transparent,true);H.addStyleClass("sapMListHdrTBar");r.renderControl(H)}else if(h){r.write("<div class='sapMListHdr'>");r.writeEscaped(h);r.write("</div>")}var i=c.getInfoToolbar();if(i){i.setDesign(sap.m.ToolbarDesign.Info,true);i.addStyleClass("sapMListInfoTBar");r.renderControl(i)}this.renderListStartAttributes(r,c);r.addClass("sapMListUl");r.writeAttribute("tabindex","0");r.writeAttribute("id",c.getId("listUl"));r.addClass("sapMListShowSeparators"+c.getShowSeparators());r.addClass("sapMListMode"+c.getMode());c.getInset()&&r.addClass("sapMListInset");r.writeClasses();r.writeStyles();r.write(">");this.renderListHeadAttributes(r,c);var I=c.getItems();var R=c.shouldRenderItems();R&&I.forEach(function(o){c._applySettingsToItem(o,true);r.renderControl(o)});if((!R||!I.length)&&c.getShowNoData()){this.renderNoData(r,c)}this.renderListEndAttributes(r,c);r.write("<div tabindex='0'");r.writeAttribute("id",c.getId("after"));r.write("></div>");if(R&&c._oGrowingDelegate){c._oGrowingDelegate.render(r)}if(c.getFooterText()){r.write("<footer class='sapMListFtr'>");r.writeEscaped(c.getFooterText());r.write("</footer>")}r.write("</div>")};L.renderContainerAttributes=function(r,c){};L.renderListHeadAttributes=function(r,c){};L.renderListStartAttributes=function(r,c){r.write("<ul");c.addNavSection(c.getId("listUl"))};L.renderListEndAttributes=function(r,c){r.write("</ul>")};L.renderNoData=function(r,c){r.write("<li");r.writeAttribute("tabindex","-1");r.writeAttribute("id",c.getId("nodata"));r.addClass("sapMLIB sapMListNoData sapMLIBTypeInactive");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMListNoDataText");r.writeAttribute("id",c.getId("nodata-text"));r.writeClasses();r.write(">");r.writeEscaped(c.getNoDataText(true));r.write("</div>");r.write("</li>")};return L},true);
