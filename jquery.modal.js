/**
*    @name                            Modal
*    @descripton                        Modal creates modals
*    @version                        1.0
*    @requires                        Jquery 1.4.2
*
*    @author                            Jan Jarfalk
*    @author-email                    jan.jarfalk@unwrongest.com
*    @author-website                    http://www.unwrongest.com
*
*    @licens                            MIT License - http://www.opensource.org/licenses/mit-license.php
*/

(function($) {
    
    $.modal = function() {
    
        var callback     = callback || function(){},
            $container    = $('#modal-wrap'),
            $document    = $(document),
            $overlay    = $('#modal-overlay');
                
        $.modal.empowerLinks = function() {
            
            $('a[rel*=modal]').live('click', function( event ){

                var $this = $(this);
                var modal = $this.attr('href');
                
                $.modal.open(modal);
                                
            });
            
        }

        $.modal.open = function(modal) {
            
            $('.modal', $container).hide();
            var $modal;
            
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
            
                if(!$modal.length) {
                    return false;
                }
                $modal.css('top', $(window).scrollTop());
                
                $container.show();
                $modal.show();
    
            }
            
			$(window).resize(function () {
				$modal.css('top', $(window).scrollTop());
			});

                
            $document.bind( 'keypress.modal' , function( event ){
                if( event.keyCode === 27 ){
                    $.modal.close();
                }
            });
                
            $container.live('click.modal', function( event ){
                
                if(event.target.className == 'overlay' || event.target.className == 'modal-close'){
                    event.preventDefault();
                    $.modal.close();
                }
                
            });
        }
        
        $.modal.close = function( index, item ) {
        	window.location.hash = 'closed';
            $document.unbind( 'keypress.modal' );
            $container.unbind( 'click.modal' );                
            $('.modal', $container).hide();
            $container.hide();
            
        }

        $('.modal', $container).hide();
        
        if(location.hash.length > 0) {
            $.modal.open(location.hash);
        }
        
        $.modal.empowerLinks();

    }

})(jQuery);