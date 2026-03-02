import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import PolicyCard from '../components/PolicyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import {COLORS, SPACING, FONT_SIZE} from '../constants/colors';
import {mockPolicies} from '../constants/mockData';
import {RootStackParamList} from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading policies with a 1.5 second delay
    const loadPolicies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load policies. Please try again.');
        setIsLoading(false);
      }
    };

    loadPolicies();
  }, []);

  const activePolicies = mockPolicies.filter(p => p.status === 'active');
  const totalCoverage = activePolicies.reduce((sum, p) => sum + p.coverage, 0);

  const handlePolicyPress = (policyId: string) => {
    navigation.navigate('Details', {policyId});
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Dashboard" subtitle="Your policies at a glance" />
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Dashboard" subtitle="Your policies at a glance" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Header title="Dashboard" subtitle="Your policies at a glance" />

        {/* Statistics Section */}
        <View style={styles.statsContainer}>
          <StatCard
            label="Active Policies"
            value={`${activePolicies.length}`}
          />
          <StatCard
            label="Total Coverage"
            value={`$${(totalCoverage / 1000).toFixed(0)}k`}
          />
        </View>

        {/* Policies Section */}
        <View style={styles.policiesSection}>
          <View style={styles.policiesList}>
            <FlatList
              data={mockPolicies}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <PolicyCard policy={item} onPress={handlePolicyPress} />
              )}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  errorText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.error,
    textAlign: 'center',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  policiesSection: {
    flex: 1,
    paddingTop: SPACING.lg,
  },
  policiesList: {
    paddingBottom: SPACING.lg,
  },
});

export default HomeScreen;
