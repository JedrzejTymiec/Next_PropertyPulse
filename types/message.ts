export interface Message {
  recipient: string;
  sender: string;
  property: string;
  name: string;
  email: string;
  phone?: string;
  body: string;
}
