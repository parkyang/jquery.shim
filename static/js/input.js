/**
 * jQuery input event
 * 向下兼容IE6/7/8/9
 * 基于IE9BUG 不用onpropertychange事件，统一采用定时器监测
 */
!function($){
    if(document.oninput !== undefined && !/MSIE 9/.test(navigator.userAgent)){
      if(!$.fn.input){
        $.fn.input = function(callback){
            return typeof callback==='function'?this.on('input',callback):this.trigger('input');
        }
      }
      return false;
    }
    var timer = null,eventName = 'input';
    function blur(){
        clearTimeout(timer);
    }
    function focus(){
        var that = this;
        function input(){
            timer = setTimeout(function(){
                if(that.__value !== that.value){
                    that.__value = that.value;
                    $.event.trigger('input',null,that);
                }
                input();
            },120);
        }

        that.__value = that.value;
        input();
    }

    $.event.special.input = {
        add:function(handleObj){
          $(this).on('blur',handleObj.selector,blur);
          $(this).on('focus',handleObj.selector,focus);
        },
        teardown:function(){
          $.event.remove($(this),eventName);
          delete this.__value;
				}
    };
    $.fn[eventName] = function(callback){
        return typeof callback==='function'?this.on(eventName,callback):this.trigger(eventName);
    }
}(jQuery);
