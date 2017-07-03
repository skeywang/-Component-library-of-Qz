//dialog 自定义弹窗
SERVER_URL = 'http://192.168.0.167:9091/';
$(function () {
    $(".normal_dialog").click(function () {
        $(".tanceng").show();
        $(this).next(".dialog_box").show(0);
        $(this).next(".dialog_box .dialog_screen").show(0);
        $(this).next(".dialog_box .dialog_content").fadeIn(0);
        return false;
    });

    $(".val_dialog").live("click", function () {
        var name_x = $(this).attr("name");
        var html = $(".dialog_box[name='" + name_x + "']").parent().html(); //单页面的弹窗赋值给变量
        $(".tanceng").html(html).show(); //外层框架的div
        $(".tanceng .dialog_box").show(0);
    });
    var dialog_topindex = 1;
    $(".val_dialogTop").live("click", function () {
        var name_x = $(this).attr("name");
        var html = $(".dialog_box[name='" + name_x + "']").parent().html(); //单页面的弹窗赋值给变量
        $(".tanceng").append(html).show(); //外层框架的div
        $(".tanceng .dialog_box").show();
        $(".dialog_box[name='" + name_x + "']").css({
            "z-index": "" + dialog_topindex + "",
            "position": "absolute"
        });
    });

    $(".dialog_screen").live("click", function () { //用live绑定事件
        $(this).parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if (num < 1) {
            $(".tanceng").hide();
        }
        ;
    });

    $(".dialog_close").live("click", function () {
        $(this).parent().parent().parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if (num < 1) {
            $(".tanceng").hide();
        }
        ;
    });
    $(".dialog_close_but").live("click", function () {
        $(this).parent().parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if (num < 1) {
            $(".tanceng").hide();
        }
        ;
    });
    //取消按钮，关闭弹窗（4月5号）
    $(".dialog_submit .but_cancel").live("click", function () {
        //alert(1111);
        $(this).parent().parent().parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if (num < 1) {
            $(".tanceng").hide();
        }
        ;
    });

    $('.fz_auto_close').live('click', function () {
        $(this).parent().parent().find('.fz_close').click();
    });
    //lik create
    $('body').die('click').live('click', function (e) {
        if ($.inArray('select_list', e.target.classList) == -1) {
            if ($.inArray('select_list_to_top', e.target.classList) == -1 || $.inArray('select_list_to_bottom', e.target.classList) == -1) {
                $('.select_list_to_top').stop(true, true).animate({
                    'height': '0px',
                    'paddingTop': '0px',
                    'paddingBottom': '0px'
                },300);
                $('.select_list_to_bottom').stop(true, true).animate({
                    'height': '0px',
                    'paddingTop': '0px',
                    'paddingBottom': '0px'
                },300);
            }
            $('.select_input').nextAll('.select_list').slideUp(300);
        } else {
            $('.select_list_to_top').stop().css({
                'height': '0px!important',
                'paddingTop': '0px!important',
                'paddingBottom': '0px!important'
            });
            $('.select_list_to_bottom').stop().css({
                'height': '0px!important',
                'paddingTop': '0px!important',
                'paddingBottom': '0px!important'
            });
        }
        if ($.inArray('slider_head_list', e.target.classList) == -1 && $.inArray('slider_head_More', e.target.classList) == -1) {
            $('.slider_head_list').css('display', 'none');
        }
        if ($.inArray('select_list_lik', e.target.classList) == -1 && $.inArray('select_lik_mormal', e.target.classList) == -1) {
            $('.select_lik_input').nextAll('.select_list_lik').slideUp(300);
        }
    });
//select 模拟折叠

    function likTableBottomFn(pageId) {
        likTableBottomNum = $('.py_content_box').height() - $('#' + pageId + ' .vend_title').height() - $('#' + pageId + ' .lik_content_max_height_box').height();
        console.log(likTableBottomNum);
        if (likTableBottomNum >= 200) {
            $('.select_list_to_top').addClass('select_list_to_bottom').removeClass('select_list_to_top');
        } else {
            $('.select_list_to_bottom').removeClass('select_list_to_bottom').addClass('select_list_to_top');
        }
        return likTableBottomNum;
    }
    $('.select_mormal').die('click').live('click', function () {
        var likTableBottomNum = null;
        $('.select_list').not($(this).find('.select_list')).slideUp(300);
        var pageCurrentId = $(this).closest('.py_content').attr('id');
        likTableBottomFn(pageCurrentId);
        if ($(this).find('.select_list').hasClass('select_list_to_top') || $(this).find('.select_list').hasClass('select_list_to_bottom')) {
            if ($(this).find('.select_list_to_bottom').height() == 0) {
                $(this).find('.select_list_to_bottom').stop(true, true).animate({
                    'height': '140px',
                    'paddingTop': '10px',
                    'paddingBottom': '10px'
                });
            } else {
                $(this).find('.select_list_to_bottom').stop(true, true).animate({
                    'height': '0px',
                    'paddingTop': '0px',
                    'paddingBottom': '0px'
                });
            }
            if ($(this).find('.select_list_to_top').height() == 0) {
                $(this).find('.select_list_to_top').stop(true, true).animate({
                    'height': '140px',
                    'paddingTop': '10px',
                    'paddingBottom': '10px'
                });
            } else {
                $(this).find('.select_list_to_top').stop(true, true).animate({
                    'height': '0px',
                    'paddingTop': '0px',
                    'paddingBottom': '0px'
                });
            }
        } else {
            $(this).find('.select_list').slideToggle(300);
        }
        return false;
    });
});

