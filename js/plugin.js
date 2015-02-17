/** jQuery.scrollTo | Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com 1.4.3.1 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(f,h,$){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=$.fn,c=$.valHooks,k,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){var l=this;l.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind({'focus.placeholder':b,'blur.placeholder':e}).data('placeholder-enabled',true).trigger('blur.placeholder');return l};j.input=a;j.textarea=d;k={get:function(m){var l=$(m);return l.data('placeholder-enabled')&&l.hasClass('placeholder')?'':m.value},set:function(m,n){var l=$(m);if(!l.data('placeholder-enabled')){return m.value=n}if(n==''){m.value=n;if(m!=h.activeElement){e.call(m)}}else{if(l.hasClass('placeholder')){b.call(m,true,n)||(m.value=n)}else{m.value=n}}return l}};a||(c.input=k);d||(c.textarea=k);$(function(){$(h).delegate('form','submit.placeholder',function(){var l=$('.placeholder',this).each(b);setTimeout(function(){l.each(e)},10)})});$(f).bind('beforeunload.placeholder',function(){$('.placeholder').each(function(){this.value=''})})}function g(m){var l={},n=/^jQuery\d+$/;$.each(m.attributes,function(p,o){if(o.specified&&!n.test(o.name)){l[o.name]=o.value}});return l}function b(m,n){var l=this,o=$(l);if(l.value==o.attr('placeholder')&&o.hasClass('placeholder')){if(o.data('placeholder-password')){o=o.hide().next().show().attr('id',o.removeAttr('id').data('placeholder-id'));if(m===true){return o[0].value=n}o.focus()}else{l.value='';o.removeClass('placeholder');l==h.activeElement&&l.select()}}}function e(){var q,l=this,p=$(l),m=p,o=this.id;if(l.value==''){if(l.type=='password'){if(!p.data('placeholder-textinput')){try{q=p.clone().attr({type:'text'})}catch(n){q=$('<input>').attr($.extend(g(this),{type:'text'}))}q.removeAttr('name').data({'placeholder-password':true,'placeholder-id':o}).bind('focus.placeholder',b);p.data({'placeholder-textinput':q,'placeholder-id':o}).before(q)}p=p.removeAttr('id').hide().prev().attr('id',o).show()}p.addClass('placeholder');p[0].value=p.attr('placeholder')}else{p.removeClass('placeholder')}}}(this,document,jQuery));

/** hoverIntent r6 by @Brian Cherne brian(at)cherne(dot)net */
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);

