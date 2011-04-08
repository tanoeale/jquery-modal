/**
*    @name                            Modal
*    @descripton                      Modal creates modals
*    @version                         1.0
*    @requires                        Jquery 1.4.2
*
*    @author                          Jan Jarfalk
*    @author-email                    jan.jarfalk@unwrongest.com
*    @author-website                  http://www.unwrongest.com
*
*    @licens                          MIT License - http://www.opensource.org/licenses/mit-license.php
*/

(function($) {
    $.modal = function(options) {
    	
    	//Defaults
        var defaults = {
    		trigger: '[rel*=modal]',
            modal: '.modal',
            container : '#modal-wrap',
            overlay : '#modal-overlay',
            close: '.modal-close',
            closeHash: 'closed'
        }
             
        var options =  $.extend(defaults, options);
    	    	
    	
    	
    	//Settings
        var $container    = $(options.container),
            $document    = $(document),
            $overlay    = $(options.overlay);
        
               
		//Open function
        $.modal.open = function(modal) {
        
            //Hide all the modals
            $('.ajax', $container).remove();
            $(options.modal, $container).hide();
            var $modal;
            
            //Checks if it is a anchor link or an normal link. If its normal open with ajax (get)
            if(modal.match(/#/)){
                $modal = $(modal);
                show();    
            } else {
                $.get(modal, function( element ){
                    $modal = $(element).addClass('ajax');
                    $overlay.after($modal);
                    show();
                });
            }
            
            function show(){
            	//Check if a model exists
                if(!$modal.length) {
                    return false;
                }
                
                //Place the modal where you are
                fixScroll();
                
                //Show container and modal
                
                $container.show();
                $modal.show();
                
                // :( Ie 7 fix
                if($.browser.msie && $.browser.version < 8.0) {
	                setTimeout(function () {
	                	$(window).scrollTop($modal.offset().top)
	                }, 1);
                } 
                
               
            }
			
			//Move the modal to where you are according to scroll window.
			function fixScroll() {
                if(!$modal.length) {
                    return false;
                }
                
                var scrollTop = $(window).scrollTop();
               	$modal.css('top', scrollTop);
               	
			}
			
			//If you change window, fix the modal so it doesnt follow it (like closing firebug for ff)
			$(window).bind('resize', fixScroll);

            //Close by clicking close
            $(options.close, $modal).live( 'click' , function( event ){
            
                event.preventDefault();
                $.modal.close($modal);
                
            });

			
			//Close with esc key (27)
            $document.bind( 'keypress.modal' , function( event ){
            
                if( event.keyCode === 27 ){
                    $.modal.close( $modal.attr('id') );
                }
                
            });
            
            //Close when clicking on overlay    
            $container.live('click.modal', function( event ){
            
                if(event.target.className === $overlay.attr('class') || event.target.className === $(options.close, $modal).attr('class')){
                    event.preventDefault();
                    $.modal.close( $modal.attr('id') );
                }
                
            });        
        }
        
        //Close function
        $.modal.close = function(modal) {
        	
        	var $modal = $(modal);
        	
	        //Changes the hash to closed
        	window.location.hash = options.closeHash;
      		
      		//Unbind events  	
            $document.unbind( 'keypress.modal' );
            $container.unbind( 'click.modal' );
            
            //Hide modal, and container, if its an ajax loaded modal, remove it
            if($modal.hasClass('ajax')) {
           		$modal.remove();
           	}             
            $(options.modal, $container).hide();
            $container.hide();
            
        }
		
		//Hide any modal, thats open.
        $(options.modal, $container).hide();
        
        //If you have any hash open it
        if(location.hash.length > 0) {
            $.modal.open(location.hash);
        }
        
        //Default trigger
        $(options.trigger).live('click', function() {
        	$.modal.open($(this).attr('hash'));
        });

    }

})(jQuery);
$.modal();