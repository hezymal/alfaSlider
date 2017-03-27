(function(window, jQuery) {
  
  jQuery.fn.alfaSlider = function(options) {
    
    // check options
    options = jQuery.extend({}, jQuery.fn.alfaSlider.defaults, options);
    options.speed /= 2;


    // private fields
    var $container = this;
    var $wrapper   = $container.wrapAll('<div></div>').parent();
    var $element   = $container.children();
    var level      = 0;
    var minLevel;
    var stepHeight;


    // set styles
    $wrapper.css({ 
      position    : 'relative',
      overflow    : 'hidden',
    });

    $container.css({ 
      position    : 'absolute',
    });


    // private methods
    function init() {
      stepHeight  = $element.outerHeight(true);
      minLevel    = -Math.floor($container.innerHeight() / stepHeight);
      $wrapper.css('height', stepHeight);
    }

    function complete() {
      level = (level - 1 <= minLevel) ? 0 : level - 1;

      $container.css({ top: level * stepHeight + 'px' });
      $container.animate(
        { opacity: ['1.0', 'swing'] }, 
        options.speed, 
        'easeInSine'
      );
    }

    function update() {
      $container.animate(
        { opacity: ['0.0', 'swing'] }, 
        options.speed, 
        'easeInSine', 
        complete
      );
    }


    // run
    init();
    $(window).on('resize', init);
    setInterval(update, options.tick);


    // return result
    return this;
  };

  jQuery.fn.alfaSlider.defaults = {
    tick: 3000,
    speed: 1000,
  };

})(window, jQuery);