export interface ChatMessage {
    id: number;
    text: string;
    dateTime: Date;
    appUserSender: number;
    appUserReceiver: number;
    chatId: number;
}
