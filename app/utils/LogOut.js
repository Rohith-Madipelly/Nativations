export const LogOutHandle = async () => {
    setSpinnerbool(true)
    try {
      await AsyncStorage.removeItem('AdsReel$:' + 'Token');
      // setSpinnerbool(false)
      setTimeout(() => {
        dispatch(setToken(null));
      }, 2000)
    }
    catch (e) {
      console.log("error", e)
    }
}