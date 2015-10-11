/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBase','./library'],function(q,L,l){"use strict";var F=L.extend("sap.m.FeedListItem",{metadata:{library:"sap.m",properties:{icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},sender:{type:"string",group:"Data",defaultValue:null},text:{type:"string",group:"Data",defaultValue:null},info:{type:"string",group:"Data",defaultValue:null},timestamp:{type:"string",group:"Data",defaultValue:null},senderActive:{type:"boolean",group:"Behavior",defaultValue:true},iconActive:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",defaultValue:true},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},maxCharacters:{type:"int",group:"Behavior",defaultValue:null}},events:{senderPress:{parameters:{domRef:{type:"string"}}},iconPress:{parameters:{domRef:{type:"string"}}}}}});F._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");F._nMaxCharactersMobile=300;F._nMaxCharactersDesktop=500;F._sTextShowMore=F._oRb.getText("TEXT_SHOW_MORE");F._sTextShowLess=F._oRb.getText("TEXT_SHOW_LESS");F.prototype.exit=function(e){if(this._oLinkControl){this._oLinkControl.destroy()}if(this._oImageControl){this._oImageControl.destroy()}if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.destroy()}L.prototype.exit.apply(this)};F.prototype.ontap=function(e){if((((!this.getIconActive()&&e.srcControl.getId()==this._oImageControl.getId()))||(!this.getSenderActive()&&e.srcControl.getId()==this._oLinkControl.getId()))||((!this._oImageControl||(e.srcControl.getId()!==this._oImageControl.getId()))&&(!this._oLinkControl||(e.srcControl.getId()!==this._oLinkControl.getId()))&&(!this._oLinkExpandCollapse||(e.srcControl.getId()!==this._oLinkExpandCollapse.getId())))){L.prototype.ontap.apply(this,[e])}};F.prototype._getImageControl=function(){var i=this.getIcon()?this.getIcon():sap.ui.core.IconPool.getIconURI("person-placeholder"),I=this.getId()+'-icon',p={src:i,alt:this.getSender(),densityAware:this.getIconDensityAware(),decorative:!this.getIconActive()},c=['sapMFeedListItemImage'];var t=this;this._oImageControl=sap.m.ImageHelper.getImageControl(I,this._oImageControl,this,p,c);if(this.getIconActive()){this._oImageControl.attachPress(function(){var s=this.getDomRef();t.fireIconPress({domRef:s})})}return this._oImageControl};F.prototype._getLinkSender=function(){if(!this._oLinkControl){q.sap.require("sap.m.Link");var t=this;this._oLinkControl=new sap.m.Link({press:function(){var s=this.getDomRef();t.fireSenderPress({domRef:s})}});this._oLinkControl.setParent(this,null,true)}this._oLinkControl.setProperty("text",this.getSender(),true);this._oLinkControl.setProperty("enabled",this.getSenderActive(),true);return this._oLinkControl};F.prototype._activeHandlingInheritor=function(){var a=this.getActiveIcon();if(!!this._oImageControl&&!!a){this._oImageControl.setSrc(a)}};F.prototype._inactiveHandlingInheritor=function(){var s=this.getIcon()?this.getIcon():sap.ui.core.IconPool.getIconURI("person-placeholder");if(!!this._oImageControl){this._oImageControl.setSrc(s)}};F.prototype._getCollapsedText=function(){var s=this._sFullText.substring(0,this._nMaxCollapsedLength);var n=s.lastIndexOf(" ");if(n>0){this._sShortText=s.substr(0,n)}else{this._sShortText=s}return this._sShortText};F.prototype._toggleTextExpanded=function(){var $=q.sap.byId(this.getId()+"-realtext");var a=q.sap.byId(this.getId()+"-threeDots");if(this._bTextExpanded){$.html(q.sap.encodeHTML(this._sShortText).replace(/&#xa;/g,"<br>"));a.text(" ... ");this._oLinkExpandCollapse.setText(F._sTextShowMore);this._bTextExpanded=false}else{$.html(q.sap.encodeHTML(this._sFullText).replace(/&#xa;/g,"<br>"));a.text("  ");this._oLinkExpandCollapse.setText(F._sTextShowLess);this._bTextExpanded=true}};F.prototype._getLinkExpandCollapse=function(){if(!this._oLinkExpandCollapse){q.sap.require("sap.m.Link");this._oLinkExpandCollapse=new sap.m.Link({text:F._sTextShowMore,press:q.proxy(function(){this._toggleTextExpanded()},this)});this._bTextExpanded=false;this._oLinkExpandCollapse.setParent(this,null,true)}return this._oLinkExpandCollapse};F.prototype._checkTextIsExpandable=function(){this._nMaxCollapsedLength=this.getMaxCharacters();if(this._nMaxCollapsedLength===0){if(sap.ui.Device.system.phone){this._nMaxCollapsedLength=F._nMaxCharactersMobile}else{this._nMaxCollapsedLength=F._nMaxCharactersDesktop}}this._sFullText=this.getText();var t=false;if(this._sFullText.length>this._nMaxCollapsedLength){t=true}return t};sap.m.FeedListItem.prototype.setType=function(t){if(t==sap.m.ListType.Navigation){this.setProperty("type",sap.m.ListType.Active)}else{this.setProperty("type",t)}return this};return F},true);
