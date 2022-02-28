import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../theme/app.theme';

interface Props {
  texto: string;
  color?: string;
  ancho?: boolean;
  accion: (numeroTexto: string) => void;
}

export const BotonCalc = ({
  texto,
  color = '#444',
  ancho = false,
  accion,
}: Props) => {
  return (
    <TouchableOpacity onPress={() => accion(texto)}>
      <View
        style={{
          ...styles.boton,
          backgroundColor: color,
          width: ancho ? 180 : 80,
        }}>
        <Text
          style={{
            ...styles.botonTexto,
            color: color === '#9B9B9B' ? 'black' : 'white',
          }}>
          {texto}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