/** jQuery SelectBox - https://github.com/claviska/jquery-selectBox // edit version by tp (support fullscreenmode) */
if(jQuery)(function($){$.extend($.fn,{selectBox:function(method,data){var typeTimer,typeSearch='',isMac=navigator.platform.match(/mac/i);var init=function(select,data){var options;if(navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i))return false;if(select.tagName.toLowerCase()!=='select')return false;select=$(select);if(select.data('selectBox-control'))return false;var control=$('<a class="selectBox" />'),inline=select.attr('multiple')||parseInt(select.attr('size'))>1;var settings=data||{};control.width(select.outerWidth()).addClass(select.attr('class')).attr('title',select.attr('title')||'').attr('tabindex',parseInt(select.attr('tabindex'))).css('display','inline-block').bind('focus.selectBox',function(){if(this!==document.activeElement&&document.body!==document.activeElement)$(document.activeElement).blur();if(control.hasClass('selectBox-active'))return;control.addClass('selectBox-active');select.trigger('focus')}).bind('blur.selectBox',function(){if(!control.hasClass('selectBox-active'))return;control.removeClass('selectBox-active');select.trigger('blur')});if(!$(window).data('selectBox-bindings')){$(window).data('selectBox-bindings',true).bind('scroll.selectBox',hideMenus).bind('resize.selectBox',hideMenus)}if(select.attr('disabled'))control.addClass('selectBox-disabled');select.bind('click.selectBox',function(event){control.focus();event.preventDefault()});if(inline){options=getOptions(select,'inline');control.append(options).data('selectBox-options',options).addClass('selectBox-inline selectBox-menuShowing').bind('keydown.selectBox',function(event){handleKeyDown(select,event)}).bind('keypress.selectBox',function(event){handleKeyPress(select,event)}).bind('mousedown.selectBox',function(event){if($(event.target).is('A.selectBox-inline'))event.preventDefault();if(!control.hasClass('selectBox-focus'))control.focus()}).insertAfter(select);if(!select[0].style.height){var size=select.attr('size')?parseInt(select.attr('size')):5;var tmp=control.clone().removeAttr('id').css({position:'absolute',top:'-9999em'}).show().appendTo('#page');tmp.find('.selectBox-options').html('<li><a>\u00A0</a></li>');var optionHeight=parseInt(tmp.find('.selectBox-options A:first').html('&nbsp;').outerHeight());tmp.remove();control.height(optionHeight*size)}disableSelection(control)}else{var label=$('<span class="selectBox-label" />'),arrow=$('<span class="selectBox-arrow" />');label.attr('class',getLabelClass(select)).text(getLabelText(select));options=getOptions(select,'dropdown');options.appendTo('#page');control.data('selectBox-options',options).addClass('selectBox-dropdown').append(label).append(arrow).bind('mousedown.selectBox',function(event){if(control.hasClass('selectBox-menuShowing')){hideMenus()}else{event.stopPropagation();options.data('selectBox-down-at-x',event.screenX).data('selectBox-down-at-y',event.screenY);showMenu(select)}}).bind('keydown.selectBox',function(event){handleKeyDown(select,event)}).bind('keypress.selectBox',function(event){handleKeyPress(select,event)}).bind('open.selectBox',function(event,triggerData){if(triggerData&&triggerData._selectBox===true)return;showMenu(select)}).bind('close.selectBox',function(event,triggerData){if(triggerData&&triggerData._selectBox===true)return;hideMenus()}).insertAfter(select);var labelWidth=control.width()-arrow.outerWidth()-parseInt(label.css('paddingLeft'))-parseInt(label.css('paddingLeft'));label.width(labelWidth);disableSelection(control)}select.addClass('selectBox').data('selectBox-control',control).data('selectBox-settings',settings).hide()};var getOptions=function(select,type){var options;var _getOptions=function(select,options){select.children('OPTION, OPTGROUP').each(function(){if($(this).is('OPTION')){if($(this).length>0){generateOptions($(this),options)}else{options.append('<li>\u00A0</li>')}}else{var optgroup=$('<li class="selectBox-optgroup" />');optgroup.text($(this).attr('label'));options.append(optgroup);options=_getOptions($(this),options)}});return options};switch(type){case'inline':options=$('<ul class="selectBox-options" />');options=_getOptions(select,options);options.find('A').bind('mouseover.selectBox',function(event){addHover(select,$(this).parent())}).bind('mouseout.selectBox',function(event){removeHover(select,$(this).parent())}).bind('mousedown.selectBox',function(event){event.preventDefault();if(!select.selectBox('control').hasClass('selectBox-active'))select.selectBox('control').focus()}).bind('mouseup.selectBox',function(event){hideMenus();selectOption(select,$(this).parent(),event)});disableSelection(options);return options;case'dropdown':options=$('<ul class="selectBox-dropdown-menu selectBox-options" />');options=_getOptions(select,options);options.data('selectBox-select',select).css('display','none').appendTo('#page').find('A').bind('mousedown.selectBox',function(event){event.preventDefault();if(event.screenX===options.data('selectBox-down-at-x')&&event.screenY===options.data('selectBox-down-at-y')){options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');hideMenus()}}).bind('mouseup.selectBox',function(event){if(event.screenX===options.data('selectBox-down-at-x')&&event.screenY===options.data('selectBox-down-at-y')){return}else{options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y')}selectOption(select,$(this).parent());hideMenus()}).bind('mouseover.selectBox',function(event){addHover(select,$(this).parent())}).bind('mouseout.selectBox',function(event){removeHover(select,$(this).parent())});var classes=select.attr('class')||'';if(classes!==''){classes=classes.split(' ');for(var i in classes)options.addClass(classes[i]+'-selectBox-dropdown-menu')}disableSelection(options);return options}};var getLabelClass=function(select){var selected=$(select).find('OPTION:selected');return('selectBox-label '+(selected.attr('class')||'')).replace(/\s+$/,'')};var getLabelText=function(select){var selected=$(select).find('OPTION:selected');return selected.text()||'\u00A0'};var setLabel=function(select){select=$(select);var control=select.data('selectBox-control');if(!control)return;control.find('.selectBox-label').attr('class',getLabelClass(select)).text(getLabelText(select))};var destroy=function(select){select=$(select);var control=select.data('selectBox-control');if(!control)return;var options=control.data('selectBox-options');options.remove();control.remove();select.removeClass('selectBox').removeData('selectBox-control').data('selectBox-control',null).removeData('selectBox-settings').data('selectBox-settings',null).show()};var refresh=function(select){select=$(select);select.selectBox('options',select.html())};var showMenu=function(select){select=$(select);var control=select.data('selectBox-control'),settings=select.data('selectBox-settings'),options=control.data('selectBox-options');if(control.hasClass('selectBox-disabled'))return false;hideMenus();var borderBottomWidth=isNaN(control.css('borderBottomWidth'))?0:parseInt(control.css('borderBottomWidth'));options.width(control.innerWidth()).css({top:control.offset().top+control.outerHeight()-borderBottomWidth,left:control.offset().left});if(select.triggerHandler('beforeopen'))return false;var dispatchOpenEvent=function(){select.triggerHandler('open',{_selectBox:true})};switch(settings.menuTransition){case'fade':options.fadeIn(settings.menuSpeed,dispatchOpenEvent);break;case'slide':options.slideDown(settings.menuSpeed,dispatchOpenEvent);break;default:options.show(settings.menuSpeed,dispatchOpenEvent);break}if(!settings.menuSpeed)dispatchOpenEvent();var li=options.find('.selectBox-selected:first');keepOptionInView(select,li,true);addHover(select,li);control.addClass('selectBox-menuShowing');$(document).bind('mousedown.selectBox',function(event){if($(event.target).parents().andSelf().hasClass('selectBox-options'))return;hideMenus()})};var hideMenus=function(){if($(".selectBox-dropdown-menu:visible").length===0)return;$(document).unbind('mousedown.selectBox');$(".selectBox-dropdown-menu").each(function(){var options=$(this),select=options.data('selectBox-select'),control=select.data('selectBox-control'),settings=select.data('selectBox-settings');if(select.triggerHandler('beforeclose'))return false;var dispatchCloseEvent=function(){select.triggerHandler('close',{_selectBox:true})};if(settings){switch(settings.menuTransition){case'fade':options.fadeOut(settings.menuSpeed,dispatchCloseEvent);break;case'slide':options.slideUp(settings.menuSpeed,dispatchCloseEvent);break;default:options.hide(settings.menuSpeed,dispatchCloseEvent);break}if(!settings.menuSpeed)dispatchCloseEvent();control.removeClass('selectBox-menuShowing')}else{$(this).hide();$(this).triggerHandler('close',{_selectBox:true});$(this).removeClass('selectBox-menuShowing')}})};var selectOption=function(select,li,event){select=$(select);li=$(li);var control=select.data('selectBox-control'),settings=select.data('selectBox-settings');if(control.hasClass('selectBox-disabled'))return false;if(li.length===0||li.hasClass('selectBox-disabled'))return false;if(select.attr('multiple')){if(event.shiftKey&&control.data('selectBox-last-selected')){li.toggleClass('selectBox-selected');var affectedOptions;if(li.index()>control.data('selectBox-last-selected').index()){affectedOptions=li.siblings().slice(control.data('selectBox-last-selected').index(),li.index())}else{affectedOptions=li.siblings().slice(li.index(),control.data('selectBox-last-selected').index())}affectedOptions=affectedOptions.not('.selectBox-optgroup, .selectBox-disabled');if(li.hasClass('selectBox-selected')){affectedOptions.addClass('selectBox-selected')}else{affectedOptions.removeClass('selectBox-selected')}}else if((isMac&&event.metaKey)||(!isMac&&event.ctrlKey)){li.toggleClass('selectBox-selected')}else{li.siblings().removeClass('selectBox-selected');li.addClass('selectBox-selected')}}else{li.siblings().removeClass('selectBox-selected');li.addClass('selectBox-selected')}if(control.hasClass('selectBox-dropdown')){control.find('.selectBox-label').text(li.text())}var i=0,selection=[];if(select.attr('multiple')){control.find('.selectBox-selected A').each(function(){selection[i++]=$(this).attr('rel')})}else{selection=li.find('A').attr('rel')}control.data('selectBox-last-selected',li);if(select.val()!==selection){select.val(selection);setLabel(select);select.trigger('change')}return true};var addHover=function(select,li){select=$(select);li=$(li);var control=select.data('selectBox-control'),options=control.data('selectBox-options');options.find('.selectBox-hover').removeClass('selectBox-hover');li.addClass('selectBox-hover')};var removeHover=function(select,li){select=$(select);li=$(li);var control=select.data('selectBox-control'),options=control.data('selectBox-options');options.find('.selectBox-hover').removeClass('selectBox-hover')};var keepOptionInView=function(select,li,center){if(!li||li.length===0)return;select=$(select);var control=select.data('selectBox-control'),options=control.data('selectBox-options'),scrollBox=control.hasClass('selectBox-dropdown')?options:options.parent(),top=parseInt(li.offset().top-scrollBox.position().top),bottom=parseInt(top+li.outerHeight());if(center){scrollBox.scrollTop(li.offset().top-scrollBox.offset().top+scrollBox.scrollTop()-(scrollBox.height()/2))}else{if(top<0){scrollBox.scrollTop(li.offset().top-scrollBox.offset().top+scrollBox.scrollTop())}if(bottom>scrollBox.height()){scrollBox.scrollTop((li.offset().top+li.outerHeight())-scrollBox.offset().top+scrollBox.scrollTop()-scrollBox.height())}}};var handleKeyDown=function(select,event){select=$(select);var control=select.data('selectBox-control'),options=control.data('selectBox-options'),settings=select.data('selectBox-settings'),totalOptions=0,i=0;if(control.hasClass('selectBox-disabled'))return;switch(event.keyCode){case 8:event.preventDefault();typeSearch='';break;case 9:case 27:hideMenus();removeHover(select);break;case 13:if(control.hasClass('selectBox-menuShowing')){selectOption(select,options.find('LI.selectBox-hover:first'),event);if(control.hasClass('selectBox-dropdown'))hideMenus()}else{showMenu(select)}break;case 38:case 37:event.preventDefault();if(control.hasClass('selectBox-menuShowing')){var prev=options.find('.selectBox-hover').prev('LI');totalOptions=options.find('LI:not(.selectBox-optgroup)').length;i=0;while(prev.length===0||prev.hasClass('selectBox-disabled')||prev.hasClass('selectBox-optgroup')){prev=prev.prev('LI');if(prev.length===0){if(settings.loopOptions){prev=options.find('LI:last')}else{prev=options.find('LI:first')}}if(++i>=totalOptions)break}addHover(select,prev);selectOption(select,prev,event);keepOptionInView(select,prev)}else{showMenu(select)}break;case 40:case 39:event.preventDefault();if(control.hasClass('selectBox-menuShowing')){var next=options.find('.selectBox-hover').next('LI');totalOptions=options.find('LI:not(.selectBox-optgroup)').length;i=0;while(next.length===0||next.hasClass('selectBox-disabled')||next.hasClass('selectBox-optgroup')){next=next.next('LI');if(next.length===0){if(settings.loopOptions){next=options.find('LI:first')}else{next=options.find('LI:last')}}if(++i>=totalOptions)break}addHover(select,next);selectOption(select,next,event);keepOptionInView(select,next)}else{showMenu(select)}break}};var handleKeyPress=function(select,event){select=$(select);var control=select.data('selectBox-control'),options=control.data('selectBox-options');if(control.hasClass('selectBox-disabled'))return;switch(event.keyCode){case 9:case 27:case 13:case 38:case 37:case 40:case 39:break;default:if(!control.hasClass('selectBox-menuShowing'))showMenu(select);event.preventDefault();clearTimeout(typeTimer);typeSearch+=String.fromCharCode(event.charCode||event.keyCode);options.find('A').each(function(){if($(this).text().substr(0,typeSearch.length).toLowerCase()===typeSearch.toLowerCase()){addHover(select,$(this).parent());keepOptionInView(select,$(this).parent());return false}});typeTimer=setTimeout(function(){typeSearch=''},1000);break}};var enable=function(select){select=$(select);select.attr('disabled',false);var control=select.data('selectBox-control');if(!control)return;control.removeClass('selectBox-disabled')};var disable=function(select){select=$(select);select.attr('disabled',true);var control=select.data('selectBox-control');if(!control)return;control.addClass('selectBox-disabled')};var setValue=function(select,value){select=$(select);select.val(value);value=select.val();if(value===null){value=select.children().first().val();select.val(value)}var control=select.data('selectBox-control');if(!control)return;var settings=select.data('selectBox-settings'),options=control.data('selectBox-options');setLabel(select);options.find('.selectBox-selected').removeClass('selectBox-selected');options.find('A').each(function(){if(typeof(value)==='object'){for(var i=0;i<value.length;i++){if($(this).attr('rel')==value[i]){$(this).parent().addClass('selectBox-selected')}}}else{if($(this).attr('rel')==value){$(this).parent().addClass('selectBox-selected')}}});if(settings.change)settings.change.call(select)};var setOptions=function(select,options){select=$(select);var control=select.data('selectBox-control'),settings=select.data('selectBox-settings');switch(typeof(data)){case'string':select.html(data);break;case'object':select.html('');for(var i in data){if(data[i]===null)continue;if(typeof(data[i])==='object'){var optgroup=$('<optgroup label="'+i+'" />');for(var j in data[i]){optgroup.append('<option value="'+j+'">'+data[i][j]+'</option>')}select.append(optgroup)}else{var option=$('<option value="'+i+'">'+data[i]+'</option>');select.append(option)}}break}if(!control)return;control.data('selectBox-options').remove();var type=control.hasClass('selectBox-dropdown')?'dropdown':'inline';options=getOptions(select,type);control.data('selectBox-options',options);switch(type){case'inline':control.append(options);break;case'dropdown':setLabel(select);$("#page").append(options);break}};var disableSelection=function(selector){$(selector).css('MozUserSelect','none').bind('selectstart',function(event){event.preventDefault()})};var generateOptions=function(self,options){var li=$('<li />'),a=$('<a />');li.addClass(self.attr('class'));li.data(self.data());a.attr('rel',self.val()).text(self.text());li.append(a);if(self.attr('disabled'))li.addClass('selectBox-disabled');if(self.attr('selected'))li.addClass('selectBox-selected');options.append(li)};switch(method){case'control':return $(this).data('selectBox-control');case'settings':if(!data)return $(this).data('selectBox-settings');$(this).each(function(){$(this).data('selectBox-settings',$.extend(true,$(this).data('selectBox-settings'),data))});break;case'options':if(data===undefined)return $(this).data('selectBox-control').data('selectBox-options');$(this).each(function(){setOptions(this,data)});break;case'value':if(data===undefined)return $(this).val();$(this).each(function(){setValue(this,data)});break;case'refresh':$(this).each(function(){refresh(this)});break;case'enable':$(this).each(function(){enable(this)});break;case'disable':$(this).each(function(){disable(this)});break;case'destroy':$(this).each(function(){destroy(this)});break;default:$(this).each(function(){init(this,method)});break}return $(this)}})})(jQuery);

