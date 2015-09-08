;(function ( $, window, document, undefined ) {

  var methods, settings;
  var state = 1;
  
  settings = {
    animationSpeed: 500,
    animationEasing: 'linear',
    curtainClass: 'curtain',
    curtainLeftClass: 'left',
    curtainRightClass: 'right',
    curtainElement: 'div',
    inactiveShowElement: '.site-name',
    inactiveDisplay: 'block',
    activeShowElement: '.site-tagline'
  };
  
  methods = {
  
    init: function ( options ) {
      if ( options ) { $.extend(settings, options); }
      
      return this.each(function() {
        methods.addCurtains($(this));
        methods.setWidths($(this));
        methods.bindEvents($(this));
      });
      
    },
    
    bindEvents: function ( el ) {
      
      el.hover(function() {

        state = 2;
        
        methods.closeCurtains(el, function() {
          el.find(settings.inactiveShowElement).css({
            'display': 'none'
          });
          methods.openCurtains(el);
        });
        
      }, function() {

        state = 1;
      
        methods.closeCurtains(el, function() {
          el.find(settings.inactiveShowElement).css({
            'display': settings.inactiveDisplay
          });
          methods.openCurtains(el);
        });
      
      });
      
      $(window).resize(function() {
        methods.setWidths(el);
      });
      
      
    },
    
    closeCurtains: function ( el, cb ) {
      
      if ( typeof cb !== "function" ) {
        cb = function() {};
      }
      
      el.find('.'+settings.curtainClass).stop().dequeue().animate({
        'width': methods.getActiveWidth(el) + 'px'
      }, settings.animationSpeed, settings.animationEasing, cb);
      
    },
    
    openCurtains: function ( el, cb ) {
    
      if ( typeof cb !== "function" ) {
        cb = function() {};
      }

      if (state === 1) {

        el.find('.'+settings.curtainClass).stop().dequeue().animate({
          'width': methods.getInactiveWidthAlt(el) + 'px'
        }, settings.animationSpeed, settings.animationEasing, cb);

      } else {
        
        el.find('.'+settings.curtainClass).stop().dequeue().animate({
          'width': methods.getInactiveWidth(el) + 'px'
        }, settings.animationSpeed, settings.animationEasing, cb);

      }
    
    },
    
    setWidths: function( el ) {
      
      el.find('.'+settings.curtainClass).width(methods.getInactiveWidthAlt(el));
      
    },
    
    addCurtains: function ( el ) {
      
      if ( el.find( '.' + settings.curtainClass ).length >= 2 ) {
        return;
      }
      
      if ( el.find( '.' + settings.curtainClass + '.' + settings.curtainLeftClass).length === 0 ) {
        el.append('<'+settings.curtainElement+' class="'+settings.curtainClass+' '+settings.curtainLeftClass+'"></'+settings.curtainElement+'>');
      }
      
      if ( el.find( '.' + settings.curtainClass + '.' + settings.curtainRightClass).length === 0 ) {
        el.append('<'+settings.curtainElement+' class="'+settings.curtainClass+' '+settings.curtainRightClass+'"></'+settings.curtainElement+'>');
      }
      
    },
    
    getActiveWidth: function ( el ) {
      var elw = el.outerWidth(),
        elh = Math.ceil(elw/2);
      return ( elh > 0 ? elh : 0 );
    },
    
    getInactiveWidth: function ( el ) {
      var elw = el.outerWidth(),
        elh = Math.ceil(elw/2),
        mxe = methods.getMaxShowElement(el),
        mxh = Math.ceil(mxe/2),
        res = elh - mxh;
      return ( res > 0 ? res : 0 );
    },

    getInactiveWidthAlt: function ( el ) {
      var elw = el.outerWidth(),
        elh = Math.ceil(elw/2),
        mxe = el.find(settings.inactiveShowElement).width(),
        mxh = Math.ceil(mxe/2),
        res = elh - mxh;
      return ( res > 0 ? res : 0 );
    },
    
    getMaxShowElement: function( el ) {
      var inWidth = el.find(settings.inactiveShowElement).outerWidth(),
        acWidth =  el.find(settings.activeShowElement).outerWidth();
      return ( acWidth > inWidth ? acWidth : inWidth );
    }
  
  };

  $.fn.kcurtains = function( method ) {
      if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $( 'Method ' +  method + ' does not exist on jQuery.kcurtains' );
      }
  };

})( jQuery, window, document );