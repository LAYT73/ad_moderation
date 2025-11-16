/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

import type { ActivityData, CategoriesData, DecisionsData, StatsSummary } from '@/shared/api/resources/stats';

interface ExportStatsData {
  summary: StatsSummary;
  activity: ActivityData[];
  decisions: DecisionsData;
  categories: CategoriesData;
  period: string;
}

let CYR_FONT_LOADED = false;
const CYR_FONT_NAME = 'Roboto';
const CYR_FONT_FILE = 'Roboto-Regular.ttf';
const CYR_FONT_URL = '/Roboto-Regular.ttf';

async function fetchArrayBufferAsBase64(url: string): Promise<string> {
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`Не удалось загрузить шрифт: ${res.status}`);
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk) as unknown as number[]);
  }
  return btoa(binary);
}

async function ensureCyrillicFont(doc: jsPDF): Promise<void> {
  if (CYR_FONT_LOADED) return;
  try {
    const base64 = await fetchArrayBufferAsBase64(CYR_FONT_URL);
    (doc as unknown as { addFileToVFS: (file: string, data: string) => void }).addFileToVFS(CYR_FONT_FILE, base64);
    doc.addFont(CYR_FONT_FILE, CYR_FONT_NAME, 'normal');
    CYR_FONT_LOADED = true;
  } catch (e) {
    console.error(e);
  }
}

/**
 * Экспорт статистики в CSV файл
 */
export function exportStatsToCSV(data: ExportStatsData): void {
  const { summary, activity, decisions, categories, period } = data;

  const csvData = [
    ['Период', period],
    [''],
    ['Общая статистика'],
    ['Метрика', 'Значение'],
    ['Проверено сегодня', summary.totalReviewedToday],
    ['Проверено за неделю', summary.totalReviewedThisWeek],
    ['Проверено за месяц', summary.totalReviewedThisMonth],
    ['Среднее время проверки (сек)', summary.averageReviewTime],
    ['Процент одобренных', `${summary.approvedPercentage.toFixed(1)}%`],
    ['Процент отклоненных', `${summary.rejectedPercentage.toFixed(1)}%`],
    ['Процент на доработку', `${summary.requestChangesPercentage.toFixed(1)}%`],
    [''],
    ['График активности'],
    ['Дата', 'Одобрено', 'Отклонено', 'На доработку'],
    ...activity.map((item) => [item.date, item.approved, item.rejected, item.requestChanges]),
    [''],
    ['Распределение решений'],
    ['Тип решения', 'Процент'],
    ['Одобрено', `${decisions.approved.toFixed(1)}%`],
    ['Отклонено', `${decisions.rejected.toFixed(1)}%`],
    ['На доработку', `${decisions.requestChanges.toFixed(1)}%`],
    [''],
    ['Распределение по категориям'],
    ['Категория', 'Количество'],
    ...Object.entries(categories).map(([name, value]) => [name, value]),
  ];

  const csv = Papa.unparse(csvData);

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `stats_${period}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Экспорт статистики в PDF файл
 */
export async function exportStatsToPDF(data: ExportStatsData): Promise<void> {
  const { summary, activity, decisions, categories, period } = data;

  const doc = new jsPDF();
  await ensureCyrillicFont(doc);
  if (CYR_FONT_LOADED) {
    doc.setFont(CYR_FONT_NAME, 'normal');
  }
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(18);
  doc.text('Статистика модератора', pageWidth / 2, 15, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Период: ${period}`, pageWidth / 2, 23, { align: 'center' });

  doc.setFontSize(14);
  doc.text('Общая статистика', 14, 35);

  autoTable(doc, {
    startY: 40,
    head: [['Метрика', 'Значение']],
    body: [
      ['Проверено сегодня', summary.totalReviewedToday.toString()],
      ['Проверено за неделю', summary.totalReviewedThisWeek.toString()],
      ['Проверено за месяц', summary.totalReviewedThisMonth.toString()],
      ['Среднее время проверки (сек)', summary.averageReviewTime.toString()],
      ['Процент одобренных', `${summary.approvedPercentage.toFixed(1)}%`],
      ['Процент отклоненных', `${summary.rejectedPercentage.toFixed(1)}%`],
      ['Процент на доработку', `${summary.requestChangesPercentage.toFixed(1)}%`],
    ],
    theme: 'grid',
    headStyles: { fillColor: [51, 122, 183] },
    styles: CYR_FONT_LOADED ? { font: CYR_FONT_NAME } : undefined,
  });

  // График активности
  const activityStartY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text('График активности', 14, activityStartY);

  autoTable(doc, {
    startY: activityStartY + 5,
    head: [['Дата', 'Одобрено', 'Отклонено', 'На доработку']],
    body: activity.map((item) => [
      item.date,
      item.approved.toString(),
      item.rejected.toString(),
      item.requestChanges.toString(),
    ]),
    theme: 'striped',
    headStyles: { fillColor: [51, 122, 183] },
    styles: CYR_FONT_LOADED ? { font: CYR_FONT_NAME } : undefined,
  });

  // Распределение решений
  const decisionsStartY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text('Распределение решений', 14, decisionsStartY);

  autoTable(doc, {
    startY: decisionsStartY + 5,
    head: [['Тип решения', 'Процент']],
    body: [
      ['Одобрено', `${decisions.approved.toFixed(1)}%`],
      ['Отклонено', `${decisions.rejected.toFixed(1)}%`],
      ['На доработку', `${decisions.requestChanges.toFixed(1)}%`],
    ],
    theme: 'grid',
    headStyles: { fillColor: [81, 207, 102] },
    styles: CYR_FONT_LOADED ? { font: CYR_FONT_NAME } : undefined,
  });

  const categoriesStartY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text('Распределение по категориям', 14, categoriesStartY);

  autoTable(doc, {
    startY: categoriesStartY + 5,
    head: [['Категория', 'Количество']],
    body: Object.entries(categories).map(([name, value]) => [name, value.toString()]),
    theme: 'striped',
    headStyles: { fillColor: [51, 154, 240] },
    styles: CYR_FONT_LOADED ? { font: CYR_FONT_NAME } : undefined,
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Сгенерировано: ${new Date().toLocaleString('ru-RU')}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' },
    );
  }

  doc.save(`stats_${period}_${new Date().toISOString().split('T')[0]}.pdf`);
}

/**
 * Получить название периода на русском
 */
export function getPeriodName(period: 'today' | 'week' | 'month'): string {
  const names = {
    today: 'Сегодня',
    week: 'Последние 7 дней',
    month: 'Последние 30 дней',
  };
  return names[period];
}
