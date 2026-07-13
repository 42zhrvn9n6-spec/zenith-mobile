export function usePaymentService() {
  const isSubscribed = false;

  const purchaseProduct = async (productId: string) => {
    console.log('Test modu: satın alma simüle edildi ->', productId);
  };

  const checkSubscriptionStatus = async () => {
    console.log('Test modu: abonelik kontrolü atlandı');
  };

  return { isSubscribed, purchaseProduct, checkSubscriptionStatus };
}
