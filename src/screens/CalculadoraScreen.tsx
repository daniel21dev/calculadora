import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {BotonCalc} from '../components/BotonCalc';
import {styles} from '../theme/app.theme';

enum operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const CalculadoraScreen = () => {
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

  return (
    <View style={styles.calculadoraContainer}>
      {numeroAnterior !== '0' && (
        <Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>
      )}

      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>

      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" accion={limpiar} />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={positivoNegativo} />
        <BotonCalc texto="del" color="#9B9B9B" accion={btnDelete} />
        <BotonCalc texto="÷" color="#FF9427" accion={btnDividir} />
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="7" accion={armarNumero} />
        <BotonCalc texto="8" accion={armarNumero} />
        <BotonCalc texto="9" accion={armarNumero} />
        <BotonCalc texto="X" color="#FF9427" accion={btnMultiplicar} />
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="4" accion={armarNumero} />
        <BotonCalc texto="5" accion={armarNumero} />
        <BotonCalc texto="6" accion={armarNumero} />
        <BotonCalc texto="-" color="#FF9427" accion={btnRestar} />
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="1" accion={armarNumero} />
        <BotonCalc texto="2" accion={armarNumero} />
        <BotonCalc texto="3" accion={armarNumero} />
        <BotonCalc texto="+" color="#FF9427" accion={btnSumar} />
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="0" accion={armarNumero} ancho />
        <BotonCalc texto="." accion={armarNumero} />
        <BotonCalc texto="=" color="#FF9427" accion={calcular} />
      </View>
    </View>
  );
};
