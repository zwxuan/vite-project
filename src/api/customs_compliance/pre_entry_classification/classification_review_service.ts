import { ReviewTask } from '@/types/customs_compliance/pre_entry_classification/classification_review';


export async function searchReviewTasks(params: any) {
  // Mock data
  const data: ReviewTask[] = [
    {
      id: '1',
      invoice_no: 'INV-2023001',
      product_name: 'Wireless Router',
      hs_code: '8517620000',
      declared_price: 50.00,
      currency: 'USD',
      status: 'Pending',
      reviewer: '-',
      review_time: '-',
    },
    {
      id: '2',
      invoice_no: 'INV-2023002',
      product_name: 'Laptop',
      hs_code: '8471301000',
      declared_price: 800.00,
      currency: 'USD',
      status: 'Approved',
      reviewer: 'John Doe',
      review_time: '2023-10-25 10:00:00',
    },
    {
      id: '3',
      invoice_no: 'INV-2023003',
      product_name: 'Plastic Case',
      hs_code: '3926909090',
      declared_price: 5.00,
      currency: 'USD',
      status: 'Rejected',
      reviewer: 'Jane Smith',
      review_time: '2023-10-24 15:30:00',
    },
  ];

  return {
    success: true,
    data: data,
    total: data.length,
  };
}

export async function batchApproveReview(ids: React.Key[]) {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}

export async function batchRejectReview(ids: React.Key[]) {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}
