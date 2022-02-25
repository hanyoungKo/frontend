let menu_bottom;
function wck(){
   if (window.XMLHttpRequest){
   return new XMLHttpRequest();
    }
}
function fileopen (){
    if (menu_bottom.readyState == XMLHttpRequest.DONE && menu_bottom.status == 200){
         //console.log(this.response);
    list_menu(this.response);
    }
}
  menu_bottom = wck();
  menu_bottom.onreadystatechange = fileopen ;
  menu_bottom.open("GET","../shop1/menu/menu.json?v=0",true);
  menu_bottom.send();
     
var lm_ul=document.getElementById("l_menu");
var lm_ol=document.getElementById("r_menu");

function list_menu(data){
  let lists = JSON.parse(data);
  //console.log(lists);
  

  lists.forEach(function(a1,a2,a3){
    //console.log(lists[a2]["menus"]);
    var text = document.createTextNode(lists[a2]["menus"]);
    var lm_li = document.createElement("li");

    
    lm_li.appendChild(text);
    
    if(lists[a2]["cate"] != ""){
        var sm_ol = document.createElement("ol");
        var sm_ul = document.createElement("ul");
        
        lists[a2]["cate"].forEach(function(b1,b2,b3){
            //console.log(lists[a2]["cate"][b2])           
            var sm_li = document.createElement("li");
            var sm_text = document.createTextNode(lists[a2]["cate"][b2]);
            sm_li.appendChild(sm_text);
            if(a2<6){
                    sm_ol.appendChild(sm_li);
                    lm_li.appendChild(sm_ol);
            }
            else{
                    sm_ul.appendChild(sm_li);
                    lm_li.appendChild(sm_ul);
            }        
        });
    }
        if(a2<6){
            lm_ul.appendChild(lm_li);
        }
        else{
            lm_ol.appendChild(lm_li);
        }
        
  });

 }

$(function(){
    $("#l_menu> li").bind({
      "mouseenter":function(){
          var $num = $(this).index();
          $("#l_menu> li:eq("+$num+")> ol").stop().slideDown(700);
      },
      "mouseleave":function(){
          var $num = $(this).index();
          $("#l_menu> li:eq("+$num+")> ol").stop().slideUp(700);
      }
    });
})
