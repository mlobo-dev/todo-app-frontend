import styled from 'styled-components';

export const Container = styled.div`
    width:260px;
    height: 60px;
    background: ${props => props.actived? '#EE6B26':'#20295F'};
    border-radius: 5px;
    padding:10px;

    display: flex;
    flex-direction:column;
    justify-content:space-around;
    cursor: pointer;

    img{
        width:25px;
        height:25px;
        margin:5px;
    }

    span{
        color:#FFF;
        font-weight:bold;
        margin:5px;
        align-self:flex-end;
        font-size:18px;
    }

    &:hover{
        background-color:#EE6B26;
    }
  

`