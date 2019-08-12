<template>
  <div class="layout-root">
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style lang="less">
  html {
    font-family: sans-serif;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%
  }

  html, body {
    background: #FFF;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }


  .layout-root {
    background: #fff;
    height:100%;
    h1, h2, h3, h4, h5, h6, hr, p, iframe,div,
    dl, dt, dd, ul, ol, li, pre, form, button, input,
    textarea, th, td, fieldset {
      margin: 0;
      padding: 0;
    }
    h1, h2, h3, h4, h5, h6,p,ol, dl,input, button, textarea, select, optgroup,
    option,span{
      font-size: 0.28rem;
      font-family: inherit;
      font-style: inherit;
      font-weight: inherit;
      overflow: hidden;
    }
    ul, ol, dl {
      list-style-type: none;
    }

    input, button {
      overflow: visible;
      vertical-align: middle;
      outline: none;
    }

    button, input {
      border: none;
    }

    body, th, td, button, input, select,
    textarea {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    th, td, button, input,
    select, textarea {
      font-family: "Microsoft Yahei", "Hiragino Sans GB", "Helvetica Neue", Helvetica, tahoma, arial, Verdana, sans-serif, "WenQuanYi Micro Hei", "\5B8B\4F53";
    }

    div, p {
      word-wrap: break-word;
    }
    div{
      font-size:0.3rem;
    }
    a, area {
      outline: none;
    }

    a {
      text-decoration: none;
      color:#000;
    }

    a:hover {
      text-decoration: underline;
      outline: none;
      color: #333;
    }

    a:focus {
      outline: none;
    }

    a:hover, a:active {
      outline: none;
      text-decoration: none;
    }

    :focus {
      outline: none;
    }

    sub, sup {
      vertical-align: baseline;
    }

    input:focus {
      border: none;
    }

    img {
      border: 0;
    }
    /*HTML5 reset*/
    header, footer, section, aside, details,
    menu, article, section, nav, address,
    hgroup, figure, figcaption, legend {
      display: block;
      margin: 0;
      padding: 0;
    }

    time {
      display: inline;
    }

    audio, canvas, video {
      display: inline-block;
      *display: inline;
      *zoom: 1
    }

    audio:not([controls]) {
      display: none;
    }

    svg:not(:root) {
      overflow: hidden;
    }

    fieldset {
      border-width: 0;
      padding: 0.35rem 0.625rem 0.75rem;
      margin: 0 2px;
    }

    input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button {
      height: auto;
    }

    input[type="search"] {
      -webkit-appearance: textfield; /* 1 */
      -moz-box-sizing: content-box;
      -webkit-box-sizing: content-box; /* 2 */
      box-sizing: content-box;
    }

    input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    input::-ms-clear {
      display: none;
    }

    textarea {
      resize: none;
    }

    * {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

    /*更改文本框提示文字的颜色*/

    input:-ms-input-placeholder {
      color: #b7b5b5;
    }

    input::-webkit-input-placeholder {
      color: #b7b5b5;
    }

    /*去掉苹果对textarea的默认样式*/
    textarea, input {
      -webkit-appearance: none;
      border-radius: 0;
    }

    /*清除a,button,input手机端的点击效果*/
    a, button, input {
      -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
    }

    /*将设备自动添加的播放按钮隐藏*/
    video {
      width: 100%;
      height: 100%;
      background: #000;
    }

    text:hover {
      border: none;
    }

    input {
      outline: medium;
    }

    /*清除滚动条，只支持移动端*/
    #exhibition::-webkit-scrollbar {
      display: none;
    }

    select::-ms-expand {
      display: none;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }

  /**
  公共样式
   */
  .box-center{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }
  .box-center-column{
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
  .box-between{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .box-between-column{
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
  .box-start{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
  }
  .box-start-column{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
  }
  .box-end{
     display: flex;
     flex-flow: row nowrap;
     align-items: center;
     justify-content: flex-end;
   }
  .box-end-column{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
  }
  .width-all{
    width:100%;
  }
  .theme{
    background: #329ff9;
  }
  .back_white{
    background: url("../../assets/images/back_white.png") top center no-repeat;
    background-size:cover;
    width:0.5rem;
    height:0.5rem;
  }
  .back_black{
    background: url("../../assets/images/back_black.png") top center no-repeat;
    background-size:cover;
    width:0.5rem;
    height:0.5rem;
  }
  .img{
    background: center center no-repeat;
    background-size:cover;
  }
  .hover{
    -webkit-tap-highlight-color:transparent;
  }
  .shrink{
    flex-shrink: 0;
  }
  .icon{
    background: center center no-repeat;
    background-size:cover;
    width:0.5rem;
    height:0.5rem;
  }
  .center{
    align-items: center;
    text-align: center;
  }
</style>
