import React, { useState } from 'react'
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

const LoadingImage = ({ source, style, loaderColor = '#0000ff', ...props }) => {
  const [loading, setLoading] = useState(true)

  return (
    <View style={[styles.container, style]}>
      {loading && <ActivityIndicator style={styles.loader} size="large" color={loaderColor} />}
      {/* {loading === true ? <ActivityIndicator style={styles.loader} size="large" color={loaderColor} /> : */}
        <Image
          style={[styles.image, style]}
          source={source}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          {...props}
        />
    </View>
  )
}

LoadingImage.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    PropTypes.number,
  ]).isRequired,
  style: PropTypes.object,
  loaderColor: PropTypes.string,
}

export default LoadingImage

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  loader: {
    position: 'absolute',
  },
})
