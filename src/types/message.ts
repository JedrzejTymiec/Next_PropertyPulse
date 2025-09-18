export interface Message {
  _id: string;
  recipient: string;
  sender: string;
  property: string;
  name: string;
  email: string;
  phone?: string;
  read: boolean;
  body: string;
  createdAt: number;
  updatedAt: number;
}

export type PopulatedMessage = Message & {
  property: { name: string };
  sender: { username: string };
};
