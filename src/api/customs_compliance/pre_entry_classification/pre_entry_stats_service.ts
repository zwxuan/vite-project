export async function getStatsData() {
  return {
    success: true,
    data: {
      kpi: {
        total: 1250,
        pending: 45,
        completed: 1180,
        sla: 98.5,
      },
      trend: [
        { date: '2023-10-01', value: 120 },
        { date: '2023-10-02', value: 132 },
        { date: '2023-10-03', value: 101 },
        { date: '2023-10-04', value: 134 },
        { date: '2023-10-05', value: 90 },
        { date: '2023-10-06', value: 230 },
        { date: '2023-10-07', value: 210 },
      ],
      accuracy: [
        { type: 'Correct', value: 850 },
        { type: 'Modified', value: 300 },
        { type: 'Rejected', value: 30 },
      ],
    },
  };
}
