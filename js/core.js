var slideshow;

$(document).ready(function(){
	
	$("html").removeClass("no-js");
	
	sidebar.ready();
	content.ready();
		
	$("div#sidebar div.sidebar div.item").hoverIntent({    
		over: function () {
	    	var el = $(this);
	    	el.children("a").fadeTo(300,1); 
	    	el.children("div.item_bg").animate({ opacity: 0 }, 1100);
	  	},
	    timeout: 200, 
	    out: function () {
	    	$(this).children("div.item_bg").animate({ opacity: 0.8 }, 800);	 
	    	$(this).children("a").fadeTo(800,0.4);    	
	  	} 
	});
	
	
	/** ajax form */
	$("form.ajaxform").live("submit",(function(){
		debugger;
		var el = $(this);
		el.fadeTo(500,'0.5').addClass('loader');
		
		$.ajax({
			url: el.attr("action")+'?ajax=1',
			data: el.serialize(),
			type: 'post',
			cache: false,
			dataType: 'html',
			success: function (data) {
				$("select").selectBox('destroy');
				$("input, textarea").placeholder();						
				el.html(data).fadeTo(500,'1').removeClass('loader');
				$("select").selectBox();
			}
		});
		
		return false;

	}));	
	
	$("form .gallery-nextstep").live("click",function(){
		$("select").selectBox('close');
		$(this).fadeOut(500);
		$(".nextstep").fadeIn(500, function(){
			$(window).trigger('resize'); 
		});
		return false;
	});	

	$("#fb a.close-fb").live("click",function(){
		$("#fb").fadeOut(250);
		return false;
	});
	
	setTimeout(function(){
		$("#fb").fadeIn(500);
	}, 10000);

});
	
var sidebar = {
	
	ready: function(){
		
		var that = this;
		
		that.onResize();
		
		$(window).resize(function() { 
			that.onResize();
		});
		
		$(document).scroll(function() { 
			that.onScroll();
		});	
						
		$("div.scroll").live("click",function(){
			$.scrollTo( $(this).data("value"), 400 );
		});
			
		$("body").addClass("startup").delay(1500).queue(function () {
			$(this).removeClass("startup");
			$(this).dequeue();
		});
	
	},
	onResize: function(){
		if ( $(document).height() > $("#page").height() ) {
			$(".scroll-bottom").fadeIn(250);
			$(".sidebar-items").css({paddingBottom: 19 + 'px'});
		} else {
			$(".scroll-bottom").fadeOut(250);
			$(".sidebar-items").css({paddingBottom: 0 + 'px'});
		}		
	},
	onScroll: function(){
		if ( $(document).scrollTop() > 0 ){
			$(".scroll-top").fadeIn(250);
		} else {
			$(".scroll-top").fadeOut(250);
		}
		if ( $(document).scrollTop() == $(document).height() - $(window).height() ){
			$(".scroll-bottom").fadeOut(250);
			$(".sidebar-items").css({paddingBottom: 0 + 'px'});		
		} else {
			$(".scroll-bottom").fadeIn(250);
			$(".sidebar-items").css({paddingBottom: 19 + 'px'});			
		}	
	}	
	
}


var content = {
	
	ready: function(){
		content.slideshow = ltSlideshow();
		content.hashControll();
		
		$(window).bind('hashchange', function() {
			content.hashControll();
		});
		$("#sidebar div.item").live("lick", function(){
			var _this = this;
			$("#sidebar div.item").removeClass("current");
			$(_this).addClass("current");
		});
		content.show();
	},	
	show: function(nls_hash){
		$("#gallery-content").css({opacity: 0, display: "block"}).animate({opacity: 1 }, 750);
		$("#gallery-supplies,#gallery").hide().fadeIn(500);
		
		if ($("#gallery-content").length){
			$("html").addClass('hasContent');
			$("#gallery-content").setDocumentHeight();	
		} else {
			$("html").removeClass('hasContent');
		}
		
		if (nls_hash){						
			setTimeout(function() {
				content.sidebar.children("div.item_bg").animate({ opacity: 0.8 }, 800);	 
	    		content.sidebar.children("h3").fadeTo(800,0.4);   				 	
			}, 2000);	
		}		
		
		$("select").selectBox();
		$("input, textarea").placeholder();		
		
	},
	hide: function(nls_hash){
		$("#gallery-supplies,#gallery").fadeOut(500);
		$("#gallery-content").animate({ opacity: 0 }, 500);		
		$(".gallery-name").fadeOut(250);
		if (nls_hash){	
			content.sidebar = $("#sidebar div.item[data-slug='"+nls_hash[0]+"']");
			content.sidebar.children("div.item_bg").animate({ opacity: 0 }, 800);
    		content.sidebar.children("h3").fadeTo(300,1);
    	} 		
		
	},
	hashControll: function(){
		
		if(window.location.hash) {
			var nls_hash = window.location.hash;
			if (nls_hash.indexOf("#!") != -1) {
				nls_hash = nls_hash.replace("#!","");
				if ( !isNaN( nls_hash.replace(/\//g,"") ) ){
					nls_hash = nls_hash.replace(/\//g,"");
					$("#gallery-nav li a[data-id='"+nls_hash+"']").trigger("click");
				} else {
					nls_hash = nls_hash.split("/");
					content.hide(nls_hash);
					if ( !$(".gallery-action div").hasClass("play") ){
						$(".gallery-action div").trigger("click");
					}
					
					content.url = "/"+nls_hash[0]+"/?ajax=1";
					
					if (nls_hash[0] == 'prints' && nls_hash[1]){
						content.url = "/"+nls_hash[0]+"/?print="+nls_hash[1]+"&ajax=1";
					}
					
						$("#gallery #gallery-items").html(results.items);
									
								$("#gallery").data("title", results.title_raw);
								
								$("#gallery-actions").html(results.actions);
								
									
								if (results.title) {
									$(".gallery-name span").html(results.title);
									$(".gallery-name").delay(500).queue(function () {
										$(this).fadeIn(1250);
										$(this).dequeue();
									});
								}
								
								$("#gallery-content").remove();

								if (results.content){
									$("#box").after('<div id="gallery-content"><div class="gallery-content">'+results.content+'</div></div>');						
								}										
								
								if (nls_hash[0] !== 'home'){
									document.title = results.title_raw + " ? Northlandscapes.com";
								} else {
									document.title ="Northlandscapes.com";
								}	
																
								content.show(nls_hash);
								content.slideshow.ready();	
									
								try {
							    	if ( !isNaN( nls_hash[1].replace(/\//g,"") ) ){
										nls_hash = nls_hash[1].replace(/\//g,"");
										$("#gallery-nav li a[data-id='"+nls_hash+"']").trigger("click");
									}
						    	} catch (err) {}
				}
			}
		} else {
			content.slideshow.ready();	
		}	
	}
	
};