//返回值为空字符串或为空则用“ - ”代替函数
function likNullData(data){
    var newData = '';
    if(data === '' || data == null || data.length == 0){
        newData = ' - ';
    }else{
        newData = data;
    }
    return newData;
}
// 分页函数
function list_table_render_pagination(pag_block_class, params_data, get_list_fun, total_count, item_count, param_url) {
    // config
    var pagination_block_class = pag_block_class + ' ';
    var top_class = pagination_block_class;
    var _params = params_data;
    var _get_list = get_list_fun;

    // end config
    total_count = parseInt(total_count);
    var page = parseInt(_params['page']);
    var numOld = (_params['num']) ? (_params['num']) : (_params['limit']);
    var num = parseInt(numOld);

    var total_page_count = Math.ceil(total_count / num);
    $(top_class + '.select_list li').unbind('click').bind('click', function () {
        $(this).parent().parent().children(".select_input").val($(this).text());
        _params['num'] = $(this).text();
        _params['limit'] = $(this).text();
        _params['page'] = 1;
        _get_list(param_url);
    });
    //如果第一页则disable首页和上一页
    if (page == 1 && total_page_count == 1) {
        $(top_class + '.fenye_btn').eq(0).removeClass('first_page_valid').addClass('first_page_invalid');
        $(top_class + '.fenye_btn').eq(1).removeClass('prev_page_valid').addClass('prev_page_invalid');
        $(top_class + '.fenye_btn').eq(2).removeClass('next_page_valid').addClass('next_page_invalid');
        $(top_class + '.fenye_btn').eq(3).removeClass('last_page_valid').addClass('last_page_invalid');
    } else if (page == 1) {
        $(top_class + '.fenye_btn').eq(0).removeClass('first_page_valid').addClass('first_page_invalid');
        $(top_class + '.fenye_btn').eq(1).removeClass('prev_page_valid').addClass('prev_page_invalid');
        $(top_class + '.fenye_btn').eq(2).removeClass('next_page_invalid').addClass('next_page_valid');
        $(top_class + '.fenye_btn').eq(3).removeClass('last_page_invalid').addClass('last_page_valid');
    } else if (page == total_page_count) {
        $(top_class + '.fenye_btn').eq(0).removeClass('first_page_invalid').addClass('first_page_valid');
        $(top_class + '.fenye_btn').eq(1).removeClass('prev_page_invalid').addClass('prev_page_valid');
        $(top_class + '.fenye_btn').eq(2).removeClass('next_page_valid').addClass('next_page_invalid');
        $(top_class + '.fenye_btn').eq(3).removeClass('last_page_valid').addClass('last_page_invalid');
    } else {
        $(top_class + '.fenye_btn').eq(0).removeClass('first_page_invalid').addClass('first_page_valid');
        $(top_class + '.fenye_btn').eq(1).removeClass('prev_page_invalid').addClass('prev_page_valid');
        $(top_class + '.fenye_btn').eq(2).removeClass('next_page_invalid').addClass('next_page_valid');
        $(top_class + '.fenye_btn').eq(3).removeClass('last_page_invalid').addClass('last_page_valid');
    }

    if (total_page_count >= 4 && page >= 3) {
        if (total_page_count - page >= 2) {
            $(top_class + '.page_box').eq(0).text(page - 1).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(1).text(page).css('display', 'inline-block').addClass('on');
            $(top_class + '.page_box').eq(2).text(page + 1).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(3).text(page + 2).css('display', 'inline-block').removeClass('on');
        } else if (total_page_count - page == 1) {
            $(top_class + '.page_box').eq(0).text(page - 2).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(1).text(page - 1).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(2).text(page).css('display', 'inline-block').addClass('on');
            $(top_class + '.page_box').eq(3).text(page + 1).css('display', 'inline-block').removeClass('on');

        } else if (total_page_count - page == 0) {
            $(top_class + '.page_box').eq(0).text(page - 3).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(1).text(page - 2).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(2).text(page - 1).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(3).text(page).css('display', 'inline-block').addClass('on');

        }
    } else {
        for (var i = 1; i <= total_page_count; i++) {
            $(top_class + '.page_box').eq(i - 1).text(i).css('display', 'inline-block').removeClass('on');
        }
        for (; i <= 4; i++) {
            $(top_class + '.page_box').eq(i - 1).css('display', 'none').removeClass('on');
        }
        $(top_class + '.page_box').eq(page - 1).addClass('on');
    }
    $(top_class + '.f_color.mLR_5:eq(0)').text(item_count);
    $(top_class + '.f_color.mLR_5:eq(1)').text(total_page_count);
    $(top_class + '.fenye_btn').eq(0).unbind('click').bind('click', function () {
        _params['page'] = 1;
        _get_list(param_url);
    });
    $(top_class + '.fenye_btn').eq(1).unbind('click').bind('click', function () {
        _params['page'] = page == 1 ? 1 : page - 1;
        _get_list(param_url);
    });
    $(top_class + '.fenye_btn').eq(2).unbind('click').bind('click', function () {
        _params['page'] = page == total_page_count ? total_page_count : page + 1;
        _get_list(param_url);
    });
    $(top_class + '.fenye_btn').eq(3).unbind('click').bind('click', function () {
        _params['page'] = total_page_count;
        _get_list(param_url);
    });
    $(top_class + '.page_box').unbind('click').bind('click', function () {
        var page = $(this).text();
        if (page == '...') {
            return;
        }
        _params['page'] = page;
        _get_list(param_url);
        return false;
    });
}

