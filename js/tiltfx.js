;(function(window){'use strict';var lastTime=0;var prefixes='webkit moz ms o'.split(' ');var requestAnimationFrame=window.requestAnimationFrame;var cancelAnimationFrame=window.cancelAnimationFrame;var prefix;for(var i=0;i<prefixes.length;i++){if(requestAnimationFrame&&cancelAnimationFrame){break;}prefix=prefixes[i];requestAnimationFrame=requestAnimationFrame||window[prefix+'RequestAnimationFrame'];cancelAnimationFrame=cancelAnimationFrame||window[prefix+'CancelAnimationFrame']||window[prefix+'CancelRequestAnimationFrame'];}if(!requestAnimationFrame||!cancelAnimationFrame){requestAnimationFrame=function(callback,element){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall);},timeToCall);lastTime=currTime+timeToCall;return id;};cancelAnimationFrame=function(id){window.clearTimeout(id);};}function extend(a,b){for(var key in b){if(b.hasOwnProperty(key)){a[key]=b[key];}}return a;}function getMousePos(e){var posx=0;var posy=0;if(!e)var e=window.event;if(e.pageX||e.pageY){posx=e.pageX;posy=e.pageY;}else if(e.clientX||e.clientY){posx=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;posy=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;}return{x:posx,y:posy}}function throttle(fn,delay){var allowSample=true;return function(e){if(allowSample){allowSample=false;setTimeout(function(){allowSample=true;},delay);fn(e);}};}function TiltFx(el,options){if(el){this.el=el;this.options=extend({},this.options);extend(this.options,options);this._init();this._initEvents();}}TiltFx.prototype.options={extraImgs:2,extraImgsScaleGrade:0,opacity:0.7,customImgsOpacity:false,bgfixed:true,resetOnLeave:true,movement:{perspective:1000,translateX:-10,translateY:-10,translateZ:20,rotateX:2,rotateY:2,rotateZ:0},element:{mouseMoveWatcher:null,viewWatcher:null}}
TiltFx.prototype._init=function(){this.tiltWrapper=document.createElement('div');this.tiltWrapper.className='tilt';this.tiltImgBack=document.createElement('div');this.tiltImgBack.className='tilt__back';this.tiltImgBack.tiltFxType='back';this.tiltImgBack.style.backgroundImage='url('+this.el.src+')';this.tiltWrapper.appendChild(this.tiltImgBack);if(this.options.extraImgs<1){this.imgCount=0;}else if(this.options.extraImgs>64){this.imgCount=64;}else{this.imgCount=this.options.extraImgs;}if(!this.options.movement.perspective){this.options.movement.perspective=0;}this.imgElems=[];var frontExtraImagesCount=this.imgCount;var customImgsOpacity=this.options.customImgsOpacity;if(!this.options.bgfixed){this.imgElems.push(this.tiltImgBack);++this.imgCount;}for(var i=0;i<frontExtraImagesCount;++i){var el=document.createElement('div');el.className='tilt__front';el.style.backgroundImage='url('+this.el.src+')';this.tiltWrapper.appendChild(el);this.imgElems.push(el);}this._initSetImagesOpacity();this.el.parentNode.insertBefore(this.tiltWrapper,this.el);this.el.parentNode.removeChild(this.el);this._setViewWatcher(this);this._setMouseMoveWatcher(this);this._calcView(this);};TiltFx.prototype._initSetImagesOpacity=function(){if(this.options.customImgsOpacity){for(var i=0,len=this.imgElems.length;i<len;++i){var opacity=(this.options.customImgsOpacity[i])?this.options.customImgsOpacity[i]:this.options.opacity;this.imgElems[i].style.opacity=opacity;}}else{for(var i=0,len=this.imgElems.length;i<len;++i){if(this.imgElems[i].tiltFxType==='back'){continue;}this.imgElems[i].style.opacity=this.options.opacity;}}};TiltFx.prototype._calcView=function(self){self.view={width:self.viewWatcher.offsetWidth,height:self.viewWatcher.offsetHeight};};TiltFx.prototype._setMouseMoveWatcher=function(self){var isSet=false;if(self.options.element&&self.options.element.mouseMoveWatcher){var mouseMoveWatcherElement=document.querySelector(self.options.element.mouseMoveWatcher);self.mouseMoveWatcher=mouseMoveWatcherElement;isSet=true;}if(!isSet){self.mouseMoveWatcher=self.viewWatcher;}};TiltFx.prototype._setViewWatcher=function(self){var isSet=false;if(self.options.element&&self.options.element.viewWatcher){var customElementRelative=document.querySelector(self.options.element.viewWatcher);if(customElementRelative){self.viewWatcher=customElementRelative;isSet=true;}}if(!isSet){self.viewWatcher=self.tiltWrapper;}};TiltFx.prototype._initEvents=function(){var self=this,moveOpts=self.options.movement;self.mouseMoveWatcher.addEventListener('mousemove',function(ev){requestAnimationFrame(function(){var mousepos=getMousePos(ev),docScrolls={left:document.body.scrollLeft+document.documentElement.scrollLeft,top:document.body.scrollTop+document.documentElement.scrollTop},bounds=self.tiltWrapper.getBoundingClientRect(),relmousepos={x:mousepos.x-bounds.left-docScrolls.left,y:mousepos.y-bounds.top-docScrolls.top};for(var i=0,len=self.imgElems.length;i<len;++i){var el=self.imgElems[i],rotX=moveOpts.rotateX?2*((i+1)*moveOpts.rotateX/self.imgCount)/self.view.height*relmousepos.y-((i+1)*moveOpts.rotateX/self.imgCount):0,rotY=moveOpts.rotateY?2*((i+1)*moveOpts.rotateY/self.imgCount)/self.view.width*relmousepos.x-((i+1)*moveOpts.rotateY/self.imgCount):0,rotZ=moveOpts.rotateZ?2*((i+1)*moveOpts.rotateZ/self.imgCount)/self.view.width*relmousepos.x-((i+1)*moveOpts.rotateZ/self.imgCount):0,transX=moveOpts.translateX?2*((i+1)*moveOpts.translateX/self.imgCount)/self.view.width*relmousepos.x-((i+1)*moveOpts.translateX/self.imgCount):0,transY=moveOpts.translateY?2*((i+1)*moveOpts.translateY/self.imgCount)/self.view.height*relmousepos.y-((i+1)*moveOpts.translateY/self.imgCount):0,transZ=moveOpts.translateZ?2*((i+1)*moveOpts.translateZ/self.imgCount)/self.view.height*relmousepos.y-((i+1)*moveOpts.translateZ/self.imgCount):0,scale=1+(self.options.extraImgsScaleGrade*(len-(i+1))),scaleCss=(scale!==1)?' scale('+scale+', '+scale+')':'';el.style.WebkitTransform='perspective('+moveOpts.perspective+'px)'+' translate3d('+transX+'px,'+transY+'px,'+transZ+'px)'+' rotate3d(1,0,0,'+rotX+'deg)'+' rotate3d(0,1,0,'+rotY+'deg)'+' rotate3d(0,0,1,'+rotZ+'deg)'+scaleCss;el.style.transform='perspective('+moveOpts.perspective+'px)'+' translate3d('+transX+'px,'+transY+'px,'+transZ+'px)'+' rotate3d(1,0,0,'+rotX+'deg)'+' rotate3d(0,1,0,'+rotY+'deg)'+' rotate3d(0,0,1,'+rotZ+'deg)'+scaleCss;}});});if(self.options.resetOnLeave){self.mouseMoveWatcher.addEventListener('mouseleave',function(){setTimeout(function(){for(var i=0,len=self.imgElems.length;i<len;++i){var el=self.imgElems[i];el.style.WebkitTransform='perspective('+moveOpts.perspective+'px) translate3d(0,0,0) rotate3d(1,1,1,0deg)';el.style.transform='perspective('+moveOpts.perspective+'px) translate3d(0,0,0) rotate3d(1,1,1,0deg)';}},60);});}window.addEventListener('resize',throttle(function(){self._calcView(self);},50));};TiltFx.prototype.init=function(){[].slice.call(document.querySelectorAll('img.tilt-effect')).forEach(function(img){new TiltFx(img,JSON.parse(img.getAttribute('data-tilt-options')));});};(new TiltFx()).init();window.TiltFx=TiltFx;})(window);
