import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';
import { COLORS } from '../../src/constants/colors';
import { getZodiacByDate } from '../../src/constants/zodiac';
import DateTimePicker from '@react-native-community/datetimepicker';
import { z } from 'zod';
import { RoxyAPI } from '@roxyapi/sdk';

// Zod doğrulama şeması (şehir ve koordinatlar eklendi)
const birthSchema = z.object({
  date: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Tarih GG.AA.YYYY formatında olmalı'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Saat SS:DD formatında olmalı'),
  cityName: z.string().min(2, 'Şehir adı en az 2 karakter olmalı'),
  countryName: z.string().min(2, 'Ülke adı en az 2 karakter olmalı'),
  lat: z.number(),
  lng: z.number(),
  utcOffset: z.number(),
});

export default function CosmicIdScreen() {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form alanları
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [countryName, setCountryName] = useState('');
  const [cityName, setCityName] = useState('');
  const [district, setDistrict] = useState('');

  // Koordinatlar (şehir seçilince doldurulacak)
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [utcOffset, setUtcOffset] = useState<number | null>(null);

  // Otomatik tamamlama
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Şehir arama
  const handleCitySearch = (text: string) => {
    setSearchQuery(text);
    if (text.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // RoxyAPI ile şehir ara (offline)
    const results = RoxyAPI.searchCities(text, { limit: 5 });
    setSuggestions(results);
    setShowSuggestions(true);
  };

  // Şehir seç
  const selectCity = (city: any) => {
    setCityName(city.name);
    setCountryName(city.country);
    setLat(city.lat);
    setLng(city.lng);
    setUtcOffset(city.utcOffset || city.timezoneOffset || 0);
    setSearchQuery(city.name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleNext = async () => {
    // Validasyon
    try {
      birthSchema.parse({
        date,
        time,
        cityName,
        countryName,
        lat: lat ?? 0,
        lng: lng ?? 0,
        utcOffset: utcOffset ?? 0,
      });
      setErrors({});
    } catch (e: any) {
      const errs: Record<string, string> = {};
      e.errors.forEach((err: any) => {
        errs[err.path[0]] = err.message;
      });
      setErrors(errs);
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doğru şekilde doldurun.');
      return;
    }

    setLoading(true);
    try {
      const sign = getZodiacByDate(date);
      setUser({
        name: 'Gezgin',
        birthData: {
          date,
          time,
          location: `${district || cityName}, ${cityName}, ${countryName}`,
          sign,
          lat: lat!,
          lng: lng!,
          utcOffset: utcOffset!,
        },
      });
      router.push('/(auth)/jung-test');
    } catch (error) {
      Alert.alert('Hata', 'Bilgiler kaydedilirken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: COLORS.dark.ink }}
    >
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <Text style={{ color: COLORS.dark.gold, fontSize: 28, textAlign: 'center', marginBottom: 8 }}>
          🌌 Doğum Bilgilerin
        </Text>
        <Text style={{ color: COLORS.dark.textDim, fontSize: 12, textAlign: 'center', marginBottom: 32 }}>
          Yıldızların konumunu hesaplayabilmemiz için doğum anına ait bilgilerini girmelisin.
        </Text>

        {/* 📅 TARİH */}
        <Text style={{ color: COLORS.dark.text, marginBottom: 8 }}>📅 Doğum Tarihi (GG.AA.YYYY)</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={[styles.input, errors.date && styles.inputError]}>
            <Text style={{ color: date ? COLORS.dark.text : COLORS.dark.textDim }}>
              {date || '15.10.1983'}
            </Text>
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                const d = selectedDate;
                setDate(
                  `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`
                );
              }
            }}
          />
        )}
        {errors.date && <Text style={{ color: COLORS.dark.red, fontSize: 12, marginBottom: 8 }}>{errors.date}</Text>}

        {/* ⏰ SAAT */}
        <Text style={{ color: COLORS.dark.text, marginBottom: 8 }}>⏰ Doğum Saati (SS:DD)</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <View style={[styles.input, errors.time && styles.inputError]}>
            <Text style={{ color: time ? COLORS.dark.text : COLORS.dark.textDim }}>
              {time || '15:45'}
            </Text>
          </View>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="spinner"
            onChange={(event, selectedDate) => {
              setShowTimePicker(false);
              if (selectedDate) {
                const d = selectedDate;
                setTime(
                  `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
                );
              }
            }}
          />
        )}
        {errors.time && <Text style={{ color: COLORS.dark.red, fontSize: 12, marginBottom: 8 }}>{errors.time}</Text>}

        {/* 🌍 ÜLKE (otomatik doldurulur) */}
        <Text style={{ color: COLORS.dark.text, marginBottom: 8 }}>🌍 Ülke</Text>
        <TextInput
          style={[styles.input, errors.countryName && styles.inputError]}
          placeholder="Türkiye"
          placeholderTextColor={COLORS.dark.textDim}
          value={countryName}
          editable={false}
        />
        {errors.countryName && <Text style={{ color: COLORS.dark.red, fontSize: 12, marginBottom: 8 }}>{errors.countryName}</Text>}

        {/* 🏙️ ŞEHİR (Otomatik Tamamlama) */}
        <Text style={{ color: COLORS.dark.text, marginBottom: 8 }}>🏙️ Şehir</Text>
        <TextInput
          style={[styles.input, errors.cityName && styles.inputError]}
          placeholder="İstanbul"
          placeholderTextColor={COLORS.dark.textDim}
          value={searchQuery}
          onChangeText={handleCitySearch}
        />
        {errors.cityName && <Text style={{ color: COLORS.dark.red, fontSize: 12, marginBottom: 8 }}>{errors.cityName}</Text>}

        {/* Öneri Listesi */}
        {showSuggestions && suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            style={{ backgroundColor: COLORS.dark.panel, borderRadius: 8, marginBottom: 8, maxHeight: 150 }}
            keyboardShouldPersistTaps="always"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: COLORS.dark.border }}
                onPress={() => selectCity(item)}
              >
                <Text style={{ color: COLORS.dark.text }}>
                  {item.name}, {item.country}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

        {/* 📍 İLÇE (isteğe bağlı) */}
        <Text style={{ color: COLORS.dark.text, marginBottom: 8 }}>📍 İlçe (isteğe bağlı)</Text>
        <TextInput
          style={styles.input}
          placeholder="Kadıköy"
          placeholderTextColor={COLORS.dark.textDim}
          value={district}
          onChangeText={setDistrict}
        />

        {/* Koordinat bilgisi (gizli, gösterge) */}
        {lat && lng && (
          <Text style={{ color: COLORS.dark.textDim, fontSize: 10, textAlign: 'center', marginTop: 8 }}>
            📌 {lat}, {lng} · UTC {utcOffset}
          </Text>
        )}

        {/* BUTON */}
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.dark.gold} style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Devam Et →</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
  input: {
    backgroundColor: COLORS.dark.panel,
    color: COLORS.dark.text,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 4,
    fontSize: 16,
  },
  inputError: {
    borderColor: COLORS.dark.red,
  },
  button: {
    backgroundColor: COLORS.dark.gold,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#060610',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
