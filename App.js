import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button  } from 'react-native';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

// IDs de teste do AdMob (troque pelos seus IDs de produção)
const adUnitIdBanner = __DEV__ ? TestIds.BANNER : 'ca-app-pub-9999999999999/999999999';
const adUnitIdInterstitial = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8888888888888/888888888';

const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitial, {
  requestNonPersonalizedAdsOnly: true,
});



const App = () => {
  // Carregar o anúncio intersticial assim que o app iniciar
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Anúncio intersticial carregado');
    });

    interstitial.load();

    return () => {
      unsubscribe();
    };
  }, []);

  const showInterstitialAd = () => {
    if (interstitial.isLoaded()) {
      interstitial.show();
    } else {
      console.log('Anúncio intersticial não está pronto ainda');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Anúncio de banner */}
      <BannerAd
        unitId={adUnitIdBanner}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />

      {/* Botão para exibir o anúncio intersticial */}
      <Button title="Mostrar Anúncio Intersticial" onPress={showInterstitialAd} />
    </View>
  );
};

export default App;


