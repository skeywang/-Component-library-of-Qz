// 主页面
$(".user_name").die("click").live("click",function () {
    $(".Personal_con").show();
    $(".Personal_con_screen").show();
});
$(".Personal_con_screen").live("click",function () {
    $(this).hide();
    $(this).next(".Personal_con").hide();
});
$(".company_name").live("click",function () {
    $(".title_118 .button_id_index").val(119).trigger("click");
});
$(".notice_box").live("click",function () {
    $(".Notice_con").show();
    $(".Notice_con_screen").show();
});
$(".Notice_con_screen").live("click",function () {
    $(this).hide();
    $(this).next(".Notice_con").hide();
});
$(".Notice_con_header").live("click",function () {
    // alert(1234);
    $(this).next("ul").slideToggle(300);
});
/*$(".exit_btn").live("click",function () {*/
// alert(12324);
    function logout() {
        top.location = "login.html";
        return false;
    }
/*});*/