/* jquery.animate-enhanced plugin v0.98 http://github.com/benbarnett/jQuery-Animate-Enhanced http://benbarnett.net benpbarnett */
(function(c,I,J){function O(a,b,c,e,l,k,f,p,q){var t=!1,f=!0===f&&!0===p,b=b||{};b.original||(b.original={},t=!0);b.properties=b.properties||{};b.secondary=b.secondary||{};for(var p=b.meta,m=b.original,g=b.properties,P=b.secondary,B=r.length-1;0<=B;B--){var D=r[B]+"transition-property",E=r[B]+"transition-duration",h=r[B]+"transition-timing-function",c=f?r[B]+"transform":c;t&&(m[D]=a.css(D)||"",m[E]=a.css(E)||"",m[h]=a.css(h)||"");P[c]=f?(!0===q||!0===y&&!1!==q)&&K?"translate3d("+p.left+"px, "+p.top+
"px, 0)":"translate("+p.left+"px,"+p.top+"px)":k;g[D]=(g[D]?g[D]+",":"")+c;g[E]=(g[E]?g[E]+",":"")+e+"ms";g[h]=(g[h]?g[h]+",":"")+l}return b}function z(a){for(var c in a)return!1;return!0}function G(a){return parseFloat(a.replace(a.match(/\D+$/),""))}function L(a){var c=!0;a.each(function(a,e){return c=c&&e.ownerDocument});return c}var Q="top right bottom left opacity height width".split(" "),H=["top","right","bottom","left"],r=["-webkit-","-moz-","-o-",""],R=["avoidTransforms","useTranslate3d","leaveTransforms"],
S=/^([+-]=)?([\d+-.]+)(.*)$/,T=/([A-Z])/g,U={secondary:{},meta:{top:0,right:0,bottom:0,left:0}},M=null,F=!1,A=(document.body||document.documentElement).style,N=void 0!==A.WebkitTransition||void 0!==A.MozTransition||void 0!==A.OTransition||void 0!==A.transition,K="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,y=K;c.expr&&c.expr.filters&&(M=c.expr.filters.animated,c.expr.filters.animated=function(a){return c(a).data("events")&&c(a).data("events")["webkitTransitionEnd oTransitionEnd transitionend"]?
!0:M.call(this,a)});c.extend({toggle3DByDefault:function(){return y=!y},toggleDisabledByDefault:function(){return F=!F}});c.fn.translation=function(){if(!this[0])return null;var a=window.getComputedStyle(this[0],null),c={x:0,y:0};if(a)for(var n=r.length-1;0<=n;n--){var e=a.getPropertyValue(r[n]+"transform");if(e&&/matrix/i.test(e)){a=e.replace(/^matrix\(/i,"").split(/, |\)$/g);c={x:parseInt(a[4],10),y:parseInt(a[5],10)};break}}return c};c.fn.animate=function(a,b,n,e){var a=a||{},l=!("undefined"!==
typeof a.bottom||"undefined"!==typeof a.right),k=c.speed(b,n,e),f=this,p=0,q=function(){p--;0===p&&"function"===typeof k.complete&&k.complete.apply(f,arguments)},t;if(!(t=!0===("undefined"!==typeof a.avoidCSSTransitions?a.avoidCSSTransitions:F)))if(!(t=!N))if(!(t=z(a))){var m;a:{for(m in a)if(("width"==m||"height"==m)&&("show"==a[m]||"hide"==a[m]||"toggle"==a[m])){m=!0;break a}m=!1}t=m||0>=k.duration||!0===c.fn.animate.defaults.avoidTransforms&&!1!==a.avoidTransforms}return t?I.apply(this,arguments):
this[!0===k.queue?"queue":"each"](function(){var g=c(this),b=c.extend({},k),f=function(b){var e=g.data("jQe")||{original:{}},d={};if(2==b.eventPhase){if(!0!==a.leaveTransforms){for(b=r.length-1;0<=b;b--)d[r[b]+"transform"]="";if(l&&"undefined"!==typeof e.meta)for(var b=0,f;f=H[b];++b)d[f]=e.meta[f+"_o"]+"px",c(this).css(f,d[f])}g.unbind("webkitTransitionEnd oTransitionEnd transitionend").css(e.original).css(d).data("jQe",null);"hide"===a.opacity&&g.css({display:"none",opacity:""});q.call(this)}},
e={bounce:"cubic-bezier(0.0, 0.35, .5, 1.3)",linear:"linear",swing:"ease-in-out",easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)",easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)",easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)",easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)",easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)",easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)",easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)",easeInBack:"cubic-bezier(0.600, -0.280, 0.735, 0.045)",
easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)",easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)",easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)",easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)",
easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)",easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)",easeInOutBack:"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},m={},e=e[b.easing||"swing"]?e[b.easing||"swing"]:b.easing||"swing",h;for(h in a)if(-1===c.inArray(h,R)){var n=-1<c.inArray(h,H),i;var j=g,w=a[h],u=h,s=n&&!0!==
a.avoidTransforms;if("d"==u)i=void 0;else if(L(j)){var d=S.exec(w);i="auto"===j.css(u)?0:j.css(u);i="string"==typeof i?G(i):i;"string"==typeof w&&G(w);var s=!0===s?0:i,t=j.is(":hidden"),v=j.translation();"left"==u&&(s=parseInt(i,10)+v.x);"right"==u&&(s=parseInt(i,10)+v.x);"top"==u&&(s=parseInt(i,10)+v.y);"bottom"==u&&(s=parseInt(i,10)+v.y);!d&&"show"==w?(s=1,t&&j.css({display:"block",opacity:0})):!d&&"hide"==w&&(s=0);d?(j=parseFloat(d[2]),d[1]&&(j=("-="===d[1]?-1:1)*j+parseInt(s,10)),i=j):i=s}else i=
void 0;if(d=!0!==a.avoidTransforms)if(d=h,j=i,w=g,L(w)){u=-1<c.inArray(d,Q);if(("width"==d||"height"==d||"opacity"==d)&&parseFloat(j)===parseFloat(w.css(d)))u=!1;d=u}else d=!1;if(d){d=g;j=h;w=b.duration;u=e;i=n&&!0===a.avoidTransforms?i+"px":i;var n=n&&!0!==a.avoidTransforms,s=l,t=!0===a.useTranslate3d,v=(v=d.data("jQe"))&&!z(v)?v:c.extend(!0,{},U),x=i;if(-1<c.inArray(j,H)){var C=v.meta,A=G(d.css(j))||0,y=j+"_o",x=i-A;C[j]=x;C[y]="auto"==d.css(j)?0+x:A+x||0;v.meta=C;s&&0===x&&(x=0-C[y],C[j]=x,C[y]=
0)}d.data("jQe",O(d,v,j,w,u,x,n,s,t))}else m[h]=a[h]}g.unbind("webkitTransitionEnd oTransitionEnd transitionend");if((h=g.data("jQe"))&&!z(h)&&!z(h.secondary)){p++;g.css(h.properties);var F=h.secondary;setTimeout(function(){g.bind("webkitTransitionEnd oTransitionEnd transitionend",f).css(F)})}else b.queue=!1;z(m)||(p++,I.apply(g,[m,{duration:b.duration,easing:c.easing[b.easing]?b.easing:c.easing.swing?"swing":"linear",complete:q,queue:b.queue}]));return!0})};c.fn.animate.defaults={};c.fn.stop=function(a,
b,n){if(!N)return J.apply(this,[a,b]);a&&this.queue([]);this.each(function(){var e=c(this),l=e.data("jQe");if(l&&!z(l)){var k,f={};if(b){if(f=l.secondary,!n&&void 0!==typeof l.meta.left_o||void 0!==typeof l.meta.top_o){f.left=void 0!==typeof l.meta.left_o?l.meta.left_o:"auto";f.top=void 0!==typeof l.meta.top_o?l.meta.top_o:"auto";for(k=r.length-1;0<=k;k--)f[r[k]+"transform"]=""}}else if(!z(l.secondary)){var p=window.getComputedStyle(e[0],null);if(p)for(var q in l.secondary)if(l.secondary.hasOwnProperty(q)&&
(q=q.replace(T,"-$1").toLowerCase(),f[q]=p.getPropertyValue(q),!n&&/matrix/i.test(f[q]))){k=f[q].replace(/^matrix\(/i,"").split(/, |\)$/g);f.left=parseFloat(k[4])+parseFloat(e.css("left"))+"px"||"auto";f.top=parseFloat(k[5])+parseFloat(e.css("top"))+"px"||"auto";for(k=r.length-1;0<=k;k--)f[r[k]+"transform"]=""}}e.unbind("webkitTransitionEnd oTransitionEnd transitionend");e.css(l.original).css(f).data("jQe",null)}else J.apply(e,[a,b])});return this}})(jQuery,jQuery.fn.animate,jQuery.fn.stop);

