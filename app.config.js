const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';


// const useRemoteVersion = !IS_DEV && !IS_PREVIEW;
const useRemoteVersion = false;

const getUniqueIdentifier = () => {
    if (IS_DEV) {
      return 'vardhaman.satyasadhnaOne.dev';
    }
  
    if (IS_PREVIEW) {
      return 'vardhaman.satyasadhnaOne.preview';
    }
  
    return 'vardhaman.satyasadhnaOne';
  };
  
  const getAppName = () => {
    if (IS_DEV) {
      return 'Satya Sadhna (Dev)';
    }
  
    if (IS_PREVIEW) {
      return 'Satya Sadhna (Preview)';
    }
  
    return 'Satya Sadhna';
  };
  

export default ({ config }) => ({
    ...config,
    name: getAppName(),
      versionSource: useRemoteVersion ? 'remote' : 'local', 
      // versionSource:'local', 
    ios: {
      ...config.ios,
      bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
      ...config.android,
      package: getUniqueIdentifier(),
    },
  });
  