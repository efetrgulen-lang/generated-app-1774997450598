import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

// Uygulama çökmesini engelleyip kırmızı X gösteren Error Boundary bileşeni
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.errorBox}>
            <Text style={styles.redX}>❌</Text>
            <Text style={styles.errorText}>Yine hata verdi!</Text>
            <Text style={styles.subText}>Ama merak etme, bu sefer kontrol bizde.</Text>
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={() => this.setState({ hasError: false })}
            >
              <Text style={styles.retryButtonText}>Tekrar Dene</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

const MainScreen = () => {
  const [throwError, setThrowError] = useState(false);

  // Kasıtlı olarak hata fırlatıyoruz
  if (throwError) {
    throw new Error("Kırmızı X Hatası!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Her Şey Yolunda 🚀</Text>
      <Text style={styles.description}>Uygulama şu an sorunsuz çalışıyor.</Text>
      <TouchableOpacity style={styles.button} onPress={() => setThrowError(true)}>
        <Text style={styles.buttonText}>Hata Verdir (Kırmızı X Gör)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <MainScreen />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  errorBox: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFE6E6',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FF0000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  redX: {
    fontSize: 100,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
