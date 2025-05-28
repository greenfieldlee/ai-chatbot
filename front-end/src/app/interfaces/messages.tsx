export interface IMessageData {
    data: string;
    url: string;
    type: number; // 0: bot, 1: user
    interaction_id?: number
}