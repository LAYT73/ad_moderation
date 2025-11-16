import { describe, it, expect, jest } from '@jest/globals';

import { runConcurrently } from '@/shared/lib/utils/runConcurrently';

describe('runConcurrently', () => {
  it('должен успешно обрабатывать все элементы', async () => {
    const items = [1, 2, 3, 4, 5];
    const callback = jest.fn(async (n: number) => n * 2);

    const result = await runConcurrently(items, callback, 2);

    expect(result.success).toHaveLength(5);
    expect(result.failed).toHaveLength(0);
    expect(result.success).toEqual([2, 4, 6, 8, 10]);
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it('должен собирать неудачные попытки', async () => {
    const items = [1, 2, 3, 4];
    const callback = jest.fn(async (n: number) => {
      if (n === 2 || n === 4) throw new Error('Ошибка');
      return n * 2;
    });

    const result = await runConcurrently(items, callback, 2);

    expect(result.success).toHaveLength(2);
    expect(result.failed).toHaveLength(2);
    expect(result.success).toEqual([2, 6]);
    expect(result.failed).toEqual([2, 4]);
  });

  it('должен ограничивать конкурентность', async () => {
    let activeCount = 0;
    let maxActiveCount = 0;

    const items = Array.from({ length: 10 }, (_, i) => i);
    const callback = jest.fn(async () => {
      activeCount++;
      maxActiveCount = Math.max(maxActiveCount, activeCount);
      await new Promise((resolve) => setTimeout(resolve, 10));
      activeCount--;
      return true;
    });

    await runConcurrently(items, callback, 3);

    expect(maxActiveCount).toBeLessThanOrEqual(3);
    expect(callback).toHaveBeenCalledTimes(10);
  });

  it('должен работать с пустым массивом', async () => {
    const emptyAsync = jest.fn(async () => {});
    const result = await runConcurrently([], emptyAsync, 2);

    expect(result.success).toHaveLength(0);
    expect(result.failed).toHaveLength(0);
  });
});
