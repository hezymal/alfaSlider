(function(window, jQuery) {
  
  jQuery.fn.alfaSlider = function(options) {
    
    // check options
    options = jQuery.extend({}, jQuery.fn.alfaSlider.defaults, options);
    options.speed /= 2;


    // private fields
    var $wrapper  = this.wrapAll('<div></div>').parent();
    var $parent   = $wrapper.parent();
    var lastTop   = 0;
    var stepWidth = $parent.height();
    var animation = { opacity: ['toggle', 'swing'] };


    // set styles
    $wrapper.css({ position: 'absolute', lineHeight: stepWidth + 'px' });
    $parent.css({ position: 'relative', overflow: 'hidden' });


    // private methods
    function complete() {
      lastTop = lastTop - stepWidth;
      lastTop = (Math.abs(lastTop) >= $wrapper.height()) ? 0 : lastTop;
      $wrapper.css({ top: lastTop + 'px' });
      $wrapper.animate(
        { opacity: ['toggle', 'swing'] }, 
        options.speed, 
        'easeInSine'
      );
    }

    function update() {
      $wrapper.animate(
        { opacity: ['toggle', 'swing'] }, 
        options.speed, 
        'easeInSine', 
        complete
      );
    }


    // run
    setInterval(update, options.tick);


    // return result
    return this;
  };

  jQuery.fn.alfaSlider.defaults = {
    tick: 3000,
    speed: 1000,
  };

})(window, jQuery);