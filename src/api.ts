// src/api.ts
import { API_URL } from './config';

export type Enano = {
  id: number;
  nombre: string;
  edad: number | null;
};

export async function obtenerEnanos(): Promise<Enano[]> {
  const res = await fetch(`${API_URL}/enanos`);
  if (!res.ok) {
    throw new Error('No se pudieron obtener los enanos');
  }
  return res.json();
}

export async function crearEnano(nombre: string, edad: string): Promise<Enano> {
  const res = await fetch(`${API_URL}/enanos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre,
      edad: edad.trim() === '' ? undefined : Number(edad),
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'No se pudo crear el enano');
  }
  return res.json();
}

export async function eliminarEnano(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/enanos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok && res.status !== 204) {
    throw new Error('No se pudo eliminar el enano');
  }
}
