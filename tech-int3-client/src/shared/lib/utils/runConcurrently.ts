export async function runConcurrently<T, R>(
  items: T[],
  callback: (item: T) => Promise<R>,
  concurrency: number,
): Promise<{ success: R[]; failed: T[] }> {
  const success: R[] = [];
  const failed: T[] = [];

  const queue = [...items];

  const workers: Promise<void>[] = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const item = queue.shift()!;
      try {
        const result = await callback(item);
        success.push(result);
      } catch {
        failed.push(item);
      }
    }
  });

  await Promise.all(workers);

  return { success, failed };
}
