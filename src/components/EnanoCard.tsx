// src/components/EnanoCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Enano } from '../api';

type Props = {
  enano: Enano;
  onEliminar: (id: number) => void;
};

export default function EnanoCard({ enano, onEliminar }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nombre}>{enano.nombre}</Text>
        <Text style={styles.edad}>
          {enano.edad !== null && enano.edad !== undefined
            ? `Edad: ${enano.edad}`
            : 'Edad: -'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botonEliminar}
        onPress={() => onEliminar(enano.id)}
      >
        <Text style={styles.textoBoton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  edad: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  botonEliminar: {
    backgroundColor: '#e63946',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: '600',
  },
});
