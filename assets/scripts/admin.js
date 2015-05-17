/**
 * Created by sammok on 17/05/15.
 */
"use strict";

var channelAdmin = {
    /** productArr from data.js */
    productData: {
        new: productArr.new,
        action: productArr.action,
        fps: productArr.fps,
        rpg: productArr.rpg
    },

    newGame: function (){
        //  init basic page
        var that = this,
            itemsPerPage = 3;
        this.listConstructor('.new-game', 'new', Math.ceil(this.productData.new.length/itemsPerPage), itemsPerPage, 1);

        //  pagination
        $('.scene-newgame .pagination').twbsPagination({
            totalPages: Math.ceil(that.productData.new.length/itemsPerPage), //  show 3 item per page
            visiblePages: 10,
            onPageClick: function (event, page) {
                that.listConstructor('.new-game', 'new', this.totalPages, itemsPerPage, page);
            }
        });
    },

    rpgGame: function (){
        //  init basic page
        var that = this,
            itemsPerPage = 3;
        this.listConstructor('.rpg-game', 'rpg', Math.ceil(this.productData.new.length/itemsPerPage), itemsPerPage, 1);

        //  pagination
        $('.scene-rpggame .pagination').twbsPagination({
            totalPages: Math.ceil(that.productData.rpg.length/itemsPerPage), //  show 3 item per page
            visiblePages: 10,
            onPageClick: function (event, page) {
                that.listConstructor('.rpg-game', 'rpg', this.totalPages, itemsPerPage, page);
            }
        });
    },

    listConstructor: function (listDom, channelName, lastPage, itemsPerPage, currentPage){
        var that = this;

        //  create product list item for current page
        function createProductList (listDom, channelName, lastPage, itemsPerPage, currentPage){
            var itemsDom = '',
                itemIndex,
                itemEndIndex;

            //  first item's index and last item's index of current page
            itemIndex = currentPage == 1 ? 0 : (currentPage-1)*itemsPerPage;
            itemEndIndex = currentPage == lastPage ? this.productData[channelName].length : itemIndex + 3;

            //  create list item dom
            for (itemIndex; itemIndex < itemEndIndex; itemIndex++) {
                var listData = that.productData[channelName][itemIndex],
                    itemLink = '/game_ocean/detail.html?type=' + listData.type + '&id=' + listData.id;

                itemsDom += '<div class="product-list-item col-sm-6 col-md-4">' +
                                '<div class="thumbnail">' +
                                    '<div class="thumb">' +
                                        '<a href="' + itemLink + '"><img src="' + listData.thumbLink + '" alt="..."></a>' +
                                    '</div>' +
                                    '<div class="caption">' +
                                        '<h3 class="name"><a href="' + itemLink + '">' + listData.name + '</a><small>' + listData.type + '</small></h3>' +
                                        '<p class="description">' + listData.description.substr(0, 60) + '...</p>' +
                                        '<p><a href="' + itemLink + '" class="btn btn-primary" role="button">Add to Cart</a> <a href="#" class="btn btn-default" role="button">Details</a></p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
            }

            //  insert list item to page
            _(listDom).innerHTML = itemsDom;
        }

        //  invoke create list method
        createProductList(listDom, channelName, lastPage, itemsPerPage, currentPage);
    },

    detailPage: function (){
        /**
         *  Router
         *  pageUrl format:  domain/detail.html?type={string}&id={num}
         * */
        var pageUrl = location.href,
            typeSubStart = pageUrl.indexOf('?type=') + '?type='.length,
            typeSubEnd = pageUrl.indexOf('&', typeSubStart),
            type = pageUrl.substring(typeSubStart, typeSubEnd),

            idSubStart = pageUrl.indexOf('id=') + 'id='.length,
            id = pageUrl.substring(idSubStart, location.href.length);

        var productData = null;
        //  get product data
        if (this.productData[type]) {
            for (var i = 0; i < this.productData[type].length; i++) {
                if (this.productData[type][i].id == id ) {
                    productData =  this.productData[type][i];
                    break;
                }
            }
        } else {
            window.history.back();
        }

        //  create detail page content
        productData ? this.detailConstructor(productData) : false;
    },

    //  create detail page content
    detailConstructor: function (productData){
        var productData = productData;
        productData.name ? _('.detail-name').innerHTML = productData.name : '';
        productData.type ? _('.detail-type').getElementsByTagName('span')[0].innerHTML = productData.type : '';
        productData.description ? _('.detail-description').innerHTML = productData.description : '';
    }
};