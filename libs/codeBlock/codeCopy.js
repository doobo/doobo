// 代码块一键复制
$(function () {
    var $copyIcon = $('<i class="fas fa-copy code_copy" title="复制代码" aria-hidden="true"></i>')
    var $notice = $('<div class="codecopy_notice"></div>')
    $('.code-area').prepend($copyIcon)
    $('.code-area').prepend($notice)
    // “复制成功”字出现
    function copy(text, ctx) {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            try {
                document.execCommand('copy') // Security exception may be thrown by some browsers.
                $(ctx).prev('.codecopy_notice')
                    .text("复制成功")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 450, function () {
                        setTimeout(function () {
                            $(ctx).prev('.codecopy_notice').animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
            } catch (ex) {
                $(ctx).prev('.codecopy_notice')
                    .text("复制失败")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 650, function () {
                        setTimeout(function () {
                            $(ctx).prev('.codecopy_notice').animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
                return false
            }
        } else {
            $(ctx).prev('.codecopy_notice').text("浏览器不支持复制")
        }
    }
    // 复制
    $('.code-area .fa-copy').on('click', function () {
        var selection = window.getSelection()
        var range = document.createRange()
        range.selectNodeContents($(this).siblings('pre').find('code')[0])
        selection.removeAllRanges()
        selection.addRange(range)
        var text = selection.toString()
        copy(text, this)
        selection.removeAllRanges()
    })
    //复制符合条件的代码
    var tag = $("code.language-\\&copy\\=");
    if(tag && tag.length > 0){
        var fas = $('.code-area .fa-copy')
        if(!fas || fas.length === 0){
            return;
        }
        var lg = fas.length;
        var code;
        for(var i = 0; i < lg; i++){
            code = $(fas[i]).siblings('pre.line\\-numbers.language\\-\\&copy\\=')
            if(code && code.length > 0){
                break;
            }
        }
        $(document).one('click', function () {
            if(code){
                $(code).siblings('.code-area .fa-copy').click();
            }
        });
        $(document).one('touchend', function () {
            if(code){
                $(code).siblings('.code-area .fa-copy').click();
            }
        });
    }
});
