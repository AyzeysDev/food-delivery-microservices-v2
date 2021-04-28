import { Subjects } from './subjects';

export interface FoodCreatedEvent {
  subject: Subjects.FoodCreated;
  data: {
    id: string;
    version: number;
    name: string;
    price: number;
    userId: string;
  };
}
