import { useCallback, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';

const RAPIDAPI_HOST = 'beer9.p.rapidapi.com';
const RAPIDAPI_KEY = '880453b9efmsha140ab8a52b81cdp173abcjsn3399c41c0ca1';

export function normalizeItem(item, idx) {
  const name = item?.name || item?.beer || item?.beer_name || item?.title || 'Unknown';
  const brewery =
    item?.brewery || item?.brewery_name || item?.brand || item?.company || 'Unknown brewery';
  const abvRaw = item?.abv ?? item?.alcohol ?? item?.abv_percent;
  const abv = abvRaw == null ? 'N/A' : `${String(abvRaw).includes('%') ? abvRaw : `${abvRaw}%`}`;
  const style =
    item?.sub_category_1 || item?.style || item?._raw?.style || item?.category || 'Unknown Style';
  const region = item?.region || item?._raw?.region || item?._raw?.country || 'Unknown Region';
  const id = String(item?.id || item?._id || item?.beer_id || `${name}-${brewery}-${idx}`);
  return { id, name, brewery, abv, style, region, sub_category_1: style, _raw: item };
}

export default function useBeerSearch() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeChip, setActiveChip] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const quickSuggestions = useMemo(
    () => ['Carlsberg','Guinness Draught','Heineken','IPA','Stout','Lager','Pilsner','Porter','Wheat Beer','Saison'],
    []
  );

  const runSearch = useCallback(async (queryValue) => {
    Keyboard.dismiss();
    const query = (queryValue || '').trim() || 'Carlsberg';
    const params = new URLSearchParams({ name: query });
    const url = `https://${RAPIDAPI_HOST}/?${params.toString()}`;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST,
        },
      });
      let raw;
      const text = await response.text();
      try { raw = JSON.parse(text); } catch (_) { raw = text; }
      const list = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
      const normalized = list.map(normalizeItem);
      setResults(normalized);
    } catch (e) {
      console.error(e);
      setError('Failed to fetch beers. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleQuickSelect = useCallback((term) => {
    setActiveChip(term);
    setSearchText(term);
    setSearchActive(true);
    runSearch(term);
  }, [runSearch]);

  const handleClear = useCallback((inputRef) => {
    setSearchText('');
    setResults([]);
    setActiveChip('');
    setSearchActive(false);
    inputRef?.focus?.();
  }, []);

  const handleSearch = useCallback(() => {
    const q = (searchText || '').trim();
    if (!q || q.length === 0) return;
    setSearchActive(true);
    runSearch(q);
  }, [runSearch, searchText]);

  return {
    searchText,
    setSearchText,
    quickSuggestions,
    results,
    loading,
    error,
    activeChip,
    setActiveChip,
    searchActive,
    setSearchActive,
    runSearch,
    handleQuickSelect,
    handleClear,
    handleSearch,
  };
}
