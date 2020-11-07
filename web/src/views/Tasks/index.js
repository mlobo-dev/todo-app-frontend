import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { format } from "date-fns";
import { Redirect } from "react-router-dom";

//NOSSOS COMPONENTES
import Header from "../../components/Header";
import api from "../../services/api";
import * as S from "./styles";
import typeIcons from "../../utils/typeicons";
import iconCalendar from "../../assets/calendar.png";
import iconClock from "../../assets/clock.png";

function Tasks({ match }) {
  const [redirect, setRedirect] = useState();
  const [lateCount, setLateCount] = useState();
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacAddress] = useState("11:11:11:11:11:11");

  async function lateVerify() {
    await api.get(`/task/filter/late/11:11:11:11:11:11`).then((response) => {
      setLateCount(response.data.length);
    });
  }

  async function loadTaskDetails() {
    await api.get(`/task/${match.params.id}`).then((response) => {
      setType(response.data.type);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDate(format(new Date(response.data.when), "yyyy-MM-dd"));
      setHour(format(new Date(response.data.when), "HH:mm"));
    });
  }

  async function save() {
    if (match.params.id) {
      await api
        .put(`/task/${match.params.id}`, {
          macaddress,
          type,
          title,
          description,
          when: `${date}T${hour}:00.000Z`,
        })
        .then(() => setRedirect(true));
    } else {
      await api
        .post("/task", {
          macaddress,
          type,
          title,
          description,
          when: `${date}T${hour}:00.000Z`,
        })
        .then(() => setRedirect(true));
    }
  }

  useEffect(() => {
    lateVerify();
    loadTaskDetails();
  }, []);

  return (
    <S.Container>
      {redirect && <Redirect to="/" />}
      <Header lateCount={lateCount} />
      <S.Form>
        <S.TypeIcons>
          {typeIcons.map(
            (icon, index) =>
              index > 0 && (
                <button type="button" onClick={() => setType(index)}>
                  <img
                    src={icon}
                    alt="Tipo da Tarefa"
                    className={type && type !== index && "inative"}
                  />
                </button>
              )
          )}
        </S.TypeIcons>

        <S.Input>
          <span>Título</span>
          <input
            type="text"
            placeholder="Tíutulo da tarefa"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </S.Input>

        <S.Textarea>
          <span>Descrição</span>
          <textarea
            rows={5}
            placeholder="Descrição da Tarefa"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </S.Textarea>

        <S.Input>
          <span>Data</span>
          <input
            type="date"
            placeholder="Tíutulo da tarefa"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <img src={iconCalendar} alt="Calendário" />
        </S.Input>

        <S.Input>
          <span>Hora</span>
          <input
            type="time"
            placeholder="Tíutulo da tarefa"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
          <img src={iconClock} alt="Relógio" />
        </S.Input>

        <S.Options>
          <div>
            <input
              type="checkbox"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <span>CONCLUÍDO</span>
          </div>
          <button>EXCLUIR</button>
        </S.Options>

        <S.Save>
          <button type="button" onClick={save}>
            SALVAR
          </button>
        </S.Save>
      </S.Form>

      <Footer />
    </S.Container>
  );
}

export default Tasks;
