(function(){
    var isEnabled = true;
    try{
        getSelection();
        document.execCommand('copy',false);
    }catch(e){
        isEnabled = false;
    }
    if(!(isEnabled)){
        return;
    }
    function getPreRange(e) {
        var t = getSelection();
        t.removeAllRanges();
        var n = document.createRange();
        n.selectNodeContents(e),
        t.addRange(n),
        document.execCommand('copy'),
        t.removeAllRanges()
    }
    function copyPre(e) {
        var t = createPre(e);
        document.body.appendChild(t),
        getPreRange(t),
        document.body.removeChild(t)
    }
    function copyText(elem) {
        elem.select(),
        document.execCommand('copy'),
        getSelection().removeAllRanges()
    }
    function isText(elem) {
        return elem.value&&('INPUT' === elem.nodeName || 'TEXTAREA' === elem.nodeName)
    }
    var ZeroClipboard = function(content,options){
        var self = this;
        this.elem = $(content);
        this.txt = $('#'+this.elem.data('clipboard-target'));
        !options.hoverClass||this.on('ZeroClipboard.hover',function(){
          $(this).toggleClass(options.hoverClass);
        });
        setTimeout(function(){self.elem.trigger('ZeroClipboard.ready');},300);

        var click = function(){
          try{
              copyPre(self.txt.val());
              self.elem.trigger('ZeroClipboard.aftercopy');
          }catch(e){
              self.elem.trigger('ZeroClipboard.error',[{name:'error'}]);
          }
        };
        this.elem.on('click',click);
        ZeroClipboard.destroy = function(){
          this.elem.off('ZeroClipboard.click ZeroClipboard.error ZeroClipboard.ready ZeroClipboard.aftercopy ZeroClipboard.hover');
        };
        return this;
    };
    ZeroClipboard.prototype.on = function(type,callback){
        this.elem.on('ZeroClipboard.'+type,$.proxy(callback,this));
        return this;
    }
    function createPre(e) {
        var t = document.createElement('pre');
        return t.style.width = '1px',
        t.style.height = '1px',
        t.style.position = 'fixed',
        t.style.top = '5px',
        t.textContent = e,
        t
    }
    window.ZeroClipboard = ZeroClipboard;
})();
