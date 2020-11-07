import React from "react";
import * as S from "./styles";
import logo from "../../assets/logo.png";
import bell from "../../assets/bell.png";
import { Link } from "react-router-dom";
function Header({ lateCount, clickNotification }) {
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

        <Link to="/qrcode">SINCRONIZAR CELULAR</Link>

        {lateCount && (
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
