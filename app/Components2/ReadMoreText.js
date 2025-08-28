import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';// Adjust import to your file structure
import Metrics from '../utils/ResposivesUtils/Metrics';

const ReadMoreText = ({ text,MAX_LINES=3 }) => {
  const [expanded, setExpanded] = useState(false);


  if (!text) {
    return <Text>"....."</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontFamily: 'Gabarito-VariableFont',
          color: '#030370',
          fontSize: Metrics.rfv(12),
          marginTop: 10,
          lineHeight: 18,
        }}
        numberOfLines={expanded ? undefined : MAX_LINES}
      >
        {text}
      </Text>

      {text.length > 100 && ( // Show "Read more" only for long text
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={{
            color: '#007BFF',
            marginTop: 5,
            fontSize: Metrics.rfv(11),
            fontWeight: 'bold'
          }}>
            {expanded ? 'Read less' : 'Read more'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReadMoreText;
