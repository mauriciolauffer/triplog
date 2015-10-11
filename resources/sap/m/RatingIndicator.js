/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/theming/Parameters'],function(q,l,C,I,P){"use strict";var R=C.extend("sap.m.RatingIndicator",{metadata:{library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},maxValue:{type:"int",group:"Behavior",defaultValue:5},value:{type:"float",group:"Behavior",defaultValue:0,bindable:"bindable"},iconSize:{type:"sap.ui.core.CSSSize",group:"Behavior",defaultValue:null},iconSelected:{type:"sap.ui.core.URI",group:"Behavior",defaultValue:null},iconUnselected:{type:"sap.ui.core.URI",group:"Behavior",defaultValue:null},iconHovered:{type:"sap.ui.core.URI",group:"Behavior",defaultValue:null},visualMode:{type:"sap.m.RatingIndicatorVisualMode",group:"Behavior",defaultValue:sap.m.RatingIndicatorVisualMode.Half}},aggregations:{_iconsSelected:{type:"sap.ui.core.Control",multiple:true,singularName:"_iconsSelected",visibility:"hidden"},_iconsUnselected:{type:"sap.ui.core.Control",multiple:true,singularName:"_iconsUnselected",visibility:"hidden"},_iconsHovered:{type:"sap.ui.core.Control",multiple:true,singularName:"_iconsHovered",visibility:"hidden"}},events:{change:{parameters:{value:{type:"int"}}},liveChange:{parameters:{value:{type:"float"}}}}}});R.prototype.init=function(){this.allowTextSelection(false);this._iIconCounter=0;this._fHoverValue=0;if(R._pxCalculations===undefined){R._pxCalculations=[]}};R.prototype.setValue=function(v){v=this.validateProperty("value",v);if(v<0){return this}if(isNaN(v)){q.sap.log.warning('Ignored new rating value "'+v+'" because it is NAN')}else if(this.$().length&&(v>this.getMaxValue())){q.sap.log.warning('Ignored new rating value "'+v+'" because it is out  of range (0-'+this.getMaxValue()+')')}else{v=this._roundValueToVisualMode(v);this.setProperty("value",v,true);this._fHoverValue=v;if(this.$().length){this._updateUI(v)}}return this};R.prototype.setIconSize=function(i){if(this.$().length){this._iPxIconSize=this._toPx(i)||16}this.setProperty("iconSize",i,false);return this};R.prototype.setIconSelected=function(u){if(sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb"){this.setProperty("iconSelected",u,true);return}var o=this.getAggregation("_iconsSelected"),i=0;if(o){for(;i<o.length;i++){o[i].setSrc(u)}}this.setProperty("iconSelected",u,true);return this};R.prototype.onThemeChanged=function(e){this.invalidate()};R.prototype.setIconUnselected=function(u){if(sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb"){this.setProperty("iconUnselected",u,true);return}var o=this.getAggregation("_iconsUnselected"),i=0;if(o){for(;i<o.length;i++){o[i].setSrc(u)}}this.setProperty("iconUnselected",u,true);return this};R.prototype.setIconHovered=function(u){if(sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb"){this.setProperty("iconHovered",u,true);return}var o=this.getAggregation("_iconsHovered"),i=0;if(o){for(;i<o.length;i++){o[i].setSrc(u)}}this.setProperty("iconHovered",u,true);return this};R.prototype.onBeforeRendering=function(){var v=this.getValue(),m=this.getMaxValue();if(v>m){this.setValue(m);q.sap.log.warning("Set value to maxValue because value is > maxValue ("+v+" > "+m+").")}else if(v<0){this.setValue(0);q.sap.log.warning("Set value to 0 because value is < 0 ("+v+" < 0).")}this._iPxIconSize=this._toPx(this.getIconSize())||16;this._iPxPaddingSize=this._toPx(P.get("sapUiRIIconPadding"))||4};R.prototype.exit=function(){delete this._iIconCounter;delete this._fStartValue;delete this._iPxIconSize;delete this._iPxPaddingSize;delete this._fHoverValue};R.prototype._toPx=function(c){c=c||0;var s=R._pxCalculations[c],a;if(s===undefined){if(c){a=q('<div style="display: none; width: '+c+'; margin: 0; padding:0; height: auto; line-height: 1; font-size: 1; border:0; overflow: hidden">&nbsp;</div>').appendTo(sap.ui.getCore().getStaticAreaRef());s=a.width()}else{a=q('<div class="sapMRIIcon">&nbsp;</div>').appendTo(sap.ui.getCore().getStaticAreaRef());s=a.height()}a.remove()}R._pxCalculations[c]=Math.round(s);return R._pxCalculations[c]};R.prototype._updateUI=function(v,h){var s=this.$("sel"),u=this.$("unsel-wrapper"),H=this.$("hov"),i=this._iPxIconSize,f=this._iPxPaddingSize,a="px",S=this.getMaxValue(),b=v*i+(Math.round(v)-1)*f,w=S*(i+f)-f;this._fHoverValue=v;if(b<0){b=0}u.width((w-b)+a);if(h){H.width(b+a);s.hide();H.show()}else{s.width(b+a);H.hide();s.show()}q.sap.log.debug("Updated rating UI with value "+v+" and hover mode "+h)};R.prototype._getIcon=function(s){var i=null,u=null;if(sap.ui.getCore().getConfiguration().getTheme()!=="sap_hcb"){switch(s){case 1:u=this.getIconUnselected()||I.getIconURI("favorite");break;case 2:u=this.getIconHovered()||I.getIconURI("favorite");break;case 0:u=this.getIconSelected()||I.getIconURI("favorite");break}}else{switch(s){case 1:if(this.getEnabled()===false){u=I.getIconURI("favorite")}else{u=I.getIconURI("unfavorite")}break;case 2:u=I.getIconURI("favorite");break;case 0:u=I.getIconURI("favorite");break}}if(u){i=I.createControlByURI({id:this.getId()+"__icon"+this._iIconCounter++,src:u},sap.m.Image);switch(s){case 1:this.addAggregation("_iconsUnselected",i,true);break;case 2:this.addAggregation("_iconsHovered",i,true);break;case 0:this.addAggregation("_iconsSelected",i,true);break}}return i};R.prototype._calculateSelectedValue=function(e){var s=-1.0,p=0.0,c=this.$(),f=(c.innerWidth()-c.width())/2,E,r=sap.ui.getCore().getConfiguration().getRTL();if(e.targetTouches){E=e.targetTouches[0]}else{E=e}if(!E||!E.pageX){E=e;if((!E||!E.pageX)&&e.changedTouches){E=e.changedTouches[0]}}if(!E.pageX){return parseFloat(s)}if(E.pageX<c.offset().left){s=0}else if((E.pageX-c.offset().left)>c.innerWidth()-f){s=this.getMaxValue()}else{p=(E.pageX-c.offset().left-f)/c.width();s=p*this.getMaxValue()}if(r){s=this.getMaxValue()-s}return this._roundValueToVisualMode(s,true)};R.prototype._roundValueToVisualMode=function(v,i){if(i){if(v<0.25){v=0}else if(v<this.getMaxValue()-0.25){v+=0.25}v=Math.round(v)}else{if(this.getVisualMode()===sap.m.RatingIndicatorVisualMode.Full){v=Math.round(v)}else if(this.getVisualMode()===sap.m.RatingIndicatorVisualMode.Half){v=Math.round(v*2)/2}}return parseFloat(v)};R.prototype.ontouchstart=function(e){if(this.getEnabled()){e.setMarked();if(!this._touchEndProxy){this._touchEndProxy=q.proxy(this._ontouchend,this)}if(!this._touchMoveProxy){this._touchMoveProxy=q.proxy(this._ontouchmove,this)}q(document).on("touchend touchcancel mouseup",this._touchEndProxy);q(document).on("touchmove mousemove",this._touchMoveProxy);this._fStartValue=this.getValue();var v=this._calculateSelectedValue(e);if(v>=0&&v<=this.getMaxValue()){this._updateUI(v,true);if(this._fStartValue!==v){this.fireLiveChange({value:v})}}}};R.prototype._ontouchmove=function(e){if(e.isMarked("delayedMouseEvent")){return}e.preventDefault();if(this.getEnabled()){var v=this._calculateSelectedValue(e);if(v>=0&&v<=this.getMaxValue()){this._updateUI(v,true);if(this._fStartValue!==v){this.fireLiveChange({value:v})}}}};R.prototype._ontouchend=function(e){if(e.isMarked("delayedMouseEvent")){return}if(this.getEnabled()){var v=this._calculateSelectedValue(e);this.setProperty("value",v,true);this._updateUI(v,false);if(this._fStartValue!==v){this.fireLiveChange({value:v});this.fireChange({value:v})}q(document).off("touchend touchcancel mouseup",this._touchEndProxy);q(document).off("touchmove mousemove",this._touchMoveProxy);delete this._fStartValue}};R.prototype.ontouchcancel=R.prototype.ontouchend;R.prototype.onsapincrease=function(e){var v=this.getValue(),o=this.getValue(),m=this.getMaxValue();if(!this.getEnabled()){return false}if(this.getVisualMode()===sap.m.RatingIndicatorVisualMode.Full){v+=1}else if(this.getVisualMode()===sap.m.RatingIndicatorVisualMode.Half){v+=0.5}if(v>m){v=m}this.setValue(v);if(v!==o){this.fireLiveChange({value:v});this.fireChange({value:v})}if(e){e.preventDefault();e.stopPropagation()}};R.prototype.onsapdecrease=function(e){var v=this.getValue(),o=this.getValue();if(!this.getEnabled()){return false}if(this.getVisualMode()===sap.m.RatingIndicatorVisualMode.Full){v-=1}else if(this.getVisualMode()===sap.m.RatingIndicatorVisualMode.Half){v-=0.5}if(v<0){v=0}this.setValue(v);if(v!==o){this.fireLiveChange({value:v});this.fireChange({value:v})}if(e){e.preventDefault();e.stopPropagation()}};R.prototype.onsaphome=function(e){var v=0,o=this.getValue();if(!this.getEnabled()){return false}this.setValue(v);if(v!==o){this.fireLiveChange({value:v});this.fireChange({value:v})}if(e){e.preventDefault();e.stopPropagation()}};R.prototype.onsapend=function(e){var v=this.getMaxValue(),o=this.getValue();if(!this.getEnabled()){return false}this.setValue(v);if(v!==o){this.fireLiveChange({value:v});this.fireChange({value:v})}if(e){e.preventDefault();e.stopPropagation()}};R.prototype.onsapselect=function(e){var v=this.getValue(),m=this.getMaxValue(),o=this.getValue();if(!this.getEnabled()){return false}if(v===m){v=0}else if(this.getVisualMode()===sap.m.RatingIndicatorVisualMode.Full){v+=1}else if(this.getVisualMode()===sap.m.RatingIndicatorVisualMode.Half){v+=0.5}if(v>m){v=m}this.setValue(v);if(v!==o){this.fireLiveChange({value:v});this.fireChange({value:v})}if(e){e.preventDefault();e.stopPropagation()}};R.prototype.onkeyup=function(e){var m=this.getMaxValue();if(!this.getEnabled()){return false}if(e.which===q.sap.KeyCodes.DIGIT_0||e.which===q.sap.KeyCodes.NUMPAD_0){this.setValue(0)}if(e.which===q.sap.KeyCodes.DIGIT_1||e.which===q.sap.KeyCodes.NUMPAD_1){this.setValue(1)}if(e.which===q.sap.KeyCodes.DIGIT_2||e.which===q.sap.KeyCodes.NUMPAD_2){this.setValue(Math.min(2,m))}if(e.which===q.sap.KeyCodes.DIGIT_3||e.which===q.sap.KeyCodes.NUMPAD_3){this.setValue(Math.min(3,m))}if(e.which===q.sap.KeyCodes.DIGIT_4||e.which===q.sap.KeyCodes.NUMPAD_4){this.setValue(Math.min(4,m))}if(e.which===q.sap.KeyCodes.DIGIT_5||e.which===q.sap.KeyCodes.NUMPAD_5){this.setValue(Math.min(5,m))}if(e.which===q.sap.KeyCodes.DIGIT_6||e.which===q.sap.KeyCodes.NUMPAD_6){this.setValue(Math.min(6,m))}if(e.which===q.sap.KeyCodes.DIGIT_7||e.which===q.sap.KeyCodes.NUMPAD_7){this.setValue(Math.min(7,m))}if(e.which===q.sap.KeyCodes.DIGIT_8||e.which===q.sap.KeyCodes.NUMPAD_8){this.setValue(Math.min(8,m))}if(e.which===q.sap.KeyCodes.DIGIT_9||e.which===q.sap.KeyCodes.NUMPAD_9){this.setValue(Math.min(9,m))}};return R},true);
