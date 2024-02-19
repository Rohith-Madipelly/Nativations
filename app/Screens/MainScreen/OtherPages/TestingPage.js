import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function TestingPage() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {[1].map((x, i) => (
                <Item key={x} i={i} />
            ))}
        </ScrollView>
    );
}

function Item({ i }) {
    const [open, setopen] = useState(false);
    const onPress = () => {
        LayoutAnimation.easeInEaseOut();
        setopen(!open);
    };
    return (
        <TouchableOpacity style={styles.item}  activeOpacity={1}>
            <View style={styles.row}>
                <Text>Header - {i + 1}</Text>
               <TouchableOpacity onPress={onPress}>
                 <Text>{open ? 'close' : 'open'}</Text>
                 </TouchableOpacity>
            </View>
            {open &&
                [1, 2, 3, 4, 5].map(x => (
                    <Text key={x} style={styles.subItem}>
                        - SOME DATA
                    </Text>
                ))}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 5
    },
    item: {
        width: '100%',
        borderWidth: 1,
        paddingHorizontal: 20,
        overflow: 'hidden',
        paddingVertical: 10,
        marginBottom: 5,

        backgroundColor:'blue'
    },
    subItem: {
        padding: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});