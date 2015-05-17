// Created by sam mok (Siso brand interactive team.) 2015

"use strict";

var app = {
    //  handle sprite
    sprites: {
        arr: {},

        /**
         *  Method: add
         *  for: add sprite
         *  @param  name     the name of this sprite, use this name to access sprite
         *  @param  src      the sprite path
         * */
        add: function (name, src){
            //  create img object
            var that = this,
                img = new Image();
                img.src = src;
            this.arr[name] = img;
        },

        /**
         *  get sprite by name
         *  @param  name    name of sprite
         *  @return sprite'src || console an error when the name of sprite are not exist.
         * */
        get: function (name){
            try {
                return this.arr[name].src;
            }
            catch (error) {
                console.error("Not that sprite in sprite group named by " + name);
            }
        },

        /**
         *  check sprite load progress
         * */
        checkLoadProgress: function (callBackObject){
            var that = callBackObject,
                spriteAmount = 0,
                spriteLoadedAmount = 0;

            //  count sprite amount
            for (var i in this.arr)
            {
                this.arr.hasOwnProperty(i) ? spriteAmount++ : false;
            }

            //  bind progress check function
            for (var j in this.arr)
            {
                //  be sure access object is sprite
                if (this.arr.hasOwnProperty(j)) {
                    spriteLoadedAmount++;
                    this.arr[j].addEventListener('load', checkAssetLoadProgress, false);
                }
            }

            //  check sprites load progress when each sprite full loaded each time
            function checkAssetLoadProgress () {
                //  if sprite almost loaded, invoke callback
                spriteLoadedAmount / spriteLoadedAmount >= 0.8 ? callBackObject.create() : false;
            }
        }
    },

    //  preload assets
    preload: function () {
        console.log('Start preload..');
        //  add banner
        this.sprites.add('banner', 'assets/images/banner.jpg');

        //  invoke create method, if sprite almost loaded
        this.sprites.checkLoadProgress(this);

    },

    //  create main program
    //  start run from preload method
    create: function (){
        console.log('End preload..');
        console.log('\nStart create..');

        //  add banner image
        _('.banner-inner').style.backgroundImage = "url(" + this.sprites.get('banner') +  ")";

        /**
         *  Router
         *  channel Admin object from admin.js
        */
        var pageUrl = location.href;

        //  index page
        if (pageUrl.indexOf('/index.html') > 0) {
            channelAdmin.newGame();
            channelAdmin.rpgGame();
        }
        //  detail page
        else if (pageUrl.indexOf('/detail.html') > 0){
            channelAdmin.detailPage();
        }
    },

    initApp: function (){
        this.preload();
    }
};

$(function (){
    // init app
    app.initApp();
});