import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const SelectedBeerScreenStyle = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 900,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    boxShadow: `0px 4px 14px ${Colors.shadowStrong}`,
    elevation: 3,
  },
  hero: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.titleHome,
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    minWidth: 98,
    color: Colors.subtitle,
    fontWeight: '600',
  },
  value: {
    flex: 1,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 14,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  star: {
    fontSize: 30,
    marginRight: 2,
    color: '#f1c40f',
  },
  reviewCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    boxShadow: `0px 2px 8px ${Colors.shadowMedium}`,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: Colors.text,
    minHeight: 44,
  },
  submitBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitText: {
    color: Colors.buttonText,
    fontWeight: '700',
  },
  reviewItem: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  reviewAuthor: {
    fontWeight: '600',
    color: Colors.title,
  },
  reviewText: {
    marginTop: 4,
    color: Colors.text,
  },
});
