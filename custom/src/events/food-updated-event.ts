import { Subjects } from './subjects';

export interface FoodUpdatedEvent {
  subject: Subjects.FoodUpdated;
  data: {
    id: string;
    version: number;
    name: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
