const Utils = require('../utils.js');

describe('Utils', () => {
  describe('formatDate', () => {
    test('formats valid date string correctly', () => {
      // Use a date string that specifies time to avoid UTC-midnight conversion issues
      // or check that the year and month are correct regardless of day shift
      // A better way for testing formatting is using a specific timestamp or handling the Date object

      // Let's force UTC to avoid local timezone shifts for this test
      // However, Utils.formatDate uses local time.
      // So we should construct a date using local components:
      const date = new Date(2025, 10, 15); // Month is 0-indexed: 10 = Nov
      // We pass the ISO string or date string, but new Date(string) acts differently.
      // app.js uses new Date(dateString).

      // If we pass '2025-11-15T12:00:00', it will likely be the same day everywhere.
      const safeDateString = '2025-11-15T12:00:00';
      const result = Utils.formatDate(safeDateString);
      expect(result).toBe('Nov 15, 2025');
    });
  });

  describe('formatTime', () => {
    test('formats 24h time to 12h AM correctly', () => {
      expect(Utils.formatTime('09:00')).toBe('9:00 AM');
    });

    test('formats 24h time to 12h PM correctly', () => {
      expect(Utils.formatTime('14:30')).toBe('2:30 PM');
    });

    test('formats midnight correctly', () => {
      expect(Utils.formatTime('00:00')).toBe('12:00 AM');
    });

    test('formats noon correctly', () => {
      expect(Utils.formatTime('12:00')).toBe('12:00 PM');
    });
  });

  describe('getCategoryIcon', () => {
    test('returns correct icon for Cultural', () => {
      expect(Utils.getCategoryIcon('Cultural')).toBe('fas fa-music');
    });

    test('returns correct icon for Technical', () => {
      expect(Utils.getCategoryIcon('Technical')).toBe('fas fa-laptop-code');
    });

    test('returns default icon for unknown category', () => {
      expect(Utils.getCategoryIcon('Unknown')).toBe('fas fa-calendar');
    });
  });

  describe('getCategoryColor', () => {
    test('returns correct color for Technical', () => {
      expect(Utils.getCategoryColor('Technical')).toBe('#3B82F6');
    });

    test('returns default color for unknown category', () => {
      expect(Utils.getCategoryColor('Unknown')).toBe('#3B82F6');
    });
  });

  describe('getOrdinal', () => {
    test('returns 1st for 1', () => {
      expect(Utils.getOrdinal(1)).toBe('1st');
    });

    test('returns 2nd for 2', () => {
      expect(Utils.getOrdinal(2)).toBe('2nd');
    });

    test('returns 3rd for 3', () => {
      expect(Utils.getOrdinal(3)).toBe('3rd');
    });

    test('returns 4th for 4', () => {
      expect(Utils.getOrdinal(4)).toBe('4th');
    });

    test('returns 11th for 11', () => {
      expect(Utils.getOrdinal(11)).toBe('11th');
    });

    test('returns 21st for 21', () => {
      expect(Utils.getOrdinal(21)).toBe('21st');
    });
  });

  describe('updateEventStatus', () => {
    test('returns Open if deadline is today', () => {
      const today = new Date();
      const event = { deadline: today.toISOString().split('T')[0] };
      expect(Utils.updateEventStatus(event)).toBe('Open');
    });

    test('returns Open if deadline is in future', () => {
      const future = new Date();
      future.setDate(future.getDate() + 1);
      const event = { deadline: future.toISOString().split('T')[0] };
      expect(Utils.updateEventStatus(event)).toBe('Open');
    });

    test('returns Closed if deadline is in past', () => {
      const past = new Date();
      past.setDate(past.getDate() - 1);
      const event = { deadline: past.toISOString().split('T')[0] };
      expect(Utils.updateEventStatus(event)).toBe('Closed');
    });
  });
});
