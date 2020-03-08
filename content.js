/* (function() {
    var origOpen = XMLHttpRequest.prototype.open;
    
    XMLHttpRequest.prototype.open = function() {
        // console.log('request started!');
        this.addEventListener('load', function() {
            console.log(this.responseText); // 得到Ajax的返回内容
        });
        origOpen.apply(this, arguments);
    };
})(); */