//选择查看项函数
function likShow(tableId, lookAbledField, lookAbledUlId, lookAbledSaveId, lookAbledResetId) {
    var aTh = $(tableId).find('thead th');
    var aThText = [];

    $.each(aTh, function (i, v) {
        aThText.push(v.innerText)
    });
    $.each(lookAbledField, function (i, v) {
        v.index = $.inArray(v['field'], aThText)
    });
    var html = '';
    $.each(lookAbledField, function (i, v) {
        html += '<li class="l-li-b" lookindex="' + v["index"] + '"><input type="checkbox" checked><p class="z-d-l">' + v["field"] + '</p> </li>'
    });
    $(lookAbledUlId).html(html);
    $(lookAbledSaveId).unbind('click').bind('click', function () {
        for (var i = 0; i < $(lookAbledUlId).find('input[type="checkbox"]').length; i++) {
            if ($(lookAbledUlId).find('input[type="checkbox"]').eq(i).prop('checked') == false) {
                var index = parseInt($(lookAbledUlId).find('input[type="checkbox"]').eq(i).parent().attr('lookindex'));
                for (var j = 0; j < $(tableId).find('tr').length; j++) {
                    $(tableId).find('tr').eq(j).children().eq(index).css('display', 'none')
                }
            } else {
                var index = parseInt($(lookAbledUlId).find('input[type="checkbox"]').eq(i).parent().attr('lookindex'));
                for (var j = 0; j < $(tableId).find('tr').length; j++) {
                    $(tableId).find('tr').eq(j).children().eq(index).css('display', '')
                }
            }
        }
        $(".ckx_btn").trigger("click");
        $(".closeckx_cont").trigger("click");
    });
    $(lookAbledResetId).unbind('click').bind('click', function () {
        for (var i = 0; i < $(lookAbledUlId).find('input[type="checkbox"]').length; i++) {
            $(lookAbledUlId).find('input[type="checkbox"]').eq(i).prop('checked', true)
        }
    })
}
//lik create end

