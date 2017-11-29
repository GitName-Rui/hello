(()=>{
  ajax("get","03-header.html")
  .then(html=>{
    $("#header")[0].innerHTML=html;
    document.head.innerHTML=
      document.head.innerHTML+
        '<link rel="stylesheet" href="css/header.css">';
    var shelper=
      $("#shelper")[0],txtSearch=$("#txtSearch")[0];
    if(location.pathname.endsWith("products.html")
          &&location.search!="")
      txtSearch.value=
        decodeURIComponent(location.search.split("=")[1]);
    window.onclick=function(e){
      if(e.target.id!="shelper"&&e.target.id!="txtSearch")
        shelper.style.display="none";
    }
    txtSearch.onfocus=
    txtSearch.onkeyup=function(e){
      var txt=this;
      if(e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=13){
        if(txt.value!=""){
          shelper.style.display="block";
          ajax("get","data/03-header/search.php?kw="+txt.value)
          .then(data=>{
            if(data.length>0){
              var html="";
              for(var obj of data){
                html+=
                `<li title="${obj.title}">
                  <div class="search-item">${obj.title}</div>
                </li>`
              }
              shelper.innerHTML=html;
            }else{
              shelper.innerHTML="未找到匹配商品";
            }
            return new Promise(resolve=>resolve())
          })
          .then(()=>{
            shelper.onclick=function(e){
              if(e.target.nodeName=="DIV"){
                txt.value=e.target.parentNode.title;
                setTimeout(
                  ()=>location="04-products.html?kw="+txt.value
                ,500);
              }
            }
            $("[data-trigger=search]")[0].onclick=function(e){
              e.preventDefault();
              if(txt.value!="")
                location="04-products.html?kw="+txt.value;
            }
          })
        }else
          shelper.style.display="none";
      }
    };
    txtSearch.onkeydown=function(e){  
      var txt=this; 
      if(shelper.style.display=="block"&&shelper.children.length!=0){
        if(e.keyCode==38||e.keyCode==40){
          var focusLi=shelper.find(".focus")[0];
          if(focusLi===undefined){
            shelper.children[0].className="focus";
          }else{
            switch(e.keyCode){
              case 38:
                if(focusLi==shelper.children[0]){
                  focusLi.className="";
                  shelper.lastElementChild.className="focus";
                }else{
                  focusLi.className="";
                  focusLi.previousElementSibling.className="focus";
                }
                break;
              case 40:
                if(focusLi==shelper.lastElementChild){
                  focusLi.className="";
                  shelper.firstElementChild.className="focus";
                }else{
                  focusLi.className="";
                  focusLi.nextElementSibling.className="focus";
                }
                break;
            }
          }
          txt.value=shelper.find(".focus")[0].title;
        }else if(e.keyCode==13){
          location="04-products.html?kw="+txt.value;
        }
      }
    }
    //为window绑定scroll事件
    $(window).scroll(()=>{
      //如果滚动距离>=60
      if($("body").scrollTop()>=60)
        //找到id为header-top的div，添加fixed_nav
        $("#header-top").addClass("fixed_nav");
      else//否则
        //找到id为header-top的div，移除fixed_nav
        $("#header-top").removeClass("fixed_nav");
    });

    //登录
    $("#list>li:last-child").click(e=>{
      var uid=prompt("输入用户编号");
      $.post("data/03-header/login.php",{uid})
      .then(()=>{
        loadUser();
      })
    });
    function loadUser(){
      $.get("data/03-header/hello.php")
          .then(text=>{
          $("#list>li:last-child").html(text);  
        });
    }
    loadUser();
  });
})();