/** jQuery.imagesLoaded https://github.com/desandro/imagesloaded */
(function(c,n){var l="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function m(){var b=c(i),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function j(b,a){b.src===l||-1!==c.inArray(b,k)||(k.push(b),a?h.push(b):i.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(i),c(h)]),e.length===k.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),k=[],i=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){j(b.target,"error"===b.type)}).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)j(a,e.isBroken);else if(a.complete&&a.naturalWidth!==n)j(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=l,a.src=d}):m();return d?d.promise(g):
g}})(jQuery);

/**  Shadow animation plugin 1.8 for jQuery 1.8+ http://www.bitstorm.org/jquery/shadow-animation/ Copyright 2011, 2012 Edwin Martin <edwin@bitstorm.org> Contributors: Mark Carver, Xavier Lepretre Released under the MIT and GPL licenses. */
jQuery(function(d,i){function j(){var a=d("script:first"),b=a.css("color"),c=false;if(/^rgba/.test(b))c=true;else try{c=b!=a.css("color","rgba(0, 0, 0, 0.5)").css("color");a.css("color",b)}catch(e){}return c}function k(a,b,c){var e=[];a.f&&e.push("inset");typeof b.left!="undefined"&&e.push(parseInt(a.left+c*(b.left-a.left),10)+"px "+parseInt(a.top+c*(b.top-a.top),10)+"px");typeof b.blur!="undefined"&&e.push(parseInt(a.blur+c*(b.blur-a.blur),10)+"px");typeof b.a!="undefined"&&e.push(parseInt(a.a+c*
(b.a-a.a),10)+"px");if(typeof b.color!="undefined"){var g="rgb"+(d.support.rgba?"a":"")+"("+parseInt(a.color[0]+c*(b.color[0]-a.color[0]),10)+","+parseInt(a.color[1]+c*(b.color[1]-a.color[1]),10)+","+parseInt(a.color[2]+c*(b.color[2]-a.color[2]),10);if(d.support.rgba)g+=","+parseFloat(a.color[3]+c*(b.color[3]-a.color[3]));g+=")";e.push(g)}return e.join(" ")}function h(a){var b,c,e={};if(b=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(a))c=[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],
16),1];else if(b=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(a))c=[parseInt(b[1],16)*17,parseInt(b[2],16)*17,parseInt(b[3],16)*17,1];else if(b=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))c=[parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3],10),1];else if(b=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(a))c=[parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3],10),parseFloat(b[4])];e=(b=/(-?[0-9]+)(?:px)?\s+(-?[0-9]+)(?:px)?(?:\s+(-?[0-9]+)(?:px)?)?(?:\s+(-?[0-9]+)(?:px)?)?/.exec(a))?
{left:parseInt(b[1],10),top:parseInt(b[2],10),blur:b[3]?parseInt(b[3],10):0,a:b[4]?parseInt(b[4],10):0}:{left:0,top:0,blur:0,a:0};e.f=/inset/.test(a);e.color=c;return e}d.extend(true,d,{support:{rgba:j()}});var f;d.each(["boxShadow","MozBoxShadow","WebkitBoxShadow"],function(a,b){a=d("html").css(b);if(typeof a=="string"&&a!=""){f=b;return false}});if(f)d.Tween.propHooks.boxShadow={get:function(a){return d(a.elem).css(f)},set:function(a){if(!a.e){a.b=h(d(a.elem).get(0).style[f]||d(a.elem).css(f));
a.c=d.extend({},a.b,h(a.end));if(a.b.color==i)a.b.color=a.c.color||[0,0,0];a.d=0;a.e=true}a.elem.style[f]=k(a.b,a.c,a.d*a.init.interval/a.options.duration);a.d++}}});