//input提示文字样式，textarea通用
function fn_focus(ele) {
    if (ele.value == ele.defaultValue) {
        ele.style = "color:#333";
        ele.value = '';
    } else {
        ele.style = "color:#333";
    }
    ;
};

function fn_blur(ele) {
    var reg = /^[s]*$/;
    if (reg.test(ele.value) || ele.value == ele.defaultValue) {
        ele.style = "color:#ccc";
        ele.value = ele.defaultValue;
    } else {
        ele.style = "color:#333";
    }
};
// 日期插件相关
function fn_blura(ele) {
    ele.style = "color:#333";
};

$(".select_list:not(.no_auto) li").live("click", function () {
    $(this).parent().parent().children(".select_input").val($(this).text());
    //添加id，by fz
    if ($(this).data('id')) {
        $(this).parent().parent().children(".select_input").data('id', $(this).data('id'));
    }
    //$(this).parent().slideToggle(0);
    $(this).parent().prev().prev().css("color", "#333");
});
/*$("input.select_input").live("click", function() {
 $("input.select_input").parent("div").children("ul").hide();
 // $(this).next("ul").show();
 });*/
//添加下拉框中input不能输入
$(".select_input").attr("disabled", false);
//添加图片,图片上传控件
$(".hide_input").live("change", function () {
    var _file = $(this).val();
    var arr = _file.split('\\'); //注split可以用字符或字符串分割
    var my = arr[arr.length - 1]; //这就是要取得的图片名称
    //alert(my);
});

var add_imgi = 1;
$(".addimg").live("change", function () {
    var objUrl = getObjectURL(this.files[0]);
    var _file = $(this).val();
    //alert(_file);
    var arr = _file.split('\\'); //split字符串分割
    var img_name = arr[arr.length - 1]; //图片名称
    //alert(img_name);
    console.log("objUrl = " + objUrl);
    if (objUrl) {
        $(this).parent().before('<li><input class="hide_input" value="' + img_name + '" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" id="imgShow_' + add_imgi + '"/><i class="del_img">-</i></li>');
        $("#imgShow_" + add_imgi + "").attr("src", objUrl);
        ++add_imgi;
    }
    ;
    //获取图片的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };

});

$(".del_img").live("click", function () {
    $(this).parent("li").remove();
});

/*xx人头像删除*/
$(".del_img_1").live("click", function () {
    $(this).parent("li").remove();
});

//文件上传
$(".add_input").live("change", function () {
    var objUrl = getObjectURL(this.files[0]);
    var _file = $(this).val();
    var arr = _file.split('\\'); //split字符串分割
    var file_name = arr[arr.length - 1]; //文件名称
    console.log("objUrl = " + objUrl);
    if (objUrl) {
        $(this).next('.warp_name').html('<span class="file_warp">' + file_name + '</span>');
    }
    ;
    //获取文件的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };

});

//添加附件前置
$(".add_inputbegin").live("change", function () {
    var objUrl = getObjectURL(this.files[0]);
    var _file = $(this).val();
    var arr = _file.split('\\'); //split字符串分割
    var file_name = arr[arr.length - 1]; //文件名称
    console.log("objUrl = " + objUrl);
    if (objUrl) {
        $(this).parent().children('.warp_namebegin').html(file_name);
    }
    ;
    //获取文件的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };

});

//上传头像
/*$(".add_txBtn").live("change",function(){
 var _file = $(this).val();
 var arr=_file.split('\\');//注split可以用字符或字符串分割
 var my=arr[arr.length-1];//这就是要取得的图片名称
 });*/
$(".add_txBtn").live("change", function () {
    var objUrl = getObjectURL(this.files[0]);
    var _file = $(this).val();
    //alert(_file);
    var arr = _file.split('\\'); //split字符串分割
    var img_name = arr[arr.length - 1]; //图片名称
    //alert(img_name);
    console.log("objUrl = " + objUrl);
    if (objUrl) {
        $(this).parent().children(".add_tximgsrc").attr("src", objUrl);
    }
    ;
    //获取图片的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };

});

