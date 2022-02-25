$(function(){
    var $width = $(window).width();
    console.log($width);
    var $height = $("#roule_bk>img").height();
    console.log($height);
    $("#outline").css("height",$height+"px");

    var $line_height_close= $("#msg").height() * 0.2;
    var $line_height_textarea=$("#msg").height() * 0.8;

    $("#alert_close").css("line-height",$line_height_close+"px");
    $("#msg_text").css("line-height",$line_height_textarea+"px");
    
    let $data = ["500포인트 당첨!","5,000포인트 당첨!","꽝! 다음기회에!!","3,000포인트 당첨!","2,000포인트 당첨!","1,000포인트 당첨!"];
    let $r = 0; // 오브젝트 최초 위치값
    let $count = 3; // 횟수 제한
    
    
    $("#gamebtn").click(function clickbtn(){
        if($count > 0){
            $("#msg").css("display","none");
            var $random = Math.ceil(Math.random()*360);
            $r = $r + 1800;
            var $msg = $.fn.rotate($r,$random);
            $("#gamebtn").unbind("click");
            setTimeout(function(){
                $("#msg").slideDown(800);
                $("#msg_text").html($data[$msg]);
                $("#gamebtn").click(function(){
                    clickbtn(); 
                });
            },5300)
        }
        else{
            alert("룰렛은 3회 까지만 이용 가능합니다.");
        }
        $count--;
    });


    $.fn.rotate = function($r, $random){
        var $node = 0; // 당첨결과 숫자
        if($random >= 2 && $random <=57){
            $node=0;
        }
        else if($random >= 62 && $random <= 117){
            $node=1;
        }
        else if($random >= 182 && $random <= 237){
            $node=3;
        }
        else if($random >= 242 && $random <= 297){
            $node=4;
        }
        else if($random >= 302 && $random <= 357){
            $node=5;
        }
        else {
            $node=2;
            $random = 150; 
        }
        console.log($random);
        var $rotate = $r+$random;
       
        $("#gameboard").css("transform","rotate("+$rotate+"deg)");
        return $node;
    }

    $("#alert_close").click(function(){
        $("#msg").slideUp(800);
    });

})