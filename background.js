chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    $.ajax({
        type:"get",
        url: "http://wos.wondershare.cn/sign/info",
        success:function(data){
            alert(data);
        },
        error: function(errorThrown){
            alert(1111);
            console.log(errorThrown);
        }
        });
});

(function(){
    $("#button").click(function(){
        chrome.extension.sendMessage({'txt': '这里是发送的内容'}, function(d){
            console.log(d); // 将返回信息打印到控制台里
        });
    });
})

function getDomainFromUrl(url){
    var host = "null";
    if(typeof url == "undefined" || null == url)
         url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if(typeof match != "undefined" && null != match)
         host = match[1];
    return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
    if(getDomainFromUrl(tab.url).toLowerCase()=="wos.wondershare.cn"){
         chrome.pageAction.show(tabId);
    }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);