//弹出层树形菜单
$(".tree_box dt").live("click", function () {
    $(this).nextAll().slideToggle(100);
    $(this).children(".tree_icon").toggleClass("tree_icon_hover");
});
$(".tree_box .cite").live("click", function () {
    $(".tree_box dd").css("background", "#fff");
    $(this).css("background", "#efefef");
    var _text = $(this).text();
    //alert($(this).val(_text));
});
// 激活效果暂时写改变背景色，最后可以用改变背景图来做绝对定位到合适的地方

//内容左侧树形菜单
$('.hr_left_all,.hr_left_1,.hr_left_2,.hr_left_3').live("click", function () {
    //判断点击元素下有没有ul子节点，有的话展开树结构
    var next_p = $(this).next('ul');
    if (next_p.length > 0) {
        $(this).parent('ul').toggleClass("change");
        $(this).nextAll('ul').toggle();
    }
    ;
    $(this).parents(".hr_left_nav").find("cite").remove();
    $(this).append("<cite></cite>");
});
//右侧详情折叠效果
$(".r_sidebar_btn").live("click", function () {
    var name_x = $(this).attr("name");
    $(".right_sidebar[name='" + name_x + "']").show(); //相对应的右侧边栏弹出
    $(".right_sidebar[name='" + name_x + "']").prev().show(); //相对应的右侧边栏遮罩层弹出
});

$(".right_sidebar_h").live("click", function () {
    $(this).hide();
    $(this).next().hide(); //隐藏DIV
});

//右侧详情弹窗tab切换，选项卡
$(".ht_slid_list ul li").live("click", function () {
    var index = $(this).index();
    $(this).attr('class', "Sideslip_list_on").siblings().attr('class', '');
    var name_x = $(this).attr("name");
    $(".ht_base_msg[name='" + name_x + "']").eq(index).fadeIn(100).siblings(".ht_base_msg[name='" + name_x + "']").hide();
});
//tab
$('.tabtitle li').live("click", function () {
    var index = $(this).index();
    $(this).attr('class', "taba tabhover xsht_qiehuan_xxl").siblings('li').attr('class', 'taba xsht_qiehuan_xxl');
    var name_x = $(this).attr("name");
    $(".tabcontent[name='" + name_x + "']").eq(index).fadeIn(100).siblings(".tabcontent[name='" + name_x + "']").hide();
});

//非ul li 的tab
$('.tab_btn').live("click", function () {
    var index = $(this).index();
    $(this).addClass('tabhover2').siblings('.tab_btn').removeClass('tabhover2');
    var name_x = $(this).attr("name");
    $(".tabcontent[name='" + name_x + "']").eq(index).fadeIn(100).siblings(".tabcontent[name='" + name_x + "']").hide();
});

//tab自动播放
/*
 var t = 0;
 var timer = setInterval(function(){
 if( t == $('.tabtitle li').length ) t = 0;
 $('.tabtitle li:eq('+t+')').click();
 t++;
 }, 700)
 });
 */
$('#test').live("click", function () {
    $(".test[flag][value='']").css({
        "border": "1px solid red",
        "background": "rgb(249, 205, 209)"
    });
});

//展开高级搜索
$(".zkgjssBtn").live("click", function () {
    var name_x = $(this).attr("name");
    $(this).html() == "展开高级搜索" ? $(this).html("隐藏高级搜索").css({
        "background": "#22a3f3",
        "color": "#fff",
        "border-color": "#3aa2f3"
    }) : $(this).html("展开高级搜索").css({
        "background": "",
        "color": "",
        "border-color": ""
    });
    $(this).html() == "展开高级搜索" ? $('.table_head_box').height('38px') : $('.table_head_box').height('88px');
    $(".zkgjss_cont[name='" + name_x + "']").toggle(); //相对应的右侧边栏弹出
    changeThW();
    //$('table').css('width','100%');
});
//查看选择项
//select模拟
$(".select_specialInput").live("click", function () {
    $(this).next(".select_special_list").toggle();
})
$(".select_special_list").live("mouseleave", function () {
    $(this).hide();
});
$(".select_special_list li").live("click", function () {
    var _html = $(this).children("cite").html();
    $(this).parent().prev(".select_specialInput").children("cite").html(_html); //将点击的选项赋值到模拟input中
    $(this).parent().children().children("input[type='checkbox']").attr("checked", false); //设置其他同类元素为不选中
    $(this).children("input[type='checkbox']").attr("checked", true); //设置本身点击元素为选中
});

