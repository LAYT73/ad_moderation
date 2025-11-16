import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import type { AdResponse } from '@/pages/ItemPage/components/ModeratorActionsPanel';
import { adsApi, type DecisionReason } from '@/shared/api/resources/advertisements';

export function useModerationMutations(adId: number) {
  const qc = useQueryClient();
  const [rejectReason, setRejectReason] = useState<DecisionReason | ''>('');
  const [rejectComment, setRejectComment] = useState('');

  const approveMutation = useMutation<AdResponse>({
    mutationFn: () => adsApi.approve(adId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ads', 'item', adId] });
      qc.invalidateQueries({ queryKey: ['ads', 'list'] });
    },
  });

  const rejectMutation = useMutation<AdResponse>({
    mutationFn: () => {
      if (rejectReason === '') {
        return Promise.reject(new Error('Reason is required'));
      }
      return adsApi.reject(adId, { reason: rejectReason, comment: rejectComment });
    },
    onSuccess: () => {
      setRejectReason('');
      setRejectComment('');
      qc.invalidateQueries({ queryKey: ['ads', 'item', adId] });
      qc.invalidateQueries({ queryKey: ['ads', 'list'] });
    },
  });

  const requestChangesMutation = useMutation<AdResponse>({
    mutationFn: () => {
      if (rejectReason === '') {
        return Promise.reject(new Error('Reason is required'));
      }
      return adsApi.requestChanges(adId, { reason: rejectReason, comment: rejectComment });
    },
    onSuccess: () => {
      setRejectReason('');
      setRejectComment('');
      qc.invalidateQueries({ queryKey: ['ads', 'item', adId] });
      qc.invalidateQueries({ queryKey: ['ads', 'list'] });
    },
  });

  return {
    approveMutation,
    rejectMutation,
    requestChangesMutation,
    rejectReason,
    setRejectReason,
    rejectComment,
    setRejectComment,
  };
}
