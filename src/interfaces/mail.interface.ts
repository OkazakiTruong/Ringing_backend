export interface IMailOption {
    from: string,
    to: string,
    subject: string,
    text?: string,
    html?: string,
    amp?: string,
}