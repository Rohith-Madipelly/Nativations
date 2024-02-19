// import { DrawerContentScrollView } from "@react-navigation/drawer";

export function DrawerContent() {
  return (
    <SafeAreaView>
      <View
        style={{
          height: 222,
          width: '100%',
          // width: 322,
          justifyContent: 'center',
          alignItems: 'center',
          borderBlockColor: '#f4f4f4',
          borderBottomWidth: 1,
          backgroundColor: 'blue',
          borderBottomEndRadius: 50,
          borderBottomLeftRadius: 50
        }}>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          style={{
            height: 130,
            width: 130,
            borderRadius: 65
          }}>

        </Image>
      </View>

      <View>

      </View>
    </SafeAreaView>
  );
}