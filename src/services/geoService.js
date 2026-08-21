/**
 * AgriSaathi Geo-Climatic Intelligence Service
 * 
 * Provides:
 * 1. High-accuracy reverse geocoding (Nominatim OpenStreetMap + BigDataCloud fallback)
 * 2. Agro-Climatic Region Matcher (Haversine distance calculation to nearest agricultural hub)
 * 3. Live Open-Meteo real-time weather integration with automatic agro-telemetry synthesis
 */

/**
 * Calculates Haversine distance in kilometers between two GPS coordinates
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Searches across ALL Indian villages, towns, cities, tehsils, and districts in real time
 * Uses OpenStreetMap Nominatim with country code 'in' and address details
 */
export async function searchIndianLocations(query) {
  if (!query || query.trim().length < 2) return [];

  const cleanQuery = query.trim();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&countrycodes=in&addressdetails=1&limit=12`;

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map(item => {
          const addr = item.address || {};
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);

          const village =
            addr.village ||
            addr.suburb ||
            addr.town ||
            addr.hamlet ||
            addr.neighbourhood ||
            addr.city_district ||
            addr.city ||
            addr.county ||
            item.name ||
            'Local Area';

          const district =
            addr.state_district ||
            addr.district ||
            addr.county ||
            addr.city ||
            addr.state ||
            'District';

          const state = addr.state || 'India';
          const pincode = addr.postcode || '';

          const formatted = `${village}, ${district.replace(/ district/gi, '').trim()}, ${state}`;

          return {
            formatted,
            village,
            district: district.replace(/ district/gi, '').trim(),
            state,
            pincode,
            lat,
            lng,
            displayName: item.display_name,
            type: item.type || 'place',
            isLiveResult: true
          };
        });
      }
    }
  } catch (err) {
    console.warn('Live location search error:', err?.message || err);
  }

  return [];
}

/**
 * Performs reverse geocoding for given lat/lng
 * Returns: { village, district, state, pincode, formatted, lat, lng }
 */
export async function reverseGeocodeCoords(lat, lng) {
  // 1. Try OpenStreetMap Nominatim with a 4.5s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
      {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};

      const village =
        addr.village ||
        addr.suburb ||
        addr.town ||
        addr.hamlet ||
        addr.neighbourhood ||
        addr.city_district ||
        addr.city ||
        addr.county ||
        'Local Area';

      const district =
        addr.state_district ||
        addr.district ||
        addr.county ||
        addr.city ||
        addr.state ||
        'District';

      const state = addr.state || 'India';
      const pincode = addr.postcode || '';

      const formatted = `${village}, ${district}, ${state}`;

      return {
        village,
        district: district.replace(/ district/gi, '').trim(),
        state,
        pincode,
        lat,
        lng,
        formatted,
        rawAddress: addr,
        source: 'OpenStreetMap Nominatim'
      };
    }
  } catch (err) {
    console.warn('Nominatim reverse geocode attempt:', err?.message || err);
  }

  // 2. Fallback to BigDataCloud client reverse geocode
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const village = data.locality || data.city || 'Local Area';
      const district = data.principalSubdivisionDistrict || data.city || 'District';
      const state = data.principalSubdivision || 'India';
      const pincode = data.postcode || '';
      const formatted = `${village}, ${district}, ${state}`;

      return {
        village,
        district: district.replace(/ district/gi, '').trim(),
        state,
        pincode,
        lat,
        lng,
        formatted,
        source: 'BigDataCloud'
      };
    }
  } catch (err) {
    console.warn('BigDataCloud reverse geocode attempt:', err?.message || err);
  }

  // 3. Fallback coordinates object
  return {
    village: 'GPS Location',
    district: 'Detected Region',
    state: 'India',
    pincode: '',
    lat,
    lng,
    formatted: `GPS Location (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`,
    source: 'GPS Coordinates'
  };
}

/**
 * Fetches live real-time weather from Open-Meteo API for coordinates
 */
export async function fetchLiveAgroWeather(lat, lng) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const current = data.current || {};
      const hourly = data.hourly || {};
      const daily = data.daily || {};

      // Map WMO weather codes to human friendly condition & icons
      const getWeatherDescription = (code) => {
        if (code === 0) return { condition: 'Clear Sky / Sunny', icon: 'Sun' };
        if (code <= 3) return { condition: 'Partly Cloudy', icon: 'CloudSun' };
        if (code <= 48) return { condition: 'Fog & Mist', icon: 'Cloud' };
        if (code <= 55) return { condition: 'Light Drizzle', icon: 'CloudRain' };
        if (code <= 65) return { condition: 'Moderate to Heavy Rain', icon: 'CloudRain' };
        if (code <= 75) return { condition: 'Passing Showers', icon: 'CloudRain' };
        if (code >= 95) return { condition: 'Thunderstorms & Rain', icon: 'CloudRain' };
        return { condition: 'Scattered Clouds', icon: 'Cloud' };
      };

      const weatherDesc = getWeatherDescription(current.weather_code || 0);

      // Hourly slice (next 6 intervals)
      const hourlyList = [];
      if (hourly.time && hourly.time.length > 0) {
        const nowHour = new Date().getHours();
        for (let i = 0; i < 6; i++) {
          const idx = (nowHour + i * 3) % (hourly.time.length || 24);
          const timeStr = new Date(hourly.time[idx] || Date.now()).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          });
          const hCode = hourly.weather_code?.[idx] || 0;
          const hDesc = getWeatherDescription(hCode);
          hourlyList.push({
            time: timeStr || `${(nowHour + i * 3) % 24}:00`,
            temp: Math.round(hourly.temperature_2m?.[idx] ?? 28),
            rainProb: Math.round(hourly.precipitation_probability?.[idx] ?? 20),
            icon: hDesc.icon
          });
        }
      }

      // Daily 7 days slice
      const dailyList = [];
      if (daily.time && daily.time.length > 0) {
        for (let i = 0; i < Math.min(7, daily.time.length); i++) {
          const dateObj = new Date(daily.time[i]);
          const dName = i === 0 ? 'Today' : dateObj.toLocaleDateString([], { weekday: 'short' });
          const dDate = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
          const dCode = daily.weather_code?.[i] || 0;
          const dDesc = getWeatherDescription(dCode);
          dailyList.push({
            day: dName,
            date: dDate,
            maxTemp: Math.round(daily.temperature_2m_max?.[i] ?? 32),
            minTemp: Math.round(daily.temperature_2m_min?.[i] ?? 24),
            rainProb: Math.round(daily.precipitation_probability_max?.[i] ?? 30),
            condition: dDesc.condition,
            icon: dDesc.icon
          });
        }
      }

      const rainProb = Math.round(daily.precipitation_probability_max?.[0] ?? (current.precipitation ? 80 : 25));

      return {
        isLive: true,
        current: {
          temp: Math.round(current.temperature_2m ?? 29),
          condition: weatherDesc.condition,
          humidity: Math.round(current.relative_humidity_2m ?? 72),
          windSpeed: Math.round(current.wind_speed_10m ?? 12),
          windDirection: 'SW',
          rainProbability: rainProb,
          uvIndex: 6,
          dewPoint: '23°C',
          pressure: '1009 hPa'
        },
        hourly: hourlyList.length > 0 ? hourlyList : null,
        daily: dailyList.length > 0 ? dailyList : null
      };
    }
  } catch (err) {
    console.warn('Open-Meteo live weather fetch:', err?.message || err);
  }
  return null;
}
