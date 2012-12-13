var wandouInjector = function($human, bloodSelector) {
    /***
     * 下载按钮附加在 human 这个 jQuery Object 上面
     * bloodSelector 是需要提取出来的资源的 jQuery Object 的选择器
     */

    var $downloadButton = $('<a href="#" id="wd_dlButton" title="Download">下载</a>');
    var assetHref = '';
    var hrefTail = '';

    var currentFile = '';

    var hrefBuilder = function(rawHref, type) {
        var contentTypeMap = {
            'app': 'application',
            'zip': 'application/zip',
            'image': 'image',
            'video': 'video',
            'audio': 'audio',
            'book': 'book',
            'other': 'file'
        };

        if (!contentTypeMap.hasOwnProperty(type) || type.length === 0) {
            type = 'other';
        }

        return rawHref.replace(/([^\/]+)$/, function(match, fileName, offset, rawHref) {
            currentFile = fileName;
            return match + "#name=" + fileName + "&content-type=" + contentTypeMap[type];
        });

    };

    $human.on('mouseenter', function() {
        var $blood = $(this).find(bloodSelector);
        var _offset = $(this).offset();

        if ($.nodeName($blood[0], 'img')) {// if bloodType is image.
            assetHref = $blood.attr('src');
        }

        if ($('.wd_dlButton').length === 0) {
            $('body').append($downloadButton);
        }

        var dlButtonLeft =  parseInt(_offset.left + $human.outerWidth() / 2 - $downloadButton.outerWidth() / 2, 10);
        var dlButtonTop = parseInt(_offset.top + $human.outerHeight() / 2 - $downloadButton.outerHeight() / 2, 10);

        $downloadButton
        .attr('href', hrefBuilder(assetHref, 'image'))
        .attr('download', currentFile)
        .css({
            'top': dlButtonTop,
            'left': dlButtonLeft
        });
    });
};

