
export async function getStatsData() {
  return {
    success: true,
    data: {
      kpi: {
        total: 1250,
        pending: 45,
        completed: 1180,
        sla: 98.5,
        pendingClassification: 23,
        completedToday: 56,
        errorRate: 1.2,
        avgTurnaroundTime: 4.5, // hours
      },
      trend: [
        { date: '2023-10-01', value: 120, type: 'Total' },
        { date: '2023-10-02', value: 132, type: 'Total' },
        { date: '2023-10-03', value: 101, type: 'Total' },
        { date: '2023-10-04', value: 134, type: 'Total' },
        { date: '2023-10-05', value: 90, type: 'Total' },
        { date: '2023-10-06', value: 230, type: 'Total' },
        { date: '2023-10-07', value: 210, type: 'Total' },
        { date: '2023-10-01', value: 118, type: 'Completed' },
        { date: '2023-10-02', value: 130, type: 'Completed' },
        { date: '2023-10-03', value: 95, type: 'Completed' },
        { date: '2023-10-04', value: 130, type: 'Completed' },
        { date: '2023-10-05', value: 85, type: 'Completed' },
        { date: '2023-10-06', value: 220, type: 'Completed' },
        { date: '2023-10-07', value: 200, type: 'Completed' },
      ],
      accuracy: [
        { type: 'Correct', value: 850 },
        { type: 'Modified', value: 300 },
        { type: 'Rejected', value: 30 },
      ],
      statusDistribution: [
        { type: 'Draft', value: 100 },
        { type: 'Processing', value: 250 },
        { type: 'Pending Review', value: 150 },
        { type: 'Completed', value: 750 },
      ],
      errorAnalysis: [
        { reason: 'Incorrect HS Code', value: 45 },
        { reason: 'Missing Spec', value: 30 },
        { reason: 'Wrong Unit', value: 15 },
        { reason: 'Other', value: 10 },
      ],
      topHsCodes: [
        { code: '8517629900', name: 'Other machines for the reception, conversion and transmission or regeneration of voice, images or other data', count: 120 },
        { code: '8471301000', name: 'Tablet computers', count: 95 },
        { code: '8504409999', name: 'Other static converters', count: 80 },
        { code: '8542319000', name: 'Other processors and controllers', count: 75 },
        { code: '8523511000', name: 'Solid-state non-volatile storage devices', count: 60 },
      ],
    },
  };
}
