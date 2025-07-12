import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const Avatar = ({uri, size = 40, style}) => {
  return (
    <View style={[styles.container, {width: size, height: size}, style]}>
      <FastImage
        source={{uri}}
        style={[styles.image, {width: size, height: size, borderRadius: size / 2}]}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    backgroundColor: '#f0f0f0',
  },
});

export default Avatar;