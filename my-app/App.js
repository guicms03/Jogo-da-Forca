import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import ForcaDesenho from './components/ForcaDesenho'; // Se você criou o componente de desenho da forca, se não, pode tirar essa linha e o componente abaixo

const palavras = [
  'REACT', 'NATIVE', 'EXPO', 'JAVASCRIPT', 'PROGRAMA', 'INTERFACE', 'COMPONENTE',
  'ESTADO', 'FUNCAO', 'HOOKS', 'MOBILE', 'ANDROID', 'IOS', 'TECLADO', 'STYLESHEET',
  'NAVIGATOR', 'TELA', 'USUARIO', 'CODIGO', 'JOGO', 'FORCA', 'DIFICULDADE', 'TENTATIVA',
  'BOTAO', 'VITORIA', 'DERROTA', 'PALAVRA', 'DESAFIO', 'ESTILOS', 'DIGITAR'
];

const MAX_TENTATIVAS = 6;

export default function App() {
  const [palavra, setPalavra] = useState('');
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [tentativasRestantes, setTentativasRestantes] = useState(MAX_TENTATIVAS);
  const [letraDigitada, setLetraDigitada] = useState('');
  const [status, setStatus] = useState('jogando'); // 'jogando' | 'vitoria' | 'derrota'

  useEffect(() => {
    iniciarJogo();
  }, []);

  const iniciarJogo = () => {
    const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavra(novaPalavra);
    setLetrasUsadas([]);
    setTentativasRestantes(MAX_TENTATIVAS);
    setLetraDigitada('');
    setStatus('jogando');
  };

  const verificarLetra = () => {
    const letra = letraDigitada.toUpperCase();

    if (!letra || letra.length !== 1 || letrasUsadas.includes(letra) || !letra.match(/[A-Z]/)) {
      setLetraDigitada('');
      return;
    }

    const novasLetras = [...letrasUsadas, letra];
    setLetrasUsadas(novasLetras);

    if (!palavra.includes(letra)) {
      const tentativas = tentativasRestantes - 1;
      setTentativasRestantes(tentativas);
      if (tentativas <= 0) setStatus('derrota');
    } else {
      const ganhou = palavra.split('').every((l) => novasLetras.includes(l));
      if (ganhou) setStatus('vitoria');
    }

    setLetraDigitada('');
  };

  const renderizarPalavra = () => {
    return palavra
      .split('')
      .map((letra) => (letrasUsadas.includes(letra) || status !== 'jogando' ? letra : '_'))
      .join(' ');
  };

  const letrasCorretas = letrasUsadas.filter((l) => palavra.includes(l));
  const letrasErradas = letrasUsadas.filter((l) => !palavra.includes(l));

  return (
    <View style={styles.container}>
      {/* Se tiver o componente do desenho, descomente abaixo */}
      {/* <ForcaDesenho erros={letrasErradas.length} /> */}

      <Text style={styles.titulo}>Jogo da Forca</Text>

      <Text style={styles.palavra}>{renderizarPalavra()}</Text>
      <Text style={styles.tentativas}>Tentativas restantes: {tentativasRestantes}</Text>

      {status === 'jogando' && (
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={letraDigitada}
            onChangeText={setLetraDigitada}
            maxLength={1}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.botao} onPress={verificarLetra}>
            <Text style={styles.botaoTexto}>Enviar</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.letras}>Letras Corretas: {letrasCorretas.join(', ')}</Text>
      <Text style={styles.letras}>Letras Erradas: {letrasErradas.join(', ')}</Text>

      {status !== 'jogando' && (
        <View style={styles.resultadoArea}>
          <Text style={styles.resultado}>
            {status === 'vitoria'
              ? '🎉 Parabéns! Você venceu!'
              : `💀 Fim de jogo! A palavra era: ${palavra}`}
          </Text>
          <TouchableOpacity style={styles.botaoReiniciar} onPress={iniciarJogo}>
            <Text style={styles.botaoTexto}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef6ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  palavra: {
    fontSize: 32,
    letterSpacing: 8,
    marginBottom: 20,
  },
  tentativas: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#333',
    fontSize: 24,
    width: 50,
    textAlign: 'center',
    marginRight: 10,
  },
  botao: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  letras: {
    fontSize: 16,
    marginVertical: 4,
  },
  resultadoArea: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultado: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  botaoReiniciar: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
  },
});
