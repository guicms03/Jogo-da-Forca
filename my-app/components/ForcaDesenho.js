import React from 'react';
import { View } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

export default function ForcaDesenho({ erros }) {
  return (
    <View>
      <Svg height="200" width="120">
        {/* Estrutura da forca */}
        <Line x1="10" y1="190" x2="110" y2="190" stroke="brown" strokeWidth="4" />
        <Line x1="30" y1="190" x2="30" y2="20" stroke="brown" strokeWidth="4" />
        <Line x1="30" y1="20" x2="80" y2="20" stroke="brown" strokeWidth="4" />
        <Line x1="80" y1="20" x2="80" y2="40" stroke="brown" strokeWidth="4" />

        {/* Boneco - partes aparecem conforme erros */}
        {erros > 0 && <Circle cx="80" cy="50" r="10" stroke="black" strokeWidth="3" fill="none" />}
        {erros > 1 && <Line x1="80" y1="60" x2="80" y2="100" stroke="black" strokeWidth="3" />}
        {erros > 2 && <Line x1="80" y1="70" x2="65" y2="90" stroke="black" strokeWidth="3" />}
        {erros > 3 && <Line x1="80" y1="70" x2="95" y2="90" stroke="black" strokeWidth="3" />}
        {erros > 4 && <Line x1="80" y1="100" x2="65" y2="130" stroke="black" strokeWidth="3" />}
        {erros > 5 && <Line x1="80" y1="100" x2="95" y2="130" stroke="black" strokeWidth="3" />}
      </Svg>
    </View>
  );
}