//选择查看项 select模拟
$('input:checkbox').live('click', function (e) {
    e.stopPropagation();
});
$(".l-li-b").live("click", function (e) {
    if ($(this).children("input").attr("checked") == 'checked') {
        $(this).children("input").attr("checked", null);
    } else {
        $(this).children("input").attr("checked", "checked");
    }
});


//选择查看项按钮
$(".ckx_btn").live("click", function () {
    var name_x = $(this).attr("name");
    $(".ckx_cont[name='" + name_x + "']").toggle();
    $(".closeckx_cont").css({'width': $('body').width(), 'height': $('body').height()}).show();
    $(this).addClass("but_blue");
    $(this).children().css("background-image", "url(static/images/eye_blue.png)");
    $(this).css("border-color", "#23a2fa");
});
$(".closeckx_cont").live("click", function () {
    $(".ckx_cont").hide();
    $(this).hide();
    $(".ckx_btn").removeClass("but_blue");
    $(".ckx_btn").children().css("background-image", "");
    $(".ckx_btn").css("border-color", "");
});
$(".right_list_box").live("click", function () {
    $(".closeckx_cont").trigger('click');
});
$("#top_header_box").live("click", function () {
    $(".closeckx_cont").trigger('click');
});

//计数按钮通用js
$(".inp_plus").live("click", function () {
    var default_num = $(this).next('input').val();
    ++default_num;
    $(this).next('input').val(default_num);
});
$(".inp_reduce").live("click", function () {
    var default_num = $(this).prev('input').val();
    if (default_num != 0) {
        --default_num;
        $(this).prev('input').val(default_num);
        return;
    }
    ;
});
/*div展开隐藏 wh-0517*/
$(".box_open_btn").live("click", function () {
    $(this).toggle(function () {
        $(this).html("展开 <i class='right icon_show'></i>");
        $(this).parent().next().slideUp(100);
    },function () {
        $(this).html("收起 <i class='right icon_hide'></i>");
        $(this).parent().next().slideDown(100);
    });
    $(this).trigger('click');
});
//作废
$(".but_void").live("click", function () {
    $(this).parent().parent().addClass("grey");
    $(this).parent().parent().children("td:first").html('<span  class="voidIcon">作废</span>');
});
//停用
$(".but_stop").live("click", function () {
    $(this).parent().parent().css("color", "#cccccc");
    $(this).parent().siblings(".sp_base_state").children("span").removeClass("c_g").addClass("c_r").text("停用");
    $(this).text("启用").removeClass("but_stop but_r").addClass("but_use but_lv");
});
//启用
$(".but_use").live("click", function () {
    // alert(111);
    $(this).parent().parent().css("color", "#666");
    $(this).parent().parent().children("td:first-child").text("停用").css("color", "#666");
    $(this).parent().siblings(".sp_base_state").children("span").removeClass("c_r").addClass("c_g").text("启用");
    $(this).text("停用").removeClass("but_use but_lv").addClass("but_stop but_r");
});
$(".but_delete:not(.no_auto_delete)").live("click", function () {
    $(this).parent().parent().remove();
});

//        全选
$(".checkAll").live("click", function () {
    var name_inp = $(this).attr("name");
    var n = $("input[name='" + name_inp + "']");
    var isChecked = $(this).context.checked;
    for (var i = 0; i < n.length; i++) {
        var x = n[i];
        if (isChecked) {
            x.checked = true;
        } else {
            x.checked = false;
        }
        console.log(x.checked);
    }
});
// 右侧查看关闭
$(".slider_close").live("click", function () {
    $(this).parent().parent().hide();
    $(".right_sidebar_h").hide();
});
// 右侧查看关闭-新样式
$(".slider_head_close").live("click", function () {
    $(this).parent().parent().hide();
    $(".right_sidebar_h").hide();
});
// 分页点击效果变色
$(".page_box:not(.no_auto_render)").live("click", function () {
    $(this).siblings(".page_box").removeClass("on");
    $(this).addClass("on");
});
//登录用户信息
var Admin = {};
Admin.get_token = function () {
    var token = $.trim($.cookie('sass_token'));
    return token.length == 0 ? '2016121416190312079' : token;
};

Admin.set_token = function (token, options) {
    if (!options) {
        options = {}
    }
    $.cookie('sass_token', token, options);
};
Admin.get_name = function (token, options) {
    return '张三';
};

