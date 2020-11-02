import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';

//NOSSOS COMPONENTES
import Header from '../../components/Header';
import api from '../../services/api';
import * as S from './styles';
import typeIcons from '../../utils/typeicons';
import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';


function Tasks() {

  const [lateCount, setLateCount] = useState();

  const [type, setType] = useState();


  async function lateVerify(){
    await api.get(`/task/filter/late/11:11:11:11:11:11`)
    .then(response =>{
      setLateCount(response.data.length)

    }) 
  }


  useEffect(()=>{
    lateVerify();
  },[])
  
  return (
    <S.Container>
        <Header lateCount ={lateCount}/>
        <S.Form>
            <S.TypeIcons>
                {

                    typeIcons.map((icon, index) =>(
                       index > 0 && 
                       <button type="button" onClick={() =>setType(index)}>
                            <img src={icon} alt="Tipo da Tarefa" 
                             className={type && type !== index && 'inative'}
                            /> 
                       </button>
                      
                    ))
                }
            </S.TypeIcons>

            <S.Input>
                <span>Título</span>
                <input type="text" placeholder="Tíutulo da tarefa"/>
            </S.Input>

            <S.Textarea>
                <span>Título</span>
                <textarea rows={5} placeholder="Descrição da Tarefa"/> 
            </S.Textarea>

            <S.Input>
                <span>Data</span>
                <input type="date" placeholder="Tíutulo da tarefa"/>
                <img src={iconCalendar} alt="Calendário"/>
            </S.Input>

            <S.Input>
                <span>Hora</span>
                <input type="time" placeholder="Tíutulo da tarefa" content="none"/>
                <img src={iconClock} alt="Relógio"/>
            </S.Input>

            <S.Options>
                <div>
                    <input type="checkbox"/>
                    <span>CONCLUÍDO</span>
                </div>
                <button>EXCLUIR</button>
            </S.Options>

            <S.Save>
            <button>SALVAR</button>
            </S.Save>

        </S.Form>

        <Footer/>
      </S.Container>
    );
  }
  
  export default Tasks;
  