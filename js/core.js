var slideshow;

$(document).ready(function() {

    $("html").removeClass("no-js");

    sidebar.ready();
    content.ready();

    $("div#sidebar div.sidebar div.item").hoverIntent({
        over: function() {
            var el = $(this);
            el.children("a").fadeTo(300, 1);
            el.children("div.item_bg").animate({
                opacity: 0
            }, 1100);
        },
        timeout: 200,
        out: function() {
            $(this).children("div.item_bg").animate({
                opacity: 0.8
            }, 800);
            $(this).children("a").fadeTo(800, 0.4);
        }
    });


    /** ajax form */


    $("form .gallery-nextstep").live("click", function() {
        $("select").selectBox('close');
        $(this).fadeOut(500);
        $(".nextstep").fadeIn(500, function() {
            $(window).trigger('resize');
        });
        return false;
    });

    $("#fb a.close-fb").live("click", function() {
        $("#fb").fadeOut(250);
        return false;
    });

    setTimeout(function() {
        $("#fb").fadeIn(500);
    }, 10000);

});

var sidebar = {

    ready: function() {

        var that = this;

        that.onResize();

        $(window).resize(function() {
            that.onResize();
        });

        $(document).scroll(function() {
            that.onScroll();
        });

        $("div.scroll").on("click", function() {
            $.scrollTo($(this).data("value"), 400);
        });

        $("body").addClass("startup").delay(1500).queue(function() {
            $(this).removeClass("startup");
            $(this).dequeue();
        });

    },
    onResize: function() {
        if ($(document).height() > $("#page").height()) {
            $(".scroll-bottom").fadeIn(250);
            $(".sidebar-items").css({
                paddingBottom: 19 + 'px'
            });
        } else {
            $(".scroll-bottom").fadeOut(250);
            $(".sidebar-items").css({
                paddingBottom: 0 + 'px'
            });
        }
    },
    onScroll: function() {
        if ($(document).scrollTop() > 0) {
            $(".scroll-top").fadeIn(250);
        } else {
            $(".scroll-top").fadeOut(250);
        }
        if ($(document).scrollTop() == $(document).height() - $(window).height()) {
            $(".scroll-bottom").fadeOut(250);
            $(".sidebar-items").css({
                paddingBottom: 0 + 'px'
            });
        } else {
            $(".scroll-bottom").fadeIn(250);
            $(".sidebar-items").css({
                paddingBottom: 19 + 'px'
            });
        }
    }

}


var content = {

    ready: function() {
        content.slideshow = ltSlideshow();
        content.hashControll();

        $(window).on('hashchange', function() {
            content.hashControll();
        });
        $("#sidebar div.item").on("lick", function() {
            var _this = this;
            $("#sidebar div.item").removeClass("current");
            $(_this).addClass("current");
        });
        content.show();
    },
    show: function(nls_hash) {
        $("#gallery-content").css({
            opacity: 0,
            display: "block"
        }).animate({
            opacity: 1
        }, 750);
        $("#gallery-supplies,#gallery").hide().fadeIn(500);

        if ($("#gallery-content").length) {
            $("html").addClass('hasContent');
            $("#gallery-content").setDocumentHeight();
        } else {
            $("html").removeClass('hasContent');
        }

        if (nls_hash) {
            setTimeout(function() {
                content.sidebar.children("div.item_bg").animate({
                    opacity: 0.8
                }, 800);
                content.sidebar.children("h3").fadeTo(800, 0.4);
            }, 2000);
        }

        $("select").selectBox();
        $("input, textarea").placeholder();

    },
    hide: function(nls_hash) {
        $("#gallery-supplies,#gallery").fadeOut(500);
        $("#gallery-content").animate({
            opacity: 0
        }, 500);
        $(".gallery-name").fadeOut(250);
        if (nls_hash) {
            content.sidebar = $("#sidebar div.item[data-slug='" + nls_hash[0] + "']");
            content.sidebar.children("div.item_bg").animate({
                opacity: 0
            }, 800);
            content.sidebar.children("h3").fadeTo(300, 1);
        }

    },
    hashControll: function() {

        if (window.location.hash) {
            var nls_hash = window.location.hash;
            if (nls_hash.indexOf("#!") != -1) {
                nls_hash = nls_hash.replace("#!", "");
                if (!isNaN(nls_hash.replace(/\//g, ""))) {
                    nls_hash = nls_hash.replace(/\//g, "");
                    $("#gallery-nav li a[data-id='" + nls_hash + "']").trigger("click");
                } else {
                    nls_hash = nls_hash.split("/");




                    var test = content.createGalleryList(nls_hash[0]);
                    $("#gallery #gallery-items").html(test);

    

             

                    content.show(nls_hash);
                    content.slideshow.ready();

                    try {
                        if (!isNaN(nls_hash[1].replace(/\//g, ""))) {
                            nls_hash = nls_hash[1].replace(/\//g, "");
                            $("#gallery-nav li a[data-id='" + nls_hash + "']").trigger("click");
                        }
                    } catch (err) {}
                }
            }
        } else {
            content.slideshow.ready();
        }
    },
    createGalleryList:function(galleryType){
    	var glleryDom = "";
    	if(galleryType == "A"){
    		glleryDom = "<div class='gallery-item'><img src='img/A-1.jpg' alt='' style='display: none;' /></div><div class='gallery-item'><img src='img/A-2.jpg' alt='' style='display: none;' /></div><div class='gallery-item'><img src='img/A-3.jpg' alt='' style='display: none;' /></div><div class='gallery-item'><img src='img/A-4.jpg' alt='' style='display: none;' /></div>"              
    	}else if (galleryType == "B"){
    		glleryDom = "<div class='gallery-item'><img src='img/B-1.jpg' alt='' style='display: none;' /></div><div class='gallery-item'><img src='img/B-2.jpg' alt='' style='display: none;' /></div><div class='gallery-item'><img src='img/B-3.jpg' alt='' style='display: none;' /></div>"
    	}else if (galleryType == "C"){
    		glleryDom = "<div class='gallery-item'><img src='img/C-1.jpg' alt='' style='display: none;' /></div><div class='gallery-item'><img src='img/C-2.jpg' alt='' style='display: none;' /></div>"
    	}else if(galleryType == "D"){
    		glleryDom = "<div class='gallery-item'><img src='img/D-1.jpg' alt='' style='display: none;' /></div>"
    	}else if (galleryType == "E"){
    		glleryDom = "<div class='gallery-item'><img src='img/E-1.jpg' alt='' style='display: none;' /></div>"
    	}else if (galleryType == "F"){
    		glleryDom = "<div class='gallery-item'><img src='img/F-1.jpg' alt='' style='display: none;' /></div><div class='gallery-item'><img src='img/F-2.jpg' alt='' style='display: none;' /></div><div class='gallery-item'><img src='img/F-3.jpg' alt='' style='display: none;' /></div><div class='gallery-item'><img src='img/F-4.jpg' alt='' style='display: none;' /></div>"              
    	}
    	return glleryDom;
    }

};
