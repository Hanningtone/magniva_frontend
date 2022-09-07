import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  body {
    overflow-x: hidden !important ; /*preventing overflow*/
    margin: 0;
    padding: 0px 0px 0px 0px;
    font-size: 14px;
    line-height: 1.5;
    color: $color-text;
    font-family: $font-primary;
    background-color: #f1f1f1;
    margin: 0;
    height: 100%;
  }
  .form-group {
      margin-bottom:10px;
      label {
          margin-bottom:3px;
      }

  }
  .custom-control {
    margin-bottom:10px;
    .custom-control-label{
        margin-left:5px;
    }
  }
 .bg-c {
     background:#fff;
     table th {
        border: 1px solid #cacaca;
     }
     .table>:not(:first-child) {
         border-top:none;
     }
     
 }
  .section-two {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    background-color: #3D0003;
            height: 100%;
            width: 100%;
            position: fixed;x
            z-index: -2;
            top: 0;
            overflow-x: hidden;
            overflow-y: hidden;
            color : white;
        }

            .text-center{
                position: absolute;
                top: 35%;
                left: 10%;
                font-size: 30px;
                color: $color-white

                p {
                    font-size: 2rem;
                    font-family: $font-primary-light;
                    margin-top: 10vh;
                }

                b {
                    font-family: $font-primary-heavy;
                }
            }
        .fa-home{
        color: red;
        }

        .section-two {
            .centered {
                position: fixed;
                top: 52%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        @media (max-width:800px) {
            .section-one {
                display: none;
            }
            .section-two {
                width: 100%;
            }
        }
    
    .modalx {
        position: fixed;
        z-index: 500;
        background-color: white;
        border: 1px solid #ccc;
        padding: 10px 20px;
        top: 5%;
        box-sizing: border-box;
        transition: all 0.3s ease-out;
        width: 98%;
        left: calc(51% - 180px);
    }
    
    .backdrop {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.5);
    }

    .home-stat-wrapper{
        background-color: #fff;
        width:100%;
        padding:10px 10px 0px 10px;
        position: relative;
    }
    .stat-top-wrapper{
        text-align: right;
        p.stat-title{
            margin:0;
            font-size:13px;
        }
        p.stat-total{
            margin:0;
            font-size:17px;
            font-weight: bold;
            padding-bottom:5px;
        }
    }
    .stat-icon{
        position: absolute;
        top:-10px;
        left:10px;
        height:40px;
        width: 40px;
        color: #fff;
        background-color: $color_brown_shade;
        font-size:20px;
        text-align: center;
        padding:5px 0px;
    }
    .stat-bottom-wrapper{
        border-top: 1px solid #ccc;
        margin:5px 0px;
        padding:12px 0px 1px 0px;
    }
    table {
        width: 100%;
    }
    table thead{
        background-color: #f1f1f1;
    }
    table thead tr{
        font-size: 13px;
    }
    table thead tr td{
        padding:5px 10px;
        font-weight: bold;
        vertical-align: top;
    }
    table tbody tr: hover td{
       background-color: #f5f5f5;
       cursor: pointer;
    }
    table tbody tr td{
        padding:5px 10px;
        vertical-align: top;
        font-size: 13px;
        background-color: #fff;
    }
    table tbody tr td span.default{
        background-color: #f1f1f1; 
        padding:2px 5px; 
        border-radius: 5px;
        margin-right:2px;
    }
    span.category{
        background-color: orange;
        padding:3px 5px;
        text-align: center;
        font-size:12px;
        margin:5px 10px;
        border-radius: 5px;
    }
    .flex-row-btwn{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .modal-bar-wrapper{
        padding: 10px 0px 0px;
        margin: 20px 0px 0px 0px;
        justify-content:flex-end;
    }
    .form-alert{
        color: #f00;
        font-size: 10px;
        margin-top: 5px;
    }
    .btn-primary {
        background-color : #b7d4fd;
        color : #000;
        border-color : #FFEBEB;
    }
    .events_nav {
        margin : 5px 10px;
        background-color : #b7d4fd;
        width: max-content;
        display: block;
        padding: 0.2rem 1.7rem;
        display: flex;
        gap: 8rem;
        border-radius: 0.3rem;
        marging:10px;
    }
    .events_nav a {
        background: transparent;
        padding: 0.8rem;
        border-radius: 10%;
        display: flex;
        font-size: 0.9rem;
        color : #000;
        text-decoration : none;
    }
    .events_nav a:hover {
        color : white;
        font-weight bold;
    
    }
    .events_nav a:active {
        background: var(--color-bg);
        color: var(--color-white)
    }
    .top-info {
        height : 15vh;
        margin-top : 9px;
        padding-top : 1.5rem;
        
    }
    .clock-div{
        border-right: 1px solid #ccc;
    }
    .events__progresss {
        height: 110px;
        width : 110px;
        display: flex;
    }
    .enclose_circular_bar{
        height :140px;
        width : 140px;
    }
    .magniva-logo {
        position : fixed;
        top :1.5rem;
        height : 22%;
        width : 26%;
        z-index : 1;
        left : 38%;
    }
    .register {
        text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
        background-color : rgba(221, 228, 220, 1);
        color: #006666;
        position : absolute;
        left:46%;
        bottom: 33%;
        font-family: 'Poppins', sans-serif;
        paddind-top : 40px;
        border: none;
        
    }
    @media only screen and (min-width: 280px) {
             .modalx {
              width: 95%;
              left: calc(52% - 140px);
             }
         }
    
    @media only screen and (min-width: 375px) {
        .modalx {
            width: 95%;
            left: calc(50% - 178px);
        }
    }
    
    
    @media only screen and (min-width: 390px) {
        .modalx {
            width: 95%;
            left: calc(50% - 185px);
        }
    }
    
    @media only screen and (min-width: 412px), (min-width: 414px) {
        .modalx {
            width: 95%;
            left: calc(50% - 196px);
        }
    }
    
    @media only screen and (min-width: 540px) {
        .modalx {    
            width: 98%;
            left: calc(47% - 250px);
        }
    }
    
    @media only screen and (min-width: 576px) {
        .modalx {
            width: 100%;
            left: calc(50% - 250px);
        }
    }
    
    @media only screen and (min-width: 576px) { 
        .modalx {
            width: 100%;
            left: calc(50% - 250px);
        }
    }
    
    
    @media only screen and (min-width: 768px) { 
        .modalx {
            width: 500px;
            left: calc(50% - 250px);
        }
     }
    
    
    @media only screen and (min-width: 992px) { 
        .modalx {
            width: 500px;
            left: calc(50% - 250px);
        }
     }
    
    @media only screen and (min-width: 1200px) { 
        .modalx {
            width: 500px;
            left: calc(50% - 250px);
        }
     }
    
    @media only screen and (min-width: 1400px) { 
        .modalx {
            width: 500px;
            left: calc(50% - 250px);
        }
     }
     `;
