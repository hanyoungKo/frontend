$(function(){
    let $count=0;
    let $stop ="yes";
    let $n;
/* ajax */
    let $data ; 
       $.ajax ({
         url :"./banner/banner.json",
         cache :false ,
         type :"GET",
         dataType :"JSON",
         success :function ($data ){ 
            $.fn.banners($data);
          },
         error:function(){
            console .log ("통신에러");
          }
       });
       
/* 배열찍기 */    
    $.fn.banners = function ($data){
        console.log ($data["banners"]);
        var $ols = $("<ol></ol>");
        $.map($data["banners"],function($a1,$a2){
            //console.log($a1);
            var $uls = $("<ul></ul>");
            
            $.map($data["banners"][$a2],function($b1,$b2){
                //console.log($b1);
                var $lis = $("<li></li>");
                if($b2==0){
                   var $img="<img src='"+$b1+"'>"
                    $lis.html($img);
                    $uls.append($lis);
                }
                else if($b2==4){
                    var $ol_text = $b1;
                    $lis.append($ol_text);
                    $ols.append($lis);
                }
                else{
                    var $text = $b1;
                    $lis.append($text);
                    $uls.append($lis); 
                }
            });
            var t_text = "VIEW DETAIL";
            var t_li = $("<li></li>");
            t_li.html(t_text);
            $uls.append(t_li);
            $("#banner_outline").append($uls);
        });

        $("#banner_outline").append($ols);
       
             $.fn.movebanner();
             $.fn.animate_banner();

        
/* bottom 메뉴 클릭 이벤트 */
        $("#banner_outline>ol>li").click(function(){
            $n = $(this).index();
            $count=$n;
            clearTimeout($timer);
            clearTimeout($an_timer); 
            $stop="no";
            $.fn.movebanner();
            $.fn.animate_banner();
        });
        
/*banner_outline leave */
        $("#banner_outline").mouseleave(function(){
           if($stop=="no"){
               $count = $n;
               $stop="yes";
               $.fn.movebanner();
               $.fn.animate_banner();
           }
    
        });
      }


/*banner FadeIn FadeOut/ bottom menu*/

   var $timer;
  
    $.fn.movebanner = function(){
     var $ea = $("#banner_outline>ul").length;
       
     $("#banner_outline>ul:eq("+$count+")").fadeIn();
     $("#banner_outline>ol>li:eq("+$count+")").css({
        "background-color":"#f2f2f2",
        "border":"0"
     });
        if($count>=$ea-1){
            $count=0;
     }
        else{
            $count++;
     }
     
     $("#banner_outline>ul:eq("+$count+")").fadeOut();
     $("#banner_outline>ol>li:eq("+$count+")").css({
        "background-color":"#fff",
        "border":"1px solid #f2f2f2"
     });
        if($stop=="yes"){
            $timer = setTimeout($.fn.movebanner,8000);
        }

    };

/*move to text*/

    var $an_timer 

    $.fn.animate_banner = function(){
    
        var $ea = $("#banner_outline>ul").length;
        var $anicount_ul = $count;
    
        $anicount_ul--;
    
        if($anicount_ul==-1){
            $anicount_ul = $ea-1;
        }
        var $li_ea= $("#banner_outline>ul:eq("+$anicount_ul+")>li").length;
        var $w=2;
        var $d_time=1;
        var $z=2;
        while($z<=$li_ea-1){
            $("#banner_outline>ul:eq("+$anicount_ul+")>li:nth-of-type("+$z+")").css({
                "left":"-700px",
                "opacity":"0"
           });
            $z++;
        }
        
        while($w<=$li_ea-1){
            $("#banner_outline>ul:eq("+$anicount_ul+")>li:nth-of-type("+$w+")").delay(500*$d_time).animate({
                "left":"60px",
                "opacity":"1"
            },500); 
                $d_time++;
                $w++;
            }
       if($stop=="yes"){
           $an_timer=setTimeout($.fn.animate_banner,8000);
       }

    }

});