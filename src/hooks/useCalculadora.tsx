import {useState, useRef} from 'react';

enum operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const useCalculadora = () => {
  const [numeroAnterior, setnumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');

  const ultimaOperacion = useRef<operadores>();

  const limpiar = () => {
    setNumero('0');
    setnumeroAnterior('0');
  };

  const armarNumero = (numeroTexto: string) => {
    if (numero.includes('.') && numeroTexto === '.') return;
    if (numero.startsWith('0') || numero.startsWith('-0')) {
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const btnDelete = () => {
    let negativo = '';
    let numeroTemp = numero;
    if (numero.includes('-')) {
      negativo = '-';
      numeroTemp = numero.slice(1);
    }
    if (numeroTemp.length > 1) {
      setNumero(negativo + numeroTemp.slice(0, -1));
    } else {
      setNumero('0');
    }
  };

  const cambiarNumPorAnterior = () => {
    if (numero.endsWith('.')) {
      setnumeroAnterior(numero.slice(0, -1));
    } else {
      setnumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = operadores.dividir;
  };

  const btnMultiplicar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = operadores.multiplicar;
  };

  const btnRestar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = operadores.restar;
  };

  const btnSumar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = operadores.sumar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case operadores.sumar:
        setNumero(`${num1 + num2}`);
        break;
      case operadores.restar:
        setNumero(`${num2 - num1}`);
        break;
      case operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        break;
      case operadores.dividir:
        if (num1 !== 0) {
          setNumero(`${num2 / num1}`);
        }
        break;
    }
    setnumeroAnterior('0');
  };

  return {
    numero,
    numeroAnterior,
    limpiar,
    positivoNegativo,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnSumar,
    btnRestar,
    calcular,
    armarNumero,
  };
};
