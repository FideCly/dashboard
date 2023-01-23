export default interface Promotions {
  shopId: number;
  name: string;
  description?: string;
  checkoutLimit: number;
  startAt?: string;
  endAt: string;
  isActive?: boolean;
}
