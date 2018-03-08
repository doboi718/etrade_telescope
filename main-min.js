var Banner = {

  init: function() {

    'use strict';

    var adContent = document.getElementById("ad_content"),
      adWidth = 160,
      adHeight = 600,
      tl = new TimelineMax({onComplete:adDoneHandler}),
      done = false,
      del;

    ////////////////////////////////////////////////////// HELPERS //////////////////////////////////////////////////////

    function preIE10Check() {
      if (window.attachEvent && !window.navigator.msPointerEnabled) {
        console.log('IE 9 or below detected.');
        return true;
      } else {
        console.log('This browsers is not IE 9 or below. 001');
        return false;
      }
    }

    ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

    var canvas, stage, exportRoot;

    function initcanvas() {
      canvas = document.getElementById("canvas");
      exportRoot = new lib.telescope();

      stage = new createjs.Stage(canvas);
      stage.addChild(exportRoot);
      stage.update();
    }

    function startCanvasAnimation(){
      createjs.Ticker.setFPS(lib.properties.fps);
      createjs.Ticker.addEventListener("tick", stage);
    }

    function frameStart() {
      if(!preIE10Check()){
        frame0();
      } else {
        TweenMax.set(backup, {className:'backup'});
        TweenMax.set(adContent, {opacity:1});
      }
    }

    function frame0(){
      initcanvas();

      tl.set(adContent, {opacity:1})
        .add(startCanvasAnimation)
        .to([text1,rule1], .5, {opacity:0}, "+=1.75")
        .to([text2,logo1], .5, {opacity:1}, "+=.5")
        .to([canvas,text2,logo1], .5, {opacity:0}, "+=2.5")
        .from(logo2, .5, {opacity:0})
        .from(text3a, .35, {top:"+=50", ease:Sine.easeOut}, "-=.5")
        .to(text3a, .25, {opacity:0},"+=1.25")
        .from(text3b1, .35, {top:"+=50", ease:Sine.easeOut})
        .to(text3b1, .25, {opacity:0},"+=1.25")
        .from(text3c1, .35, {top:"+=50", ease:Sine.easeOut})
        .to(text3c1, .25, {opacity:0},"+=1.25")
        .set(eftext2, {opacity:1})
        .staggerTo([eftext0,rule2,eftext1,eftext2bg,ctaholder,ctatextholder,glint,legal], .5, {opacity:1}, .1)
        .to(glint, 2, {left:"+=470", ease:Sine.easeInOut}, "-=.5");
        ;
    }

    ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

    function onAdClick(e) {
      window.open(window.clickTag);
    }

   function onAdHover(e) {
      if(done){
        TweenMax.to(ctaholder, .3, {scale:1.1});
      }
    }

    function onAdOut(e) {
      TweenMax.to(ctaholder, .3, {scale:1});
    }

    function adInteractionListeners() {
      if (adContent.addEventListener) {
        adContent.addEventListener('click', onAdClick, false);
        adContent.addEventListener('mouseover', onAdHover, false);
        adContent.addEventListener('mouseout', onAdOut, false);
      } else {
        adContent.attachEvent('onclick', onAdClick, false);
        adContent.attachEvent('onmouseover', onAdHover, false);
        adContent.attachEvent('onmouseout', onAdOut, false);
      }
    }

    function adDoneHandler() {
      done = true;
    }

    ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

    adInteractionListeners();
    frameStart();
  }
};

window.onload = function(){
  Banner.init();
};
