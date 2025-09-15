import { useState, useEffect, memo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDebounce } from '../../../../hooks/useDebounce';    
import { colors, spacing, typography } from '../../../../styles';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
}

const SearchInputComponent = function SearchInput({ 
  placeholder = 'Search countries...', 
  onSearch, 
  debounceMs = 400 
}: SearchInputProps) {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, debounceMs);
  useEffect(() => {
   
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export const SearchInput = memo(SearchInputComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.md,
    color: colors.text,
  },
});
