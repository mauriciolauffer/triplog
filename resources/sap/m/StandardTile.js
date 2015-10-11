/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Tile','./library','sap/ui/core/IconPool'],function(q,T,l,I){"use strict";var S=T.extend("sap.m.StandardTile",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},info:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},number:{type:"string",group:"Misc",defaultValue:null},numberUnit:{type:"string",group:"Misc",defaultValue:null},infoState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:sap.ui.core.ValueState.None},type:{type:"sap.m.StandardTileType",group:"Misc",defaultValue:sap.m.StandardTileType.None},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true}}}});S.prototype.exit=function(){if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=null}};S.prototype.getIcon=function(){if(!this.getProperty("icon")&&this.getType()==="Create"){return I.getIconURI("add")}else{return this.getProperty("icon")}};S.prototype._getImage=function(){var i=this.getId()+"-img";var s=sap.ui.Device.system.phone?"1.3rem":"2rem";var p={src:this.getIcon(),height:s,width:s,size:s,densityAware:this.getIconDensityAware()};this._oImageControl=sap.m.ImageHelper.getImageControl(i,this._oImageControl,this,p);return this._oImageControl};return S},true);