/** json2.js  */
var JSON;if(!JSON){JSON={}}(function(){'use strict';function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');}}}());

/** jQuery.Preload - Multifunctional preloader Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com Dual licensed under MIT and GPL.  Date: 3/25/2009 */
;(function($){var h=$.preload=function(c,d){if(c.split)c=$(c);d=$.extend({},h.defaults,d);var f=$.map(c,function(a){if(!a)return;if(a.split)return d.base+a+d.ext;var b=a.src||a.href;if(typeof d.placeholder=='string'&&a.src)a.src=d.placeholder;if(b&&d.find)b=b.replace(d.find,d.replace);return b||null}),data={loaded:0,failed:0,next:0,done:0,total:f.length};if(!data.total)return finish();var g=$(Array(d.threshold+1).join('<img/>')).load(handler).error(handler).bind('abort',handler).each(fetch);function handler(e){data.element=this;data.found=e.type=='load';data.image=this.src;data.index=this.index;var a=data.original=c[this.index];data[data.found?'loaded':'failed']++;data.done++;if(d.enforceCache)h.cache.push($('<img/>').attr('src',data.image)[0]);if(d.placeholder&&a.src)a.src=data.found?data.image:d.notFound||a.src;if(d.onComplete)d.onComplete(data);if(data.done<data.total)fetch(0,this);else{if(g&&g.unbind)g.unbind('load').unbind('error').unbind('abort');g=null;finish()}};function fetch(i,a,b){if(a.attachEvent&&data.next&&data.next%h.gap==0&&!b){setTimeout(function(){fetch(i,a,1)},0);return!1}if(data.next==data.total)return!1;a.index=data.next;a.src=f[data.next++];if(d.onRequest){data.index=a.index;data.element=a;data.image=a.src;data.original=c[data.next-1];d.onRequest(data)}};function finish(){if(d.onFinish)d.onFinish(data)}};h.gap=14;h.cache=[];h.defaults={threshold:2,base:'',ext:'',replace:''};$.fn.preload=function(a){h(this,a);return this}})(jQuery);

/** jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!) @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)  @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems) */
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

/** jQuery FullScreen Plugin Martin Angelov, Morten Sjogren 1.1  http://tutorialzine.com/2012/02/enhance-your-website-fullscreen-api/  MIT License */
(function($){"use strict";function supportFullScreen(){var doc=document.documentElement;return('requestFullscreen'in doc)||('mozRequestFullScreen'in doc&&document.mozFullScreenEnabled)||('webkitRequestFullScreen'in doc)}function requestFullScreen(elem){if(elem.requestFullscreen){elem.requestFullscreen()}else if(elem.mozRequestFullScreen){elem.mozRequestFullScreen()}else if(elem.webkitRequestFullScreen){elem.webkitRequestFullScreen()}}function fullScreenStatus(){return document.fullscreen||document.mozFullScreen||document.webkitIsFullScreen||false}function cancelFullScreen(){if(document.exitFullscreen){document.exitFullscreen()}else if(document.mozCancelFullScreen){document.mozCancelFullScreen()}else if(document.webkitCancelFullScreen){document.webkitCancelFullScreen()}$(document).off('fullscreenchange mozfullscreenchange webkitfullscreenchange')}function onFullScreenEvent(callback){$(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange",function(){callback(fullScreenStatus())})}$.support.fullscreen=supportFullScreen();$.fn.fullScreen=function(props){if(!$.support.fullscreen||this.length!==1){return this}if(fullScreenStatus()){cancelFullScreen();return this}var options=$.extend({'background':'#111','callback':$.noop(),'fullscreenClass':'fullScreen'},props),elem=this,fs=$('<div>',{'css':{'overflow-y':'auto','background':options.background,'width':'100%','height':'100%'}}).insertBefore(elem).append(elem);elem.addClass(options.fullscreenClass);requestFullScreen(fs.get(0));fs.click(function(e){if(e.target==this){cancelFullScreen()}});elem.cancel=function(){cancelFullScreen();return elem};onFullScreenEvent(function(fullScreen){if(!fullScreen){elem.removeClass(options.fullscreenClass).insertBefore(fs);fs.remove()}options.callback(fullScreen)});return elem};$.fn.cancelFullScreen=function(){cancelFullScreen();return this}}(jQuery));


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ac 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ac 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

/*!
 * selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms of the MIT license.
 * selectivizr.com
 */
(function(j){function A(a){return a.replace(B,h).replace(C,function(a,d,b){for(var a=b.split(","),b=0,e=a.length;b<e;b++){var s=D(a[b].replace(E,h).replace(F,h))+o,l=[];a[b]=s.replace(G,function(a,b,c,d,e){if(b){if(l.length>0){var a=l,f,e=s.substring(0,e).replace(H,i);if(e==i||e.charAt(e.length-1)==o)e+="*";try{f=t(e)}catch(k){}if(f){e=0;for(c=f.length;e<c;e++){for(var d=f[e],h=d.className,j=0,m=a.length;j<m;j++){var g=a[j];if(!RegExp("(^|\\s)"+g.className+"(\\s|$)").test(d.className)&&g.b&&(g.b===!0||g.b(d)===!0))h=u(h,g.className,!0)}d.className=h}}l=[]}return b}else{if(b=c?I(c):!v||v.test(d)?{className:w(d),b:!0}:null)return l.push(b),"."+b.className;return a}})}return d+a.join(",")})}function I(a){var c=!0,d=w(a.slice(1)),b=a.substring(0,5)==":not(",e,f;b&&(a=a.slice(5,-1));var l=a.indexOf("(");l>-1&&(a=a.substring(0,l));if(a.charAt(0)==":")switch(a.slice(1)){case "root":c=function(a){return b?a!=p:a==p};break;case "target":if(m==8){c=function(a){function c(){var d=location.hash,e=d.slice(1);return b?d==i||a.id!=e:d!=i&&a.id==e}k(j,"hashchange",function(){g(a,d,c())});return c()};break}return!1;case "checked":c=function(a){J.test(a.type)&&k(a,"propertychange",function(){event.propertyName=="checked"&&g(a,d,a.checked!==b)});return a.checked!==b};break;case "disabled":b=!b;case "enabled":c=function(c){if(K.test(c.tagName))return k(c,"propertychange",function(){event.propertyName=="$disabled"&&g(c,d,c.a===b)}),q.push(c),c.a=c.disabled,c.disabled===b;return a==":enabled"?b:!b};break;case "focus":e="focus",f="blur";case "hover":e||(e="mouseenter",f="mouseleave");c=function(a){k(a,b?f:e,function(){g(a,d,!0)});k(a,b?e:f,function(){g(a,d,!1)});return b};break;default:if(!L.test(a))return!1}return{className:d,b:c}}function w(a){return M+"-"+(m==6&&N?O++:a.replace(P,function(a){return a.charCodeAt(0)}))}function D(a){return a.replace(x,h).replace(Q,o)}function g(a,c,d){var b=a.className,c=u(b,c,d);if(c!=b)a.className=c,a.parentNode.className+=i}function u(a,c,d){var b=RegExp("(^|\\s)"+c+"(\\s|$)"),e=b.test(a);return d?e?a:a+o+c:e?a.replace(b,h).replace(x,h):a}function k(a,c,d){a.attachEvent("on"+c,d)}function r(a,c){if(/^https?:\/\//i.test(a))return c.substring(0,c.indexOf("/",8))==a.substring(0,a.indexOf("/",8))?a:null;if(a.charAt(0)=="/")return c.substring(0,c.indexOf("/",8))+a;var d=c.split(/[?#]/)[0];a.charAt(0)!="?"&&d.charAt(d.length-1)!="/"&&(d=d.substring(0,d.lastIndexOf("/")+1));return d+a}function y(a){if(a)return n.open("GET",a,!1),n.send(),(n.status==200?n.responseText:i).replace(R,i).replace(S,function(c,d,b,e,f){return y(r(b||f,a))}).replace(T,function(c,d,b){d=d||i;return" url("+d+r(b,a)+d+") "});return i}function U(){var a,c;a=f.getElementsByTagName("BASE");for(var d=a.length>0?a[0].href:f.location.href,b=0;b<f.styleSheets.length;b++)if(c=f.styleSheets[b],c.href!=i&&(a=r(c.href,d)))c.cssText=A(y(a));q.length>0&&setInterval(function(){for(var a=0,c=q.length;a<c;a++){var b=q[a];if(b.disabled!==b.a)b.disabled?(b.disabled=!1,b.a=!0,b.disabled=!0):b.a=b.disabled}},250)}if(!/*@cc_on!@*/true){var f=document,p=f.documentElement,n=function(){if(j.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(a){return null}}(),m=/MSIE (\d+)/.exec(navigator.userAgent)[1];if(!(f.compatMode!="CSS1Compat"||m<6||m>8||!n)){var z={NW:"*.Dom.select",MooTools:"$$",DOMAssistant:"*.$",Prototype:"$$",YAHOO:"*.util.Selector.query",Sizzle:"*",jQuery:"*",dojo:"*.query"},t,q=[],O=0,N=!0,M="slvzr",R=/(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g,S=/@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))[^;]*;/g,T=/\burl\(\s*(["']?)(?!data:)([^"')]+)\1\s*\)/g,L=/^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/,B=/:(:first-(?:line|letter))/g,C=/(^|})\s*([^\{]*?[\[:][^{]+)/g,G=/([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g,H=/(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g,P=/[^\w-]/g,K=/^(INPUT|SELECT|TEXTAREA|BUTTON)$/,J=/^(checkbox|radio)$/,v=m>6?/[\$\^*]=(['"])\1/:null,E=/([(\[+~])\s+/g,F=/\s+([)\]+~])/g,Q=/\s+/g,x=/^\s*((?:[\S\s]*\S)?)\s*$/,i="",o=" ",h="$1";(function(a,c){function d(){try{p.doScroll("left")}catch(a){setTimeout(d,50);return}b("poll")}function b(d){if(!(d.type=="readystatechange"&&f.readyState!="complete")&&((d.type=="load"?a:f).detachEvent("on"+d.type,b,!1),!e&&(e=!0)))c.call(a,d.type||d)}var e=!1,g=!0;if(f.readyState=="complete")c.call(a,i);else{if(f.createEventObject&&p.doScroll){try{g=!a.frameElement}catch(h){}g&&d()}k(f,"readystatechange",b);k(a,"load",b)}})(j,function(){for(var a in z){var c,d,b=j;if(j[a]){for(c=z[a].replace("*",a).split(".");(d=c.shift())&&(b=b[d]););if(typeof b=="function"){t=b;U();break}}}})}}})(this);

/** jQuery.setDocumentHeight */
$.fn.setDocumentHeight= function(){
	var el = this;
    $(el).css({'height': Math.max($(document).height(),document.body.clientHeight) });
	$(window).resize(function(){
		$(el).css({'height': 1}).css({'height': Math.max($(document).height(),document.body.clientHeight) });
		jQuery(document).trigger('scroll');
	});
};

/** jQuery.ltSlideshow*/
var ltSlideshow = function(){
	var object = {
		ready: function(){
			var obj = this;
			obj.options = {
				next: 	$('#gallery-actions a.next'),
				prev: 	$('#gallery-actions a.prev'),
				items: 	$('div.gallery-item'),
				stage: 	$("#gallery")
			};		
			obj.items = new Object();
			obj.loaded = false;
			obj.winWidth = obj.options.stage.width();
			obj.winHeight = obj.options.stage.height();
			if ( obj.options.items.length > 1){
				$("div.gallery-action").show();
			} else {
				$("div.gallery-action").hide();
			}	
			if (obj.options.items.length > 1){
				obj.options.prev.die('click').live('click',function(){
					obj.ScrollTo( -1 );
					obj.slideshowPause();
					return false;
				}).show();
				obj.options.next.die('click').live('click',function(){
					obj.ScrollTo( 1 );
					obj.slideshowPause();
					return false;
				}).show();		
			}		
			$('div#gallery-items', obj.options.stage).css({marginLeft: 0});
			$("li.buyprint a").attr("href","#!prints/" + $("div.gallery-item:eq(0)").data("id"));
			$("div.gallery-name span").html( $("#gallery-nav li a.current").data("title") );
			
			clearInterval(obj.timer);	
			obj.IntImages();	
		},
		slideshow: function(){
			var obj = this;
			if (!$(".gallery-action div").hasClass("play")){
				clearInterval(object.timer);
				return;
			}	
			clearInterval(obj.timer);
			setTimeout(function() {
			  	obj.ScrollTo( 1 );	
				obj.timer = setInterval(function(){
					obj.ScrollTo( 1 );	
				}, 7000);	  
			}, 1500);
		},
		slideshowPause: function(){
			var obj = this;
			if (!$(".gallery-action div").hasClass("play")){
				$(".gallery-action div").toggleClass("play");
				clearInterval(obj.timer);
			}	
		},					
		ScrollTo: function(postion, num){
			var obj = this;
			
			if (!obj.items.active)
				obj.items.active = 0;
			if (num)
				obj.items.active = num-1;
				
		 	obj.items.singlewidth = $(obj.options.stage).width();
			obj.items.itemesnum = $('div.gallery-item', obj.options.stage).length;
			obj.items.totalwidth = obj.items.itemesnum * obj.items.singlewidth;
			obj.items.active = obj.items.active + postion;
			if ( obj.items.active >= obj.items.itemesnum )
				obj.items.active = 0;
			if ( obj.items.active < 0 )
				obj.items.active = obj.items.itemesnum-1;
			obj.items.newpostion = obj.items.active * obj.items.singlewidth;
			obj.options.items.fadeTo(250,0.7);
			obj.items.timeOut = (parseInt( $('div#gallery-items', obj.options.stage).css('marginLeft') ) - obj.items.newpostion * -1) / obj.items.singlewidth;
			if ( obj.items.timeOut < 0 )
				  obj.items.timeOut = obj.items.timeOut * -1;
			obj.items.timeOut = 550 + (200*obj.items.timeOut);
			$('div#gallery-items', obj.options.stage)
				.css('backgroundColor','#000')
				.animate({ 
					marginLeft: obj.items.newpostion * -1 + 'px' 
				},  obj.items.timeOut, 'swing', function(){ 
					obj.options.items.fadeTo(250,1, function(){
						$("div.gallery-name span").html( $("#gallery-nav li:eq("+obj.items.active+") a").data("title") );
						$('div#gallery-items', obj.options.stage).css('backgroundColor','');
				}); 
			});
			
			$("#gallery-nav li a").removeClass("current");
			$("#gallery-nav li:eq("+obj.items.active+") a").addClass("current");
		
			$("li.buyprint a").attr("href","#!prints/" + $("#gallery-nav li a.current").data("id"));
		},
		IntImages: function () {			
			var obj = this;			
			if (jQuery.isFunction($.preload)) { // if exist - setup image preload
				$.preload($('img',obj.options.stage));
			}			
			if (obj.items.active > 0) {
				$('div#gallery-items', obj.options.stage).css({'marginLeft': '-' + (obj.items.active * $(obj.options.stage).width()) + 'px'});
			}	
			$('div.gallery-item', obj.options.stage).css({
				'width': $(obj.options.stage).width() + 'px'
			});		
			obj.resizeOptions = {
				'stage': obj.options.stage,
				'width': $(obj.options.stage).width(),
				'height': $(obj.options.stage).height()
			};		
			$('div#gallery-items img',obj.options.stage).each(function(){		
				$(this).imagesLoaded( function( $images, $proper, $broken ) {
					obj.loaded = true;
					obj.ResizeImage($(this), obj.resizeOptions);
				});					
				if (obj.loaded){
					obj.ResizeImage($(this), obj.resizeOptions);
				}				
			});
		},
		ResizeImage: function(image, options){
			var obj = this;
			if ( !image.data('width') || !image.data('height') ) {
				image.data({ 'width': image.width(), 'height': image.height() });
			}
			// image size
			options.natural = { width: image.data('width'), height: image.data('height')};	
			// image scale
			options.scale = options.natural.height / options.natural.width;
			if ( options.height > options.width ){
				options.natural.height = options.height;
			    options.natural.width = options.height / options.scale;
			    if ( options.width > options.natural.width ){
			    	options.natural.width = options.width;
					options.natural.height = options.width / options.scale;
			    }
			}		
			if ( options.width >= options.height ){
				options.natural.width = options.width;
			    options.natural.height = options.width * options.scale;
			    if ( options.height > options.natural.height ){
			    	options.natural.height = options.height;
			    	options.natural.width = options.height / options.scale;
			    }
			}	
			image.css({
				marginLeft: Math.floor((options.width - options.natural.width) / 2),
				marginTop: 	Math.floor((options.height - options.natural.height) / 2),
				width: 		Math.floor(options.natural.width),
				height: 	Math.floor(options.natural.height)
			}).delay(250).fadeIn(750);
		}
	}
		
	//object.ready();	

	$("#gallery-nav li a").live("click",function(){
		if ($(this).hasClass("current"))
			return false;
		object.ScrollTo( false, $(this).data("count") );	
		object.slideshowPause();
		return false;
	});
	
	$(".gallery-action").live("click",function(){
		if ($("div",this).hasClass("play")){
			object.slideshow();
		} else {
			clearInterval(object.timer);
		}
		$("div",this).toggleClass("play");
	});	
		
	if ( $(".gallery-action div").hasClass("play") && window.location.href == 'http://www.northlandscapes.com/'){
		$(".gallery-action").delay(3500).queue(function () {
			$(this).trigger("click").dequeue();
		});	
	}		
	
	$("#gallery").touchwipe({
	     wipeLeft: function() {object.options.next.trigger("click"); },
	     wipeRight: function() { object.options.prev.trigger("click"); },
	     min_move_x: 20,
	     min_move_y: 20,
	     preventDefaultEvents: true
	});			
		
	$(document.documentElement).keyup(function (event) {
		if (event.keyCode == 37 || event.keyCode == 100) {
			object.options.prev.trigger("click").animate({boxShadow: '0 0 30px #000'}, 300,function(){
				$(this).css({boxShadow: 'none'});
			});
	  	} 
	  	if (event.keyCode == 39 || event.keyCode == 102) {
			object.options.next.trigger("click").animate({boxShadow: '0 0 30px #000'}, 300,function(){
				$(this).css({boxShadow: 'none'});
			});
	  	}
	});
	
	$(window).resize(function() { 
		
		object.onResize = function() {
			object.IntImages(); 
		};
		//New height and width
		object.winNewWidth = object.options.stage.width();
		object.winNewHeight = object.options.stage.height();
		// compare the new height and width with old one
		if(object.winWidth!=object.winNewWidth || object.winHeight!=object.winNewHeight){
			try { window.clearTimeout(object.resizeTimeout); } catch (err) {}
			object.resizeTimeout = window.setTimeout(object.onResize, 20);
		}
		//Update the width and height
		object.winWidth = object.winNewWidth;
		object.winHeight = object.winNewHeight;		
		
	});
	
	return object;
	
};