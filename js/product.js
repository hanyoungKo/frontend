/* Js*/
let list_top ;
   function wck(){
       if (window.XMLHttpRequest ){
            return new XMLHttpRequest ();
        }
     }
    function fileopen(){
       if (list_top.readyState ==XMLHttpRequest.DONE && list_top.status == 200 ){
             top_lists(this.response);
       }
     }
     list_top = wck ();
     list_top.onreadystatechange = fileopen ;
     list_top.open ("GET","../shop1/product/hash.json",true);
     list_top.send();
     
     function top_lists (data_top){
       let top_list = JSON.parse (data_top);
       //console.log(top_list);

        var ols =document.createElement("ol"); 
        top_list.forEach(function(a1,a2,a3){
            var lis = document.createElement("li");
           Object.keys(top_list[a2]).forEach(function (b1,b2,b3){
            //console.log(b2);
            if(b2==0){
            var texts ="# "+top_list[a2][b1];
            var re_texts = texts.replace("<br>","");
            lis.setAttribute("title",re_texts);
            lis.innerHTML=texts;
            
            }
            else{
                lis.setAttribute("link",top_list[a2][b1]);
            }
            ols.appendChild(lis);
           })
        })
      var hash = document.getElementById("product_hash");
      hash.appendChild(ols);
      }


/* Jq*/
$(function(){
    let $list_bottom ;
   /* ajax */
   $.ajax ({ 
     url :"./product/product.json",
     cache :false , 
     type :"GET", 
     dataType :"JSON", 
     success :function($list_bottom){ 
        $.fn.bottom_list($list_bottom);
      },
     error:function (){
        console.log ("통신에러");
      }
   });

/*배열 찍기*/
   $.fn.bottom_list = function($bottom_list){
     //console.log($bottom_list["flat_product"]);
    
    $.map($bottom_list["flat_product"],function($a1,$a2){
        //console.log($a1);
        var $ul_lis=$("<li></li>");
        var $spans=$("<span></span>");
        var $labels=$("<label></label>");
        var $ols = $("<ol></ol>");
        $.map($bottom_list["flat_product"][$a2],function($b1,$b2){
            //console.log($b2);
            if($b2=="product_img"){
                var $img = "<img src='"+$b1+"'>";
                $spans.append($img);
            }
            else if($b2=="product_color"){
                var $ol_lis=$("<li></li>");
                $ol_lis.html("색상 : "+$b1);
                $ols.append($ol_lis);
            }
            else if($b2=="product_money"){
                if($bottom_list["flat_product"][$a2]["product_dc"]==""){
                    var $ol_lis=$("<li></li>");
                    $ol_lis.html("가격 : "+Number($b1).toLocaleString());
                    $ols.append($ol_lis);
                }
                else{
                    var $ol_lis=$("<li></li>");
                    var $s = "<s>"+Number($b1).toLocaleString()+"</s>";
                    $ol_lis.html("가격 : "+$s);
                    $ols.append($ol_lis);

                }
            }
            else if($b2=="product_dc"){
                if($bottom_list["flat_product"][$a2]["product_dc"]!=""){
                    var $ol_lis=$("<li></li>");
                    $ol_lis.html("할인가격 : " + Number($b1).toLocaleString());
                    $ols.append($ol_lis);
                }
            }
            else{
                 var $ol_lis=$("<li></li>");
                 $ol_lis.html($b1);
                 $ols.append($ol_lis);
            }
        });
        $ul_lis.append($spans);
        $ul_lis.append($labels);
        $ul_lis.append($ols);
        $("#product_lists").append($ul_lis);
    });

    /*bind*/
    $("#product_list>ul>li").bind({
        "mouseenter" : function(){
            var $num = $(this).index();
            console.log($num);
            $("#product_list>ul>li:eq("+$num+")>ol").css("display","block");
            $("#product_list>ul>li:eq("+$num+")>label").css("display","block");
        },
        "mouseleave": function(){
            var $num = $(this).index();
            $("#product_list>ul>li:eq("+$num+")>ol").css("display","none");
            $("#product_list>ul>li:eq("+$num+")>label").css("display","none");
        }

    });
    }


});