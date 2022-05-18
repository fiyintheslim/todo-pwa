import styled, {createGlobalStyle} from "styled-components";
import IndItem from "../components/IndItem"
import ContainerLayout from "../layouts/Container"

const dark = "";
const light = ""


export default createGlobalStyle`
body{
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
padding:0px;
margin:0px;
box-sizing:border-box;
font-family: 'Josefin Sans', sans-serif;

}
`

export const Container=styled(ContainerLayout)`
display:flex;
flex-direction:column;
background:${props=>props.isDark?'hsl(235, 21%, 11%)':'hsl(0, 0%, 98%)'};
height:1000px;
position:relative;
transition: all 1s ease-out;
.todos{
    
    
}
ul.todos{
    list-style:none;
    padding-inline-start:0px;
    color:${props=>props.isDark?"white":"black"};
    border-radius: 5px;
    background: ${props=>props.isDark?"hsl(235, 24%, 19%)":"hsl(236, 33%, 92%)"};
    padding: 4px;
}
div.background{
    background-image:url(${props=>props.isDark ? dark : light}) ;
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    
    
}
.not-bg{
    position:relative;
    bottom: 150px;
    width:88%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 5px auto;
}
input{
    height: 30px;
    border-radius: 7px;
    
    background:${props=>props.isDark?"hsl(235, 24%, 19%)":"hsl(236, 33%, 92%)"};
    outline: none;
    border:none;
    padding: 5px;
    color:${props=>props.isDark?"white":"black"}
}
.last{
    background:${props=>props.isDark?"hsl(235, 24%, 19%)":"hsl(236, 33%, 92%)"};
    padding: 4px 20px;
    color:hsl(234, 11%, 52%);
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    &:active{
        color:hsl(220, 98%, 61%);
    }
    span{
        cursor: pointer;
    }
}
`
export const BackImg=styled.div`

`

export const Top=styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    
`

export const Logo=styled.h3`
letter-spacing: 1rem;
font-size: 20px;
text-transform: uppercase;
color: white;
`

export const Switch=styled.img`
height:20px;
width: 20px;
`

export const Item=styled(IndItem)`
background: ${props=>props.isDark?"hsl(235, 24%, 19%)":"hsl(236, 33%, 92%)"};
height: 40px;
display: flex;
align-items: center;
padding: 3px 15px;
border-bottom: hsl(234, 11%, 52%) 1px solid;
justify-content: space-between;
text-decoration:${props=>props.complete ? "line-through":"none"};
color:${props=>props.complete ? "gray":""};
img{
    width: 7px;
    height: 7px;
    padding: 5px;
    &:hover{
        width: 13px;
        height: 13px;
    }
}


`