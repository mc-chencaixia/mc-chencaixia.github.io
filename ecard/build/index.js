$(function(){var canvas=document.getElementById("J_canvas"),ctx=canvas.getContext("2d"),imgObj=document.getElementById("J_imgBg"),iptObjs=$("input"),formObj=$("form"),btnOk=$("#J_btnOk"),btnRst=$("#J_btnRst"),posMap={name:{x:0,y:30,fontsize:"24px",color:"#5f5d5d"},title:{x:85,y:29},phone:{x:260,y:29,fontsize:"12px",color:"#5f5d5d"},telephone:{x:40,y:95},email:{x:40,y:115},net:{x:40,y:139},website:{x:240,y:114},blog:{x:240,y:93},address:{x:40,y:164}},defaultInfo={net:"杭州、广州、南京、武汉、宁波",website:"www.mchz.com.cn",blog:"blog.mchz.com.cn",name:"姓名",title:"职位信息",address:"浙江杭州西湖区万塘路30号高新东方科技园4幢一楼东室"},info={net:defaultInfo.net,website:defaultInfo.website,blog:defaultInfo.blog,name:"",title:"",address:""},drawBg=function(){ctx.drawImage(imgObj,0,0)},drawText=function(text,pos){if(!text||!pos)return!1;var fs=pos.fontsize||"12px",cl=pos.color||"#898989",font=pos.font||"微软雅黑";ctx.font=fs+" "+font,ctx.fillStyle=cl,ctx.fillText(text,pos.x,pos.y)},getInfo=function(){$.each(iptObjs,function(k,v){info[v.id]=v.value||defaultInfo[v.id]})},drawInfo=function(){for(var i in info)drawText(info[i],posMap[i]);var dataURL=(ctx.getImageData(0,0,canvas.width,canvas.height),canvas.toDataURL());dataURL&&""!=dataURL&&btnOk.attr("href",dataURL)},renderCard=function(){drawBg(),getInfo(),drawInfo()};formObj.on("blur","input",function(ev){var it=ev.currentTarget;info[it.id]=""==it.value?defaultInfo[it.id]:it.value,drawBg(),drawInfo()}),btnOk.on("click",function(){console.log("生成图片")}),btnRst.on("click",function(){formObj[0].reset(),renderCard()});var init=function(){renderCard()};init()});