Admin.get_uid = function () {
    var uid = $.trim($.cookie('sass_uid'));
    return uid.length == 0 ? '1' : uid;
};
Admin.set_uid = function (uid, options) {
    if (!options) {
        options = {}
    }
    $.cookie('sass_uid', uid, options);
};

//手动显示弹出框
function invoke_tanceng(me, callback) {
    if ($(me).hasClass('.val_dialog')) {
        var name_x = $(me).attr("name");
        var html = $(".dialog_box[name='" + name_x + "']").parent().html(); //单页面的弹窗赋值给变量
        $(".tanceng").html(html).show(); //外层框架的div
        $(".tanceng .dialog_box").show(0);
    } else if ($(me).hasClass('.val_dialogTop')) {
        var dialog_topindex = 1;
        $(".val_dialogTop").live("click", function () {
            var name_x = $(me).attr("name");
            var html = $(".dialog_box[name='" + name_x + "']").parent().html(); //单页面的弹窗赋值给变量
            $(".tanceng").append(html).show(); //外层框架的div
            $(".tanceng .dialog_box").show();
            $(".dialog_box[name='" + name_x + "']").css({
                "z-index": "" + dialog_topindex + "",
                "position": "absolute"
            });
        });
    }
    if (callback) {
        setTimeout(function () {
            callback();
        }, 100);
    }
}
//添加鼠标按下时，按钮样式改变
$(".but_blue").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_blue").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_yellow").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_yellow").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_green").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_green").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_look").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_look").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_exit").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_exit").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_r").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_r").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_cancel").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_cancel").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_small").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_small").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_mix").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_mix").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".fenye_box .page_box.on:not(.no_auto_render)").live("mousedown", function () {
    $(this).addClass("active");
});
$(".fenye_box .page_box.on:not(.no_auto_render)").live("mouseup", function () {
    $(this).removeClass("active");
});
$(".btn_chooseItem").live("mousedown", function () {
    $(this).addClass("active");
});
$(".btn_chooseItem").live("mouseup", function () {
    $(this).removeClass("active");
});
// table中图片样式
$(".order").toggle(function () {
    $(this).children(".price_icon").removeClass("down").addClass("up");
}, function () {
    $(this).children(".price_icon").removeClass("up").addClass("down");
});
//选择部门和成员的效果
/*$('.left_all,.left_1,.left_2,.left_3').live("click",function(){
 //判断点击元素下有没有ul子节点，有的话展开树结构
 var next_p = $(this).next('ul');
 if(next_p.length > 0){
 $(this).find(".icon_open").toggleClass("change_ba");
 $(this).nextAll('ul').toggle();
 };
 });*/
// lik tree open close
$('.left_all,.left_1,.left_2,.left_3').live("click", function () {
    //判断点击元素下有没有ul子节点，有的话展开树结构
    if ($(this).next('i').length > 0) {
        var next_p = $(this).next('i');
        if (next_p.length > 0) {
            $(this).find(".icon_open").toggleClass("change_ba");
            $(this).find(".oth").removeClass("change_ba");
            $(this).nextAll('i').toggle();
        }
        ;
    } else {
        var next_p = $(this).next('ul');
        if (next_p.length > 0) {
            $(this).find(".icon_open").toggleClass("change_ba");
            $(this).find(".oth").removeClass("change_ba");
            $(this).nextAll('ul').toggle();
        }
        ;
    }
});
// 人员或者部门选择
//编辑
$(".list_box_ulexit li").live("click", function (event) {
    if (!$(this).hasClass("left_all")) {
        var next_ul = $(this).next('ul');
        $(".list_box_ulexit").find("li").removeClass("on");
        $(".list_box_ulexit").find(".list_check").remove();
        $(this).addClass("on").append('<span class="list_check"><em class="on"></em></span>');
    }
    event.stopPropagation();
});
//选择上级
$(".list_box_ulexitAll li").live("click", function (event) {
    var next_ul = $(this).next('ul');
    $(".list_box_ulexitAll").find("li").removeClass("on");
    $(".list_box_ulexitAll").find(".list_check").remove();
    $(this).addClass("on").append('<span class="list_check"><em class="on"></em></span>');
    event.stopPropagation();
});

