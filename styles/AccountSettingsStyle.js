import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const AccountSettingsStyle = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
    backgroundColor: Colors.background,
  },
  section: {
    marginBottom: 36,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    boxShadow: `0px 10px 24px ${Colors.shadowSoft}`,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rowLast: {
    marginBottom: 0,
  },
  rowText: {
    flex: 1,
    paddingRight: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  caption: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.subtitle,
    lineHeight: 20,
  },
  actionRow: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  actionButton: {
    paddingVertical: 12,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
});
