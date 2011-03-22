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
    
    $.modal = function() {
    	
    	//Settings
        var callback     = callback || function(){},
            $container    = $('#modal-wrap'),
            $document    = $(document),
            $overlay    = $('#modal-overlay');
               
		//Open function
        $.modal.open = function(modal) {
            //Hide all the modals
            $('.modal', $container).hide();
            var $modal;
            
            //Checks if it is a anchor link or an normal link. If its normal open with ajax (get)
            if(modal.match(/#/)){
                $modal = $(modal);
                show();    
            } else {
                $.get(modal, function( element ){
                    $modal = $(element);
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
			
			//Close with esc key (27)
            $document.bind( 'keypress.modal' , function( event ){
            
                if( event.keyCode === 27 ){
                    $.modal.close();
                }
                
            });
            
            //Close when clicking on overlay    
            $container.live('click.modal', function( event ){
            
                if(event.target.className == 'overlay' || event.target.className == 'modal-close'){
                    event.preventDefault();
                    $.modal.close();
                }
                
            });        
        }
        
        //Close function
        $.modal.close = function( index, item ) {
	        //Changes the hash to closed
        	window.location.hash = 'closed';
      		
      		//Unbind events  	
            $document.unbind( 'keypress.modal' );
            $container.unbind( 'click.modal' );
            
            //Hide modal, and container             
            $('.modal', $container).hide();
            $container.hide();
            
        }
		
		//Hide any modal, thats open.
        $('.modal', $container).hide();
        
        //If you have any hash open it
        if(location.hash.length > 0) {
            $.modal.open(location.hash);
        }

    }

})(jQuery);