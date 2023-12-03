import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Appearance } from 'react-native';
import axios from 'axios';
import GifCard from '../components/GifCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import DarkModeToggle from '../components/ToggleButton';

import { YOUR_API_KEY, TRENDING_GIFS_URL, SEARCH_GIFS_URL, ITEMS_PER_PAGE } from '../constants/urlAndKeys';

const HomeScreen = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  const debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
      const context = this;

      const later = () => {
        timeoutId = null;
        func.apply(context, args);
      };

      if (timeoutId) {
        setGifs([]);
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(later, delay);
    };
  };

  const fetchData = async (url, params) => {
    try {
      setLoading(true);
      console.log(`Fetching data`, params.q);
      const response = await axios.get(url, { params });
      setGifs((prevGifs) => [...prevGifs, ...response.data.data]);
      setTotalPages(response.data.pagination.total_pages);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedMakeHttpRequest = useCallback(
    debounce((searchUrl, commonParams) => fetchData(searchUrl, commonParams), 500),
    []
  );

  const SearchInputHandler = (val) => {
    setSearchInput(val);
    const searchUrl = SEARCH_GIFS_URL;
    const commonParams = {
      api_key: YOUR_API_KEY,
      q: val,
      limit: ITEMS_PER_PAGE,
      offset: 0,
    };

    if (!val) {
      onLoad();
    } else {
      debouncedMakeHttpRequest(searchUrl, commonParams);
    }
  };

  const onLoad = () => {
    setGifs([]);
    const trendingGifsUrl = TRENDING_GIFS_URL;
    const commonParams = {
      api_key: YOUR_API_KEY,
      limit: ITEMS_PER_PAGE,
      offset: 0,
    };

    fetchData(trendingGifsUrl, commonParams);
  };

  const loadMore = () => {
    if (loading || page >= totalPages) {
      return;
    }

    console.log('Load more...', gifs.length);

    const trendingGifsUrl = TRENDING_GIFS_URL;
    const commonParams = {
      api_key: YOUR_API_KEY,
      limit: ITEMS_PER_PAGE,
      offset: page * ITEMS_PER_PAGE,
      q: searchInput,
    };

    fetchData(trendingGifsUrl, commonParams);
    setPage(page + 1);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const renderGifItem = ({ item }) => <GifCard gif={item} />;

  return (
    <View style={[styles.app, { backgroundColor: isDarkMode ? 'rgb(15 23 42)' : 'white' }]}>
      <Header />
      <SearchBar SearchInputHandler={SearchInputHandler} />
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode((prev) => !prev)} />
      <FlatList
        data={gifs}
        onRefresh={onLoad}
        refreshing={loading}
        renderItem={renderGifItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default HomeScreen;