//单选
$(".list_box_uldx li").live("click", function (event) {
    var next_ul = $(this).next('ul');
    if (next_ul.length < 1) {
        $(".list_box_uldx").find("li").removeClass("on");
        $(".list_box_uldx").find(".list_check").remove();
        $(this).addClass("on").append('<span class="list_check"><em class="on"></em></span>');
    }
    event.stopPropagation();
});
////多选
//$(".list_box_ul li").live("click", function(event) {
//	$(this).parents('.list_box_ul').find("li").removeClass("on");
//	$(this).addClass("on").children(".list_check").children("em").addClass("on");
//	var next_ul = $(this).next('ul');
//	if(next_ul.length > 0) {
//		if($(this).children(".list_check").children("em").hasClass("on")) {
//			$(this).parent('ul').find(".list_check").children("em").addClass("on");
//		}
//	} else {
//		if(!$(this).children(".list_check").children("em").hasClass("on")) {
//			$(this).parent('ul').siblings("li").children("em").removeClass("on");
//		}
//	}
//	event.stopPropagation();
//});
$(".list_check").live("click", function (event) {
    $(this).children("em").toggleClass("on");
//	var next_uls = $(this).parent("li").next('ul');
//	if(next_uls.length < 1) {
//		if($(this).children("em").hasClass("on") == false) {
//			$(this).parent("li").parent('ul').siblings("li").children(".list_check").children("em").removeClass("on");
//		}
//	}
    event.stopPropagation();
});

//lik create
function changeThW() {
    $('.table_head_box').css('width', $('.lik_container').width() - 14)
    $('.table_head_fixed').css('width', $('.lik_table_container').width())
    var thLength = $('.table_head_fixed th').length
    for (var i = 0; i < $('.table_head_fixed th').length; i++) {
        $('.table_head_fixed th').eq(i).css('width', $('.lik_table_container tbody').eq(1).find('tr').eq(0).find('td').eq(i).width())
    }
}
changeThW()

//删除按钮的弹窗4.5
$(".delete_anniu").live("click", function () {
    //            alert(1111);
    $(this).parent().parent().parent().remove();
    var num = $('.tanceng').children(".dialog_box").length;
    if (num < 1) {
        $(".tanceng").hide();
    }
    ;
    //$(".but_del").parent().parent().remove();
});
// 判断table中是否有数据
// 右侧弹窗头部,更多按钮下拉
$(".slider_head_More").live("click", function () {
    $(this).next(".slider_head_list").toggle();
});
// 排序
$(".order").live("click", function () {
    $(this).toggle(function () {
        $(this).children(".price_icon").removeClass("down").addClass("up");
    }, function () {
        $(this).children(".price_icon").removeClass("up").addClass("down");
    });
    //  立即执行点击事件
    $(this).trigger('click');
});
// 选择文件上传。删除已选
$(".work_sp_base_delete").live("click", function () {
    $(this).prev("input").val("请选择附件");
});

//lik create
//选择年月js
function l_dbl(v){
    return v > 9 ? v : '0'+v
}
var oDate = new Date();
var curYear = oDate.getFullYear();
var curMonth = oDate.getMonth() + 1;
$('.select_lik_mormal .select_lik_input').val(curYear + '-' + l_dbl(curMonth));
//select 模拟折叠
$('.select_lik_mormal').die('click').live('click', function () {
    $('.select_list_lik').not($(this).find('.select_list_lik')).slideUp(300);
    $(this).find('.select_list_lik').slideToggle(300);
    return false
});
// 左侧列表点击
$('.select_list_lik_a li').live('click', function () {
    var $_currentInput = $(this).closest('.select_lik_mormal');
    $_currentInput.find('.select_lik_input').val($(this).html() + '-');
    return false;
});
// 右侧列表点击
$('.select_list_lik_b li').live('click', function(){
    var $_currentInput = $(this).closest('.select_lik_mormal');
    if($_currentInput.find('.select_lik_input').val().slice($_currentInput.find('.select_lik_input').val().length-1, $_currentInput.find('.select_lik_input').val().length) == '-'){
        $_currentInput.find('.select_lik_input').val($_currentInput.find('.select_lik_input').val() +$(this).html());
    }else{
        $_currentInput.find('.select_lik_input').val($_currentInput.find('.select_lik_input').val().split('-')[0]+'-' +$(this).html());
    }
    $('.select_lik_input').nextAll('.select_list_lik').slideUp(300);
    return false;
});



