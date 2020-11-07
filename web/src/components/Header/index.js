import React, { useState, useEffect } from "react";
import * as S from "./styles";
import logo from "../../assets/logo.png";
import bell from "../../assets/bell.png";
import { Link } from "react-router-dom";
import api from "../../services/api";
import isConnected from "../../utils/isConnected";

function Header({ clickNotification }) {
  const [lateCount, setLateCount] = useState();

  async function lateVerify() {
    await api.get(`/task/filter/late/${isConnected}`).then((response) => {
      setLateCount(response.data.length);
    });
  }

  function logout() {
    localStorage.removeItem("@todo/macaddress");
    window.location.reload();
  }

  useEffect(() => {
    lateVerify();
  }, []);
  return (
    <S.Container>
      <S.LeftSide>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </S.LeftSide>
      <S.RightSide>
        <Link to="/"> INÍCIO</Link>

        <span className="dividir" />

        <Link to="/tasks">NOVA TAREFA</Link>

        <span className="dividir" />

        {!isConnected ? (
          <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
        ) : (
          <button type="button" onClick={logout}>
            SAIR
          </button>
        )}

        {lateCount && isConnected && (
          <>
            <span className="dividir" />
            <button id="notification" onClick={clickNotification}>
              <img src={bell} alt="Notificação" />
              <span>{lateCount}</span>
            </button>
          </>
        )}
      </S.RightSide>
    </S.Container>
  );
}

export default Header;
