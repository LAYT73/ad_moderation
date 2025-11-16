import { describe, it, expect } from '@jest/globals';

import { formatPrice, formatDate, formatDateShort } from '@/shared/lib/utils/format';

describe('format utils', () => {
  describe('formatPrice', () => {
    it('должен форматировать цену в рублях', () => {
      expect(formatPrice(1000)).toBe('1 000 ₽');
      expect(formatPrice(1234567)).toBe('1 234 567 ₽');
      expect(formatPrice(0)).toBe('0 ₽');
    });

    it('должен работать с дробными значениями', () => {
      expect(formatPrice(1000.99)).toBe('1 000,99 ₽');
    });
  });

  describe('formatDate', () => {
    it('должен форматировать дату с временем', () => {
      const date = new Date('2024-01-15T14:30:00');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/15\.01\.2024.*14:30/);
    });

    it('должен работать со строковой датой', () => {
      const formatted = formatDate('2024-12-25T10:00:00Z');
      expect(formatted).toContain('25.12.2024');
    });
  });

  describe('formatDateShort', () => {
    it('должен форматировать только дату без времени', () => {
      const date = new Date('2024-03-20T14:30:00');
      expect(formatDateShort(date)).toBe('20.03.2024');
    });
  });
});
