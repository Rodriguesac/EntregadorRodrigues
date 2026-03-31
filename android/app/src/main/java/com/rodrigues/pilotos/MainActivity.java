package com.rodrigues.pilotos; // Verifique se o seu package é este mesmo

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Registra os plugins nativos que o seu app usa
    registerPlugin(com.capacitorjs.plugins.geolocation.GeolocationPlugin.class);
    registerPlugin(com.capacitorjs.plugins.camera.CameraPlugin.class);
    registerPlugin(com.capacitorjs.plugins.haptics.HapticsPlugin.class);
    registerPlugin(com.capacitorjs.plugins.network.NetworkPlugin.class);
  }
}