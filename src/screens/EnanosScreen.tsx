// src/screens/EnanosScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { Enano, obtenerEnanos, crearEnano, eliminarEnano } from '../api';
import EnanoCard from '../components/EnanoCard';

export default function EnanosScreen() {
  const [enanos, setEnanos] = useState<Enano[]>([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(false);
  const [refrescando, setRefrescando] = useState(false);

  const cargarEnanos = useCallback(async () => {
    try {
      const data = await obtenerEnanos();
      setEnanos(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los enanos. Revisá la URL del backend en src/config.ts');
    }
  }, []);

  useEffect(() => {
    cargarEnanos();
  }, [cargarEnanos]);

  const handleAgregar = async () => {
    if (!nombre.trim()) {
      Alert.alert('Falta el nombre', 'Ingresá un nombre para el enano');
      return;
    }
    setCargando(true);
    try {
      await crearEnano(nombre.trim(), edad);
      setNombre('');
      setEdad('');
      await cargarEnanos();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo crear el enano');
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = (id: number) => {
    Alert.alert('Eliminar enano', '¿Seguro que querés eliminarlo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await eliminarEnano(id);
            setEnanos((prev) => prev.filter((e) => e.id !== id));
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el enano');
          }
        },
      },
    ]);
  };

  const handleRefrescar = async () => {
    setRefrescando(true);
    await cargarEnanos();
    setRefrescando(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Enanos</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del enano"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.botonAgregar}
          onPress={handleAgregar}
          disabled={cargando}
        >
          <Text style={styles.textoBotonAgregar}>
            {cargando ? 'Agregando...' : 'Agregar enano'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={enanos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <EnanoCard enano={item} onEliminar={handleEliminar} />
        )}
        refreshControl={
          <RefreshControl refreshing={refrescando} onRefresh={handleRefrescar} />
        }
        contentContainerStyle={{ paddingVertical: 8 }}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay enanos todavía</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  form: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  botonAgregar: {
    backgroundColor: '#3a86ff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoBotonAgregar: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  vacio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
});
