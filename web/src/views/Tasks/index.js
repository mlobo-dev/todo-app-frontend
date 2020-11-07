import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { format } from "date-fns";
import { Redirect } from "react-router-dom";
import { mensagemErro, mensagemSucesso } from "../../components/Toastr/toastr";
import ErroValidacao from "../../exceptions/ErroValidacao";

//NOSSOS COMPONENTES
import Header from "../../components/Header";
import api from "../../services/api";
import * as S from "./styles";
import typeIcons from "../../utils/typeicons";
import iconCalendar from "../../assets/calendar.png";
import iconClock from "../../assets/clock.png";

function Tasks({ match }) {
  const [id, setId] = useState();
  const [redirect, setRedirect] = useState();
  const [type, setType] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacAddress] = useState("11:11:11:11:11:11");

  async function loadTaskDetails() {
    await api.get(`/task/${match.params.id}`).then((response) => {
      setType(response.data.type);
      setId(response.data._id);
      setTitle(response.data.title);
      setDone(response.data.done);
      setDescription(response.data.description);
      setDate(format(new Date(response.data.when), "yyyy-MM-dd"));
      setHour(format(new Date(response.data.when), "HH:mm"));
    });
  }

  function taskValidation(title, description, date, hour) {
    const erros = [];

    if (!title) {
      erros.push("O campo Título é obrigatório");
    }

    if (!hour) {
      erros.push("O campo Hora é obrigatório");
    }

    if (!date) {
      erros.push("O campo Data é obrigatório");
    }

    if (!description) {
      erros.push("O campo Descrição é obrigatório");
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

  async function save() {
    try {
      taskValidation(title, description, date, hour);
    } catch (error) {
      const msgs = error.mensagens;
      msgs.forEach((msg) => {
        mensagemErro(msg);
      });
      return false;
    }

    if (match.params.id) {
      await api
        .put(`/task/${match.params.id}`, {
          macaddress,
          type,
          title,
          description,
          when: `${date}T${hour}:00.000Z`,
          done,
        })
        .then(() => {
          setRedirect(true);
          mensagemSucesso("Tarefa editada Com Sucesso!");
        });
    } else {
      await api
        .post("/task", {
          macaddress,
          type,
          title,
          description,
          when: `${date}T${hour}:00.000Z`,
          done,
        })
        .then(() => {
          setRedirect(true);
          mensagemSucesso("Tarefa salva Com Sucesso!");
        })
        .catch((e) => {
          debugger;
          mensagemErro(e.response.data.error);
        });
    }
  }

  async function remove() {
    const res = window.confirm("Deseja realmente remover a tarefa");
    if (res === true) {
      await api.delete(`/task/${id}`);
      setRedirect(true);
      mensagemSucesso("Deletado com sucesso!");
    }
  }

  useEffect(() => {
    loadTaskDetails();
  }, []);

  return (
    <S.Container>
      {redirect && <Redirect to="/" />}
      <Header />
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
          <button type="button" onClick={remove}>
            EXCLUIR
          </button>
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
