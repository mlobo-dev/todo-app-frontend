import React, {useMemo} from 'react'
import * as S from './styles';
import {format} from 'date-fns'
import iconDefault from '../../assets/default.png'
function TaskCard({type, title, when}) {

  const date = useMemo(() => format(new Date(when), 'dd/MM/yyyy'));
  const hour = useMemo(() => format(new Date(when), 'hh:mm'));
    return (
      
      <S.Container>
        <S.TopCard>
          <img src={iconDefault} alt="Icone da tarefa"></img>
          
          <h3>{title}</h3>
        </S.TopCard>
        <S.BottomCard>
          <strong>{date}</strong>
          <span>{hour}</span>
        </S.BottomCard>
      </S.Container>
     
      );
  }
  
  export default TaskCard;
  