$(function (){
       let $list; 
       
       $.ajax ({ 
         url :"./newproduct/new_product.json", 
         cache :false,
         type :"GET", 
         dataType :"JSON", 
         success :function($list){ 
            $.fn.new_product_list($list);
          },
         error :function (){
            console.log ("통신에러");
          }
       });
       
        $.fn.new_product_list = function ($n_list){
         console.log($n_list["new_product"]);
         $.map($n_list["new_product"],function($a1,$a2){
            //console.log($a1);
            var $uls = $("<ul></ul>");
            var $spans =$("<span></span>");
            var $ols = $("<ol>\
            <li><img src='./newproduct/info_icon02.gif'></li>\
            <li><img src='./newproduct/info_icon03.gif'></li>\
            </ol>");
            var $out_li=$("<li></li>");

           
            $out_li.append($spans);
            $uls.append($out_li);

            $.map($n_list["new_product"][$a2],function($b1,$b2){
                //console.log($b1);
                console.log($b2);
               if($b2=="product_img"){
                    $img = "<img src='"+$b1+"'>";
                    $spans.append($img);

               }
               else if($b2=="product_dc"){
                if($b1!=""){
                    var $labels = $("<label>"+$b1+"</label>");
                    $spans.append($labels);
                }
               }
               else if($b2=="product_money"){
                if($n_list["new_product"][$a2]["product_sales"]==""){
                    var $in_li=$("<li>"+Number($b1).toLocaleString()+"원"+"</li>");
                    $uls.append($in_li);
                }
                else{
                    var $in_li=$("<li><strike>"+Number($b1).toLocaleString()+"원"+"</strike></li>");
                    $uls.append($in_li);
                }
               }
              else if($b2=="product_sales"){
                if($b1!=""){
                    var $in_li=$("<li>"+Number($b1).toLocaleString()+"원"+"</li>");
                    $uls.append($in_li);
                }
              }
              else{
                var $in_li=$("<li>"+$b1+"</li>");
                $uls.append($in_li);
              }
              

            });
            $spans.append($ols);
            $("#new_product_list").append($uls);
        });
            $("#new_product_list>ul").bind({
                "mouseenter":function(){
                    var $num = $(this).index();
                    $("#new_product_list>ul:eq("+$num+")>li>span>ol").css("display","block");
                },
                "mouseleave":function(){
                    var $num = $(this).index();
                    $("#new_product_list>ul:eq("+$num+")>li>span>ol").css("display","none");
                }
            });
            

       }
    });