import React, { useState } from "react";
import Footer from "../../components/Footer";
import Qr from "qrcode.react";
import { Redirect } from "react-router-dom";
import { mensagemErro } from "../../components/Toastr/toastr";
//NOSSOS COMPONENTES
import Header from "../../components/Header";
import * as S from "./styles";

function QrCode() {
  const [mac, setMac] = useState();
  const [redirect, setRedirect] = useState(false);

  async function saveMac() {
    if (mac) {
      await localStorage.setItem("@todo/macaddress", mac);
      setRedirect(true);
      window.location.reload();
    } else {
      mensagemErro("Código inválido");
    }
  }
  return (
    <S.Container>
      {redirect && <Redirect to="/" />}
      <Header />
      <S.Content>
        <h1>CAPTURE O QRCODE PELO APP</h1>
        <S.QrCodeArea>
          <Qr value="getmacaddress" size={350}></Qr>
        </S.QrCodeArea>
        <p>Suas atividades serão sincronizadas com a do seu Celular.</p>

        <S.ValidationCode>
          <span>Digite a numeração que apareceu no seu celular</span>
          <input
            type="text"
            onChange={(e) => setMac(e.target.value)}
            value={mac}
          />
          <button type="button" onClick={saveMac}>
            SINCRONIZAR
          </button>
        </S.ValidationCode>
      </S.Content>

      <Footer />
    </S.Container>
  );
}

export default QrCode;
